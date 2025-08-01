import paho.mqtt.client as mqtt
import psycopg2
import json
from datetime import datetime, timedelta
import time
import logging
import threading
from dateutil.parser import parse as parse_date


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# PostgreSQL config
DB_CONFIG = dict(dbname="arecanut", user="postgres", password="postgres", host="localhost")

# MQTT config
mqtt_broker = "192.168.29.247"
mqtt_port = 1883
mqtt_username = "arecanut"
mqtt_password = "123456"

# Last seen device tracking
last_seen = {}

def get_db_conn():
    while True:
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            conn.autocommit = True
            return conn
        except Exception as e:
            logger.error(f"DB connection failed: {e}, retrying in 5s...")
            time.sleep(5)

conn = get_db_conn()
cur = conn.cursor()

def parse_timestamp(ts):
    try:
        # Try parsing a valid timestamp string
        return parse_date(str(ts))
    except:
        # If it's invalid (e.g., just a number like 2997), use current time
        return datetime.now()

def reconnect_db():
    global conn, cur
    try:
        conn.close()
    except:
        pass
    conn = get_db_conn()
    cur = conn.cursor()

def millis_to_datetime(millis, device_now_millis=None):
    try:
        dt_now = datetime.now()
        if device_now_millis is not None and device_now_millis > 0 and millis <= device_now_millis:
            return dt_now - timedelta(milliseconds=(device_now_millis - int(millis)))
        else:
            return dt_now
    except Exception:
        return datetime.now()

# Create required tables if not exists
def setup_tables():
    tables = [
        """
        CREATE TABLE IF NOT EXISTS farms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255),
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "updatedAt" TIMESTAMP DEFAULT NOW()
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS sections (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            farm_id INT NOT NULL,
            section_number INT NOT NULL DEFAULT 1,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "updatedAt" TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            UNIQUE(farm_id, section_number)
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS moisture_readings (
            id SERIAL PRIMARY KEY,
            farm_id INT NOT NULL,
            section_id INT NOT NULL,
            section_number INT NOT NULL,
            value FLOAT NOT NULL,
            timestamp TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS irrigation_events (
            id SERIAL PRIMARY KEY,
            farm_id INT NOT NULL,
            section_id INT NOT NULL,
            section_number INT NOT NULL,
            water_ml FLOAT NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS moisture_device_status (
            id SERIAL PRIMARY KEY,
            device_id VARCHAR(255) NOT NULL,
            farm_id INT NOT NULL,
            section_id INT NOT NULL,
            section_number INT NOT NULL,
            mqtt BOOLEAN NOT NULL,
            wifi BOOLEAN NOT NULL,
            uptime INT NOT NULL,
            timestamp INT NOT NULL,
            last_error TEXT NOT NULL,
            enable_deep_sleep BOOLEAN NOT NULL,
            reporting_interval INT NOT NULL,
            deep_sleep_duration INT NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS irrigation_device_status (
            id SERIAL PRIMARY KEY,
            device_id VARCHAR(255) NOT NULL,
            farm_id INT NOT NULL,
            section_id INT NOT NULL,
            section_number INT NOT NULL,
            uptime INT NOT NULL,
            wifi INT NOT NULL,
            mqtt INT NOT NULL,
            last_error TEXT NOT NULL,
            valve_on INT NOT NULL,
            mode VARCHAR(255) NOT NULL,
            latest_moisture INT NOT NULL,
            threshold INT NOT NULL,
            pulse_count INT NOT NULL,
            water_ml INT NOT NULL,
            timestamp INT NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS device_acks (
            id SERIAL PRIMARY KEY,
            device_id VARCHAR(255),
            farm_id INT NOT NULL,
            section_id INT NOT NULL,
            section_number INT NOT NULL,
            ack_json JSONB NOT NULL,
            timestamp TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
        );
        """
    ]
    
    # Create default farm and section if they don't exist
    default_data = [
        """
        INSERT INTO farms (id, name, location, "createdAt", "updatedAt") 
        VALUES (1, 'Default Farm', 'Default Location', NOW(), NOW()) 
        ON CONFLICT (id) DO NOTHING;
        """,
        """
        INSERT INTO sections (id, name, farm_id, section_number, "createdAt", "updatedAt") 
        VALUES (1, 'Default Section', 1, 1, NOW(), NOW()) 
        ON CONFLICT (id) DO NOTHING;
        """
    ]
    
    for t in tables:
        cur.execute(t)
    
    for d in default_data:
        cur.execute(d)
        
    logger.info("Tables ensured with new schema.")

