# JSON Format Reference

**Summary:** Found 42 defined JSON files. 32 are fully populated, 10 are MISSING/EMPTY.
The owner responsible for the most JSON files is **Unknown**.

## 00_PROJECT/project_config.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## 01_ARCHITECTURE/architecture_config.json
**Owner:** Phantom (P1)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `architecture_version` | str | - | - | Value: 1.0 |
| `architecture_style` | str | - | - | Value: edge_first_event_driven |
| `layers` | array | - | - | List of values |
| `layers[].id` | str | - | - | Value: L1 |
| `layers[].name` | str | - | - | Value: sensing |
| `layers[].description` | str | - | - | Value: Cameras and physical sensors observe store events; raw camera frames remain local and are not persisted. |
| `data_flow` | array | - | - | List of values |
| `principles` | array | - | - | List of values |

**Actual current content:**
```json
{
    "architecture_version": "1.0",
    "architecture_style": "edge_first_event_driven",
    "layers": [
        {
            "id": "L1",
            "name": "sensing",
            "description": "Cameras and physical sensors observe store events; raw camera frames remain local and are not persisted."
        },
        {
            "id": "L2",
            "name": "communication",
            "description": "MQTT transports compact device events over the local network."
        },
        {
            "id": "L3",
            "name": "ingestion",
            "description": "FastAPI/MQTT ingestion validates, normalizes and routes incoming events."
        },
        {
            "id": "L4",
            "name": "intelligence",
            "description": "Edge models and deterministic analytics infer occupancy, inventory changes, cart burden and queue ETA."
        },
        {
            "id": "L5",
            "name": "decision",
            "description": "Decision rules convert validated intelligence into alerts and operational recommendations."
        },
        {
            "id": "L6",
            "name": "presentation",
            "description": "The manager dashboard and queue display expose real-time operational information."
        }
    ],
    "data_flow": [
        "hardware",
        "mqtt",
        "ingestion",
        "database",
        "intelligence",
        "decision_engine",
        "api",
        "websocket",
        "frontend"
    ],
    "principles": [
        "local_first",
        "event_driven",
        "modular",
        "privacy_by_design",
        "fail_safe",
        "replaceable_components",
        "measurable_performance",
        "single_source_of_truth"
    ]
}
```

## 02_HARDWARE/registry/devices.json
**Owner:** Mighty (P5)
**Read by:** Soham, Phantom, Akash, Team+1
**Purpose:** Registry of physical devices with MQTT topics

### LOCKED SCHEMA — DO NOT MODIFY WITHOUT TEAM SIGN-OFF
**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `[].device_id` | str | Yes | - | Matches device_registry.json exactly |
| `[].type` | str | Yes | ESP32-CAM, ESP32-WROOM | - |
| `[].camera` | str | Yes | OV2640, null | - |
| `[].quantity` | int | Yes | - | - |
| `[].role` | str | Yes | entry_exit, queue_detection, shelf_sensor, cart_sensor | Maps to sensor_fusion weights |
| `[].mqtt_topic` | str | Yes | - | Must match integration_config.json exactly |
| `[].location` | str | Yes | - | - |

**Actual current content:**
```json
[
  {
    "device_id": "esp32_cam_entry",
    "type": "ESP32-CAM",
    "camera": "OV2640",
    "quantity": 1,
    "role": "entry_exit",
    "mqtt_topic": "netra/entry",
    "location": "store_entrance"
  },
  {
    "device_id": "esp32_cam_queue",
    "type": "ESP32-CAM",
    "camera": "OV2640",
    "quantity": 1,
    "role": "queue_detection",
    "mqtt_topic": "netra/queue",
    "location": "checkout_zone"
  },
  {
    "device_id": "esp32_sensor_node",
    "type": "ESP32-WROOM",
    "camera": null,
    "quantity": 1,
    "role": "shelf_sensor",
    "mqtt_topic": "netra/events/weight",
    "location": "shelf_A"
  },
  {
    "device_id": "cart_node",
    "type": "ESP32-WROOM",
    "camera": null,
    "quantity": 1,
    "role": "cart_sensor",
    "mqtt_topic": "netra/cart",
    "location": "shopping_cart_01"
  }
]
```

## 02_HARDWARE/registry/components.json
**Owner:** Mighty (P5)
**Read by:** Soham, Phantom, Akash, Team+1
**Purpose:** Registry of sub-components read locally by a parent device

### LOCKED SCHEMA — DO NOT MODIFY WITHOUT TEAM SIGN-OFF
**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `[].component_id` | str | Yes | - | - |
| `[].type` | str | Yes | HX711, load_cell, PIR | - |
| `[].quantity` | int | Yes | - | - |
| `[].role` | str | Yes | shelf_weight, cart_weight, cart_motion, spare | Maps to sensor_fusion weights |
| `[].parent_device_id` | str | Yes | - | Target device_id or null |

**Actual current content:**
```json
[
  {
    "component_id": "hx711_shelf_01",
    "type": "HX711",
    "quantity": 1,
    "role": "shelf_weight",
    "parent_device_id": "esp32_sensor_node"
  },
  {
    "component_id": "hx711_cart_01",
    "type": "HX711",
    "quantity": 1,
    "role": "cart_weight",
    "parent_device_id": "cart_node"
  },
  {
    "component_id": "hx711_spare_01",
    "type": "HX711",
    "quantity": 1,
    "role": "spare",
    "parent_device_id": null
  },
  {
    "component_id": "load_cell_shelf_01",
    "type": "load_cell",
    "quantity": 1,
    "role": "shelf_weight",
    "parent_device_id": "esp32_sensor_node"
  },
  {
    "component_id": "load_cell_cart_01",
    "type": "load_cell",
    "quantity": 1,
    "role": "cart_weight",
    "parent_device_id": "cart_node"
  },
  {
    "component_id": "load_cell_spare_01",
    "type": "load_cell",
    "quantity": 1,
    "role": "spare",
    "parent_device_id": null
  },
  {
    "component_id": "pir_cart_01",
    "type": "PIR",
    "quantity": 1,
    "role": "cart_motion",
    "parent_device_id": "cart_node"
  }
]
```

## 02_HARDWARE/registry/calibration_index.json
**Owner:** Mighty (P5)
**Read by:** Soham, Phantom, Akash, Team+1
**Purpose:** Maps devices and components to their calibration files

### LOCKED SCHEMA — DO NOT MODIFY WITHOUT TEAM SIGN-OFF
**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `[].target_id` | str | Yes | - | Device or component ID |
| `[].calibration_path` | str | Yes | - | Relative path to calibration file |
| `[].last_calibrated` | str | No | - | ISO 8601 timestamp or null |
| `[].status` | str | Yes | uncalibrated, calibrated, stale | - |

**Actual current content:**
```json
[
  {
    "target_id": "esp32_sensor_node",
    "calibration_path": "calibration/shelf_A",
    "last_calibrated": null,
    "status": "uncalibrated"
  },
  {
    "target_id": "cart_node",
    "calibration_path": "calibration/cart_01",
    "last_calibrated": null,
    "status": "uncalibrated"
  }
]
```

## 02_HARDWARE/registry/bom_summary.json
**Owner:** Team+1 (P6)
**Read by:** Mighty, Team+1
**Purpose:** Procurement view for Team+1

### LOCKED SCHEMA — DO NOT MODIFY WITHOUT TEAM SIGN-OFF
**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `[].component_id` | str | Yes | - | Device or component type ID |
| `[].name` | str | Yes | - | Human readable name |
| `[].quantity_required` | int | Yes | - | - |
| `[].quantity_available` | int | Yes | - | - |
| `[].unit_cost` | float | Yes | - | - |
| `[].total_cost` | float | Yes | - | - |
| `[].procurement_status` | str | Yes | fulfilled, pending, backordered | - |

