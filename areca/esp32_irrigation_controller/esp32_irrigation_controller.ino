#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>

#define RELAY_PINS {26, 25, 33, 32}
#define FLOW_PINS {27, 14, 12, 13}
#define VOLUME_PER_PULSE 1.7
// Section indexing now starts from 1 (index 0 is unused)
#define NUM_SECTIONS 4
#define MAX_SECTIONS 5 // index 0 unused

const char* ssid = "Sumukha_4G";
const char* password = "puliyogare";
const char* mqtt_server = "192.168.29.247";
const int mqtt_port = 1883;
const char* mqtt_username = "arecanut";
const char* mqtt_password = "123456";

const int farm_id = 1;
const char* device_id = "irrigation_controller_1";

#define uS_TO_S_FACTOR 1000000

WiFiClient espClient;
PubSubClient client(espClient);
Preferences prefs;

// Update relay and flow pin arrays (index 0 unused)
int relayPins[MAX_SECTIONS] = {0, 26, 25, 33, 32}; // 1-based: 1=26, 2=25, 3=33, 4=32
int flowPins[MAX_SECTIONS]  = {0, 27, 14, 12, 13}; // 1-based: 1=27, 2=14, 3=12, 4=13
volatile int pulseCounts[MAX_SECTIONS] = {0, 0, 0, 0, 0};

// Per-section state (index 0 unused)
String mode[MAX_SECTIONS] = {"", "manual", "manual", "manual", "manual"};
bool valveOn[MAX_SECTIONS] = {false, false, false, false, false};
int latestMoisture[MAX_SECTIONS] = {0, 100, 100, 100, 100}; // Received from moisture sensor ESP32 via MQTT
int threshold[MAX_SECTIONS] = {0, 40, 40, 40, 40};
unsigned long irrigationStart[MAX_SECTIONS] = {0, 0, 0, 0, 0};
unsigned long irrigationDuration[MAX_SECTIONS] = {0, 0, 0, 0, 0}; // Duration in milliseconds

// Global config
bool enableDeepSleepManual = false;
int deepSleepDuration = 60; // seconds

// Health/status
String lastError = "";
unsigned long lastStatusPublish = 0;
const unsigned long statusInterval = 10000; // 10 seconds - REDUCED for faster updates

// Update ISRs (index 0 unused)
void IRAM_ATTR pulse1() { pulseCounts[1]++; }
void IRAM_ATTR pulse2() { pulseCounts[2]++; }
void IRAM_ATTR pulse3() { pulseCounts[3]++; }
void IRAM_ATTR pulse4() { pulseCounts[4]++; }
typedef void (*isr_ptr_t)();
isr_ptr_t pulseISRs[MAX_SECTIONS] = {nullptr, pulse1, pulse2, pulse3, pulse4};

void loadConfig() {
  prefs.begin("irrigation", false);
  enableDeepSleepManual = prefs.getBool("deepSleep", false);
  deepSleepDuration = prefs.getInt("sleepDur", 60);
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    threshold[i] = prefs.getInt(("thresh" + String(i)).c_str(), 40);
  }
  prefs.end();
}

void saveConfig(const char* key, int value) {
  prefs.begin("irrigation", false);
  prefs.putInt(key, value);
  prefs.end();
}
void saveConfigBool(const char* key, bool value) {
  prefs.begin("irrigation", false);
  prefs.putBool(key, value);
  prefs.end();
}

void ensureWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected, reconnecting...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    unsigned long startAttempt = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 10000) {
      delay(500);
    }
    if (WiFi.status() == WL_CONNECTED) Serial.println("WiFi reconnected");
    else Serial.println("WiFi reconnection failed");
  }
}

