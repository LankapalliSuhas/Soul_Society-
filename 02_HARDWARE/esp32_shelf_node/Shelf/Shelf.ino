#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "HX711.h"
#include <time.h>

// =====================================================
// WIFI
// =====================================================

const char* WIFI_SSID = "Mahesh's hotspot";
const char* WIFI_PASSWORD = "Mahesh999";

// =====================================================
// MQTT
// =====================================================

const char* MQTT_SERVER = "10.249.223.24";
const int MQTT_PORT = 1883;

const char* MQTT_TOPIC = "netra/events/weight";

// =====================================================
// SHELF CONFIGURATION
// =====================================================

const char* DEVICE_ID = "esp32_sensor_node";
const char* ZONE = "shelf_A";
const char* SKU = "SKU_001";

// =====================================================
// HX711
// =====================================================

#define DT 4
#define SCK 5

HX711 scale;

// Your calibrated factor
const float CALIBRATION_FACTOR = -219.6;

// =====================================================
// NETRA INVENTORY SETTINGS
// =====================================================

const float WEIGHT_TOLERANCE = 80.0;
const int MIN_STABLE_READINGS = 5;

// =====================================================
// NETWORK
// =====================================================

WiFiClient espClient;
PubSubClient mqtt(espClient);

// =====================================================
// VARIABLES
// =====================================================

float previousWeight = 0.0;
float lastReading = 0.0;

int stableReadings = 0;

unsigned long eventCounter = 0;
unsigned long lastMQTTAttempt = 0;

const unsigned long MQTT_RETRY_INTERVAL = 5000;

// =====================================================
// WIFI CONNECTION
// =====================================================

