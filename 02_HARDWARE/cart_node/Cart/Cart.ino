#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <time.h>
#include "HX711.h"
#include <TFT_eSPI.h>

// =====================================================
// NETRA CART NODE
// Weight-based cart detection
// PIR REMOVED
// =====================================================

// ---------------- WIFI ----------------
const char* WIFI_SSID = "Mahesh's hotspot";
const char* WIFI_PASSWORD = "Mahesh999";

// ---------------- MQTT ----------------
const char* MQTT_SERVER = "10.249.223.24";
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "netra/cart";

// ---------------- DEVICE REGISTRY ----------------
const char* DEVICE_ID = "cart_node";
const char* DEVICE_TYPE = "ESP32-WROOM";
const char* DEVICE_ROLE = "cart_sensor";
const char* LOCATION = "shopping_cart_01";
const char* CALIBRATION_REF = "calibration/cart_01";

// ---------------- COMPONENT IDs ----------------
const char* HX711_COMPONENT_ID = "hx711_cart_01";
const char* LOAD_CELL_COMPONENT_ID = "load_cell_cart_01";

// ---------------- HX711 ----------------
#define HX711_DT 21
#define HX711_SCK 22

HX711 scale;

// Your calibrated value
const float CALIBRATION_FACTOR = 220.493027;

// ---------------- DETECTION SETTINGS ----------------
const float WEIGHT_TOLERANCE = 80.0;   // grams
const int MIN_STABLE_READINGS = 5;

// Time between detecting change and accepting final weight
const unsigned long STABILIZATION_TIME = 1500;

// ---------------- TFT ----------------
TFT_eSPI tft = TFT_eSPI();

// ---------------- NETWORK ----------------
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// ---------------- CART STATE ----------------
float previousWeight = 0.0;
float currentWeight = 0.0;

float candidateWeight = 0.0;
float lastDelta = 0.0;

int stableReadings = 0;
int itemCount = 0;

unsigned long stabilizationStart = 0;
unsigned long lastDisplayUpdate = 0;
unsigned long lastWeightCheck = 0;

unsigned long eventCounter = 0;

// ---------------- STATES ----------------
enum CartState {
  MONITORING,
  STABILIZING
};

CartState cartState = MONITORING;

// =====================================================
// GET UTC TIMESTAMP
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
// WIFI
// =====================================================