**Actual current content:**
```json
[
  {
    "component_id": "esp32_cam",
    "name": "ESP32-CAM with OV2640",
    "quantity_required": 2,
    "quantity_available": 2,
    "unit_cost": 5.0,
    "total_cost": 10.0,
    "procurement_status": "fulfilled"
  },
  {
    "component_id": "esp32_wroom",
    "name": "ESP32-WROOM Development Board",
    "quantity_required": 2,
    "quantity_available": 2,
    "unit_cost": 6.0,
    "total_cost": 12.0,
    "procurement_status": "fulfilled"
  },
  {
    "component_id": "hx711",
    "name": "HX711 Amplifier",
    "quantity_required": 3,
    "quantity_available": 3,
    "unit_cost": 1.0,
    "total_cost": 3.0,
    "procurement_status": "fulfilled"
  },
  {
    "component_id": "load_cell",
    "name": "Load Cell (10kg)",
    "quantity_required": 3,
    "quantity_available": 3,
    "unit_cost": 3.0,
    "total_cost": 9.0,
    "procurement_status": "fulfilled"
  },
  {
    "component_id": "pir",
    "name": "PIR Motion Sensor",
    "quantity_required": 1,
    "quantity_available": 1,
    "unit_cost": 2.0,
    "total_cost": 2.0,
    "procurement_status": "fulfilled"
  }
]
```

## 03_AI/AI_CONFIG.json
**Owner:** Phantom (P1)
**Read by:** 04_BACKEND, ., 03_AI, 08_TESTING
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `config_version` | str | - | - | Value: 1.0 |
| `person_detection` | object | - | - | Config section |
| `person_detection.enabled` | bool | - | - | Value: True |
| `person_detection.confidence_threshold` | float | - | - | Value: 0.6 |
| `person_detection.duplicate_event_window_seconds` | int | - | - | Value: 3 |
| `person_detection.line_crossing_enabled` | bool | - | - | Value: True |
| `inventory` | object | - | - | Config section |
| `inventory.enabled` | bool | - | - | Value: True |
| `inventory.weight_tolerance_grams` | int | - | - | Value: 80 |
| `inventory.minimum_stable_readings` | int | - | - | Value: 5 |
| `inventory.low_stock_threshold` | int | - | - | Value: 2 |
| `inventory.maximum_event_gap_seconds` | int | - | - | Value: 10 |
| `cart` | object | - | - | Config section |
| `cart.enabled` | bool | - | - | Value: True |
| `cart.weight_tolerance_grams` | int | - | - | Value: 80 |
| `cart.stability_window_seconds` | int | - | - | Value: 2 |
| `cart.minimum_change_grams` | int | - | - | Value: 100 |
| `sensor_fusion` | object | - | - | Config section |
| `sensor_fusion.enabled` | bool | - | - | Value: True |
| `sensor_fusion.minimum_confidence` | float | - | - | Value: 0.7 |
| `sensor_fusion.weights` | object | - | - | Config section |
| `sensor_fusion.weights.shelf` | float | - | - | Value: 0.5 |
| `sensor_fusion.weights.cart` | float | - | - | Value: 0.4 |
| `sensor_fusion.weights.pir` | float | - | - | Value: 0.1 |
| `queue` | object | - | - | Config section |
| `queue.enabled` | bool | - | - | Value: True |
| `queue.warning_people` | int | - | - | Value: 4 |
| `queue.critical_people` | int | - | - | Value: 6 |
| `queue.base_service_time_seconds` | int | - | - | Value: 30 |
| `queue.per_item_time_seconds` | int | - | - | Value: 5 |
| `queue.maximum_eta_minutes` | int | - | - | Value: 60 |
| `decision_engine` | object | - | - | Config section |
| `decision_engine.enabled` | bool | - | - | Value: True |
| `decision_engine.restock_alert` | bool | - | - | Value: True |
| `decision_engine.queue_alert` | bool | - | - | Value: True |
| `decision_engine.counter_recommendation` | bool | - | - | Value: True |

**Actual current content:**
```json
{
    "config_version": "1.0",
    "person_detection": {
        "enabled": true,
        "confidence_threshold": 0.6,
        "duplicate_event_window_seconds": 3,
        "line_crossing_enabled": true
    },
    "inventory": {
        "enabled": true,
        "weight_tolerance_grams": 80,
        "minimum_stable_readings": 5,
        "low_stock_threshold": 2,
        "maximum_event_gap_seconds": 10
    },
    "cart": {
        "enabled": true,
        "weight_tolerance_grams": 80,
        "stability_window_seconds": 2,
        "minimum_change_grams": 100
    },
    "sensor_fusion": {
        "enabled": true,
        "minimum_confidence": 0.7,
        "weights": {
            "shelf": 0.5,
            "cart": 0.4,
            "pir": 0.1
        }
    },
    "queue": {
        "enabled": true,
        "warning_people": 4,
        "critical_people": 6,
        "base_service_time_seconds": 30,
        "per_item_time_seconds": 5,
        "maximum_eta_minutes": 60
    },
    "decision_engine": {
        "enabled": true,
        "restock_alert": true,
        "queue_alert": true,
        "counter_recommendation": true
    }
}
```

## 03_AI/MODEL_REGISTRY.json
**Owner:** Phantom (P1)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `registry_version` | str | - | - | Value: 1.0 |
| `models` | array | - | - | List of values |
| `models[].model_id` | str | - | - | Value: person_detector_v1 |
| `models[].name` | str | - | - | Value: NETRA Person Detector |
| `models[].task` | str | - | - | Value: person_detection |
| `models[].framework` | str | - | - | Value: FOMO |
| `models[].version` | str | - | - | Value: 1.0.0 |
| `models[].status` | str | - | - | Value: evaluation |
| `models[].location` | str | - | - | Value: 03_AI/models/exported/ |
| `models[].input_type` | str | - | - | Value: image |
| `models[].output_type` | str | - | - | Value: detections |
| `models[].confidence_threshold` | float | - | - | Value: 0.6 |
| `fallbacks` | array | - | - | List of values |
| `fallbacks[].primary_model` | str | - | - | Value: person_detector_v1 |
| `fallbacks[].fallback` | str | - | - | Value: local_opencv_or_yolo |
| `fallbacks[].reason` | str | - | - | Value: ESP32 inference failure or insufficient accuracy |
| `evaluation` | object | - | - | Config section |
| `evaluation.required_metrics` | array | - | - | List of values |
| `evaluation.target_values_source` | str | - | - | Value: 08_TESTING/ACCURACY.md |

**Actual current content:**
```json
{
    "registry_version": "1.0",
    "models": [
        {
            "model_id": "person_detector_v1",
            "name": "NETRA Person Detector",
            "task": "person_detection",
            "framework": "FOMO",
            "version": "1.0.0",
            "status": "evaluation",
            "location": "03_AI/models/exported/",
            "input_type": "image",
            "output_type": "detections",
            "confidence_threshold": 0.6
        }
    ],
    "fallbacks": [
        {
            "primary_model": "person_detector_v1",
            "fallback": "local_opencv_or_yolo",
            "reason": "ESP32 inference failure or insufficient accuracy"
        }
    ],
    "evaluation": {
        "required_metrics": [
            "accuracy",
            "precision",
            "recall",
            "latency",
            "false_positive_rate",
            "false_negative_rate"
        ],
        "target_values_source": "08_TESTING/ACCURACY.md"
    }
}
```

## 04_BACKEND/backend_config.json
**Owner:** Soham (P2)
**Read by:** 04_BACKEND, .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `app_name` | str | - | - | Value: NETRA Backend |
| `api_prefix` | str | - | - | Value: /api |
| `host` | str | - | - | Value: 0.0.0.0 |
| `port` | int | - | - | Value: 8000 |
| `mqtt` | object | - | - | Config section |
| `mqtt.broker` | str | - | - | Value: localhost |
| `mqtt.port` | int | - | - | Value: 1883 |
| `mqtt.client_id` | str | - | - | Value: netra_backend |
| `mqtt.keepalive` | int | - | - | Value: 60 |
| `mqtt.topics` | array | - | - | List of values |
| `database` | object | - | - | Config section |
| `database.path` | str | - | - | Value: 99_RUNTIME/database/netra.db |
| `websocket` | object | - | - | Config section |
| `websocket.path` | str | - | - | Value: /ws/live |
| `logging` | object | - | - | Config section |
| `logging.level` | str | - | - | Value: INFO |

**Actual current content:**
```json
{
  "app_name": "NETRA Backend",
  "api_prefix": "/api",
  "host": "0.0.0.0",
  "port": 8000,
  "mqtt": {
    "broker": "localhost",
    "port": 1883,
    "client_id": "netra_backend",
    "keepalive": 60,
    "topics": ["netra/events/#"]
  },
  "database": {
    "path": "99_RUNTIME/database/netra.db"
  },
  "websocket": {
    "path": "/ws/live"
  },
  "logging": {
    "level": "INFO"
  }
}
```

