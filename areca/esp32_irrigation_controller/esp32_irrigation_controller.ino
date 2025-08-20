#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <esp_sleep.h>
#include <WiFiManager.h>
#include <WiFiClientSecure.h>

#define RELAY_PINS {26, 25, 33, 32}
#define FLOW_PINS {27, 14, 12, 13}
#define NUM_SECTIONS 4
#define ML_PER_PULSE 2.25 // ml per pulse for YF-S201 flow sensor
#define MAX_SECTIONS 5 // index 0 unused

// WiFi and MQTT Configuration
const char* mqtt_server = "mqtt.judesonleo.app";
const int mqtt_port = 8883; // MQTTS port
const char* mqtt_username = "intellirack";
const char* mqtt_password = "intellirack@123";

// MQTTS Configuration
const char* mqtt_ca_cert =
"-----BEGIN CERTIFICATE-----\n" \
"MIIDvDCCAqSgAwIBAgIUBi18zLjZumqI6PCT3zewTeMST6wwDQYJKoZIhvcNAQEL\n" \
"BQAwbzELMAkGA1UEBhMCSU4xCzAJBgNVBAgMAlROMRAwDgYDVQQHDAdDaGVubmFp\n" \
"MRQwEgYDVQQKDAtJbnRlbGxpUmFjazENMAsGA1UECwwETVFUVDEcMBoGA1UEAwwT\n" \
"bXF0dC5qdWRlc29ubGVvLmFwcDAeFw0yNTA3MjIwODU1NTJaFw0yODA1MTEwODU1\n" \
"NTJaMG8xCzAJBgNVBAYTAklOMQswCQYDVQQIDAJUTjEQMA4GA1UEBwwHQ2hlbm5h\n" \
"aTEUMBIGA1UECgwLSW50ZWxsaVJhY2sxDTALBgNVBAsMBE1RVFQxHDAaBgNVBAMM\n" \
"E21xdHQuanVkZXNvbmxlby5hcHAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\n" \
"AoIBAQCtKj8OH0B5hYSnZvk2LSwDTfO3aui4ON7Wc3O6r7QJn6PLw8Eznbalo0Cl\n" \
"yIEvzo8PVK7wQ/mSJpy8x9eN1qGsFtpBMGMJnCAK6azYJ20HOxqM8rhHSqJEXp+c\n" \
"znTEJZCnyulnHwrxzbnow9gjUWgDcDD6qx32JHd0fadxZ12O515rKtTLloQS0/Nw\n" \
"DtKRm2C9JXxKu2gjVudI+DQwtGM7xArgSWvfTQevHJOmyiPQUH0YdE9F6g2ji1vh\n" \
"L/CUXsb+E0m0Ib7s9b0CT5VfWrLyvqYCHZ5vYSuD/E9KJyWY9Zyaf0G8nic2VU3M\n" \
"Jhs7NcZKa68CwAmdvkwHRk8Kx+15AgMBAAGjUDBOMB0GA1UdDgQWBBQCg+aLOG9z\n" \
"QNal538J3R7miKM1cTAfBgNVHSMEGDAWgBQCg+aLOG9zQNal538J3R7miKM1cTAM\n" \
"BgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQBT2I9BiOFgbPZ+QzEOgedt\n" \
"zc/qFkYyO0vo1x1zQRHwbECKRoD4Vn5X6NBkHVUJSFuhbnApImoortdz0wyRQGSA\n" \
"mgDpHZPNMSq04N4z/hUlk3VPDb7m6BmtpRZAZsDqlPFeHKGZ0SU/TC7nBtjIua4g\n" \
"FI/EEaOJdj2TXqKtnfMjDmJiyOGlaGdlviJIMr+hU0V6STSiBRHIZrDJ5nEPH4dq\n" \
"JQQOLHp1Ua77nKK7x0DfAXsXZdFK85kg+Pu+EtIUoMBlRia5+L2yM0vW1dltMHNO\n" \
"YmWc+YVtPJ9wIDp0VZA1n4E/PqxQH36d3F8g0vHt7kZMNFa5Iy79MJO5ocKqO5jl\n" \
"-----END CERTIFICATE-----\n";


const int farm_id = 1;
const char* device_id = "irrigation_controller_1";

#define uS_TO_S_FACTOR 1000000

WiFiClientSecure espClient;
PubSubClient client(espClient);
Preferences prefs;
WiFiManager wifiManager;