def on_connect(client, userdata, flags, rc):
    logger.info(f"Connected with result code {rc}")
    client.subscribe("farm/+/section/+/moisture")
    client.subscribe("farm/+/section/+/irrigation")
    client.subscribe("farm/+/section/+/status")
    client.subscribe("farm/+/section/+/ack")
    client.subscribe("farm/+/section/+/config")

def ensure_farm_exists(farm_id):
    """Ensure farm exists, create if it doesn't"""
    try:
        cur.execute("SELECT id FROM farms WHERE id = %s", (farm_id,))
        if not cur.fetchone():
            cur.execute(
                "INSERT INTO farms (id, name, location, \"createdAt\", \"updatedAt\") VALUES (%s, %s, %s, NOW(), NOW())",
                (farm_id, f"Farm {farm_id}", f"Farm Location {farm_id}")
            )
            logger.info(f"Created new farm with ID: {farm_id}")
    except Exception as e:
        logger.error(f"Error ensuring farm exists: {e}")

def ensure_section_exists(farm_id, section_id):
    """Ensure section exists, create if it doesn't"""
    try:
        # First ensure farm exists
        ensure_farm_exists(farm_id)
        
        # Check if section exists
        cur.execute("SELECT id FROM sections WHERE farm_id = %s AND section_number = %s", (farm_id, section_id))
        if not cur.fetchone():
            cur.execute(
                "INSERT INTO sections (name, farm_id, section_number, \"createdAt\", \"updatedAt\") VALUES (%s, %s, %s, NOW(), NOW())",
                (f"Section {section_id}", farm_id, section_id)
            )
            logger.info(f"Created new section: Farm {farm_id}, Section {section_id}")
    except Exception as e:
        logger.error(f"Error ensuring section exists: {e}")

def ensure_dummy_data(data):
    # If any required field is missing or None, replace with dummy
    data.setdefault("farm_id", 1)
    data.setdefault("section_id", 1)
    data.setdefault("device_id", "dummy-device")
    return data