## 05_FRONTEND/package.json
**Owner:** Cherry (P4)
**Read by:** ., venv
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## 06_DATA/sample/sample_cart.json
**Owner:** Soham (P2)
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "cart_id": "cart_1",
    "timestamp": "2026-09-12T10:00:00Z",
    "tare_weight_grams": 10000,
    "current_weight_grams": 11000,
    "weight_change_grams": 1000,
    "estimated_item_count": 5,
    "item_burden": "LOW",
    "confidence": 0.9
  },
  {
    "cart_id": "cart_2",
    "timestamp": "2026-09-12T10:01:00Z",
    "tare_weight_grams": 10000,
    "current_weight_grams": 25000,
    "weight_change_grams": 5000,
    "estimated_item_count": 30,
    "item_burden": "HIGH",
    "confidence": 0.85
  }
]
```

## 06_DATA/sample/sample_events.json
**Owner:** Soham (P2)
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "schema_version": 1,
    "event_id": "evt_1",
    "timestamp": "2026-09-12T10:00:00Z",
    "device_id": "cam_1",
    "event_type": "ENTRY",
    "zone": "gate_1",
    "entity_id": "person_1",
    "payload": {},
    "confidence": 0.95,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_2",
    "timestamp": "2026-09-12T10:01:00Z",
    "device_id": "cam_1",
    "event_type": "EXIT",
    "zone": "gate_1",
    "entity_id": "person_2",
    "payload": {},
    "confidence": 0.90,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_3",
    "timestamp": "2026-09-12T10:02:00Z",
    "device_id": "scale_1",
    "event_type": "WEIGHT_CHANGE",
    "zone": "shelf_A",
    "entity_id": "item_1",
    "payload": {
      "weight_change": -200
    },
    "confidence": 0.99,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_4",
    "timestamp": "2026-09-12T10:03:00Z",
    "device_id": "engine_1",
    "event_type": "ALERT",
    "zone": "store",
    "entity_id": "alert_1",
    "payload": {
      "level": "CRITICAL",
      "message": "Low stock"
    },
    "confidence": 1.0,
    "metadata": {}
  }
]
```

## 06_DATA/sample/sample_inventory.json
**Owner:** Soham (P2)
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "sku": "SKU_1",
    "shelf_id": "shelf_A",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 1500,
    "estimated_quantity": 10,
    "threshold": 2,
    "status": "NORMAL",
    "last_updated": "2026-09-12T10:00:00Z",
    "confidence": 0.95
  },
  {
    "sku": "SKU_2",
    "shelf_id": "shelf_B",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 700,
    "estimated_quantity": 2,
    "threshold": 5,
    "status": "LOW",
    "last_updated": "2026-09-12T10:01:00Z",
    "confidence": 0.90
  },
  {
    "sku": "SKU_3",
    "shelf_id": "shelf_C",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 500,
    "estimated_quantity": 0,
    "threshold": 2,
    "status": "OUT_OF_STOCK",
    "last_updated": "2026-09-12T10:02:00Z",
    "confidence": 0.99
  }
]
```

## 06_DATA/sample/sample_queue.json
**Owner:** Soham (P2)
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "timestamp": "2026-09-12T10:00:00Z",
    "lane": "lane_1",
    "people_count": 1,
    "item_burden": "LOW",
    "estimated_item_count": 5,
    "estimated_wait_seconds": 30.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.9,
    "status": "NORMAL",
    "item_burden_source": "VISION_ESTIMATE"
  },
  {
    "timestamp": "2026-09-12T10:01:00Z",
    "lane": "lane_2",
    "people_count": 5,
    "item_burden": "MEDIUM",
    "estimated_item_count": 25,
    "estimated_wait_seconds": 150.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.85,
    "status": "WARNING",
    "item_burden_source": "VISION_ESTIMATE"
  },
  {
    "timestamp": "2026-09-12T10:02:00Z",
    "lane": "lane_3",
    "people_count": 10,
    "item_burden": "HIGH",
    "estimated_item_count": 50,
    "estimated_wait_seconds": 300.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.8,
    "status": "CRITICAL",
    "item_burden_source": "VISION_ESTIMATE"
  }
]
```

## 06_DATA/schemas/cart_schema.json
**Owner:** Phantom (P1)
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `cart_id` | string | Yes |  |  |
| `timestamp` | string | Yes |  |  |
| `tare_weight_grams` | number | Yes |  |  |
| `current_weight_grams` | number | Yes |  |  |
| `weight_change_grams` | number | Yes |  |  |
| `estimated_item_count` | ['integer', 'null'] | No |  |  |
| `item_burden` | string | Yes | ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'] |  |
| `confidence` | number | Yes |  |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/cart/v1",
  "title": "NETRA Cart Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "cart_id",
    "timestamp",
    "tare_weight_grams",
    "current_weight_grams",
    "weight_change_grams",
    "item_burden",
    "confidence"
  ],
  "properties": {
    "cart_id": {
      "type": "string",
      "minLength": 1
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "tare_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "current_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "weight_change_grams": {
      "type": "number"
    },
    "estimated_item_count": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0
    },
    "item_burden": {
      "type": "string",
      "enum": [
        "LOW",
        "MEDIUM",
        "HIGH",
        "UNKNOWN"
      ]
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    }
  }
}
```

## 06_DATA/schemas/event_schema.json
**Owner:** Phantom (P1)
**Read by:** ., 03_AI
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `schema_version` | integer | Yes |  |  |
| `event_id` | string | Yes |  |  |
| `timestamp` | string | Yes |  |  |
| `device_id` | string | Yes |  |  |
| `event_type` | string | Yes | ['ENTRY', 'EXIT', 'WEIGHT_CHANGE', 'ITEM_REMOVED', 'ITEM_ADDED', 'INVENTORY_UPDATE', 'CART_UPDATE', 'QUEUE_UPDATE', 'ALERT', 'HEALTH'] |  |
| `zone` | ['string', 'null'] | No |  |  |
| `entity_id` | ['string', 'null'] | No |  |  |
| `payload` | object | No |  |  |
| `payload.type` | str | - | - | Value: object |
| `confidence` | ['number', 'null'] | No |  |  |
| `metadata` | object | No |  |  |
| `metadata.type` | str | - | - | Value: object |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/event/v1",
  "title": "NETRA Event",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schema_version",
    "event_id",
    "timestamp",
    "device_id",
    "event_type"
  ],
  "properties": {
    "schema_version": {
      "type": "integer",
      "const": 1
    },
    "event_id": {
      "type": "string",
      "minLength": 1
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "device_id": {
      "type": "string",
      "minLength": 1
    },
    "event_type": {
      "type": "string",
      "enum": [
        "ENTRY",
        "EXIT",
        "WEIGHT_CHANGE",
        "ITEM_REMOVED",
        "ITEM_ADDED",
        "INVENTORY_UPDATE",
        "CART_UPDATE",
        "QUEUE_UPDATE",
        "ALERT",
        "HEALTH"
      ]
    },
    "zone": {
      "type": [
        "string",
        "null"
      ]
    },
    "entity_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "payload": {
      "type": "object"
    },
    "confidence": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "maximum": 1
    },
    "metadata": {
      "type": "object"
    }
  }
}
```