// Update relay and flow pin arrays (index 0 unused)
int relayPins[MAX_SECTIONS] = {0, 26, 25, 33, 32}; // 1-based: 1=26, 2=25, 3=33, 4=32
int flowPins[MAX_SECTIONS]  = {0, 27, 14, 12, 13}; // 1-based: 1=27, 2=14, 3=12, 4=13
volatile int pulseCounts[MAX_SECTIONS] = {0, 0, 0, 0, 0};

// Per-section state (index 0 unused)
String mode[MAX_SECTIONS] = {"", "manual", "manual", "manual", "manual"};
bool valveOn[MAX_SECTIONS] = {false, false, false, false, false};
int latestMoisture[MAX_SECTIONS] = {0, 100, 100, 100, 100}; // Received from moisture sensor ESP32 via MQTT
int minThreshold[MAX_SECTIONS] = {0, 30, 30, 30, 30}; // Start irrigation when moisture drops below this
int maxThreshold[MAX_SECTIONS] = {0, 70, 70, 70, 70}; // Stop irrigation when moisture reaches this
unsigned long irrigationStart[MAX_SECTIONS] = {0, 0, 0, 0, 0};
unsigned long irrigationDuration[MAX_SECTIONS] = {0, 0, 0, 0, 0}; // Duration in milliseconds

// Global config
bool enableDeepSleepManual = false;
int deepSleepDuration = 60; // seconds
int reportingInterval = 10; // seconds - for status updates

// Health/status
String lastError = "";
unsigned long lastStatusPublish = 0;

// Update ISRs (index 0 unused)
void IRAM_ATTR pulse1() { pulseCounts[1]++; }
void IRAM_ATTR pulse2() { pulseCounts[2]++; }
void IRAM_ATTR pulse3() { pulseCounts[3]++; }
void IRAM_ATTR pulse4() { pulseCounts[4]++; }
typedef void (*isr_ptr_t)();
isr_ptr_t pulseISRs[MAX_SECTIONS] = {nullptr, pulse1, pulse2, pulse3, pulse4};

void loadConfig() {
  Serial.println("📋 Loading configuration...");
  prefs.begin("irrigation", false);
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    minThreshold[i] = prefs.getInt(("minThresh" + String(i)).c_str(), 30);
    maxThreshold[i] = prefs.getInt(("maxThresh" + String(i)).c_str(), 70);
    Serial.print("Section "); Serial.print(i); Serial.print(" - Loaded min: "); Serial.print(minThreshold[i]); Serial.print(", max: "); Serial.println(maxThreshold[i]);
  }
  enableDeepSleepManual = prefs.getBool("deepSleep", false);
  deepSleepDuration = prefs.getInt("sleepDur", 300);
  reportingInterval = prefs.getInt("reportInt", 10);
  Serial.print("Reporting interval: "); Serial.println(reportingInterval);
  prefs.end();
  Serial.println("✅ Configuration loaded");
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