void connectWiFi() {

  if (WiFi.status() == WL_CONNECTED)
    return;

  Serial.print("Connecting to Wi-Fi");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Wi-Fi connected!");

  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

// =====================================================
// MQTT CONNECTION
// =====================================================

void tryMQTT() {

  if (WiFi.status() != WL_CONNECTED)
    return;

  if (mqtt.connected())
    return;

  if (millis() - lastMQTTAttempt < MQTT_RETRY_INTERVAL)
    return;

  lastMQTTAttempt = millis();

  Serial.print("Connecting to MQTT... ");

  String clientID = "NETRA_SHELF_";
  clientID += String((uint32_t)ESP.getEfuseMac(), HEX);

  if (mqtt.connect(clientID.c_str())) {

    Serial.println("CONNECTED!");

  } else {

    Serial.print("FAILED, state = ");
    Serial.println(mqtt.state());

    Serial.println("Sensor continues working.");
  }
}

// =====================================================
// TIMESTAMP
// =====================================================

String getTimestamp() {

  struct tm timeinfo;

  if (!getLocalTime(&timeinfo)) {

    return "1970-01-01T00:00:00Z";
  }

  char buffer[30];

  strftime(
    buffer,
    sizeof(buffer),
    "%Y-%m-%dT%H:%M:%SZ",
    &timeinfo
  );

  return String(buffer);
}

// =====================================================
// CREATE + PUBLISH WEIGHT EVENT
// =====================================================

void publishWeightEvent(float currentWeight, float oldWeight) {

  float delta = currentWeight - oldWeight;

  // ===================================================
  // CREATE JSON
  // ===================================================

  JsonDocument doc;

  doc["schema_version"] = 1;

  String eventID = "evt_weight_";
  eventID += String(++eventCounter);

  doc["event_id"] = eventID;
  doc["timestamp"] = getTimestamp();

  doc["device_id"] = DEVICE_ID;
  doc["event_type"] = "WEIGHT_CHANGE";
  doc["zone"] = ZONE;

  // Magnitude of weight change
  doc["value"] = round(abs(delta));

  doc["unit"] = "grams";

  // ===================================================
  // PAYLOAD
  // ===================================================

  JsonObject payload =
    doc["payload"].to<JsonObject>();

  payload["sku"] = SKU;

  payload["previous_weight"] =
    round(oldWeight);

  payload["delta"] =
    round(delta);

  payload["stable"] = true;

  // ===================================================
  // JSON → STRING
  // ===================================================

  char jsonBuffer[1024];

  size_t jsonLength =
    serializeJson(
      doc,
      jsonBuffer,
      sizeof(jsonBuffer)
    );

  // ===================================================
  // PRINT EVENT JSON
  // ===================================================

  Serial.println();
  Serial.println("========================================");
  Serial.println("        WEIGHT CHANGE EVENT");
  Serial.println("========================================");

  Serial.println("EVENT JSON:");
  Serial.println(jsonBuffer);

  Serial.print("JSON length: ");
  Serial.println(jsonLength);

  Serial.println("========================================");

  // ===================================================
  // MQTT STATUS
  // ===================================================

  Serial.print("MQTT connected: ");

  if (mqtt.connected()) {
    Serial.println("YES");
  } else {
    Serial.println("NO");
  }

  Serial.print("MQTT topic: ");
  Serial.println(MQTT_TOPIC);

  // ===================================================
  // MQTT PUBLISH
  // ===================================================

  if (mqtt.connected()) {

    Serial.println("Publishing event...");

    // Explicit payload length
    bool result =
      mqtt.publish(
        MQTT_TOPIC,
        (uint8_t*)jsonBuffer,
        jsonLength
      );

    if (result) {

      Serial.println();
      Serial.println(
        "MQTT -> PUBLISHED SUCCESSFULLY"
      );

    } else {

      Serial.println();
      Serial.println(
        "MQTT -> PUBLISH FAILED"
      );

      Serial.print("MQTT state = ");
      Serial.println(mqtt.state());

      Serial.print(
        "MQTT connected after failure = "
      );

      if (mqtt.connected()) {
        Serial.println("YES");
      } else {
        Serial.println("NO");
      }
    }

  } else {

    Serial.println();
    Serial.println("MQTT -> OFFLINE");

    Serial.println(
      "Event was generated but not published."
    );
  }

  Serial.println("========================================");
}

// =====================================================
// SETUP
// =====================================================

void setup() {

  Serial.begin(115200);

  delay(1000);

  Serial.println();
  Serial.println("================================");
  Serial.println("       NETRA SHELF NODE");
  Serial.println("================================");

  // ===================================================
  // HX711
  // ===================================================

  Serial.println("Initializing HX711...");

  scale.begin(DT, SCK);

  scale.set_scale(
    CALIBRATION_FACTOR
  );

  // ===================================================
  // TARE
  // ===================================================

  Serial.println();
  Serial.println(
    "Remove ALL weight from shelf."
  );

  Serial.println(
    "Taring in 3 seconds..."
  );

  delay(3000);

  scale.tare(20);

  Serial.print("Tare offset: ");
  Serial.println(scale.get_offset());

  Serial.println("TARE COMPLETE");

  // ===================================================
  // INITIAL WEIGHT
  // ===================================================

  previousWeight =
    scale.get_units(10);

  lastReading =
    previousWeight;

  Serial.print("Initial weight: ");
  Serial.print(previousWeight, 1);
  Serial.println(" g");

  // ===================================================
  // WIFI
  // ===================================================

  connectWiFi();

  // ===================================================
  // NTP TIME
  // ===================================================

  configTime(
    0,
    0,
    "pool.ntp.org",
    "time.nist.gov"
  );

  // ===================================================
  // MQTT
  // ===================================================

  mqtt.setServer(
    MQTT_SERVER,
    MQTT_PORT
  );

  tryMQTT();

  Serial.println();
  Serial.println("================================");
  Serial.println("       SHELF NODE READY");
  Serial.println("================================");
}

// =====================================================
// LOOP
// =====================================================

void loop() {

  // ===================================================
  // WIFI
  // ===================================================

  if (WiFi.status() != WL_CONNECTED) {

    connectWiFi();
  }

  // ===================================================
  // MQTT
  // ===================================================

  tryMQTT();

  if (mqtt.connected()) {

    mqtt.loop();
  }

  // ===================================================
  // HX711 CHECK
  // ===================================================

  if (!scale.is_ready()) {

    Serial.println("HX711 not ready");

    delay(500);

    return;
  }

  // ===================================================
  // READ WEIGHT
  // ===================================================

  float currentWeight =
    scale.get_units(5);

  Serial.print("Weight: ");
  Serial.print(currentWeight, 1);
  Serial.println(" g");

  // ===================================================
  // STABILITY CHECK
  // ===================================================

  if (
    abs(currentWeight - lastReading)
    < WEIGHT_TOLERANCE
  ) {

    stableReadings++;

  } else {

    stableReadings = 0;
  }

  lastReading =
    currentWeight;

  // ===================================================
  // FIVE STABLE READINGS
  // ===================================================

  if (
    stableReadings >=
    MIN_STABLE_READINGS
  ) {

    float delta =
      currentWeight - previousWeight;

    // =================================================
    // MEANINGFUL WEIGHT CHANGE
    // =================================================

    if (
      abs(delta) >=
      WEIGHT_TOLERANCE
    ) {

      Serial.println();
      Serial.println(
        ">>> WEIGHT CHANGE DETECTED <<<"
      );

      publishWeightEvent(
        currentWeight,
        previousWeight
      );

      // New stable baseline
      previousWeight =
        currentWeight;

      stableReadings = 0;
    }
  }

  delay(500);
}