## 06_DATA/schemas/inventory_schema.json
**Owner:** Phantom (P1)
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `sku` | string | Yes |  |  |
| `shelf_id` | string | Yes |  |  |
| `tare_weight_grams` | number | Yes |  |  |
| `unit_weight_grams` | number | Yes |  |  |
| `current_weight_grams` | number | Yes |  |  |
| `estimated_quantity` | integer | Yes |  |  |
| `threshold` | integer | Yes |  |  |
| `last_updated` | string | Yes |  |  |
| `confidence` | number | Yes |  |  |
| `status` | string | Yes | ['NORMAL', 'LOW', 'OUT_OF_STOCK', 'UNCERTAIN'] |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/inventory/v1",
  "title": "NETRA Inventory Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "sku",
    "shelf_id",
    "tare_weight_grams",
    "unit_weight_grams",
    "current_weight_grams",
    "estimated_quantity",
    "threshold",
    "status",
    "last_updated",
    "confidence"
  ],
  "properties": {
    "sku": {
      "type": "string",
      "minLength": 1
    },
    "shelf_id": {
      "type": "string",
      "minLength": 1
    },
    "tare_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "unit_weight_grams": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "current_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "estimated_quantity": {
      "type": "integer",
      "minimum": 0
    },
    "threshold": {
      "type": "integer",
      "minimum": 0
    },
    "last_updated": {
      "type": "string",
      "format": "date-time"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "NORMAL",
        "LOW",
        "OUT_OF_STOCK",
        "UNCERTAIN"
      ]
    }
  }
}
```

## 06_DATA/schemas/queue_schema.json
**Owner:** Phantom (P1)
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `timestamp` | string | Yes |  |  |
| `lane` | string | Yes |  |  |
| `people_count` | integer | Yes |  |  |
| `item_burden` | string | Yes | ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'] |  |
| `estimated_item_count` | ['integer', 'null'] | No |  |  |
| `estimated_wait_seconds` | number | Yes |  |  |
| `service_rate_per_minute` | ['number', 'null'] | No |  |  |
| `confidence` | number | Yes |  |  |
| `status` | string | Yes | ['NORMAL', 'WARNING', 'CRITICAL'] |  |
| `item_burden_source` | string | Yes | ['CART_SENSOR', 'VISION_ESTIMATE', 'HISTORICAL_ESTIMATE', 'UNKNOWN'] |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/queue/v1",
  "title": "NETRA Queue Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "timestamp",
    "lane",
    "people_count",
    "item_burden",
    "estimated_wait_seconds",
    "item_burden_source",
    "status",
    "confidence"
  ],
  "properties": {
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "lane": {
      "type": "string",
      "minLength": 1
    },
    "people_count": {
      "type": "integer",
      "minimum": 0
    },
    "item_burden": {
      "type": "string",
      "enum": [
        "LOW",
        "MEDIUM",
        "HIGH",
        "UNKNOWN"
      ]
    },
    "estimated_item_count": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0
    },
    "estimated_wait_seconds": {
      "type": "number",
      "minimum": 0
    },
    "service_rate_per_minute": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "NORMAL",
        "WARNING",
        "CRITICAL"
      ]
    },
    "item_burden_source": {
      "type": "string",
      "enum": [
        "CART_SENSOR",
        "VISION_ESTIMATE",
        "HISTORICAL_ESTIMATE",
        "UNKNOWN"
      ]
    }
  }
}
```

## 07_INTEGRATION/api_contract.json
**Owner:** Soham (P2) & Phantom (P1)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `api_version` | str | - | - | Value: v1 |
| `base_path` | str | - | - | Value: /api |
| `endpoints` | object | - | - | Config section |
| `endpoints.health` | object | - | - | Config section |
| `endpoints.health.method` | str | - | - | Value: GET |
| `endpoints.health.path` | str | - | - | Value: /health |
| `endpoints.health.owner` | str | - | - | Value: Soham |
| `endpoints.events` | object | - | - | Config section |
| `endpoints.events.method` | str | - | - | Value: POST |
| `endpoints.events.path` | str | - | - | Value: /events |
| `endpoints.events.owner` | str | - | - | Value: Soham |
| `endpoints.entry_exit` | object | - | - | Config section |
| `endpoints.entry_exit.method` | str | - | - | Value: POST |
| `endpoints.entry_exit.path` | str | - | - | Value: /entry-exit |
| `endpoints.entry_exit.owner` | str | - | - | Value: Soham |
| `endpoints.inventory` | object | - | - | Config section |
| `endpoints.inventory.method` | str | - | - | Value: GET |
| `endpoints.inventory.path` | str | - | - | Value: /inventory |
| `endpoints.inventory.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.queue` | object | - | - | Config section |
| `endpoints.queue.method` | str | - | - | Value: GET |
| `endpoints.queue.path` | str | - | - | Value: /queue |
| `endpoints.queue.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.cart` | object | - | - | Config section |
| `endpoints.cart.method` | str | - | - | Value: GET |
| `endpoints.cart.path` | str | - | - | Value: /cart |
| `endpoints.cart.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.alerts` | object | - | - | Config section |
| `endpoints.alerts.method` | str | - | - | Value: GET |
| `endpoints.alerts.path` | str | - | - | Value: /alerts |
| `endpoints.alerts.owner` | str | - | - | Value: Soham |
| `endpoints.dashboard` | object | - | - | Config section |
| `endpoints.dashboard.method` | str | - | - | Value: GET |
| `endpoints.dashboard.path` | str | - | - | Value: /dashboard |
| `endpoints.dashboard.owner` | str | - | - | Value: Soham |
| `websocket` | object | - | - | Config section |
| `websocket.path` | str | - | - | Value: /ws/live |
| `websocket.events` | array | - | - | List of values |

**Actual current content:**
```json
{
  "api_version": "v1",
  "base_path": "/api",
  "endpoints": {
    "health": {
      "method": "GET",
      "path": "/health",
      "owner": "Soham"
    },
    "events": {
      "method": "POST",
      "path": "/events",
      "owner": "Soham"
    },
    "entry_exit": {
      "method": "POST",
      "path": "/entry-exit",
      "owner": "Soham"
    },
    "inventory": {
      "method": "GET",
      "path": "/inventory",
      "owner": "Phantom_Soham"
    },
    "queue": {
      "method": "GET",
      "path": "/queue",
      "owner": "Phantom_Soham"
    },
    "cart": {
      "method": "GET",
      "path": "/cart",
      "owner": "Phantom_Soham"
    },
    "alerts": {
      "method": "GET",
      "path": "/alerts",
      "owner": "Soham"
    },
    "dashboard": {
      "method": "GET",
      "path": "/dashboard",
      "owner": "Soham"
    }
  },
  "websocket": {
    "path": "/ws/live",
    "events": [
      "ENTRY",
      "EXIT",
      "INVENTORY_UPDATE",
      "CART_UPDATE",
      "QUEUE_UPDATE",
      "ALERT",
      "HEALTH"
    ]
  }
}
```

## 07_INTEGRATION/device_registry.json
**Owner:** Soham (P2) & Phantom (P1)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `devices` | array | - | - | List of values |
| `devices[].device_id` | str | - | - | Value: esp32_cam_entry |
| `devices[].type` | str | - | - | Value: camera |
| `devices[].mqtt_topic` | str | - | - | Value: netra/entry |
| `devices[].data_expected` | array | - | - | List of values |

**Actual current content:**
```json
{
  "devices": [
    {
      "device_id": "esp32_cam_entry",
      "type": "camera",
      "mqtt_topic": "netra/entry",
      "data_expected": ["ENTRY", "EXIT"]
    },
    {
      "device_id": "esp32_cam_queue",
      "type": "camera",
      "mqtt_topic": "-netra/queue",
      "data_expected": ["QUEUE_UPDATE"]
    },
    {
      "device_id": "esp32_sensor_node",
      "type": "sensor",
      "mqtt_topic": "netra/events/weight",
      "data_expected": ["WEIGHT_CHANGE"]
    },
    {
      "device_id": "cart_node",
      "type": "sensor",
      "mqtt_topic": "netra/cart",
      "data_expected": ["CART_UPDATE"]
    }
  ]
}
```

## 07_INTEGRATION/integration_config.json
**Owner:** Soham (P2) & Phantom (P1)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `pipelines` | object | - | - | Config section |
| `pipelines.entry` | object | - | - | Config section |
| `pipelines.entry.input` | str | - | - | Value: netra/entry |
| `pipelines.entry.output` | str | - | - | Value: websocket |
| `pipelines.inventory` | object | - | - | Config section |
| `pipelines.inventory.input` | str | - | - | Value: netra/events/weight |
| `pipelines.inventory.output` | str | - | - | Value: inventory_schema.json |
| `pipelines.cart` | object | - | - | Config section |
| `pipelines.cart.input` | str | - | - | Value: netra/cart |
| `pipelines.cart.output` | str | - | - | Value: cart_schema.json |
| `pipelines.queue` | object | - | - | Config section |
| `pipelines.queue.input` | str | - | - | Value: netra/queue |
| `pipelines.queue.output` | str | - | - | Value: queue_schema.json |

**Actual current content:**
```json
{
  "pipelines": {
    "entry": {
      "input": "netra/entry",
      "output": "websocket"
    },
    "inventory": {
      "input": "netra/events/weight",
      "output": "inventory_schema.json"
    },
    "cart": {
      "input": "netra/cart",
      "output": "cart_schema.json"
    },
    "queue": {
      "input": "netra/queue",
      "output": "queue_schema.json"
    }
  }
}
```

