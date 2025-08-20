# Smart Irrigation System

This project is a modular, production-ready IoT solution for smart irrigation, featuring:

- ESP32-based moisture sensors and irrigation controllers
- MQTT-based communication
- Node.js backend for data logging, device management, and alerting
- PostgreSQL database for persistent storage

## Features

- **Automated and manual irrigation control**
- **Live soil moisture monitoring**
- **Water usage tracking per section**
- **Remote configuration and OTA updates**
- **Device health/status monitoring**
- **Command acknowledgments and logging**
- **Robust error handling and reconnection logic**
- **Offline device alerting**

---

## 1. ESP32 Firmware

### Moisture Sensor

- Reads soil moisture and publishes to MQTT.
- Supports deep sleep for power saving.
- Configurable via `/config` topic (deep sleep, reporting interval, etc.).
- Publishes health/status and ACKs.

### Irrigation Controller

- Controls 4 relays/valves and 4 flow sensors (one per section).
- Supports manual and automatic modes (auto mode based on live moisture readings).
- Configurable via `/config` topic (thresholds, deep sleep, etc.).
- Publishes health/status and ACKs.
- Tracks and publishes water usage per irrigation event.

---

## 2. Node.js Backend

- Subscribes to all relevant MQTT topics:
  - `/moisture`, `/irrigation`, `/status`, `/ack`, `/config`
- Logs all data to PostgreSQL tables using Prisma ORM.
- Tracks device health and last seen time.
- Sends config and command messages to devices.
- Provides REST API for frontend communication.
- Real-time WebSocket updates for live dashboard.
- JWT authentication and multi-user support.
- Background job alerts if a device is offline for >2 minutes.
- Uses structured logging for all actions and errors.

---

## 3. MQTT Topic Structure

| Purpose        | Topic Example             |
| -------------- | ------------------------- |
| Moisture Data  | farm/1/section/2/moisture |
| Irrigation Cmd | farm/1/section/2/command  |
| Config Update  | farm/1/section/2/config   |
| Device Status  | farm/1/section/2/status   |
| Command ACK    | farm/1/section/2/ack      |

---

## 4. Database Schema

You need the following tables:

```sql
CREATE TABLE moisture_readings (
    id SERIAL PRIMARY KEY,
    farmer_id INT,
    section_id INT,
    value INT,
    timestamp TIMESTAMP
);

CREATE TABLE irrigation_events (
    id SERIAL PRIMARY KEY,
    farmer_id INT,
    section_id INT,
    water_ml FLOAT,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE device_status (
    id SERIAL PRIMARY KEY,
    device_id TEXT,
    farmer_id INT,
    section_id INT,
    status_json JSONB,
    timestamp TIMESTAMP
);

CREATE TABLE device_acks (
    id SERIAL PRIMARY KEY,
    device_id TEXT,
    farmer_id INT,
    section_id INT,
    ack_json JSONB,
    timestamp TIMESTAMP
);
```

---

## 5. Setup Instructions

### ESP32 Firmware

- Install Arduino libraries: `WiFi.h`, `PubSubClient.h`, `ArduinoJson.h`, `Preferences.h`.
- Flash `esp32_moisture_sensor.ino` and `esp32_irrigation_controller.ino` to your ESP32 devices.
- Configure WiFi, MQTT, and device IDs as needed.

### Python Backend

- Install dependencies:
  ```bash
  pip install paho-mqtt psycopg2
  ```
- Edit `python_backend.py` with your PostgreSQL credentials.
- Ensure your PostgreSQL database has the required tables.
- Run the backend:
  ```bash
  python python_backend.py
  ```

---

## 6. Usage Examples

### Send Irrigation Command

```python
send_irrigation_command(1, 2, 30)  # Irrigate section 2 for 30 seconds
```

### Send Config Update

```python
send_config(1, 2, {"enable_deep_sleep": True, "deep_sleep_duration": 120, "threshold": 35})
```

### Hardware Mapping

The irrigation controller manages 4 sections:

- **Section 0**: Relay pin 26, Flow sensor pin 27
- **Section 1**: Relay pin 25, Flow sensor pin 14
- **Section 2**: Relay pin 33, Flow sensor pin 12
- **Section 3**: Relay pin 32, Flow sensor pin 13

---

## 7. Health Monitoring & Alerts

- Device status is published every 60 seconds to `/status` topics.
- Backend logs last seen time for each device.
- If a device is offline for >2 minutes, a warning is logged.
- All command/config actions are acknowledged via `/ack` topics.

---

## 8. Extending the System

- Add a REST API (Flask/FastAPI) for dashboard integration.
- Add more analytics, reporting, and alerting as needed.
- Integrate with cloud MQTT brokers for scalability and security.

---

## 9. License

MIT