void ensureMQTT() {
  if (!client.connected()) {
    Serial.println("MQTT disconnected, reconnecting...");
    while (!client.connect(device_id, mqtt_username, mqtt_password)) {
      delay(1000);
    }
    Serial.println("MQTT reconnected");
    // Re-subscribe to topics for all sections (1-based)
    for (int i = 1; i <= NUM_SECTIONS; i++) {
      String base = "farm/" + String(farm_id) + "/section/" + String(i) + "/";
      client.subscribe((base + "command").c_str());
      client.subscribe((base + "mode").c_str());
      client.subscribe((base + "moisture").c_str());
      client.subscribe((base + "config").c_str());
    }
  }
}

void publishStatus() {
  // Publish status for each section individually
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    // Use the same approach as moisture sensor - String payload with actual section data
    String payload = "{\"device_id\":\"" + String(device_id) + "\"" +
                     ",\"section_id\":" + String(i) +
                     ",\"uptime\":" + String(millis()) +
                     ",\"wifi\":" + String(WiFi.status() == WL_CONNECTED) +
                     ",\"mqtt\":" + String(client.connected()) +
                     ",\"last_error\":\"" + lastError + "\"" +
                     ",\"valve_on\":" + String(valveOn[i]) +
                     ",\"mode\":\"" + mode[i] + "\"" +
                     ",\"latest_moisture\":" + String(latestMoisture[i]) +
                     ",\"threshold\":" + String(threshold[i]) +
                     ",\"pulse_count\":" + String(pulseCounts[i]) +
                     ",\"water_ml\":" + String(pulseCounts[i] * VOLUME_PER_PULSE) +
                     ",\"timestamp\":" + String(millis()) + "}";
    
    String topic = "farm/" + String(farm_id) + "/section/" + String(i) + "/status";
    
    // Use the exact same method as moisture sensor
    bool publishSuccess = client.publish(topic.c_str(), payload.c_str());
    if (publishSuccess) {
      Serial.println("Status published for section " + String(i) + " to topic: " + topic);
      Serial.println("Payload: " + payload);
    } else {
      Serial.println("FAILED to publish status for section " + String(i));
      lastError = "Status publish failed for section " + String(i);
    }
    
    // Process MQTT loop - REMOVED DELAY for faster status updates
    client.loop();
  }
}

void ackCommand(int section, const char* command, const char* result, const char* details) {
  if (section < 1 || section > NUM_SECTIONS) return;
  StaticJsonDocument<256> doc;
  doc["device_id"] = device_id;
  doc["section_id"] = section;
  doc["command"] = command;
  doc["result"] = result;
  doc["details"] = details;
  doc["timestamp"] = millis();
  char buffer[256];
  serializeJson(doc, buffer);
  String topic = "farm/" + String(farm_id) + "/section/" + String(section) + "/ack";
  client.publish(topic.c_str(), buffer);
  Serial.println("ACK published: " + String(buffer));
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  loadConfig();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);
  while (!client.connected()) {
    client.connect(device_id, mqtt_username, mqtt_password);
    delay(500);
  }

  // Initialize pins and subscribe to topics for all sections (1-based)
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    pinMode(relayPins[i], OUTPUT);
    digitalWrite(relayPins[i], HIGH);
    pinMode(flowPins[i], INPUT_PULLUP);
    String base = "farm/" + String(farm_id) + "/section/" + String(i) + "/";
    client.subscribe((base + "command").c_str());
    client.subscribe((base + "mode").c_str());
    client.subscribe((base + "moisture").c_str());
    client.subscribe((base + "config").c_str());
  }
  
  // Test MQTT connection
  if (client.connected()) {
    String testTopic = "farm/" + String(farm_id) + "/test";
    String testMessage = "{\"device_id\":\"" + String(device_id) + "\",\"status\":\"online\",\"timestamp\":" + String(millis()) + "}";
    bool testPublish = client.publish(testTopic.c_str(), testMessage.c_str());
    if (testPublish) {
      Serial.println("Test MQTT publish successful to topic: " + testTopic);
    } else {
      Serial.println("Test MQTT publish failed");
    }
  }
  
  lastStatusPublish = millis();
}