void connectWiFi() {

  Serial.println();
  Serial.print("Connecting to WiFi");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {

    delay(500);

    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected!");

  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// =====================================================
// MQTT
// =====================================================

void connectMQTT() {

  while (!mqttClient.connected()) {

    Serial.print("Connecting to MQTT... ");

    String clientID = String(DEVICE_ID) + "_" + String(random(0xffff), HEX);

    if (mqttClient.connect(clientID.c_str())) {

      Serial.println("connected!");

    } else {

      Serial.print("failed, rc=");
      Serial.println(mqttClient.state());

      delay(2000);
    }
  }
}

// =====================================================
// TFT HEADER
// =====================================================

void drawHeader() {

  tft.fillScreen(TFT_BLACK);

  tft.setTextColor(TFT_CYAN, TFT_BLACK);
  tft.setTextSize(3);

  tft.setCursor(20, 15);
  tft.println("NETRA");

  tft.setTextSize(2);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);

  tft.setCursor(20, 55);
  tft.println("SMART CART");

  tft.drawLine(
    10,
    85,
    470,
    85,
    TFT_WHITE
  );
}

// =====================================================
// TFT DISPLAY
// =====================================================

void updateDisplay(String status, String eventText) {

  tft.fillRect(
    10,
    100,
    460,
    220,
    TFT_BLACK
  );

  // Items
  tft.setTextColor(TFT_YELLOW, TFT_BLACK);
  tft.setTextSize(3);

  tft.setCursor(20, 110);
  tft.print("Items: ");

  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.print(itemCount);

  // Weight
  tft.setTextColor(TFT_GREEN, TFT_BLACK);
  tft.setCursor(20, 155);
  tft.print("Weight:");

  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.print(currentWeight, 1);
  tft.print(" g");

  // Status
  tft.setTextColor(TFT_CYAN, TFT_BLACK);
  tft.setCursor(20, 205);
  tft.print("Status:");

  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.print(status);

  // Last event
  tft.setTextColor(TFT_ORANGE, TFT_BLACK);
  tft.setCursor(20, 255);
  tft.print("Event:");

  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.print(eventText);
}

// =====================================================
// PUBLISH EVENT
// =====================================================

void publishWeightEvent(float oldWeight, float newWeight) {

  eventCounter++;

  float delta = newWeight - oldWeight;

  String eventID =
    "evt_cart_weight_" + String(eventCounter);

  StaticJsonDocument<1024> doc;

  doc["schema_version"] = 1;
  doc["event_id"] = eventID;
  doc["timestamp"] = getTimestamp();

  doc["device_id"] = DEVICE_ID;
  doc["event_type"] = "WEIGHT_CHANGE";
  doc["location"] = LOCATION;

  doc["value"] = abs(delta);
  doc["unit"] = "grams";

  JsonObject payload = doc.createNestedObject("payload");

  payload["previous_weight"] = oldWeight;
  payload["current_weight"] = newWeight;
  payload["delta"] = delta;
  payload["stable"] = true;
  payload["item_count"] = itemCount;

  payload["hx711_id"] = HX711_COMPONENT_ID;
  payload["load_cell_id"] = LOAD_CELL_COMPONENT_ID;
  payload["calibration_ref"] = CALIBRATION_REF;

  char jsonBuffer[1024];

  serializeJson(doc, jsonBuffer);

  Serial.println();
  Serial.println("===== MQTT EVENT =====");
  Serial.println(jsonBuffer);
  Serial.println("======================");

  if (mqttClient.connected()) {

    mqttClient.publish(
      MQTT_TOPIC,
      jsonBuffer
    );

    Serial.println("MQTT event published!");

  } else {

    Serial.println("MQTT not connected!");
  }
}

// =====================================================
// PROCESS FINAL WEIGHT CHANGE
// =====================================================

void processWeightChange(float newWeight) {

  float delta = newWeight - previousWeight;

  lastDelta = delta;

  Serial.println();
  Serial.println("===== WEIGHT CHANGE =====");

  Serial.print("Previous: ");
  Serial.print(previousWeight);
  Serial.println(" g");

  Serial.print("Current: ");
  Serial.print(newWeight);
  Serial.println(" g");

  Serial.print("Delta: ");
  Serial.print(delta);
  Serial.println(" g");

  // Ignore tiny changes
  if (abs(delta) < WEIGHT_TOLERANCE) {

    Serial.println("No significant change.");

    previousWeight = newWeight;
    currentWeight = newWeight;

    updateDisplay(
      "MONITORING",
      "NONE"
    );

    return;
  }

  // ITEM ADDED
  if (delta >= WEIGHT_TOLERANCE) {

    itemCount++;

    Serial.println(">>> ITEM ADDED");

    publishWeightEvent(
      previousWeight,
      newWeight
    );

    updateDisplay(
      "MONITORING",
      "ITEM ADDED"
    );
  }

  // ITEM REMOVED
  else if (delta <= -WEIGHT_TOLERANCE) {

    if (itemCount > 0) {
      itemCount--;
    }

    Serial.println(">>> ITEM REMOVED");

    publishWeightEvent(
      previousWeight,
      newWeight
    );

    updateDisplay(
      "MONITORING",
      "ITEM REMOVED"
    );
  }

  previousWeight = newWeight;
  currentWeight = newWeight;
}

// =====================================================
// READ WEIGHT
// =====================================================

float readWeight() {

  float weight = scale.get_units(3);

  // Prevent tiny negative values
  if (weight < 0 && weight > -5) {
    weight = 0;
  }

  return weight;
}

// =====================================================
// INITIAL TARE
// =====================================================

void initializeWeight() {

  Serial.println();
  Serial.println("Taring load cell...");

  delay(1000);

  scale.tare();

  delay(1000);

  currentWeight = readWeight();

  previousWeight = currentWeight;

  Serial.print("Initial cart weight: ");
  Serial.print(currentWeight);
  Serial.println(" g");
}

// =====================================================
// SETUP
// =====================================================

void setup() {

  Serial.begin(115200);

  delay(1000);

  Serial.println();
  Serial.println("================================");
  Serial.println("       NETRA SMART CART");
  Serial.println("================================");

  // ---------------- TFT ----------------

  tft.init();
  tft.setRotation(1);

  drawHeader();

  updateDisplay(
    "STARTING",
    "NONE"
  );

  // ---------------- HX711 ----------------

  scale.begin(
    HX711_DT,
    HX711_SCK
  );

  scale.set_scale(
    CALIBRATION_FACTOR
  );

  // ---------------- WIFI ----------------

  connectWiFi();

  // ---------------- NTP ----------------

  configTime(
    0,
    0,
    "pool.ntp.org",
    "time.nist.gov"
  );

  // ---------------- MQTT ----------------

  mqttClient.setServer(
    MQTT_SERVER,
    MQTT_PORT
  );

  connectMQTT();

  // ---------------- LOAD CELL ----------------

  initializeWeight();

  // ---------------- DISPLAY ----------------

  updateDisplay(
    "MONITORING",
    "NONE"
  );

  Serial.println();
  Serial.println("================================");
  Serial.println("Cart ready!");
  Serial.println("PIR DISABLED");
  Serial.println("Weight-only detection active");
  Serial.println("================================");
}

// =====================================================
// LOOP
// =====================================================

void loop() {

  // Keep MQTT alive
  if (!mqttClient.connected()) {
    connectMQTT();
  }

  mqttClient.loop();

  // -------------------------------------------------
  // MONITORING
  // -------------------------------------------------

  if (cartState == MONITORING) {

    currentWeight = readWeight();

    // Update TFT periodically
    if (millis() - lastDisplayUpdate >= 500) {

      lastDisplayUpdate = millis();

      updateDisplay(
        "MONITORING",
        "NONE"
      );
    }

    // Check whether weight changed significantly
    float difference =
      currentWeight - previousWeight;

    if (abs(difference) >= WEIGHT_TOLERANCE) {

      Serial.println();
      Serial.println("Weight change detected!");

      Serial.print("Difference: ");
      Serial.print(difference);
      Serial.println(" g");

      // Start stabilization
      cartState = STABILIZING;

      stabilizationStart = millis();

      candidateWeight = currentWeight;

      stableReadings = 1;

      updateDisplay(
        "STABILIZING",
        "CHECKING..."
      );
    }
  }

  // -------------------------------------------------
  // STABILIZING
  // -------------------------------------------------

  else if (cartState == STABILIZING) {

    currentWeight = readWeight();

    // Check if current reading is close
    // to the candidate weight
    if (abs(currentWeight - candidateWeight)
        < WEIGHT_TOLERANCE) {

      stableReadings++;

    } else {

      // Weight still moving
      candidateWeight = currentWeight;

      stableReadings = 1;

      stabilizationStart = millis();
    }

    // Require stabilization time
    if (
      millis() - stabilizationStart
      >= STABILIZATION_TIME
    ) {

      if (
        stableReadings
        >= MIN_STABLE_READINGS
      ) {

        Serial.println();
        Serial.println("Weight stabilized!");

        // Final candidate
        float finalWeight = candidateWeight;

        processWeightChange(
          finalWeight
        );

        cartState = MONITORING;

        stableReadings = 0;
      }
    }

    delay(100);
  }

  delay(50);
}