void setupWiFi() {
  Serial.println("Setting up WiFi...");
  
  // Set custom AP name
  wifiManager.setAPCallback([](WiFiManager *myWiFiManager) {
    Serial.println("Entered config mode");
    Serial.println(WiFi.softAPIP());
    Serial.println(myWiFiManager->getConfigPortalSSID());
  });
  
  // Set custom menu items
  // wifiManager.setMenuItems({"wifi", "info", "param", "sep", "restart"});
  
  // Set custom hostname
  wifiManager.setHostname("IrrigationController");
  
  // Set custom AP timeout
  wifiManager.setConfigPortalTimeout(180); // 3 minutes
  
  // Set custom AP name
  wifiManager.setAPStaticIPConfig(IPAddress(192,168,4,1), IPAddress(192,168,4,1), IPAddress(255,255,255,0));
  
  // Start WiFiManager
  if (!wifiManager.autoConnect("IrrigationController_AP", "")) {
    Serial.println("Failed to connect and hit timeout");
    delay(3000);
    ESP.restart();
  }
  
  Serial.println("WiFi connected successfully");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void setupMQTTS() {
  Serial.println("Setting up MQTTS...");
  
  // Set CA certificate for MQTTS
  espClient.setCACert(mqtt_ca_cert);
  
  // Set MQTT server and increase buffer size
  client.setServer(mqtt_server, mqtt_port);
  client.setBufferSize(1024); // Increase buffer size for larger JSON messages
  client.setCallback(mqttCallback);
  
  // Connect to MQTT broker with timeout
  int connectionAttempts = 0;
  const int maxAttempts = 10;
  
  while (!client.connected() && connectionAttempts < maxAttempts) {
    Serial.print("Connecting to MQTT broker (attempt "); Serial.print(connectionAttempts + 1); Serial.print("/"); Serial.print(maxAttempts); Serial.println(")...");
    
    if (client.connect(device_id, mqtt_username, mqtt_password)) {
      Serial.println("✅ MQTT connected successfully");
      
      // Subscribe to topics for all sections (1-based)
      for (int i = 1; i <= NUM_SECTIONS; i++) {
        String base = "farm/" + String(farm_id) + "/section/" + String(i) + "/";
        client.subscribe((base + "command").c_str());
        client.subscribe((base + "mode").c_str());
        client.subscribe((base + "moisture").c_str());
        client.subscribe((base + "config").c_str());
        Serial.print("Subscribed to section "); Serial.print(i); Serial.println(" topics");
      }
      
      // Send initial status to confirm connection
      publishStatus();
      
    } else {
      Serial.print("❌ MQTT connection failed, rc=");
      Serial.print(client.state());
      Serial.print(" (");
      switch (client.state()) {
        case -4: Serial.print("MQTT_CONNECTION_TIMEOUT"); break;
        case -3: Serial.print("MQTT_CONNECTION_LOST"); break;
        case -2: Serial.print("MQTT_CONNECT_FAILED"); break;
        case -1: Serial.print("MQTT_DISCONNECTED"); break;
        case 1: Serial.print("MQTT_CONNECT_BAD_PROTOCOL"); break;
        case 2: Serial.print("MQTT_CONNECT_BAD_CLIENT_ID"); break;
        case 3: Serial.print("MQTT_CONNECT_UNAVAILABLE"); break;
        case 4: Serial.print("MQTT_CONNECT_BAD_CREDENTIALS"); break;
        case 5: Serial.print("MQTT_CONNECT_UNAUTHORIZED"); break;
        default: Serial.print("UNKNOWN_ERROR"); break;
      }
      Serial.print(") retrying in 5 seconds...");
      Serial.println();
      delay(5000);
    }
    connectionAttempts++;
  }
  
  if (!client.connected()) {
    Serial.println("❌ Failed to connect to MQTT broker after maximum attempts");
  }
}

void ensureWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected, reconnecting...");
    WiFi.reconnect();
    unsigned long startAttempt = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 10000) {
      delay(500);
    }
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi reconnected");
    } else {
      Serial.println("WiFi reconnection failed, restarting...");
      ESP.restart();
    }
  }
}

void ensureMQTT() {
  if (!client.connected()) {
    Serial.println("🔄 MQTT disconnected, reconnecting...");
    int reconnectAttempts = 0;
    const int maxReconnectAttempts = 5;
    
    while (!client.connected() && reconnectAttempts < maxReconnectAttempts) {
      Serial.print("MQTT reconnection attempt "); Serial.print(reconnectAttempts + 1); Serial.print("/"); Serial.print(maxReconnectAttempts); Serial.println("...");
      
      if (client.connect(device_id, mqtt_username, mqtt_password)) {
        Serial.println("✅ MQTT reconnected successfully");
        
        // Re-subscribe to topics for all sections (1-based)
        for (int i = 1; i <= NUM_SECTIONS; i++) {
          String base = "farm/" + String(farm_id) + "/section/" + String(i) + "/";
          client.subscribe((base + "command").c_str());
          client.subscribe((base + "mode").c_str());
          client.subscribe((base + "moisture").c_str());
          client.subscribe((base + "config").c_str());
          Serial.print("Re-subscribed to section "); Serial.print(i); Serial.println(" topics");
        }
        
        // Send immediate status update after reconnection
        publishStatus();
        return;
        
      } else {
        Serial.print("❌ MQTT reconnection failed, rc=");
        Serial.print(client.state());
        Serial.println(" retrying in 5 seconds...");
        delay(5000);
      }
      reconnectAttempts++;
    }
    
    if (!client.connected()) {
      Serial.println("❌ Failed to reconnect to MQTT broker after maximum attempts");
      lastError = "MQTT reconnection failed";
    }
  }
}