void loop() {
  ensureWiFi();
  ensureMQTT();
  client.loop();
  
  // Check all sections for auto mode irrigation (1-based)
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    if (mode[i] == "auto" && valveOn[i] && latestMoisture[i] >= threshold[i]) {
      stopIrrigation(i);
    }
    
    // Check irrigation duration timers (non-blocking)
    if (valveOn[i] && irrigationDuration[i] > 0) {
      unsigned long elapsed = millis() - irrigationStart[i];
      if (elapsed >= irrigationDuration[i]) {
        Serial.print("Irrigation duration completed for section "); Serial.println(i);
        stopIrrigation(i);
        ackCommand(i, "irrigate", "success", "Irrigation completed");
        irrigationDuration[i] = 0; // Reset duration
        
        // Handle deep sleep if enabled
        if (enableDeepSleepManual) {
          Serial.println("Entering deep sleep after manual irrigation...");
          WiFi.disconnect(true);
          Serial.flush();
          esp_sleep_enable_timer_wakeup(deepSleepDuration * uS_TO_S_FACTOR);
          esp_deep_sleep_start();
        }
      }
    }
  }
  
  // Publish status more frequently - REMOVED DELAY for faster updates
  if (millis() - lastStatusPublish > statusInterval) {
    publishStatus();
    lastStatusPublish = millis();
  }
  
  // Small delay to prevent watchdog issues but much faster than before
  delay(100); // Reduced from longer delays
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, payload, length);
  if (error) {
    lastError = "JSON parse error";
    Serial.println("JSON parse error in MQTT callback");
    return;
  }

  String topicStr = String(topic);
  int section_id = extractSectionId(topicStr);
  if (section_id < 1 || section_id > NUM_SECTIONS) {
    lastError = "Invalid section_id";
    Serial.println("Invalid section_id in topic: " + topicStr);
    return;
  }

  if (topicStr.endsWith("/command")) {
    if (doc["action"] == "irrigate" && mode[section_id] == "manual") {
      int duration = doc["duration"];
      startIrrigation(section_id);
      irrigationDuration[section_id] = duration * 1000; // Convert to milliseconds
      ackCommand(section_id, "irrigate", "success", "Irrigation started");
      // No delay() - timer will be checked in loop()
    } else if (doc["action"] == "stop" && mode[section_id] == "manual") {
      // Handle explicit stop command
      if (valveOn[section_id]) {
        stopIrrigation(section_id);
        ackCommand(section_id, "stop", "success", "Irrigation stopped");
      } else {
        ackCommand(section_id, "stop", "success", "Irrigation already stopped");
      }
    } else {
      ackCommand(section_id, "irrigate", "fail", "Not in manual mode or missing action");
    }
  } else if (topicStr.endsWith("/mode")) {
    if (doc["mode"] == "auto" || doc["mode"] == "manual") {
      mode[section_id] = String((const char*)doc["mode"]);
      Serial.print("Section "); Serial.print(section_id); Serial.print(" mode set to "); Serial.println(mode[section_id]);
      if (mode[section_id] == "manual" && valveOn[section_id]) {
        stopIrrigation(section_id);
      }
      ackCommand(section_id, "mode", "success", mode[section_id].c_str());
      
      // IMMEDIATE status update for mode changes
      publishStatus();
    } else {
      ackCommand(section_id, "mode", "fail", "Invalid mode");
    }
  } else if (topicStr.endsWith("/moisture")) {
    // Receive moisture data from moisture sensor ESP32
    int value = doc["value"];
    latestMoisture[section_id] = value;
    Serial.print("Received moisture for section "); Serial.print(section_id); Serial.print(": "); Serial.println(value);
    if (mode[section_id] == "auto") {
      if (value < threshold[section_id] && !valveOn[section_id]) {
        startIrrigation(section_id);
        ackCommand(section_id, "auto_irrigate", "success", "Irrigation started");
        // Status already published in startIrrigation()
      } else if (value >= threshold[section_id] && valveOn[section_id]) {
        stopIrrigation(section_id);
        ackCommand(section_id, "auto_irrigate", "success", "Irrigation stopped");
        // Status already published in stopIrrigation()
      }
    }
  } else if (topicStr.endsWith("/config")) {
    if (doc.containsKey("enable_deep_sleep")) {
      enableDeepSleepManual = doc["enable_deep_sleep"];
      saveConfigBool("deepSleep", enableDeepSleepManual);
      Serial.print("Deep sleep enabled: "); Serial.println(enableDeepSleepManual);
      ackCommand(section_id, "config", "success", "enable_deep_sleep updated");
    }
    if (doc.containsKey("deep_sleep_duration")) {
      deepSleepDuration = doc["deep_sleep_duration"];
      saveConfig("sleepDur", deepSleepDuration);
      Serial.print("Deep sleep duration: "); Serial.println(deepSleepDuration);
      ackCommand(section_id, "config", "success", "deep_sleep_duration updated");
    }
    if (doc.containsKey("threshold")) {
      int sectionThresh = doc["threshold"];
      threshold[section_id] = sectionThresh;
      saveConfig(("thresh" + String(section_id)).c_str(), sectionThresh);
      Serial.print("Section "); Serial.print(section_id); Serial.print(" threshold set to "); Serial.println(sectionThresh);
      ackCommand(section_id, "config", "success", "threshold updated");
    }
  }
}