## 08_TESTING/test_config.json
**Owner:** Team+1 (P6)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `backend_url` | str | - | - | Value: http://localhost:8000 |
| `mqtt_broker` | str | - | - | Value: localhost |
| `mqtt_port` | int | - | - | Value: 1883 |
| `test_topics` | array | - | - | List of values |
| `required_tests` | object | - | - | Config section |
| `required_tests.backend` | array | - | - | List of values |
| `required_tests.failure` | array | - | - | List of values |
| `performance_targets` | object | - | - | Config section |
| `performance_targets.event_to_backend_ms` | int | - | - | Value: 500 |
| `performance_targets.api_response_ms` | int | - | - | Value: 1000 |

**Actual current content:**
```json
{
  "backend_url": "http://localhost:8000",
  "mqtt_broker": "localhost",
  "mqtt_port": 1883,
  "test_topics": ["netra/test/#"],
  
  "required_tests": {
    "backend": [
      "backend_health",
      "api_request",
      "event_to_backend"
    ],
    "failure": [
      "backend_unavailable",
      "mqtt_disconnect",
      "invalid_event"
    ]
  },

  "performance_targets": {
    "event_to_backend_ms": 500,
    "api_response_ms": 1000
  }
}
```

## 09_SECURITY/security_config.json
**Owner:** Cherry (P4)
**Read by:** .
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// FILE DOES NOT EXIST ON DISK
```

## 10_DEMO/demo_config.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// FILE DOES NOT EXIST ON DISK
```

## .\00_PROJECT\project_config.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## .\01_ARCHITECTURE\architecture_config.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `architecture_version` | str | - | - | Value: 1.0 |
| `architecture_style` | str | - | - | Value: edge_first_event_driven |
| `layers` | array | - | - | List of values |
| `layers[].id` | str | - | - | Value: L1 |
| `layers[].name` | str | - | - | Value: sensing |
| `layers[].description` | str | - | - | Value: Cameras and physical sensors observe store events; raw camera frames remain local and are not persisted. |
| `data_flow` | array | - | - | List of values |
| `principles` | array | - | - | List of values |

**Actual current content:**
```json
{
    "architecture_version": "1.0",
    "architecture_style": "edge_first_event_driven",
    "layers": [
        {
            "id": "L1",
            "name": "sensing",
            "description": "Cameras and physical sensors observe store events; raw camera frames remain local and are not persisted."
        },
        {
            "id": "L2",
            "name": "communication",
            "description": "MQTT transports compact device events over the local network."
        },
        {
            "id": "L3",
            "name": "ingestion",
            "description": "FastAPI/MQTT ingestion validates, normalizes and routes incoming events."
        },
        {
            "id": "L4",
            "name": "intelligence",
            "description": "Edge models and deterministic analytics infer occupancy, inventory changes, cart burden and queue ETA."
        },
        {
            "id": "L5",
            "name": "decision",
            "description": "Decision rules convert validated intelligence into alerts and operational recommendations."
        },
        {
            "id": "L6",
            "name": "presentation",
            "description": "The manager dashboard and queue display expose real-time operational information."
        }
    ],
    "data_flow": [
        "hardware",
        "mqtt",
        "ingestion",
        "database",
        "intelligence",
        "decision_engine",
        "api",
        "websocket",
        "frontend"
    ],
    "principles": [
        "local_first",
        "event_driven",
        "modular",
        "privacy_by_design",
        "fail_safe",
        "replaceable_components",
        "measurable_performance",
        "single_source_of_truth"
    ]
}
```

## .\03_AI\AI_CONFIG.json
**Owner:** Unknown
**Read by:** 04_BACKEND, ., 03_AI, 08_TESTING
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `config_version` | str | - | - | Value: 1.0 |
| `person_detection` | object | - | - | Config section |
| `person_detection.enabled` | bool | - | - | Value: True |
| `person_detection.confidence_threshold` | float | - | - | Value: 0.6 |
| `person_detection.duplicate_event_window_seconds` | int | - | - | Value: 3 |
| `person_detection.line_crossing_enabled` | bool | - | - | Value: True |
| `inventory` | object | - | - | Config section |
| `inventory.enabled` | bool | - | - | Value: True |
| `inventory.weight_tolerance_grams` | int | - | - | Value: 80 |
| `inventory.minimum_stable_readings` | int | - | - | Value: 5 |
| `inventory.low_stock_threshold` | int | - | - | Value: 2 |
| `inventory.maximum_event_gap_seconds` | int | - | - | Value: 10 |
| `cart` | object | - | - | Config section |
| `cart.enabled` | bool | - | - | Value: True |
| `cart.weight_tolerance_grams` | int | - | - | Value: 80 |
| `cart.stability_window_seconds` | int | - | - | Value: 2 |
| `cart.minimum_change_grams` | int | - | - | Value: 100 |
| `sensor_fusion` | object | - | - | Config section |
| `sensor_fusion.enabled` | bool | - | - | Value: True |
| `sensor_fusion.minimum_confidence` | float | - | - | Value: 0.7 |
| `sensor_fusion.weights` | object | - | - | Config section |
| `sensor_fusion.weights.shelf` | float | - | - | Value: 0.5 |
| `sensor_fusion.weights.cart` | float | - | - | Value: 0.4 |
| `sensor_fusion.weights.pir` | float | - | - | Value: 0.1 |
| `queue` | object | - | - | Config section |
| `queue.enabled` | bool | - | - | Value: True |
| `queue.warning_people` | int | - | - | Value: 4 |
| `queue.critical_people` | int | - | - | Value: 6 |
| `queue.base_service_time_seconds` | int | - | - | Value: 30 |
| `queue.per_item_time_seconds` | int | - | - | Value: 5 |
| `queue.maximum_eta_minutes` | int | - | - | Value: 60 |
| `decision_engine` | object | - | - | Config section |
| `decision_engine.enabled` | bool | - | - | Value: True |
| `decision_engine.restock_alert` | bool | - | - | Value: True |
| `decision_engine.queue_alert` | bool | - | - | Value: True |
| `decision_engine.counter_recommendation` | bool | - | - | Value: True |

**Actual current content:**
```json
{
    "config_version": "1.0",
    "person_detection": {
        "enabled": true,
        "confidence_threshold": 0.6,
        "duplicate_event_window_seconds": 3,
        "line_crossing_enabled": true
    },
    "inventory": {
        "enabled": true,
        "weight_tolerance_grams": 80,
        "minimum_stable_readings": 5,
        "low_stock_threshold": 2,
        "maximum_event_gap_seconds": 10
    },
    "cart": {
        "enabled": true,
        "weight_tolerance_grams": 80,
        "stability_window_seconds": 2,
        "minimum_change_grams": 100
    },
    "sensor_fusion": {
        "enabled": true,
        "minimum_confidence": 0.7,
        "weights": {
            "shelf": 0.5,
            "cart": 0.4,
            "pir": 0.1
        }
    },
    "queue": {
        "enabled": true,
        "warning_people": 4,
        "critical_people": 6,
        "base_service_time_seconds": 30,
        "per_item_time_seconds": 5,
        "maximum_eta_minutes": 60
    },
    "decision_engine": {
        "enabled": true,
        "restock_alert": true,
        "queue_alert": true,
        "counter_recommendation": true
    }
}
```

## .\03_AI\MODEL_REGISTRY.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `registry_version` | str | - | - | Value: 1.0 |
| `models` | array | - | - | List of values |
| `models[].model_id` | str | - | - | Value: person_detector_v1 |
| `models[].name` | str | - | - | Value: NETRA Person Detector |
| `models[].task` | str | - | - | Value: person_detection |
| `models[].framework` | str | - | - | Value: FOMO |
| `models[].version` | str | - | - | Value: 1.0.0 |
| `models[].status` | str | - | - | Value: evaluation |
| `models[].location` | str | - | - | Value: 03_AI/models/exported/ |
| `models[].input_type` | str | - | - | Value: image |
| `models[].output_type` | str | - | - | Value: detections |
| `models[].confidence_threshold` | float | - | - | Value: 0.6 |
| `fallbacks` | array | - | - | List of values |
| `fallbacks[].primary_model` | str | - | - | Value: person_detector_v1 |
| `fallbacks[].fallback` | str | - | - | Value: local_opencv_or_yolo |
| `fallbacks[].reason` | str | - | - | Value: ESP32 inference failure or insufficient accuracy |
| `evaluation` | object | - | - | Config section |
| `evaluation.required_metrics` | array | - | - | List of values |
| `evaluation.target_values_source` | str | - | - | Value: 08_TESTING/ACCURACY.md |