void publishStatus() {
  // Check if MQTT client is connected before attempting to publish
  if (!client.connected()) {
    Serial.println("❌ Cannot publish status - MQTT not connected");
    lastError = "MQTT not connected";
    return;
  }
  
  // Publish individual device status for each section
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    // Use larger JSON document to ensure we have enough space
    StaticJsonDocument<512> doc;
    
    doc["device_id"] = device_id;
    doc["farm_id"] = farm_id;
    doc["section_number"] = i;
    doc["timestamp"] = millis();
    doc["uptime"] = millis();
    doc["wifi"] = WiFi.status() == WL_CONNECTED ? 1 : 0;
    doc["mqtt"] = client.connected() ? 1 : 0;
    doc["last_error"] = lastError;
    doc["valve_on"] = valveOn[i] ? 1 : 0;
    doc["mode"] = mode[i];
    doc["latest_moisture"] = latestMoisture[i];
    doc["min_threshold"] = minThreshold[i];
    doc["max_threshold"] = maxThreshold[i];
    doc["pulse_count"] = pulseCounts[i];
    doc["water_ml"] = pulseCounts[i] * ML_PER_PULSE;
    doc["reporting_interval"] = reportingInterval;
    
    char topicBuffer[64];
    snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/status", farm_id, i);
    
    // Serialize to string
    String jsonString;
    serializeJson(doc, jsonString);
    
    // Debug: Print JSON length and content
    Serial.print("JSON length: "); Serial.print(jsonString.length()); Serial.print(" bytes, Topic: "); Serial.println(topicBuffer);
    Serial.print("JSON content: "); Serial.println(jsonString);
    
    // Check MQTT client state before publishing
    Serial.print("MQTT client state: "); Serial.println(client.state());
    
    bool publishResult = client.publish(topicBuffer, jsonString.c_str());
    
    if (publishResult) {
      Serial.print("✅ Status published for section "); Serial.print(i); Serial.print(" (interval: "); Serial.print(reportingInterval); Serial.print("s): "); Serial.println(jsonString);
    } else {
      Serial.print("❌ Failed to publish status for section "); Serial.print(i); Serial.print(" - MQTT state: "); Serial.println(client.state());
      lastError = "MQTT publish failed";
    }
    
    // Small delay between publishes to avoid overwhelming the broker
    delay(100);
  }
}

void ackCommand(int section, const char* command, const char* result, const char* details) {
  if (section < 1 || section > NUM_SECTIONS) return;
  
  // Use ArduinoJson with proper memory management
  StaticJsonDocument<256> doc;
  
  doc["device_id"] = device_id;
  doc["section_id"] = section;
  doc["command"] = command;
  doc["result"] = result;
  doc["details"] = details;
  doc["timestamp"] = millis();
  
  char topicBuffer[64];
  snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/ack", farm_id, section);
  
  // Serialize to string
  String jsonString;
  serializeJson(doc, jsonString);
  
  bool publishResult = client.publish(topicBuffer, jsonString.c_str());
  
  if (publishResult) {
    Serial.print("✅ ACK published: "); Serial.println(jsonString);
  } else {
    Serial.print("❌ Failed to publish ACK for section "); Serial.println(section);
    lastError = "ACK publish failed";
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("Starting Irrigation Controller...");
  
  // Load configuration
  loadConfig();
  
  // Setup WiFi using WiFiManager
  setupWiFi();
  
  // Setup MQTTS
  setupMQTTS();

  // Initialize pins and subscribe to topics for all sections (1-based)
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    pinMode(relayPins[i], OUTPUT);
    digitalWrite(relayPins[i], HIGH);
    pinMode(flowPins[i], INPUT_PULLUP);
  }
  
  // Test MQTT connection
  if (client.connected()) {
    Serial.println("🧪 Testing MQTT connection...");
    String testTopic = "farm/" + String(farm_id) + "/test";
    String testMessage = "{\"device_id\":\"" + String(device_id) + "\",\"status\":\"online\",\"timestamp\":" + String(millis()) + "}";
    bool testPublish = client.publish(testTopic.c_str(), testMessage.c_str());
    if (testPublish) {
      Serial.println("✅ Test MQTT publish successful to topic: " + testTopic);
      Serial.println("📤 Test message: " + testMessage);
    } else {
      Serial.println("❌ Test MQTT publish failed");
      Serial.print("MQTT client state: "); Serial.println(client.state());
    }
  } else {
    Serial.println("❌ Cannot test MQTT - not connected");
  }
  
  lastStatusPublish = millis();
  Serial.println("Irrigation Controller setup complete!");
}

