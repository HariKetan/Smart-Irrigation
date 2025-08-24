#include <WiFi.h>
#include <PubSubClient.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <WiFiManager.h>
#include <WiFiClientSecure.h>

#define SOIL_MOISTURE_PIN 35

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
const int section_id = 2;
const char* device_id = "moisture_sensor_2";

#define uS_TO_S_FACTOR 10000

WiFiClientSecure espClient;
PubSubClient client(espClient);
Preferences prefs;
WiFiManager wifiManager;

// Configurable parameters
bool enableDeepSleep = false;
int deepSleepDuration = 10; // seconds
int reportingInterval = 10; // seconds
String lastError = "";
unsigned long lastStatusPublish = 0;
const unsigned long statusInterval = 10000; // 10 seconds - REDUCED for faster updates

void loadConfig() {
  prefs.begin("moisture", false);
  enableDeepSleep = prefs.getBool("deepSleep", false);
  deepSleepDuration = prefs.getInt("sleepDur", 60);
  reportingInterval = prefs.getInt("reportInt", 60);
  prefs.end();
}

void saveConfig(const char* key, int value) {
  prefs.begin("moisture", false);
  prefs.putInt(key, value);
  prefs.end();
}
void saveConfigBool(const char* key, bool value) {
  prefs.begin("moisture", false);
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
  
  // Set custom hostname
  wifiManager.setHostname("MoistureSensor");
  
  // Set custom AP timeout
  wifiManager.setConfigPortalTimeout(180); // 3 minutes
  
  // Set custom AP name
  wifiManager.setAPStaticIPConfig(IPAddress(192,168,4,1), IPAddress(192,168,4,1), IPAddress(255,255,255,0));
  
  // Start WiFiManager
  if (!wifiManager.autoConnect("MoistureSensor_AP", "password123")) {
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
  
  // Set MQTT server
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);
  
  // Connect to MQTT broker
  while (!client.connected()) {
    Serial.println("Connecting to MQTT broker...");
    if (client.connect(device_id, mqtt_username, mqtt_password)) {
      Serial.println("MQTT connected successfully");
      
      // Subscribe to config topic
      String configTopic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/config";
      client.subscribe(configTopic.c_str());
    } else {
      Serial.print("MQTT connection failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds...");
      delay(5000);
    }
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
    Serial.println("MQTT disconnected, reconnecting...");
    while (!client.connect(device_id, mqtt_username, mqtt_password)) {
      Serial.print("MQTT reconnection failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds...");
      delay(5000);
    }
    Serial.println("MQTT reconnected");
    
    // Re-subscribe to config topic
    String configTopic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/config";
    client.subscribe(configTopic.c_str());
  }
}

void publishStatus() {
  // Use ArduinoJson with proper memory management
  StaticJsonDocument<512> doc;
  
  doc["device_id"] = device_id;
  doc["farm_id"] = farm_id;
  doc["section_number"] = section_id;
  doc["timestamp"] = millis();
  doc["uptime"] = millis();
  doc["wifi"] = WiFi.status() == WL_CONNECTED ? 1 : 0;
  doc["mqtt"] = client.connected() ? 1 : 0;
  doc["last_error"] = lastError;
  doc["enable_deep_sleep"] = enableDeepSleep ? 1 : 0;
  doc["reporting_interval"] = reportingInterval;
  doc["deep_sleep_duration"] = deepSleepDuration;
  
  char topicBuffer[64];
  snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/status", farm_id, section_id);
  
  // Serialize to string
  String jsonString;
  serializeJson(doc, jsonString);
  
  bool publishResult = client.publish(topicBuffer, jsonString.c_str());
  
  if (publishResult) {
    Serial.print("✅ Status published: "); Serial.println(jsonString);
  } else {
    Serial.print("❌ Failed to publish status"); Serial.println();
    lastError = "MQTT publish failed";
  }
}