void startIrrigation(int section) {
  if (section < 1 || section > NUM_SECTIONS) return;
  pulseCounts[section] = 0;
  attachInterrupt(digitalPinToInterrupt(flowPins[section]), pulseISRs[section], FALLING);
  digitalWrite(relayPins[section], LOW);
  valveOn[section] = true;
  irrigationStart[section] = millis();
  irrigationDuration[section] = 0; // Reset duration for new irrigation
  Serial.print("Irrigation started for section "); Serial.println(section);
  
  // IMMEDIATE status update for critical events
  publishStatus();
}

void stopIrrigation(int section) {
  if (section < 1 || section > NUM_SECTIONS) return;
  digitalWrite(relayPins[section], HIGH);
  detachInterrupt(digitalPinToInterrupt(flowPins[section]));
  valveOn[section] = false;
  unsigned long endTime = millis();
  irrigationDuration[section] = endTime - irrigationStart[section]; // Calculate duration
  Serial.print("Irrigation stopped for section "); Serial.println(section);
  publishWaterUsage(section, irrigationStart[section], endTime);
  
  // IMMEDIATE status update for critical events
  publishStatus();
}

void publishWaterUsage(int section, unsigned long start, unsigned long end) {
  if (section < 1 || section > NUM_SECTIONS) return;
  float water_ml = pulseCounts[section] * VOLUME_PER_PULSE;
  StaticJsonDocument<256> doc;
  doc["farm_id"] = farm_id;
  doc["section_id"] = section;
  doc["water_ml"] = water_ml;
  doc["start_time"] = start;
  doc["end_time"] = end;
  doc["timestamp"] = millis(); // Redundant timestamp
  char buffer[256];
  serializeJson(doc, buffer);
  String topic = "farm/" + String(farm_id) + "/section/" + String(section) + "/irrigation";
  client.publish(topic.c_str(), buffer);
  Serial.println("Water usage published: " + String(buffer));
}

// Extract section_id from topic string
int extractSectionId(String topic) {
  int sectionIndex = topic.indexOf("/section/");
  if (sectionIndex == -1) return -1;
  int start = sectionIndex + 9; // length of "/section/"
  int end = topic.indexOf('/', start);
  if (end == -1) end = topic.length();
  String sectionStr = topic.substring(start, end);
  int sid = sectionStr.toInt();
  if (sid < 1 || sid > NUM_SECTIONS) return -1;
  return sid;
}