def on_message(client, userdata, msg):
    topic_parts = msg.topic.split('/')
    payload = msg.payload.decode()
    # Debug logging for every received message
    logger.info(f"Received MQTT message on topic: {msg.topic}")
    logger.info(f"Payload: {payload}")
    try:
        data = json.loads(payload)
    except Exception as e:
        logger.error(f"Invalid JSON: {payload}")
        return

    # Remove zone_id from data if present
    data.pop("zone_id", None)
    data = ensure_dummy_data(data)

    # Validate required fields
    if not all(key in data for key in ["farm_id", "section_id", "device_id"]):
        logger.error(f"Missing required fields in data: {data}")
        return

    # Extract farm_id and section_id from topic if not in payload
    if len(topic_parts) >= 4:
        try:
            topic_farm_id = int(topic_parts[1])  # farm/{farm_id}/section/{section_id}/...
            topic_section_id = int(topic_parts[3])  # farm/{farm_id}/section/{section_id}/...
            
            # Use topic values if payload doesn't have them or they're different
            if "farm_id" not in data or data["farm_id"] != topic_farm_id:
                data["farm_id"] = topic_farm_id
                logger.info(f"Using farm_id from topic: {topic_farm_id}")
            
            if "section_id" not in data or data["section_id"] != topic_section_id:
                data["section_id"] = topic_section_id
                logger.info(f"Using section_id from topic: {topic_section_id}")
        except (ValueError, IndexError) as e:
            logger.warning(f"Could not parse farm_id/section_id from topic: {msg.topic}, error: {e}")

    # Ensure farm and section exist before processing data
    farm_id = data["farm_id"]
    section_id = data["section_id"]
    ensure_section_exists(farm_id, section_id)

    try:
        if topic_parts[-1] == "moisture":
            if "value" not in data:
                logger.error(f"Missing value field in moisture data: {data}")
                return
            timestamp = parse_timestamp(data.get("timestamp"))
            
            # Get the actual section ID from the database using farm_id and section_number
            cur.execute(
                "SELECT id FROM sections WHERE farm_id = %s AND section_number = %s",
                (data["farm_id"], data["section_id"])
            )
            section_result = cur.fetchone()
            if not section_result:
                logger.error(f"Section not found: Farm {data['farm_id']}, Section {data['section_id']}")
                return
            
            actual_section_id = section_result[0]
            
            cur.execute(
                "INSERT INTO moisture_readings (farm_id, section_id, section_number, value, timestamp) VALUES (%s, %s, %s, %s, %s)",
                (data["farm_id"], actual_section_id, data["section_id"], data["value"], timestamp)
            )
            logger.info(f"Moisture reading logged: Farm {data['farm_id']}, Section {data['section_id']}, Value: {data['value']}")
            
            # Broadcast moisture update to WebSocket
            # broadcast_moisture_update(data["farm_id"], data["section_id"], data["value"], timestamp.isoformat())

        elif topic_parts[-1] == "irrigation":
            # Validate required fields for irrigation
            required_fields = ["start_time", "end_time", "water_ml"]
            if not all(field in data for field in required_fields):
                logger.error(f"Missing required fields in irrigation data: {data}")
                return
            
            # Get the actual section ID from the database using farm_id and section_number
            cur.execute(
                "SELECT id FROM sections WHERE farm_id = %s AND section_number = %s",
                (data["farm_id"], data["section_id"])
            )
            section_result = cur.fetchone()
            if not section_result:
                logger.error(f"Section not found: Farm {data['farm_id']}, Section {data['section_id']}")
                return
            
            actual_section_id = section_result[0]
            
            # Convert millis to datetime
            device_now_millis = int(data.get("timestamp", 0))
            start_time = millis_to_datetime(int(data["start_time"]), device_now_millis)
            end_time = millis_to_datetime(int(data["end_time"]), device_now_millis)
            cur.execute(
                "INSERT INTO irrigation_events (farm_id, section_id, section_number, water_ml, start_time, end_time) VALUES (%s, %s, %s, %s, %s, %s)",
                (data["farm_id"], actual_section_id, data["section_id"], data["water_ml"], start_time, end_time)
            )
            logger.info(f"Irrigation event logged: Farm {data['farm_id']}, Section {data['section_id']}, Water: {data['water_ml']}ml")
            
            # Broadcast irrigation update to WebSocket
            # broadcast_irrigation_update(data["farm_id"], data["section_id"], False, "manual", data["water_ml"], end_time.isoformat())

        elif topic_parts[-1] == "status":
            # Get the actual section ID from the database using farm_id and section_number
            cur.execute(
                "SELECT id FROM sections WHERE farm_id = %s AND section_number = %s",
                (data["farm_id"], data["section_id"])
            )
            section_result = cur.fetchone()
            if not section_result:
                logger.error(f"Section not found: Farm {data['farm_id']}, Section {data['section_id']}")
                return
            
            actual_section_id = section_result[0]
            
            key = (data["farm_id"], data["section_id"])
            last_seen[key] = datetime.now()
            
            # Determine if this is a moisture or irrigation device based on the data structure
            # Moisture sensor has: enable_deep_sleep, deep_sleep_duration, reporting_interval
            # Irrigation controller has: valve_on, mode, latest_moisture, threshold, pulse_count, water_ml
            is_moisture_device = (
                "enable_deep_sleep" in data or 
                "deep_sleep_duration" in data or 
                "reporting_interval" in data or
                "moisture" in data.get("device_id", "").lower()
            )
            
            if is_moisture_device:
                # Insert into moisture_device_status
                cur.execute(
                    """INSERT INTO moisture_device_status 
                    (device_id, farm_id, section_id, section_number, mqtt, wifi, uptime, timestamp, last_error, 
                     enable_deep_sleep, reporting_interval, deep_sleep_duration) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                    (
                        data["device_id"], 
                        data["farm_id"], 
                        actual_section_id,
                        data["section_id"],
                        bool(data.get("mqtt", False)),
                        bool(data.get("wifi", False)),
                        int(data.get("uptime", 0)),
                        int(data.get("timestamp", 0)),
                        str(data.get("last_error", "")),
                        bool(data.get("enable_deep_sleep", False)),
                        int(data.get("reporting_interval", 0)),
                        int(data.get("deep_sleep_duration", 0))
                    )
                )
                logger.info(f"Moisture device status logged: Farm {data['farm_id']}, Section {data['section_id']}, Device: {data['device_id']}")
            else:
                # Insert into irrigation_device_status
                cur.execute(
                    """INSERT INTO irrigation_device_status 
                    (device_id, farm_id, section_id, section_number, uptime, wifi, mqtt, last_error, valve_on, 
                     mode, latest_moisture, threshold, pulse_count, water_ml, timestamp) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                    (
                        data["device_id"], 
                        data["farm_id"], 
                        actual_section_id,
                        data["section_id"],
                        int(data.get("uptime", 0)),
                        int(data.get("wifi", 0)),
                        int(data.get("mqtt", 0)),
                        str(data.get("last_error", "")),
                        int(data.get("valve_on", 0)),
                        str(data.get("mode", "auto")),
                        int(data.get("latest_moisture", 0)),
                        int(data.get("threshold", 0)),
                        int(data.get("pulse_count", 0)),
                        int(data.get("water_ml", 0)),
                        int(data.get("timestamp", 0))
                    )
                )
                logger.info(f"Irrigation device status logged: Farm {data['farm_id']}, Section {data['section_id']}, Device: {data['device_id']}")
                
                # Broadcast irrigation status update to WebSocket
                # broadcast_irrigation_update(
                #     data["farm_id"], 
                #     data["section_id"], 
                #     bool(data.get("valve_on", False)),
                #     str(data.get("mode", "manual")),
                #     int(data.get("water_ml", 0)),
                #     datetime.now().isoformat()
                # )

        elif topic_parts[-1] == "config":
            # Handle configuration commands
            if "min_threshold" in data:
                min_threshold = data["min_threshold"]
                cur.execute("""
                    INSERT INTO irrigation_device_status 
                    (farm_id, section_number, min_threshold, timestamp) 
                    VALUES (%s, %s, %s, %s)
                """, (farm_id, section_number, min_threshold, datetime.now()))
                logger.info(f"Min threshold updated: Farm {farm_id}, Section {section_number}, Value: {min_threshold}")
                
            if "max_threshold" in data:
                max_threshold = data["max_threshold"]
                cur.execute("""
                    INSERT INTO irrigation_device_status 
                    (farm_id, section_number, max_threshold, timestamp) 
                    VALUES (%s, %s, %s, %s)
                """, (farm_id, section_number, max_threshold, datetime.now()))
                logger.info(f"Max threshold updated: Farm {farm_id}, Section {section_number}, Value: {max_threshold}")
                
            # Legacy threshold support
            if "threshold" in data:
                threshold = data["threshold"]
                cur.execute("""
                    INSERT INTO irrigation_device_status 
                    (farm_id, section_number, threshold, timestamp) 
                    VALUES (%s, %s, %s, %s)
                """, (farm_id, section_number, threshold, datetime.now()))
                logger.info(f"Threshold updated: Farm {farm_id}, Section {section_number}, Value: {threshold}")

        elif topic_parts[-1] == "ack":
            # Get the actual section ID from the database using farm_id and section_number
            cur.execute(
                "SELECT id FROM sections WHERE farm_id = %s AND section_number = %s",
                (data["farm_id"], data["section_id"])
            )
            section_result = cur.fetchone()
            if not section_result:
                logger.error(f"Section not found: Farm {data['farm_id']}, Section {data['section_id']}")
                return
            
            actual_section_id = section_result[0]
            
            cur.execute(
                "INSERT INTO device_acks (device_id, farm_id, section_id, section_number, ack_json, timestamp) VALUES (%s, %s, %s, %s, %s, %s)",
                (data["device_id"], data["farm_id"], actual_section_id, data["section_id"], json.dumps(data), datetime.now())
            )
            logger.info(f"ACK logged: Farm {data['farm_id']}, Section {data['section_id']}, Device: {data['device_id']}")

    except Exception as e:
        logger.error(f"DB error: {e}, reconnecting DB...")
        logger.error(f"Failed data: {data}")
        logger.error(f"Topic: {msg.topic}")
        reconnect_db()