**Actual current content:**
```json
{
    "registry_version": "1.0",
    "models": [
        {
            "model_id": "person_detector_v1",
            "name": "NETRA Person Detector",
            "task": "person_detection",
            "framework": "FOMO",
            "version": "1.0.0",
            "status": "evaluation",
            "location": "03_AI/models/exported/",
            "input_type": "image",
            "output_type": "detections",
            "confidence_threshold": 0.6
        }
    ],
    "fallbacks": [
        {
            "primary_model": "person_detector_v1",
            "fallback": "local_opencv_or_yolo",
            "reason": "ESP32 inference failure or insufficient accuracy"
        }
    ],
    "evaluation": {
        "required_metrics": [
            "accuracy",
            "precision",
            "recall",
            "latency",
            "false_positive_rate",
            "false_negative_rate"
        ],
        "target_values_source": "08_TESTING/ACCURACY.md"
    }
}
```

## .\04_BACKEND\backend_config.json
**Owner:** Unknown
**Read by:** 04_BACKEND, .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `app_name` | str | - | - | Value: NETRA Backend |
| `api_prefix` | str | - | - | Value: /api |
| `host` | str | - | - | Value: 0.0.0.0 |
| `port` | int | - | - | Value: 8000 |
| `mqtt` | object | - | - | Config section |
| `mqtt.broker` | str | - | - | Value: localhost |
| `mqtt.port` | int | - | - | Value: 1883 |
| `mqtt.client_id` | str | - | - | Value: netra_backend |
| `mqtt.keepalive` | int | - | - | Value: 60 |
| `mqtt.topics` | array | - | - | List of values |
| `database` | object | - | - | Config section |
| `database.path` | str | - | - | Value: 99_RUNTIME/database/netra.db |
| `websocket` | object | - | - | Config section |
| `websocket.path` | str | - | - | Value: /ws/live |
| `logging` | object | - | - | Config section |
| `logging.level` | str | - | - | Value: INFO |

**Actual current content:**
```json
{
  "app_name": "NETRA Backend",
  "api_prefix": "/api",
  "host": "0.0.0.0",
  "port": 8000,
  "mqtt": {
    "broker": "localhost",
    "port": 1883,
    "client_id": "netra_backend",
    "keepalive": 60,
    "topics": ["netra/events/#"]
  },
  "database": {
    "path": "99_RUNTIME/database/netra.db"
  },
  "websocket": {
    "path": "/ws/live"
  },
  "logging": {
    "level": "INFO"
  }
}
```

## .\05_FRONTEND\package.json
**Owner:** Unknown
**Read by:** ., venv
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## .\06_DATA\sample\sample_cart.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "cart_id": "cart_1",
    "timestamp": "2026-09-12T10:00:00Z",
    "tare_weight_grams": 10000,
    "current_weight_grams": 11000,
    "weight_change_grams": 1000,
    "estimated_item_count": 5,
    "item_burden": "LOW",
    "confidence": 0.9
  },
  {
    "cart_id": "cart_2",
    "timestamp": "2026-09-12T10:01:00Z",
    "tare_weight_grams": 10000,
    "current_weight_grams": 25000,
    "weight_change_grams": 5000,
    "estimated_item_count": 30,
    "item_burden": "HIGH",
    "confidence": 0.85
  }
]
```

## .\06_DATA\sample\sample_events.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "schema_version": 1,
    "event_id": "evt_1",
    "timestamp": "2026-09-12T10:00:00Z",
    "device_id": "cam_1",
    "event_type": "ENTRY",
    "zone": "gate_1",
    "entity_id": "person_1",
    "payload": {},
    "confidence": 0.95,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_2",
    "timestamp": "2026-09-12T10:01:00Z",
    "device_id": "cam_1",
    "event_type": "EXIT",
    "zone": "gate_1",
    "entity_id": "person_2",
    "payload": {},
    "confidence": 0.90,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_3",
    "timestamp": "2026-09-12T10:02:00Z",
    "device_id": "scale_1",
    "event_type": "WEIGHT_CHANGE",
    "zone": "shelf_A",
    "entity_id": "item_1",
    "payload": {
      "weight_change": -200
    },
    "confidence": 0.99,
    "metadata": {}
  },
  {
    "schema_version": 1,
    "event_id": "evt_4",
    "timestamp": "2026-09-12T10:03:00Z",
    "device_id": "engine_1",
    "event_type": "ALERT",
    "zone": "store",
    "entity_id": "alert_1",
    "payload": {
      "level": "CRITICAL",
      "message": "Low stock"
    },
    "confidence": 1.0,
    "metadata": {}
  }
]
```

## .\06_DATA\sample\sample_inventory.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "sku": "SKU_1",
    "shelf_id": "shelf_A",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 1500,
    "estimated_quantity": 10,
    "threshold": 2,
    "status": "NORMAL",
    "last_updated": "2026-09-12T10:00:00Z",
    "confidence": 0.95
  },
  {
    "sku": "SKU_2",
    "shelf_id": "shelf_B",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 700,
    "estimated_quantity": 2,
    "threshold": 5,
    "status": "LOW",
    "last_updated": "2026-09-12T10:01:00Z",
    "confidence": 0.90
  },
  {
    "sku": "SKU_3",
    "shelf_id": "shelf_C",
    "tare_weight_grams": 500,
    "unit_weight_grams": 100,
    "current_weight_grams": 500,
    "estimated_quantity": 0,
    "threshold": 2,
    "status": "OUT_OF_STOCK",
    "last_updated": "2026-09-12T10:02:00Z",
    "confidence": 0.99
  }
]
```

## .\06_DATA\sample\sample_queue.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Sample data

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
[
  {
    "timestamp": "2026-09-12T10:00:00Z",
    "lane": "lane_1",
    "people_count": 1,
    "item_burden": "LOW",
    "estimated_item_count": 5,
    "estimated_wait_seconds": 30.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.9,
    "status": "NORMAL",
    "item_burden_source": "VISION_ESTIMATE"
  },
  {
    "timestamp": "2026-09-12T10:01:00Z",
    "lane": "lane_2",
    "people_count": 5,
    "item_burden": "MEDIUM",
    "estimated_item_count": 25,
    "estimated_wait_seconds": 150.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.85,
    "status": "WARNING",
    "item_burden_source": "VISION_ESTIMATE"
  },
  {
    "timestamp": "2026-09-12T10:02:00Z",
    "lane": "lane_3",
    "people_count": 10,
    "item_burden": "HIGH",
    "estimated_item_count": 50,
    "estimated_wait_seconds": 300.0,
    "service_rate_per_minute": 2.0,
    "confidence": 0.8,
    "status": "CRITICAL",
    "item_burden_source": "VISION_ESTIMATE"
  }
]
```

## .\06_DATA\schemas\cart_schema.json
**Owner:** Unknown
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `cart_id` | string | Yes |  |  |
| `timestamp` | string | Yes |  |  |
| `tare_weight_grams` | number | Yes |  |  |
| `current_weight_grams` | number | Yes |  |  |
| `weight_change_grams` | number | Yes |  |  |
| `estimated_item_count` | ['integer', 'null'] | No |  |  |
| `item_burden` | string | Yes | ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'] |  |
| `confidence` | number | Yes |  |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/cart/v1",
  "title": "NETRA Cart Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "cart_id",
    "timestamp",
    "tare_weight_grams",
    "current_weight_grams",
    "weight_change_grams",
    "item_burden",
    "confidence"
  ],
  "properties": {
    "cart_id": {
      "type": "string",
      "minLength": 1
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "tare_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "current_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "weight_change_grams": {
      "type": "number"
    },
    "estimated_item_count": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0
    },
    "item_burden": {
      "type": "string",
      "enum": [
        "LOW",
        "MEDIUM",
        "HIGH",
        "UNKNOWN"
      ]
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    }
  }
}
```

## .\06_DATA\schemas\event_schema.json
**Owner:** Unknown
**Read by:** ., 03_AI
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `schema_version` | integer | Yes |  |  |
| `event_id` | string | Yes |  |  |
| `timestamp` | string | Yes |  |  |
| `device_id` | string | Yes |  |  |
| `event_type` | string | Yes | ['ENTRY', 'EXIT', 'WEIGHT_CHANGE', 'ITEM_REMOVED', 'ITEM_ADDED', 'INVENTORY_UPDATE', 'CART_UPDATE', 'QUEUE_UPDATE', 'ALERT', 'HEALTH'] |  |
| `zone` | ['string', 'null'] | No |  |  |
| `entity_id` | ['string', 'null'] | No |  |  |
| `payload` | object | No |  |  |
| `payload.type` | str | - | - | Value: object |
| `confidence` | ['number', 'null'] | No |  |  |
| `metadata` | object | No |  |  |
| `metadata.type` | str | - | - | Value: object |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/event/v1",
  "title": "NETRA Event",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schema_version",
    "event_id",
    "timestamp",
    "device_id",
    "event_type"
  ],
  "properties": {
    "schema_version": {
      "type": "integer",
      "const": 1
    },
    "event_id": {
      "type": "string",
      "minLength": 1
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "device_id": {
      "type": "string",
      "minLength": 1
    },
    "event_type": {
      "type": "string",
      "enum": [
        "ENTRY",
        "EXIT",
        "WEIGHT_CHANGE",
        "ITEM_REMOVED",
        "ITEM_ADDED",
        "INVENTORY_UPDATE",
        "CART_UPDATE",
        "QUEUE_UPDATE",
        "ALERT",
        "HEALTH"
      ]
    },
    "zone": {
      "type": [
        "string",
        "null"
      ]
    },
    "entity_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "payload": {
      "type": "object"
    },
    "confidence": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0,
      "maximum": 1
    },
    "metadata": {
      "type": "object"
    }
  }
}
```

