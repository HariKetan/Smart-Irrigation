#include <WiFi.h>
#include <PubSubClient.h>
#include <Preferences.h>
#include <ArduinoJson.h>

#define SOIL_MOISTURE_PIN 35

const char* ssid = "Sumukha_4G";
const char* password = "puliyogare";
const char* mqtt_server = "192.168.29.247";
const int mqtt_port = 1883;
const char* mqtt_username = "arecanut";
const char* mqtt_password = "123456";

const int farm_id = 1;
const int section_id = 1;
const char* device_id = "moisture_sensor_1";

#define uS_TO_S_FACTOR 10000

WiFiClient espClient;
PubSubClient client(espClient);
Preferences prefs;

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
    // Re-subscribe to config topic
    String configTopic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/config";
    client.subscribe(configTopic.c_str());
  }
}

void publishStatus() {
  StaticJsonDocument<256> doc;
  doc["device_id"] = device_id;
  doc["uptime"] = millis();
  doc["wifi"] = (WiFi.status() == WL_CONNECTED);
  doc["mqtt"] = client.connected();
  doc["last_error"] = lastError;
  doc["enable_deep_sleep"] = enableDeepSleep;
  doc["deep_sleep_duration"] = deepSleepDuration;
  doc["reporting_interval"] = reportingInterval;
  doc["timestamp"] = millis();
  char buffer[256];
  serializeJson(doc, buffer);
  String topic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/status";
  client.publish(topic.c_str(), buffer);
  Serial.println("Status published: " + String(buffer));
}

void ackCommand(const char* command, const char* result, const char* details) {
  StaticJsonDocument<256> doc;
  doc["device_id"] = device_id;
  doc["command"] = command;
  doc["result"] = result;
  doc["details"] = details;
  doc["timestamp"] = millis();
  char buffer[256];
  serializeJson(doc, buffer);
  String topic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/ack";
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

  // Subscribe to config topic
  String configTopic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/config";
  client.subscribe(configTopic.c_str());
  lastStatusPublish = millis();
}

void loop() {
  ensureWiFi();
  ensureMQTT();
  client.loop();
  int soil_moisture = analogRead(SOIL_MOISTURE_PIN);
  int send_moisture = map(soil_moisture, 4095, 0, 0, 100);

  String topic = "farm/" + String(farm_id) + "/section/" + String(section_id) + "/moisture";
  String payload = "{\"farm_id\":" + String(farm_id) +
                   ",\"section_id\":" + String(section_id) +
                   ",\"value\":" + String(send_moisture) +
                   ",\"timestamp\":\"" + String(millis()) + "\"}";

  if (!client.publish(topic.c_str(), payload.c_str())) {
    lastError = "MQTT publish failed";
    Serial.println("Failed to publish moisture data");
  } else {
    lastError = "";
    Serial.println("Moisture data published: " + payload);
  }

  if (enableDeepSleep) {
    Serial.println("Going to deep sleep...");
    WiFi.disconnect(true);
    Serial.flush();
    esp_sleep_enable_timer_wakeup(deepSleepDuration * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
  } else {
    // Publish status more frequently - REMOVED DELAY for faster updates
    if (millis() - lastStatusPublish > statusInterval) {
      publishStatus();
      lastStatusPublish = millis();
    }
    
    // Reduced delay for faster response - minimum 1 second for stability
    int actualDelay = max(reportingInterval * 1000, 1000); // Minimum 1 second
    delay(actualDelay);
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