void loop() {
  // Ensure WiFi and MQTT connections
  ensureWiFi();
  ensureMQTT();
  client.loop();
  
  // Check all sections for auto mode irrigation (1-based)
  for (int i = 1; i <= NUM_SECTIONS; i++) {
    if (mode[i] == "auto" && valveOn[i] && latestMoisture[i] >= maxThreshold[i]) {
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
  
  // Publish status based on configurable reporting interval
  if (millis() - lastStatusPublish > (reportingInterval * 1000)) {
    Serial.println("🔄 Time to publish status...");
    
    // Check MQTT connection before attempting to publish
    if (!client.connected()) {
      Serial.println("❌ MQTT not connected, attempting to reconnect...");
      ensureMQTT();
    }
    
    // First test with a simple message
    String testTopic = "farm/" + String(farm_id) + "/test";
    String testMessage = "{\"test\":\"status\",\"timestamp\":" + String(millis()) + "}";
    bool testResult = client.publish(testTopic.c_str(), testMessage.c_str());
    Serial.print("Test publish result: "); Serial.println(testResult ? "SUCCESS" : "FAILED");
    
    if (testResult) {
      // Only publish full status if test message succeeded
      publishStatus();
    } else {
      Serial.println("❌ Test publish failed, skipping status publish");
    }
    
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
      // Start irrigation when moisture drops below min threshold
      if (value < minThreshold[section_id] && !valveOn[section_id]) {
        startIrrigation(section_id);
        ackCommand(section_id, "auto_irrigate", "success", "Irrigation started - moisture below min threshold");
        // Status already published in startIrrigation()
      } 
      // Stop irrigation when moisture reaches max threshold
      else if (value >= maxThreshold[section_id] && valveOn[section_id]) {
        stopIrrigation(section_id);
        ackCommand(section_id, "auto_irrigate", "success", "Irrigation stopped - moisture reached max threshold");
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
    if (doc.containsKey("reporting_interval")) {
      reportingInterval = doc["reporting_interval"];
      saveConfig("reportInt", reportingInterval);
      Serial.print("Reporting interval: "); Serial.println(reportingInterval);
      ackCommand(section_id, "config", "success", "reporting_interval updated");
    }
		// Handle min threshold
		if (doc.containsKey("min_threshold")) {
			int sectionMinThresh = doc["min_threshold"];
			minThreshold[section_id] = sectionMinThresh;
			prefs.putInt(("minThresh" + String(section_id)).c_str(), sectionMinThresh);
			Serial.print("Section "); Serial.print(section_id); Serial.print(" min threshold set to "); Serial.println(sectionMinThresh);
			ackCommand(section_id, "config", "success", "min_threshold updated");
		}

		// Handle max threshold
		if (doc.containsKey("max_threshold")) {
			int sectionMaxThresh = doc["max_threshold"];
			maxThreshold[section_id] = sectionMaxThresh;
			prefs.putInt(("maxThresh" + String(section_id)).c_str(), sectionMaxThresh);
			Serial.print("Section "); Serial.print(section_id); Serial.print(" max threshold set to "); Serial.println(sectionMaxThresh);
			ackCommand(section_id, "config", "success", "max_threshold updated");
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
  float water_ml = pulseCounts[section] * ML_PER_PULSE;
  
  // Use ArduinoJson with proper memory management
  StaticJsonDocument<256> doc;
  
  doc["farm_id"] = farm_id;
  doc["section_id"] = section;
  doc["water_ml"] = water_ml;
  doc["start_time"] = start;
  doc["end_time"] = end;
  doc["timestamp"] = millis();
  
  char topicBuffer[64];
  snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/irrigation", farm_id, section);
  
  // Serialize to string
  String jsonString;
  serializeJson(doc, jsonString);
  
  bool publishResult = client.publish(topicBuffer, jsonString.c_str());
  
  if (publishResult) {
    Serial.print("✅ Water usage published: "); Serial.println(jsonString);
  } else {
    Serial.print("❌ Failed to publish water usage for section "); Serial.println(section);
    lastError = "Water usage publish failed";
  }
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

// Calculate flow rate in ml/min for a section
float calculateFlowRate(int section) {
  if (section < 1 || section > NUM_SECTIONS) return 0.0;
  
  // Simple flow rate calculation based on recent pulses
  // This is a basic implementation - can be enhanced with more sophisticated algorithms
  unsigned long currentTime = millis();
  unsigned long timeWindow = 60000; // 1 minute window
  
  // For now, return a basic flow rate based on valve state
  if (valveOn[section]) {
    return 1000.0; // Approximate flow rate in ml/min when valve is open
  }
  return 0.0;
}