void ackCommand(const char* command, const char* result, const char* details) {
  // Use ArduinoJson with proper memory management
  StaticJsonDocument<256> doc;
  
  doc["device_id"] = device_id;
  doc["command"] = command;
  doc["result"] = result;
  doc["details"] = details;
  doc["timestamp"] = millis();
  
  char topicBuffer[64];
  snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/ack", farm_id, section_id);
  
  // Serialize to string
  String jsonString;
  serializeJson(doc, jsonString);
  
  bool publishResult = client.publish(topicBuffer, jsonString.c_str());
  
  if (publishResult) {
    Serial.print("✅ ACK published: "); Serial.println(jsonString);
  } else {
    Serial.print("❌ Failed to publish ACK"); Serial.println();
    lastError = "ACK publish failed";
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("Starting Moisture Sensor...");
  
  // Load configuration
  loadConfig();
  
  // Setup WiFi using WiFiManager
  setupWiFi();
  
  // Setup MQTTS
  setupMQTTS();
  
  lastStatusPublish = millis();
  Serial.println("Moisture Sensor setup complete!");
}

// Global variables for timing control
unsigned long lastMoisturePublish = 0;

void loop() {
  ensureWiFi();
  ensureMQTT();
  client.loop();
  
  unsigned long currentTime = millis();
  
  // Publish moisture reading based on reporting interval
  if (currentTime - lastMoisturePublish >= (reportingInterval * 1000)) {
    int soil_moisture = analogRead(SOIL_MOISTURE_PIN);
    int send_moisture = map(soil_moisture, 4095, 0, 0, 100);

    // Use ArduinoJson with proper memory management
    StaticJsonDocument<256> doc;
    
    doc["farm_id"] = farm_id;
    doc["section_id"] = section_id;
    doc["value"] = send_moisture;
    doc["timestamp"] = currentTime;
    
    char topicBuffer[64];
    snprintf(topicBuffer, sizeof(topicBuffer), "farm/%d/section/%d/moisture", farm_id, section_id);
    
    // Serialize to string
    String payload;
    serializeJson(doc, payload);

    bool publishResult = client.publish(topicBuffer, payload.c_str());
    
    if (!publishResult) {
      lastError = "MQTT publish failed";
      Serial.println("❌ Failed to publish moisture data");
    } else {
      lastError = "";
      Serial.print("✅ Moisture data published (interval: "); Serial.print(reportingInterval); Serial.print("s): "); Serial.println(payload);
    }
    
    lastMoisturePublish = currentTime;
  }
  
  // Publish status based on status interval
  if (currentTime - lastStatusPublish >= statusInterval) {
    publishStatus();
    lastStatusPublish = currentTime;
  }

  if (enableDeepSleep) {
    Serial.println("Going to deep sleep...");
    WiFi.disconnect(true);
    Serial.flush();
    esp_sleep_enable_timer_wakeup(deepSleepDuration * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
  } else {
    // Small delay to prevent watchdog issues
    delay(100);
  }
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
  if (topicStr.endsWith("/config")) {
    if (doc.containsKey("enable_deep_sleep")) {
      enableDeepSleep = doc["enable_deep_sleep"];
      saveConfigBool("deepSleep", enableDeepSleep);
      Serial.print("Deep sleep enabled: "); Serial.println(enableDeepSleep);
      ackCommand("config", "success", "enable_deep_sleep updated");
    }
    if (doc.containsKey("deep_sleep_duration")) {
      deepSleepDuration = doc["deep_sleep_duration"];
      saveConfig("sleepDur", deepSleepDuration);
      Serial.print("Deep sleep duration: "); Serial.println(deepSleepDuration);
      ackCommand("config", "success", "deep_sleep_duration updated");
    }
    if (doc.containsKey("reporting_interval")) {
      reportingInterval = doc["reporting_interval"];
      saveConfig("reportInt", reportingInterval);
      Serial.print("Reporting interval: "); Serial.println(reportingInterval);
      ackCommand("config", "success", "reporting_interval updated");
    }
  }
} 