## .\06_DATA\schemas\inventory_schema.json
**Owner:** Unknown
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `sku` | string | Yes |  |  |
| `shelf_id` | string | Yes |  |  |
| `tare_weight_grams` | number | Yes |  |  |
| `unit_weight_grams` | number | Yes |  |  |
| `current_weight_grams` | number | Yes |  |  |
| `estimated_quantity` | integer | Yes |  |  |
| `threshold` | integer | Yes |  |  |
| `last_updated` | string | Yes |  |  |
| `confidence` | number | Yes |  |  |
| `status` | string | Yes | ['NORMAL', 'LOW', 'OUT_OF_STOCK', 'UNCERTAIN'] |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/inventory/v1",
  "title": "NETRA Inventory Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "sku",
    "shelf_id",
    "tare_weight_grams",
    "unit_weight_grams",
    "current_weight_grams",
    "estimated_quantity",
    "threshold",
    "status",
    "last_updated",
    "confidence"
  ],
  "properties": {
    "sku": {
      "type": "string",
      "minLength": 1
    },
    "shelf_id": {
      "type": "string",
      "minLength": 1
    },
    "tare_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "unit_weight_grams": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "current_weight_grams": {
      "type": "number",
      "minimum": 0
    },
    "estimated_quantity": {
      "type": "integer",
      "minimum": 0
    },
    "threshold": {
      "type": "integer",
      "minimum": 0
    },
    "last_updated": {
      "type": "string",
      "format": "date-time"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "NORMAL",
        "LOW",
        "OUT_OF_STOCK",
        "UNCERTAIN"
      ]
    }
  }
}
```

## .\06_DATA\schemas\queue_schema.json
**Owner:** Unknown
**Read by:** ., 03_AI, 07_INTEGRATION
**Purpose:** JSON Schema definition

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `timestamp` | string | Yes |  |  |
| `lane` | string | Yes |  |  |
| `people_count` | integer | Yes |  |  |
| `item_burden` | string | Yes | ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'] |  |
| `estimated_item_count` | ['integer', 'null'] | No |  |  |
| `estimated_wait_seconds` | number | Yes |  |  |
| `service_rate_per_minute` | ['number', 'null'] | No |  |  |
| `confidence` | number | Yes |  |  |
| `status` | string | Yes | ['NORMAL', 'WARNING', 'CRITICAL'] |  |
| `item_burden_source` | string | Yes | ['CART_SENSOR', 'VISION_ESTIMATE', 'HISTORICAL_ESTIMATE', 'UNKNOWN'] |  |

**Actual current content:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "netra://schemas/queue/v1",
  "title": "NETRA Queue Record",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "timestamp",
    "lane",
    "people_count",
    "item_burden",
    "estimated_wait_seconds",
    "item_burden_source",
    "status",
    "confidence"
  ],
  "properties": {
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "lane": {
      "type": "string",
      "minLength": 1
    },
    "people_count": {
      "type": "integer",
      "minimum": 0
    },
    "item_burden": {
      "type": "string",
      "enum": [
        "LOW",
        "MEDIUM",
        "HIGH",
        "UNKNOWN"
      ]
    },
    "estimated_item_count": {
      "type": [
        "integer",
        "null"
      ],
      "minimum": 0
    },
    "estimated_wait_seconds": {
      "type": "number",
      "minimum": 0
    },
    "service_rate_per_minute": {
      "type": [
        "number",
        "null"
      ],
      "minimum": 0
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "NORMAL",
        "WARNING",
        "CRITICAL"
      ]
    },
    "item_burden_source": {
      "type": "string",
      "enum": [
        "CART_SENSOR",
        "VISION_ESTIMATE",
        "HISTORICAL_ESTIMATE",
        "UNKNOWN"
      ]
    }
  }
}
```

## .\07_INTEGRATION\api_contract.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `api_version` | str | - | - | Value: v1 |
| `base_path` | str | - | - | Value: /api |
| `endpoints` | object | - | - | Config section |
| `endpoints.health` | object | - | - | Config section |
| `endpoints.health.method` | str | - | - | Value: GET |
| `endpoints.health.path` | str | - | - | Value: /health |
| `endpoints.health.owner` | str | - | - | Value: Soham |
| `endpoints.events` | object | - | - | Config section |
| `endpoints.events.method` | str | - | - | Value: POST |
| `endpoints.events.path` | str | - | - | Value: /events |
| `endpoints.events.owner` | str | - | - | Value: Soham |
| `endpoints.entry_exit` | object | - | - | Config section |
| `endpoints.entry_exit.method` | str | - | - | Value: POST |
| `endpoints.entry_exit.path` | str | - | - | Value: /entry-exit |
| `endpoints.entry_exit.owner` | str | - | - | Value: Soham |
| `endpoints.inventory` | object | - | - | Config section |
| `endpoints.inventory.method` | str | - | - | Value: GET |
| `endpoints.inventory.path` | str | - | - | Value: /inventory |
| `endpoints.inventory.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.queue` | object | - | - | Config section |
| `endpoints.queue.method` | str | - | - | Value: GET |
| `endpoints.queue.path` | str | - | - | Value: /queue |
| `endpoints.queue.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.cart` | object | - | - | Config section |
| `endpoints.cart.method` | str | - | - | Value: GET |
| `endpoints.cart.path` | str | - | - | Value: /cart |
| `endpoints.cart.owner` | str | - | - | Value: Phantom_Soham |
| `endpoints.alerts` | object | - | - | Config section |
| `endpoints.alerts.method` | str | - | - | Value: GET |
| `endpoints.alerts.path` | str | - | - | Value: /alerts |
| `endpoints.alerts.owner` | str | - | - | Value: Soham |
| `endpoints.dashboard` | object | - | - | Config section |
| `endpoints.dashboard.method` | str | - | - | Value: GET |
| `endpoints.dashboard.path` | str | - | - | Value: /dashboard |
| `endpoints.dashboard.owner` | str | - | - | Value: Soham |
| `websocket` | object | - | - | Config section |
| `websocket.path` | str | - | - | Value: /ws/live |
| `websocket.events` | array | - | - | List of values |

**Actual current content:**
```json
{
  "api_version": "v1",
  "base_path": "/api",
  "endpoints": {
    "health": {
      "method": "GET",
      "path": "/health",
      "owner": "Soham"
    },
    "events": {
      "method": "POST",
      "path": "/events",
      "owner": "Soham"
    },
    "entry_exit": {
      "method": "POST",
      "path": "/entry-exit",
      "owner": "Soham"
    },
    "inventory": {
      "method": "GET",
      "path": "/inventory",
      "owner": "Phantom_Soham"
    },
    "queue": {
      "method": "GET",
      "path": "/queue",
      "owner": "Phantom_Soham"
    },
    "cart": {
      "method": "GET",
      "path": "/cart",
      "owner": "Phantom_Soham"
    },
    "alerts": {
      "method": "GET",
      "path": "/alerts",
      "owner": "Soham"
    },
    "dashboard": {
      "method": "GET",
      "path": "/dashboard",
      "owner": "Soham"
    }
  },
  "websocket": {
    "path": "/ws/live",
    "events": [
      "ENTRY",
      "EXIT",
      "INVENTORY_UPDATE",
      "CART_UPDATE",
      "QUEUE_UPDATE",
      "ALERT",
      "HEALTH"
    ]
  }
}
```