def send_config(farm_id, section_number, config_dict):
    topic = f"farm/{farm_id}/section/{section_number}/config"
    payload = json.dumps(config_dict)
    client.publish(topic, payload)
    logger.info(f"Sent config to Farm {farm_id}, Section {section_number}: {payload}")

def send_irrigation_command(farm_id, section_number, duration_sec):
    topic = f"farm/{farm_id}/section/{section_number}/command"
    payload = json.dumps({"action": "irrigate", "duration": duration_sec})
    client.publish(topic, payload)
    logger.info(f"Sent irrigation command to Farm {farm_id}, Section {section_number}: {payload}")

def send_mode_command(farm_id, section_number, mode):
    topic = f"farm/{farm_id}/section/{section_number}/mode"
    payload = json.dumps({"mode": mode})
    client.publish(topic, payload)
    logger.info(f"Sent mode command to Farm {farm_id}, Section {section_number}: {payload}")

def start_mqtt():
    global client
    client = mqtt.Client()
    client.username_pw_set(mqtt_username, mqtt_password)
    client.on_connect = on_connect
    client.on_message = on_message
    while True:
        try:
            client.connect(mqtt_broker, mqtt_port)
            client.loop_start()
            break
        except Exception as e:
            logger.error(f"MQTT connection failed: {e}, retrying in 5s...")
            time.sleep(5)

def get_section_info(farm_id, section_number):
    """Get section information from database"""
    try:
        cur.execute(
            "SELECT id, name FROM sections WHERE farm_id = %s AND section_number = %s",
            (farm_id, section_number)
        )
        result = cur.fetchone()
        if result:
            return {"id": result[0], "name": result[1]}
        return None
    except Exception as e:
        logger.error(f"Error getting section info: {e}")
        return None

def alert_job():
    ALERT_INTERVAL = 120  # seconds
    while True:
        now = datetime.now()
        for key, last in last_seen.items():
            if (now - last).total_seconds() > ALERT_INTERVAL:
                farm_id, section_number = key
                section_info = get_section_info(farm_id, section_number)
                section_name = section_info["name"] if section_info else f"Section {section_number}"
                logger.warning(f"ALERT: Device offline for Farm {farm_id}, {section_name} for >{ALERT_INTERVAL}s")
        time.sleep(30)

# Initial setup
setup_tables()
start_mqtt()
threading.Thread(target=alert_job, daemon=True).start()



# Keep script alive
while True:
    time.sleep(10)