## .\07_INTEGRATION\device_registry.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `devices` | array | - | - | List of values |
| `devices[].device_id` | str | - | - | Value: esp32_cam_entry |
| `devices[].type` | str | - | - | Value: camera |
| `devices[].mqtt_topic` | str | - | - | Value: netra/entry |
| `devices[].data_expected` | array | - | - | List of values |

**Actual current content:**
```json
{
  "devices": [
    {
      "device_id": "esp32_cam_entry",
      "type": "camera",
      "mqtt_topic": "netra/entry",
      "data_expected": ["ENTRY", "EXIT"]
    },
    {
      "device_id": "esp32_cam_queue",
      "type": "camera",
      "mqtt_topic": "-netra/queue",
      "data_expected": ["QUEUE_UPDATE"]
    },
    {
      "device_id": "esp32_sensor_node",
      "type": "sensor",
      "mqtt_topic": "netra/events/weight",
      "data_expected": ["WEIGHT_CHANGE"]
    },
    {
      "device_id": "cart_node",
      "type": "sensor",
      "mqtt_topic": "netra/cart",
      "data_expected": ["CART_UPDATE"]
    }
  ]
}
```

## .\07_INTEGRATION\integration_config.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `pipelines` | object | - | - | Config section |
| `pipelines.entry` | object | - | - | Config section |
| `pipelines.entry.input` | str | - | - | Value: netra/entry |
| `pipelines.entry.output` | str | - | - | Value: websocket |
| `pipelines.inventory` | object | - | - | Config section |
| `pipelines.inventory.input` | str | - | - | Value: netra/events/weight |
| `pipelines.inventory.output` | str | - | - | Value: inventory_schema.json |
| `pipelines.cart` | object | - | - | Config section |
| `pipelines.cart.input` | str | - | - | Value: netra/cart |
| `pipelines.cart.output` | str | - | - | Value: cart_schema.json |
| `pipelines.queue` | object | - | - | Config section |
| `pipelines.queue.input` | str | - | - | Value: netra/queue |
| `pipelines.queue.output` | str | - | - | Value: queue_schema.json |

**Actual current content:**
```json
{
  "pipelines": {
    "entry": {
      "input": "netra/entry",
      "output": "websocket"
    },
    "inventory": {
      "input": "netra/events/weight",
      "output": "inventory_schema.json"
    },
    "cart": {
      "input": "netra/cart",
      "output": "cart_schema.json"
    },
    "queue": {
      "input": "netra/queue",
      "output": "queue_schema.json"
    }
  }
}
```

## .\08_TESTING\test_config.json
**Owner:** Unknown
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `backend_url` | str | - | - | Value: http://localhost:8000 |
| `mqtt_broker` | str | - | - | Value: localhost |
| `mqtt_port` | int | - | - | Value: 1883 |
| `test_topics` | array | - | - | List of values |
| `required_tests` | object | - | - | Config section |
| `required_tests.backend` | array | - | - | List of values |
| `required_tests.failure` | array | - | - | List of values |
| `performance_targets` | object | - | - | Config section |
| `performance_targets.event_to_backend_ms` | int | - | - | Value: 500 |
| `performance_targets.api_response_ms` | int | - | - | Value: 1000 |

**Actual current content:**
```json
{
  "backend_url": "http://localhost:8000",
  "mqtt_broker": "localhost",
  "mqtt_port": 1883,
  "test_topics": ["netra/test/#"],
  
  "required_tests": {
    "backend": [
      "backend_health",
      "api_request",
      "event_to_backend"
    ],
    "failure": [
      "backend_unavailable",
      "mqtt_disconnect",
      "invalid_event"
    ]
  },

  "performance_targets": {
    "event_to_backend_ms": 500,
    "api_response_ms": 1000
  }
}
```

## .\package.json
**Owner:** Unknown
**Read by:** ., venv
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## package.json
**Owner:** Mighty (P5)
**Read by:** ., venv
**Purpose:** Configuration file

**FILE MISSING / EMPTY — not yet populated**
*(Schema below inferred from purpose/contract where possible, otherwise blank)*

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| N/A | N/A | N/A | N/A | No structure available |

**Actual current content:**
```json
// EMPTY FILE
```

## Cross-Reference Map
| JSON File | Owner | Consumers (Read By) |
|---|---|---|
| `00_PROJECT/project_config.json` | Mighty (P5) | . |
| `01_ARCHITECTURE/architecture_config.json` | Phantom (P1) | . |
| `02_HARDWARE/registry/devices.json` | Mighty (P5) | Soham, Phantom, Akash, Team+1 |
| `02_HARDWARE/registry/components.json` | Mighty (P5) | Soham, Phantom, Akash, Team+1 |
| `02_HARDWARE/registry/calibration_index.json` | Mighty (P5) | Soham, Phantom, Akash, Team+1 |
| `02_HARDWARE/registry/bom_summary.json` | Team+1 (P6) | Mighty, Team+1 |
| `03_AI/AI_CONFIG.json` | Phantom (P1) | 04_BACKEND, ., 03_AI, 08_TESTING |
| `03_AI/MODEL_REGISTRY.json` | Phantom (P1) | . |
| `04_BACKEND/backend_config.json` | Soham (P2) | 04_BACKEND, . |
| `05_FRONTEND/package.json` | Cherry (P4) | ., venv |
| `06_DATA/sample/sample_cart.json` | Soham (P2) | . |
| `06_DATA/sample/sample_events.json` | Soham (P2) | . |
| `06_DATA/sample/sample_inventory.json` | Soham (P2) | . |
| `06_DATA/sample/sample_queue.json` | Soham (P2) | . |
| `06_DATA/schemas/cart_schema.json` | Phantom (P1) | ., 03_AI, 07_INTEGRATION |
| `06_DATA/schemas/event_schema.json` | Phantom (P1) | ., 03_AI |
| `06_DATA/schemas/inventory_schema.json` | Phantom (P1) | ., 03_AI, 07_INTEGRATION |
| `06_DATA/schemas/queue_schema.json` | Phantom (P1) | ., 03_AI, 07_INTEGRATION |
| `07_INTEGRATION/api_contract.json` | Soham (P2) & Phantom (P1) | . |
| `07_INTEGRATION/device_registry.json` | Soham (P2) & Phantom (P1) | . |
| `07_INTEGRATION/integration_config.json` | Soham (P2) & Phantom (P1) | . |
| `08_TESTING/test_config.json` | Team+1 (P6) | . |
| `09_SECURITY/security_config.json` | Cherry (P4) | . |
| `10_DEMO/demo_config.json` | Mighty (P5) | . |
| `.\00_PROJECT\project_config.json` | Unknown | . |
| `.\01_ARCHITECTURE\architecture_config.json` | Unknown | . |

| `.\03_AI\AI_CONFIG.json` | Unknown | 04_BACKEND, ., 03_AI, 08_TESTING |
| `.\03_AI\MODEL_REGISTRY.json` | Unknown | . |
| `.\04_BACKEND\backend_config.json` | Unknown | 04_BACKEND, . |
| `.\05_FRONTEND\package.json` | Unknown | ., venv |
| `.\06_DATA\sample\sample_cart.json` | Unknown | . |
| `.\06_DATA\sample\sample_events.json` | Unknown | . |
| `.\06_DATA\sample\sample_inventory.json` | Unknown | . |
| `.\06_DATA\sample\sample_queue.json` | Unknown | . |
| `.\06_DATA\schemas\cart_schema.json` | Unknown | ., 03_AI, 07_INTEGRATION |
| `.\06_DATA\schemas\event_schema.json` | Unknown | ., 03_AI |
| `.\06_DATA\schemas\inventory_schema.json` | Unknown | ., 03_AI, 07_INTEGRATION |
| `.\06_DATA\schemas\queue_schema.json` | Unknown | ., 03_AI, 07_INTEGRATION |
| `.\07_INTEGRATION\api_contract.json` | Unknown | . |
| `.\07_INTEGRATION\device_registry.json` | Unknown | . |
| `.\07_INTEGRATION\integration_config.json` | Unknown | . |
| `.\08_TESTING\test_config.json` | Unknown | . |
| `.\package.json` | Unknown | ., venv |
| `package.json` | Mighty (P5) | ., venv |