# JSON Format Reference

**Summary:** Found 36 defined JSON files. 33 are fully populated, 3 are MISSING/EMPTY.
The owner responsible for the most JSON files is **Cherry (P4)**.

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

## 02_HARDWARE/cart_node/calibration/cart_01.json
**Owner:** Mighty (P5)
**Read by:** 02_HARDWARE
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `baseline` | NoneType | - | - | Value: None |
| `tare_grams` | NoneType | - | - | Value: None |
| `calibrated_at` | NoneType | - | - | Value: None |

**Actual current content:**
```json
{
  "baseline": null,
  "tare_grams": null,
  "calibrated_at": null
}
```

## 02_HARDWARE/esp32_shelf_node/calibration/shelf_A.json
**Owner:** Mighty (P5)
**Read by:** 06_DATA, 02_HARDWARE, 05_FRONTEND
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `baseline` | NoneType | - | - | Value: None |
| `tare_grams` | NoneType | - | - | Value: None |
| `calibrated_at` | NoneType | - | - | Value: None |

**Actual current content:**
```json
{
  "baseline": null,
  "tare_grams": null,
  "calibrated_at": null
}
```

## 02_HARDWARE/registry/cart_registry.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `device_id` | str | - | - | Value: cart_node |
| `type` | str | - | - | Value: ESP32-WROOM |
| `camera` | NoneType | - | - | Value: None |
| `quantity` | int | - | - | Value: 1 |
| `role` | str | - | - | Value: cart_sensor |
| `mqtt_topic` | str | - | - | Value: netra/cart |
| `location` | str | - | - | Value: shopping_cart_01 |
| `calibration_ref` | str | - | - | Value: calibration/cart_01 |
| `local_components` | array | - | - | List of values |
| `local_components[].component_id` | str | - | - | Value: hx711_cart |
| `local_components[].type` | str | - | - | Value: HX711 |
| `local_components[].quantity` | int | - | - | Value: 1 |
| `local_components[].role` | str | - | - | Value: cart_weight |

**Actual current content:**
```json
{
  "device_id": "cart_node",
  "type": "ESP32-WROOM",
  "camera": null,
  "quantity": 1,
  "role": "cart_sensor",
  "mqtt_topic": "netra/cart",
  "location": "shopping_cart_01",
  "calibration_ref": "calibration/cart_01",
  "local_components": [
    {
      "component_id": "hx711_cart",
      "type": "HX711",
      "quantity": 1,
      "role": "cart_weight"
    },
    {
      "component_id": "load_cell_cart",
      "type": "load_cell",
      "quantity": 1,
      "role": "cart_weight"
    },
    {
      "component_id": "pir_cart",
      "type": "PIR",
      "quantity": 1,
      "role": "cart_motion"
    }
  ]
}
```

## 02_HARDWARE/registry/entry_registry.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `device_id` | str | - | - | Value: esp32_cam_entry |
| `type` | str | - | - | Value: ESP32-CAM |
| `camera` | str | - | - | Value: OV2640 |
| `quantity` | int | - | - | Value: 1 |
| `role` | str | - | - | Value: entry_exit |
| `mqtt_topic` | str | - | - | Value: netra/entry |
| `location` | str | - | - | Value: store_entrance |
| `calibration_ref` | NoneType | - | - | Value: None |
| `local_components` | array | - | - | List of values |

**Actual current content:**
```json
{
  "device_id": "esp32_cam_entry",
  "type": "ESP32-CAM",
  "camera": "OV2640",
  "quantity": 1,
  "role": "entry_exit",
  "mqtt_topic": "netra/entry",
  "location": "store_entrance",
  "calibration_ref": null,
  "local_components": []
}
```

## 02_HARDWARE/registry/queue_registry.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `device_id` | str | - | - | Value: esp32_cam_queue |
| `type` | str | - | - | Value: ESP32-CAM |
| `camera` | str | - | - | Value: OV2640 |
| `quantity` | int | - | - | Value: 1 |
| `role` | str | - | - | Value: queue_detection |
| `mqtt_topic` | str | - | - | Value: netra/queue |
| `location` | str | - | - | Value: checkout_zone |
| `calibration_ref` | NoneType | - | - | Value: None |
| `local_components` | array | - | - | List of values |

**Actual current content:**
```json
{
  "device_id": "esp32_cam_queue",
  "type": "ESP32-CAM",
  "camera": "OV2640",
  "quantity": 1,
  "role": "queue_detection",
  "mqtt_topic": "netra/queue",
  "location": "checkout_zone",
  "calibration_ref": null,
  "local_components": []
}
```

## 02_HARDWARE/registry/shelf_registry.json
**Owner:** Mighty (P5)
**Read by:** .
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `device_id` | str | - | - | Value: esp32_sensor_node |
| `type` | str | - | - | Value: ESP32-WROOM |
| `camera` | NoneType | - | - | Value: None |
| `quantity` | int | - | - | Value: 1 |
| `role` | str | - | - | Value: shelf_sensor |
| `mqtt_topic` | str | - | - | Value: netra/events/weight |
| `location` | str | - | - | Value: shelf_A |
| `calibration_ref` | str | - | - | Value: calibration/shelf_A |
| `local_components` | array | - | - | List of values |
| `local_components[].component_id` | str | - | - | Value: hx711_shelf |
| `local_components[].type` | str | - | - | Value: HX711 |
| `local_components[].quantity` | int | - | - | Value: 2 |
| `local_components[].role` | str | - | - | Value: shelf_weight |

**Actual current content:**
```json
{
  "device_id": "esp32_sensor_node",
  "type": "ESP32-WROOM",
  "camera": null,
  "quantity": 1,
  "role": "shelf_sensor",
  "mqtt_topic": "netra/events/weight",
  "location": "shelf_A",
  "calibration_ref": "calibration/shelf_A",
  "local_components": [
    {
      "component_id": "hx711_shelf",
      "type": "HX711",
      "quantity": 2,
      "role": "shelf_weight"
    },
    {
      "component_id": "load_cell_shelf",
      "type": "load_cell",
      "quantity": 2,
      "role": "shelf_weight"
    }
  ]
}
```

## 03_AI/AI_CONFIG.json
**Owner:** Phantom (P1)
**Read by:** 04_BACKEND, 03_AI, ., 08_TESTING
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

## 05_FRONTEND/dist/sample_data/sample_cart.json
**Owner:** Cherry (P4)
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

## 05_FRONTEND/dist/sample_data/sample_events.json
**Owner:** Cherry (P4)
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

## 05_FRONTEND/dist/sample_data/sample_inventory.json
**Owner:** Cherry (P4)
**Read by:** ., 05_FRONTEND
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

## 05_FRONTEND/dist/sample_data/sample_queue.json
**Owner:** Cherry (P4)
**Read by:** ., 05_FRONTEND
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

## 05_FRONTEND/package-lock.json
**Owner:** Cherry (P4)
**Read by:** None detected
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `name` | str | - | - | Value: netra-frontend |
| `version` | str | - | - | Value: 0.1.0 |
| `lockfileVersion` | int | - | - | Value: 3 |
| `requires` | bool | - | - | Value: True |
| `packages` | object | - | - | Config section |
| `packages.` | object | - | - | Config section |
| `packages..name` | str | - | - | Value: netra-frontend |
| `packages..version` | str | - | - | Value: 0.1.0 |
| `packages..dependencies` | object | - | - | Config section |
| `packages..dependencies.clsx` | str | - | - | Value: ^2.1.1 |
| `packages..dependencies.framer-motion` | str | - | - | Value: ^11.2.10 |
| `packages..dependencies.lucide-react` | str | - | - | Value: ^0.395.0 |
| `packages..dependencies.react` | str | - | - | Value: ^18.3.1 |
| `packages..dependencies.react-dom` | str | - | - | Value: ^18.3.1 |
| `packages..dependencies.react-router-dom` | str | - | - | Value: ^6.24.0 |
| `packages..dependencies.recharts` | str | - | - | Value: ^2.12.7 |
| `packages..dependencies.tailwind-merge` | str | - | - | Value: ^2.3.0 |
| `packages..devDependencies` | object | - | - | Config section |
| `packages..devDependencies.@vitejs/plugin-react` | str | - | - | Value: ^4.3.1 |
| `packages..devDependencies.autoprefixer` | str | - | - | Value: ^10.4.19 |
| `packages..devDependencies.postcss` | str | - | - | Value: ^8.4.38 |
| `packages..devDependencies.tailwindcss` | str | - | - | Value: ^3.4.4 |
| `packages..devDependencies.vite` | str | - | - | Value: ^5.3.1 |
| `packages.node_modules/@alloc/quick-lru` | object | - | - | Config section |
| `packages.node_modules/@alloc/quick-lru.version` | str | - | - | Value: 5.3.0 |
| `packages.node_modules/@alloc/quick-lru.integrity` | str | - | - | Value: sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA== |
| `packages.node_modules/@alloc/quick-lru.dev` | bool | - | - | Value: True |
| `packages.node_modules/@alloc/quick-lru.license` | str | - | - | Value: MIT |
| `packages.node_modules/@alloc/quick-lru.engines` | object | - | - | Config section |
| `packages.node_modules/@alloc/quick-lru.engines.node` | str | - | - | Value: >=10 |
| `packages.node_modules/@alloc/quick-lru.funding` | object | - | - | Config section |
| `packages.node_modules/@alloc/quick-lru.funding.url` | str | - | - | Value: https://github.com/sponsors/sindresorhus |
| `packages.node_modules/@babel/code-frame` | object | - | - | Config section |
| `packages.node_modules/@babel/code-frame.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/code-frame.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz |
| `packages.node_modules/@babel/code-frame.integrity` | str | - | - | Value: sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw== |
| `packages.node_modules/@babel/code-frame.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/code-frame.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/code-frame.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/code-frame.dependencies.@babel/helper-validator-identifier` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/code-frame.dependencies.js-tokens` | str | - | - | Value: ^4.0.0 |
| `packages.node_modules/@babel/code-frame.dependencies.picocolors` | str | - | - | Value: ^1.1.1 |
| `packages.node_modules/@babel/code-frame.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/code-frame.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/compat-data` | object | - | - | Config section |
| `packages.node_modules/@babel/compat-data.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/compat-data.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz |
| `packages.node_modules/@babel/compat-data.integrity` | str | - | - | Value: sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg== |
| `packages.node_modules/@babel/compat-data.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/compat-data.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/compat-data.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/compat-data.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/core` | object | - | - | Config section |
| `packages.node_modules/@babel/core.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/core.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz |
| `packages.node_modules/@babel/core.integrity` | str | - | - | Value: sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA== |
| `packages.node_modules/@babel/core.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/core.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/core.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/core.dependencies.@babel/code-frame` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/generator` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/helper-compilation-targets` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/helper-module-transforms` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/helpers` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/parser` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/template` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/traverse` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@babel/types` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/core.dependencies.@jridgewell/remapping` | str | - | - | Value: ^2.3.5 |
| `packages.node_modules/@babel/core.dependencies.convert-source-map` | str | - | - | Value: ^2.0.0 |
| `packages.node_modules/@babel/core.dependencies.debug` | str | - | - | Value: ^4.1.0 |
| `packages.node_modules/@babel/core.dependencies.gensync` | str | - | - | Value: ^1.0.0-beta.2 |
| `packages.node_modules/@babel/core.dependencies.json5` | str | - | - | Value: ^2.2.3 |
| `packages.node_modules/@babel/core.dependencies.semver` | str | - | - | Value: ^6.3.1 |
| `packages.node_modules/@babel/core.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/core.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/core.funding` | object | - | - | Config section |
| `packages.node_modules/@babel/core.funding.type` | str | - | - | Value: opencollective |
| `packages.node_modules/@babel/core.funding.url` | str | - | - | Value: https://opencollective.com/babel |
| `packages.node_modules/@babel/generator` | object | - | - | Config section |
| `packages.node_modules/@babel/generator.version` | str | - | - | Value: 7.29.8 |
| `packages.node_modules/@babel/generator.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz |
| `packages.node_modules/@babel/generator.integrity` | str | - | - | Value: sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg== |
| `packages.node_modules/@babel/generator.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/generator.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/generator.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/generator.dependencies.@babel/parser` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/generator.dependencies.@babel/types` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/generator.dependencies.@jridgewell/gen-mapping` | str | - | - | Value: ^0.3.12 |
| `packages.node_modules/@babel/generator.dependencies.@jridgewell/trace-mapping` | str | - | - | Value: ^0.3.28 |
| `packages.node_modules/@babel/generator.dependencies.jsesc` | str | - | - | Value: ^3.0.2 |
| `packages.node_modules/@babel/generator.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/generator.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-compilation-targets` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-compilation-targets.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-compilation-targets.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz |
| `packages.node_modules/@babel/helper-compilation-targets.integrity` | str | - | - | Value: sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g== |
| `packages.node_modules/@babel/helper-compilation-targets.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-compilation-targets.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies.@babel/compat-data` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies.@babel/helper-validator-option` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies.browserslist` | str | - | - | Value: ^4.24.0 |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies.lru-cache` | str | - | - | Value: ^5.1.1 |
| `packages.node_modules/@babel/helper-compilation-targets.dependencies.semver` | str | - | - | Value: ^6.3.1 |
| `packages.node_modules/@babel/helper-compilation-targets.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-compilation-targets.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-globals` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-globals.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-globals.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz |
| `packages.node_modules/@babel/helper-globals.integrity` | str | - | - | Value: sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA== |
| `packages.node_modules/@babel/helper-globals.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-globals.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-globals.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-globals.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-module-imports` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-imports.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-module-imports.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz |
| `packages.node_modules/@babel/helper-module-imports.integrity` | str | - | - | Value: sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g== |
| `packages.node_modules/@babel/helper-module-imports.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-module-imports.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-module-imports.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-imports.dependencies.@babel/traverse` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-module-imports.dependencies.@babel/types` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-module-imports.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-imports.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-module-transforms` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-transforms.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-module-transforms.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz |
| `packages.node_modules/@babel/helper-module-transforms.integrity` | str | - | - | Value: sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg== |
| `packages.node_modules/@babel/helper-module-transforms.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-module-transforms.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-module-transforms.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-transforms.dependencies.@babel/helper-module-imports` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-module-transforms.dependencies.@babel/helper-validator-identifier` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-module-transforms.dependencies.@babel/traverse` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helper-module-transforms.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-transforms.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-module-transforms.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-module-transforms.peerDependencies.@babel/core` | str | - | - | Value: ^7.0.0 |
| `packages.node_modules/@babel/helper-plugin-utils` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-plugin-utils.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-plugin-utils.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz |
| `packages.node_modules/@babel/helper-plugin-utils.integrity` | str | - | - | Value: sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw== |
| `packages.node_modules/@babel/helper-plugin-utils.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-plugin-utils.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-plugin-utils.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-plugin-utils.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-string-parser` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-string-parser.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-string-parser.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz |
| `packages.node_modules/@babel/helper-string-parser.integrity` | str | - | - | Value: sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw== |
| `packages.node_modules/@babel/helper-string-parser.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-string-parser.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-string-parser.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-string-parser.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-validator-identifier` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-validator-identifier.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-validator-identifier.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz |
| `packages.node_modules/@babel/helper-validator-identifier.integrity` | str | - | - | Value: sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg== |
| `packages.node_modules/@babel/helper-validator-identifier.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-validator-identifier.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-validator-identifier.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-validator-identifier.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helper-validator-option` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-validator-option.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helper-validator-option.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz |
| `packages.node_modules/@babel/helper-validator-option.integrity` | str | - | - | Value: sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw== |
| `packages.node_modules/@babel/helper-validator-option.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helper-validator-option.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helper-validator-option.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helper-validator-option.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/helpers` | object | - | - | Config section |
| `packages.node_modules/@babel/helpers.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/helpers.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz |
| `packages.node_modules/@babel/helpers.integrity` | str | - | - | Value: sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg== |
| `packages.node_modules/@babel/helpers.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/helpers.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/helpers.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/helpers.dependencies.@babel/template` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helpers.dependencies.@babel/types` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/helpers.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/helpers.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/parser` | object | - | - | Config section |
| `packages.node_modules/@babel/parser.version` | str | - | - | Value: 7.29.8 |
| `packages.node_modules/@babel/parser.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/parser/-/parser-7.29.8.tgz |
| `packages.node_modules/@babel/parser.integrity` | str | - | - | Value: sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA== |
| `packages.node_modules/@babel/parser.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/parser.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/parser.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/parser.dependencies.@babel/types` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/parser.bin` | object | - | - | Config section |
| `packages.node_modules/@babel/parser.bin.parser` | str | - | - | Value: bin/babel-parser.js |
| `packages.node_modules/@babel/parser.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/parser.engines.node` | str | - | - | Value: >=6.0.0 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.integrity` | str | - | - | Value: sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw== |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.dependencies.@babel/helper-plugin-utils` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-self.peerDependencies.@babel/core` | str | - | - | Value: ^7.0.0-0 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.integrity` | str | - | - | Value: sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q== |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.dependencies.@babel/helper-plugin-utils` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/plugin-transform-react-jsx-source.peerDependencies.@babel/core` | str | - | - | Value: ^7.0.0-0 |
| `packages.node_modules/@babel/runtime` | object | - | - | Config section |
| `packages.node_modules/@babel/runtime.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/runtime.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz |
| `packages.node_modules/@babel/runtime.integrity` | str | - | - | Value: sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw== |
| `packages.node_modules/@babel/runtime.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/runtime.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/runtime.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/template` | object | - | - | Config section |
| `packages.node_modules/@babel/template.version` | str | - | - | Value: 7.29.7 |
| `packages.node_modules/@babel/template.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz |
| `packages.node_modules/@babel/template.integrity` | str | - | - | Value: sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg== |
| `packages.node_modules/@babel/template.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/template.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/template.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/template.dependencies.@babel/code-frame` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/template.dependencies.@babel/parser` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/template.dependencies.@babel/types` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/template.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/template.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/traverse` | object | - | - | Config section |
| `packages.node_modules/@babel/traverse.version` | str | - | - | Value: 7.29.8 |
| `packages.node_modules/@babel/traverse.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz |
| `packages.node_modules/@babel/traverse.integrity` | str | - | - | Value: sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg== |
| `packages.node_modules/@babel/traverse.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/traverse.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/traverse.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/traverse.dependencies.@babel/code-frame` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/traverse.dependencies.@babel/generator` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/traverse.dependencies.@babel/helper-globals` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/traverse.dependencies.@babel/parser` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/traverse.dependencies.@babel/template` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/traverse.dependencies.@babel/types` | str | - | - | Value: ^7.29.8 |
| `packages.node_modules/@babel/traverse.dependencies.debug` | str | - | - | Value: ^4.3.1 |
| `packages.node_modules/@babel/traverse.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/traverse.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@babel/types` | object | - | - | Config section |
| `packages.node_modules/@babel/types.version` | str | - | - | Value: 7.29.8 |
| `packages.node_modules/@babel/types.resolved` | str | - | - | Value: https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz |
| `packages.node_modules/@babel/types.integrity` | str | - | - | Value: sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg== |
| `packages.node_modules/@babel/types.dev` | bool | - | - | Value: True |
| `packages.node_modules/@babel/types.license` | str | - | - | Value: MIT |
| `packages.node_modules/@babel/types.dependencies` | object | - | - | Config section |
| `packages.node_modules/@babel/types.dependencies.@babel/helper-string-parser` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/types.dependencies.@babel/helper-validator-identifier` | str | - | - | Value: ^7.29.7 |
| `packages.node_modules/@babel/types.engines` | object | - | - | Config section |
| `packages.node_modules/@babel/types.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/@esbuild/aix-ppc64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/aix-ppc64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/aix-ppc64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz |
| `packages.node_modules/@esbuild/aix-ppc64.integrity` | str | - | - | Value: sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ== |
| `packages.node_modules/@esbuild/aix-ppc64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/aix-ppc64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/aix-ppc64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/aix-ppc64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/aix-ppc64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/aix-ppc64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/aix-ppc64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/android-arm` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-arm.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/android-arm.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz |
| `packages.node_modules/@esbuild/android-arm.integrity` | str | - | - | Value: sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg== |
| `packages.node_modules/@esbuild/android-arm.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-arm.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-arm.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/android-arm.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-arm.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-arm.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-arm.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/android-arm64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-arm64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/android-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz |
| `packages.node_modules/@esbuild/android-arm64.integrity` | str | - | - | Value: sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A== |
| `packages.node_modules/@esbuild/android-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/android-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-arm64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-arm64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/android-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/android-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/android-x64.integrity` | str | - | - | Value: sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA== |
| `packages.node_modules/@esbuild/android-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/android-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/android-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/android-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/android-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/darwin-arm64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/darwin-arm64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/darwin-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz |
| `packages.node_modules/@esbuild/darwin-arm64.integrity` | str | - | - | Value: sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ== |
| `packages.node_modules/@esbuild/darwin-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/darwin-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/darwin-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/darwin-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/darwin-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/darwin-arm64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/darwin-arm64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/darwin-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/darwin-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/darwin-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/darwin-x64.integrity` | str | - | - | Value: sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw== |
| `packages.node_modules/@esbuild/darwin-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/darwin-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/darwin-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/darwin-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/darwin-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/darwin-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/darwin-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/freebsd-arm64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/freebsd-arm64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/freebsd-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz |
| `packages.node_modules/@esbuild/freebsd-arm64.integrity` | str | - | - | Value: sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g== |
| `packages.node_modules/@esbuild/freebsd-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/freebsd-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/freebsd-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/freebsd-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/freebsd-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/freebsd-arm64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/freebsd-arm64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/freebsd-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/freebsd-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/freebsd-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/freebsd-x64.integrity` | str | - | - | Value: sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ== |
| `packages.node_modules/@esbuild/freebsd-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/freebsd-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/freebsd-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/freebsd-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/freebsd-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/freebsd-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/freebsd-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-arm` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-arm.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-arm.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-arm.integrity` | str | - | - | Value: sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA== |
| `packages.node_modules/@esbuild/linux-arm.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-arm.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-arm.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-arm.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-arm.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-arm.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-arm.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-arm64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-arm64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-arm64.integrity` | str | - | - | Value: sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q== |
| `packages.node_modules/@esbuild/linux-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-arm64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-arm64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-ia32` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-ia32.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-ia32.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-ia32.integrity` | str | - | - | Value: sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg== |
| `packages.node_modules/@esbuild/linux-ia32.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-ia32.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-ia32.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-ia32.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-ia32.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-ia32.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-ia32.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-loong64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-loong64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-loong64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-loong64.integrity` | str | - | - | Value: sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg== |
| `packages.node_modules/@esbuild/linux-loong64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-loong64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-loong64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-loong64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-loong64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-loong64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-loong64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-mips64el` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-mips64el.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-mips64el.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-mips64el.integrity` | str | - | - | Value: sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg== |
| `packages.node_modules/@esbuild/linux-mips64el.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-mips64el.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-mips64el.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-mips64el.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-mips64el.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-mips64el.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-mips64el.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-ppc64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-ppc64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-ppc64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-ppc64.integrity` | str | - | - | Value: sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w== |
| `packages.node_modules/@esbuild/linux-ppc64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-ppc64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-ppc64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-ppc64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-ppc64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-ppc64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-ppc64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-riscv64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-riscv64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-riscv64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-riscv64.integrity` | str | - | - | Value: sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA== |
| `packages.node_modules/@esbuild/linux-riscv64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-riscv64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-riscv64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-riscv64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-riscv64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-riscv64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-riscv64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-s390x` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-s390x.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-s390x.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-s390x.integrity` | str | - | - | Value: sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A== |
| `packages.node_modules/@esbuild/linux-s390x.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-s390x.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-s390x.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-s390x.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-s390x.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-s390x.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-s390x.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/linux-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/linux-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/linux-x64.integrity` | str | - | - | Value: sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ== |
| `packages.node_modules/@esbuild/linux-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/linux-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/linux-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/linux-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/linux-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/netbsd-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/netbsd-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/netbsd-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/netbsd-x64.integrity` | str | - | - | Value: sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg== |
| `packages.node_modules/@esbuild/netbsd-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/netbsd-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/netbsd-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/netbsd-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/netbsd-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/netbsd-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/netbsd-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/openbsd-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/openbsd-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/openbsd-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/openbsd-x64.integrity` | str | - | - | Value: sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow== |
| `packages.node_modules/@esbuild/openbsd-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/openbsd-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/openbsd-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/openbsd-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/openbsd-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/openbsd-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/openbsd-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/sunos-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/sunos-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/sunos-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/sunos-x64.integrity` | str | - | - | Value: sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg== |
| `packages.node_modules/@esbuild/sunos-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/sunos-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/sunos-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/sunos-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/sunos-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/sunos-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/sunos-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/win32-arm64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-arm64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/win32-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz |
| `packages.node_modules/@esbuild/win32-arm64.integrity` | str | - | - | Value: sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A== |
| `packages.node_modules/@esbuild/win32-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/win32-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-arm64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-arm64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/win32-ia32` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-ia32.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/win32-ia32.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz |
| `packages.node_modules/@esbuild/win32-ia32.integrity` | str | - | - | Value: sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA== |
| `packages.node_modules/@esbuild/win32-ia32.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-ia32.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-ia32.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/win32-ia32.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-ia32.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-ia32.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-ia32.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@esbuild/win32-x64` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-x64.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/@esbuild/win32-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz |
| `packages.node_modules/@esbuild/win32-x64.integrity` | str | - | - | Value: sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw== |
| `packages.node_modules/@esbuild/win32-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@esbuild/win32-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@esbuild/win32-x64.os` | array | - | - | List of values |
| `packages.node_modules/@esbuild/win32-x64.engines` | object | - | - | Config section |
| `packages.node_modules/@esbuild/win32-x64.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/@jridgewell/gen-mapping` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/gen-mapping.version` | str | - | - | Value: 0.3.13 |
| `packages.node_modules/@jridgewell/gen-mapping.resolved` | str | - | - | Value: https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz |
| `packages.node_modules/@jridgewell/gen-mapping.integrity` | str | - | - | Value: sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA== |
| `packages.node_modules/@jridgewell/gen-mapping.dev` | bool | - | - | Value: True |
| `packages.node_modules/@jridgewell/gen-mapping.license` | str | - | - | Value: MIT |
| `packages.node_modules/@jridgewell/gen-mapping.dependencies` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/gen-mapping.dependencies.@jridgewell/sourcemap-codec` | str | - | - | Value: ^1.5.0 |
| `packages.node_modules/@jridgewell/gen-mapping.dependencies.@jridgewell/trace-mapping` | str | - | - | Value: ^0.3.24 |
| `packages.node_modules/@jridgewell/remapping` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/remapping.version` | str | - | - | Value: 2.3.5 |
| `packages.node_modules/@jridgewell/remapping.resolved` | str | - | - | Value: https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz |
| `packages.node_modules/@jridgewell/remapping.integrity` | str | - | - | Value: sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ== |
| `packages.node_modules/@jridgewell/remapping.dev` | bool | - | - | Value: True |
| `packages.node_modules/@jridgewell/remapping.license` | str | - | - | Value: MIT |
| `packages.node_modules/@jridgewell/remapping.dependencies` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/remapping.dependencies.@jridgewell/gen-mapping` | str | - | - | Value: ^0.3.5 |
| `packages.node_modules/@jridgewell/remapping.dependencies.@jridgewell/trace-mapping` | str | - | - | Value: ^0.3.24 |
| `packages.node_modules/@jridgewell/resolve-uri` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/resolve-uri.version` | str | - | - | Value: 3.1.2 |
| `packages.node_modules/@jridgewell/resolve-uri.resolved` | str | - | - | Value: https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz |
| `packages.node_modules/@jridgewell/resolve-uri.integrity` | str | - | - | Value: sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw== |
| `packages.node_modules/@jridgewell/resolve-uri.dev` | bool | - | - | Value: True |
| `packages.node_modules/@jridgewell/resolve-uri.license` | str | - | - | Value: MIT |
| `packages.node_modules/@jridgewell/resolve-uri.engines` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/resolve-uri.engines.node` | str | - | - | Value: >=6.0.0 |
| `packages.node_modules/@jridgewell/sourcemap-codec` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/sourcemap-codec.version` | str | - | - | Value: 1.6.0 |
| `packages.node_modules/@jridgewell/sourcemap-codec.resolved` | str | - | - | Value: https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz |
| `packages.node_modules/@jridgewell/sourcemap-codec.integrity` | str | - | - | Value: sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw== |
| `packages.node_modules/@jridgewell/sourcemap-codec.dev` | bool | - | - | Value: True |
| `packages.node_modules/@jridgewell/sourcemap-codec.license` | str | - | - | Value: MIT |
| `packages.node_modules/@jridgewell/trace-mapping` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/trace-mapping.version` | str | - | - | Value: 0.3.31 |
| `packages.node_modules/@jridgewell/trace-mapping.resolved` | str | - | - | Value: https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz |
| `packages.node_modules/@jridgewell/trace-mapping.integrity` | str | - | - | Value: sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw== |
| `packages.node_modules/@jridgewell/trace-mapping.dev` | bool | - | - | Value: True |
| `packages.node_modules/@jridgewell/trace-mapping.license` | str | - | - | Value: MIT |
| `packages.node_modules/@jridgewell/trace-mapping.dependencies` | object | - | - | Config section |
| `packages.node_modules/@jridgewell/trace-mapping.dependencies.@jridgewell/resolve-uri` | str | - | - | Value: ^3.1.0 |
| `packages.node_modules/@jridgewell/trace-mapping.dependencies.@jridgewell/sourcemap-codec` | str | - | - | Value: ^1.4.14 |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu` | object | - | - | Config section |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.version` | str | - | - | Value: 1.5.1 |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@napi-rs/lzma-linux-x64-gnu/-/lzma-linux-x64-gnu-1.5.1.tgz |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.integrity` | str | - | - | Value: sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ== |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.engines` | object | - | - | Config section |
| `packages.node_modules/@napi-rs/lzma-linux-x64-gnu.engines.node` | str | - | - | Value: ^22.20 || ^24.12 || >=25 |
| `packages.node_modules/@nodelib/fs.scandir` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.scandir.version` | str | - | - | Value: 2.1.5 |
| `packages.node_modules/@nodelib/fs.scandir.resolved` | str | - | - | Value: https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz |
| `packages.node_modules/@nodelib/fs.scandir.integrity` | str | - | - | Value: sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g== |
| `packages.node_modules/@nodelib/fs.scandir.dev` | bool | - | - | Value: True |
| `packages.node_modules/@nodelib/fs.scandir.license` | str | - | - | Value: MIT |
| `packages.node_modules/@nodelib/fs.scandir.dependencies` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.scandir.dependencies.@nodelib/fs.stat` | str | - | - | Value: 2.0.5 |
| `packages.node_modules/@nodelib/fs.scandir.dependencies.run-parallel` | str | - | - | Value: ^1.1.9 |
| `packages.node_modules/@nodelib/fs.scandir.engines` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.scandir.engines.node` | str | - | - | Value: >= 8 |
| `packages.node_modules/@nodelib/fs.stat` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.stat.version` | str | - | - | Value: 2.0.5 |
| `packages.node_modules/@nodelib/fs.stat.resolved` | str | - | - | Value: https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz |
| `packages.node_modules/@nodelib/fs.stat.integrity` | str | - | - | Value: sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A== |
| `packages.node_modules/@nodelib/fs.stat.dev` | bool | - | - | Value: True |
| `packages.node_modules/@nodelib/fs.stat.license` | str | - | - | Value: MIT |
| `packages.node_modules/@nodelib/fs.stat.engines` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.stat.engines.node` | str | - | - | Value: >= 8 |
| `packages.node_modules/@nodelib/fs.walk` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.walk.version` | str | - | - | Value: 1.2.8 |
| `packages.node_modules/@nodelib/fs.walk.resolved` | str | - | - | Value: https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz |
| `packages.node_modules/@nodelib/fs.walk.integrity` | str | - | - | Value: sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg== |
| `packages.node_modules/@nodelib/fs.walk.dev` | bool | - | - | Value: True |
| `packages.node_modules/@nodelib/fs.walk.license` | str | - | - | Value: MIT |
| `packages.node_modules/@nodelib/fs.walk.dependencies` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.walk.dependencies.@nodelib/fs.scandir` | str | - | - | Value: 2.1.5 |
| `packages.node_modules/@nodelib/fs.walk.dependencies.fastq` | str | - | - | Value: ^1.6.0 |
| `packages.node_modules/@nodelib/fs.walk.engines` | object | - | - | Config section |
| `packages.node_modules/@nodelib/fs.walk.engines.node` | str | - | - | Value: >= 8 |
| `packages.node_modules/@remix-run/router` | object | - | - | Config section |
| `packages.node_modules/@remix-run/router.version` | str | - | - | Value: 1.23.4 |
| `packages.node_modules/@remix-run/router.resolved` | str | - | - | Value: https://registry.npmjs.org/@remix-run/router/-/router-1.23.4.tgz |
| `packages.node_modules/@remix-run/router.integrity` | str | - | - | Value: sha512-q7j5geK7xs3UJSdm9/iytUNclBnLmYx1EnSeCFXHPeutdqgIMeFeHtUZgS3EhlKxdBEAu8OwtJCwmLrEzpSs7Q== |
| `packages.node_modules/@remix-run/router.license` | str | - | - | Value: MIT |
| `packages.node_modules/@remix-run/router.engines` | object | - | - | Config section |
| `packages.node_modules/@remix-run/router.engines.node` | str | - | - | Value: >=14.0.0 |
| `packages.node_modules/@rolldown/pluginutils` | object | - | - | Config section |
| `packages.node_modules/@rolldown/pluginutils.version` | str | - | - | Value: 1.0.0-beta.27 |
| `packages.node_modules/@rolldown/pluginutils.resolved` | str | - | - | Value: https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz |
| `packages.node_modules/@rolldown/pluginutils.integrity` | str | - | - | Value: sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA== |
| `packages.node_modules/@rolldown/pluginutils.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rolldown/pluginutils.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-android-arm-eabi` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.integrity` | str | - | - | Value: sha512-Xa6RDoWa+hNiX6PgsljlH6W75RaONx3y6PVlbLhkEWW+GaPQ3dP5gwbL/erAzQHWwkvW5UxdD5l87Qx2FAQ/4A== |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-android-arm-eabi.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-android-arm64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-android-arm64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-android-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-android-arm64.integrity` | str | - | - | Value: sha512-vNASxsghMfQ5s+v3PrpnJd+ryL/26lxCCaGI+sDJ7VzmHiYXIrrVltsDhaawxLM1WcoMU2oYlbPHLaYQtBzhcg== |
| `packages.node_modules/@rollup/rollup-android-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-android-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-android-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-android-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-android-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-darwin-arm64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-darwin-arm64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-darwin-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-darwin-arm64.integrity` | str | - | - | Value: sha512-0dWDjmlrpZAgjPD/aPzUDhBW8APLRjAni5bOrM76wiiZm+E+KTMVKNhAzaTBohz8UyO2fKNAl0+fygbe2HZXOA== |
| `packages.node_modules/@rollup/rollup-darwin-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-darwin-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-darwin-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-darwin-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-darwin-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-darwin-x64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-darwin-x64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-darwin-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-darwin-x64.integrity` | str | - | - | Value: sha512-N58uktcwzk3+qT4KHEuNdIxX1N01RWrkfVoml69EAbSaNDL+sbNVLx2RMl4Qd23lpA0fgPvyh5hHb4weD5WKmg== |
| `packages.node_modules/@rollup/rollup-darwin-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-darwin-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-darwin-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-darwin-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-darwin-x64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-freebsd-arm64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.integrity` | str | - | - | Value: sha512-HWF2zH8EAp2scWRpt2PGe6iUGz7zi04waXsdRr3zb4DWCk2ImIo5FZu0jjmD53nP/DGSvnW0e7/1ToCNZs2lZw== |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-freebsd-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-freebsd-x64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-freebsd-x64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-freebsd-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-freebsd-x64.integrity` | str | - | - | Value: sha512-MkvcwHMnzPSMOQEwB6wHnLzmc+hT8BGc5bW/Mhmjjgx3wbj6VBnlc47XsK74kD0K9MikFfXpQqyz4NUXaUW62A== |
| `packages.node_modules/@rollup/rollup-freebsd-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-freebsd-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-freebsd-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-freebsd-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-freebsd-x64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.integrity` | str | - | - | Value: sha512-xe1bCKPJaKsD0tfd7Rb6bGfUogJTpKbTEEthsfdb7hTfTRNJVQTdirabQx0o6ERVba/smkM720soMY+0QnrlSQ== |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm-gnueabihf.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.integrity` | str | - | - | Value: sha512-yOM7LdK0p6gk6+Q773OEwtlsikT1TL3yMmYsTtRlDRPha5vV2DC5x7LqRWDr6f3cSYNMKVqxzffXv8ivxNBIFQ== |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm-musleabihf.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.integrity` | str | - | - | Value: sha512-qiWuJJV3DybA2IfzvRimeKXGrGuVPv1zobSY/26KnP3HbV0VcNb3ECzgvtbvF3xjSMkcooou6HASXZuLdjnhpQ== |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.integrity` | str | - | - | Value: sha512-akcZquRzCY/KpUoZAMBhGf7oi4LmXq1BzRA5CPAC3rkUf28Y/sAYV3jSL+JKd7cwEyFvR5G0XVZ0gaMedP+60A== |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-arm64-musl.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.integrity` | str | - | - | Value: sha512-fNwYHrPyYyxauPzX/cpYw8Z7LQpp+DGA0KCoswA0aVFBpmdMil9XgjB8V3Ny64Ihu797+GKcuJqnsOKEmor7fA== |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-loong64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.integrity` | str | - | - | Value: sha512-XfvsgzR7DZqREdst7K1Mj3ilSUM5xLAHJcIMDFPKdxTs9q5VHOT8aMA+a683fqBu7DQl8+Sd9HCsQYL8EMY9qA== |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-loong64-musl.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.integrity` | str | - | - | Value: sha512-Pp7gVZggEFlbcuztay+/U0gVG9S1XAh8i7I1Re/htbAzo43P5wHZHw6pTyzotISqlKohoh9RpIfnOz3RbemK1w== |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-ppc64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.integrity` | str | - | - | Value: sha512-zkgL2xff6i7u5hau/m6FGeS8gRkLEdgLw522WGmdWWlLd9btmNl3S80mcEjtGq+kvgUekQ3+BOYLLLcPlS2LIA== |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-ppc64-musl.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.integrity` | str | - | - | Value: sha512-qOheJomrkVCbbHFJ7L3J97cnhfogKqguAQphv26+3ZsAQIF1L19b+dArl//s8rjJHJLz9byykyM8NBP4nmSa1g== |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-riscv64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.integrity` | str | - | - | Value: sha512-XlxLD54wQhH3FciCgMofxBw27NzUe818gJH410qWvc41UT0ZFcgxVjyX5/EK8MPTupjeVWqN5oy+9pCA9mqfCA== |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-riscv64-musl.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.integrity` | str | - | - | Value: sha512-vdryWeRb2bLJZf0Fv/W8se6nvsHe2PkTCxV0meheK3nQE+G90VCJcke51Miy1yQRsfm2uqIyjXOu4wmUzbTtkQ== |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-s390x-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.integrity` | str | - | - | Value: sha512-bcq2h2pkKmH2po4cZV8VWzO4lL40STyu/nLoFpYMQp9C2tCVNTdcVv86MwSsn3D5s1FBe2Ty1atqvVAUTMimNg== |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-x64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-x64-musl` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.integrity` | str | - | - | Value: sha512-EGoo5DMVMRkTId8fuTDaoxVlR5ZTsKULUezRjd9gCw5eeY+DjCvDpZAOlNUvKPGX+7rS1RWx6j+yOpNPx0cUgQ== |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-linux-x64-musl.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-openbsd-x64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-openbsd-x64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-openbsd-x64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-openbsd-x64.integrity` | str | - | - | Value: sha512-MErl12k7BFHZG1TI9QF/3lSSZARzq9KgNy/FjnqFMCkv+N4RSSzoUCA5h2mqHX4Mox3WaTVKblyzhQ1zRb2ZuQ== |
| `packages.node_modules/@rollup/rollup-openbsd-x64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-openbsd-x64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-openbsd-x64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-openbsd-x64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-openbsd-x64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-openharmony-arm64` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.integrity` | str | - | - | Value: sha512-ILs8k07Wh4p0PsNY4wYLEaXZKMOpVhrG5QDB0yHhGhuzOfDlnyHN6sflL4El/MpUP1y8uY2lUZrv4oBS6pTT3g== |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-openharmony-arm64.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.integrity` | str | - | - | Value: sha512-hKgB3nz/TKD3Wv78XEsyXzQsNjvhOHmwKQTvXADGOyU/cIClZDO7DsoggbdmJDPGp5V80tA3Vfv61PaKTLH3LA== |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-arm64-msvc.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.integrity` | str | - | - | Value: sha512-T4wf1mudIDxN8Q/CWIBJC1u5gQUc+r5mPvlwoSbIvNkyVTP2TAFeobEmst5AQ4gMyAz4sSByVdoTDfvTmGK/8g== |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-ia32-msvc.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.integrity` | str | - | - | Value: sha512-tC3IY7qoaD9Ll3/8WJQn49j5V2f/NuI9S41NOE2iM5MPs3sPIvOkVToLcz/7Bz4pyF7PSvrtwu8I/pUrGOSecQ== |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-x64-gnu.os` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc` | object | - | - | Config section |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.resolved` | str | - | - | Value: https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.63.2.tgz |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.integrity` | str | - | - | Value: sha512-6NHnk/K3eq2ZFYcU1X8g67s9qIJRCOTT92gwLMVBp08dB2uuuwI1/Q/empzL2Bfr2f2WRLJVwpp90RmacQyFkw== |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.cpu` | array | - | - | List of values |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.dev` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.license` | str | - | - | Value: MIT |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.optional` | bool | - | - | Value: True |
| `packages.node_modules/@rollup/rollup-win32-x64-msvc.os` | array | - | - | List of values |
| `packages.node_modules/@types/babel__core` | object | - | - | Config section |
| `packages.node_modules/@types/babel__core.version` | str | - | - | Value: 7.20.5 |
| `packages.node_modules/@types/babel__core.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz |
| `packages.node_modules/@types/babel__core.integrity` | str | - | - | Value: sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA== |
| `packages.node_modules/@types/babel__core.dev` | bool | - | - | Value: True |
| `packages.node_modules/@types/babel__core.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/babel__core.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/babel__core.dependencies.@babel/parser` | str | - | - | Value: ^7.20.7 |
| `packages.node_modules/@types/babel__core.dependencies.@babel/types` | str | - | - | Value: ^7.20.7 |
| `packages.node_modules/@types/babel__core.dependencies.@types/babel__generator` | str | - | - | Value: * |
| `packages.node_modules/@types/babel__core.dependencies.@types/babel__template` | str | - | - | Value: * |
| `packages.node_modules/@types/babel__core.dependencies.@types/babel__traverse` | str | - | - | Value: * |
| `packages.node_modules/@types/babel__generator` | object | - | - | Config section |
| `packages.node_modules/@types/babel__generator.version` | str | - | - | Value: 7.27.0 |
| `packages.node_modules/@types/babel__generator.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz |
| `packages.node_modules/@types/babel__generator.integrity` | str | - | - | Value: sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg== |
| `packages.node_modules/@types/babel__generator.dev` | bool | - | - | Value: True |
| `packages.node_modules/@types/babel__generator.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/babel__generator.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/babel__generator.dependencies.@babel/types` | str | - | - | Value: ^7.0.0 |
| `packages.node_modules/@types/babel__template` | object | - | - | Config section |
| `packages.node_modules/@types/babel__template.version` | str | - | - | Value: 7.4.4 |
| `packages.node_modules/@types/babel__template.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz |
| `packages.node_modules/@types/babel__template.integrity` | str | - | - | Value: sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A== |
| `packages.node_modules/@types/babel__template.dev` | bool | - | - | Value: True |
| `packages.node_modules/@types/babel__template.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/babel__template.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/babel__template.dependencies.@babel/parser` | str | - | - | Value: ^7.1.0 |
| `packages.node_modules/@types/babel__template.dependencies.@babel/types` | str | - | - | Value: ^7.0.0 |
| `packages.node_modules/@types/babel__traverse` | object | - | - | Config section |
| `packages.node_modules/@types/babel__traverse.version` | str | - | - | Value: 7.28.0 |
| `packages.node_modules/@types/babel__traverse.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz |
| `packages.node_modules/@types/babel__traverse.integrity` | str | - | - | Value: sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q== |
| `packages.node_modules/@types/babel__traverse.dev` | bool | - | - | Value: True |
| `packages.node_modules/@types/babel__traverse.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/babel__traverse.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/babel__traverse.dependencies.@babel/types` | str | - | - | Value: ^7.28.2 |
| `packages.node_modules/@types/d3-array` | object | - | - | Config section |
| `packages.node_modules/@types/d3-array.version` | str | - | - | Value: 3.2.2 |
| `packages.node_modules/@types/d3-array.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz |
| `packages.node_modules/@types/d3-array.integrity` | str | - | - | Value: sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw== |
| `packages.node_modules/@types/d3-array.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-color` | object | - | - | Config section |
| `packages.node_modules/@types/d3-color.version` | str | - | - | Value: 3.1.3 |
| `packages.node_modules/@types/d3-color.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz |
| `packages.node_modules/@types/d3-color.integrity` | str | - | - | Value: sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A== |
| `packages.node_modules/@types/d3-color.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-ease` | object | - | - | Config section |
| `packages.node_modules/@types/d3-ease.version` | str | - | - | Value: 3.0.2 |
| `packages.node_modules/@types/d3-ease.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz |
| `packages.node_modules/@types/d3-ease.integrity` | str | - | - | Value: sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA== |
| `packages.node_modules/@types/d3-ease.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-interpolate` | object | - | - | Config section |
| `packages.node_modules/@types/d3-interpolate.version` | str | - | - | Value: 3.0.4 |
| `packages.node_modules/@types/d3-interpolate.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz |
| `packages.node_modules/@types/d3-interpolate.integrity` | str | - | - | Value: sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA== |
| `packages.node_modules/@types/d3-interpolate.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-interpolate.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/d3-interpolate.dependencies.@types/d3-color` | str | - | - | Value: * |
| `packages.node_modules/@types/d3-path` | object | - | - | Config section |
| `packages.node_modules/@types/d3-path.version` | str | - | - | Value: 3.1.1 |
| `packages.node_modules/@types/d3-path.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz |
| `packages.node_modules/@types/d3-path.integrity` | str | - | - | Value: sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg== |
| `packages.node_modules/@types/d3-path.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-scale` | object | - | - | Config section |
| `packages.node_modules/@types/d3-scale.version` | str | - | - | Value: 4.0.9 |
| `packages.node_modules/@types/d3-scale.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz |
| `packages.node_modules/@types/d3-scale.integrity` | str | - | - | Value: sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw== |
| `packages.node_modules/@types/d3-scale.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-scale.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/d3-scale.dependencies.@types/d3-time` | str | - | - | Value: * |
| `packages.node_modules/@types/d3-shape` | object | - | - | Config section |
| `packages.node_modules/@types/d3-shape.version` | str | - | - | Value: 3.2.0 |
| `packages.node_modules/@types/d3-shape.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.2.0.tgz |
| `packages.node_modules/@types/d3-shape.integrity` | str | - | - | Value: sha512-kVd74ta9eof3eJOvbNd1vGKS/XERRyQbT26Og63hIsvDO84cjD5gEOhsXf26w3FSoNlPVz84DOFcKv/oou+fMw== |
| `packages.node_modules/@types/d3-shape.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-shape.dependencies` | object | - | - | Config section |
| `packages.node_modules/@types/d3-shape.dependencies.@types/d3-path` | str | - | - | Value: * |
| `packages.node_modules/@types/d3-time` | object | - | - | Config section |
| `packages.node_modules/@types/d3-time.version` | str | - | - | Value: 3.0.4 |
| `packages.node_modules/@types/d3-time.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz |
| `packages.node_modules/@types/d3-time.integrity` | str | - | - | Value: sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g== |
| `packages.node_modules/@types/d3-time.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/d3-timer` | object | - | - | Config section |
| `packages.node_modules/@types/d3-timer.version` | str | - | - | Value: 3.0.2 |
| `packages.node_modules/@types/d3-timer.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz |
| `packages.node_modules/@types/d3-timer.integrity` | str | - | - | Value: sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw== |
| `packages.node_modules/@types/d3-timer.license` | str | - | - | Value: MIT |
| `packages.node_modules/@types/estree` | object | - | - | Config section |
| `packages.node_modules/@types/estree.version` | str | - | - | Value: 1.0.9 |
| `packages.node_modules/@types/estree.resolved` | str | - | - | Value: https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz |
| `packages.node_modules/@types/estree.integrity` | str | - | - | Value: sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg== |
| `packages.node_modules/@types/estree.dev` | bool | - | - | Value: True |
| `packages.node_modules/@types/estree.license` | str | - | - | Value: MIT |
| `packages.node_modules/@vitejs/plugin-react` | object | - | - | Config section |
| `packages.node_modules/@vitejs/plugin-react.version` | str | - | - | Value: 4.7.0 |
| `packages.node_modules/@vitejs/plugin-react.resolved` | str | - | - | Value: https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz |
| `packages.node_modules/@vitejs/plugin-react.integrity` | str | - | - | Value: sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA== |
| `packages.node_modules/@vitejs/plugin-react.dev` | bool | - | - | Value: True |
| `packages.node_modules/@vitejs/plugin-react.license` | str | - | - | Value: MIT |
| `packages.node_modules/@vitejs/plugin-react.dependencies` | object | - | - | Config section |
| `packages.node_modules/@vitejs/plugin-react.dependencies.@babel/core` | str | - | - | Value: ^7.28.0 |
| `packages.node_modules/@vitejs/plugin-react.dependencies.@babel/plugin-transform-react-jsx-self` | str | - | - | Value: ^7.27.1 |
| `packages.node_modules/@vitejs/plugin-react.dependencies.@babel/plugin-transform-react-jsx-source` | str | - | - | Value: ^7.27.1 |
| `packages.node_modules/@vitejs/plugin-react.dependencies.@rolldown/pluginutils` | str | - | - | Value: 1.0.0-beta.27 |
| `packages.node_modules/@vitejs/plugin-react.dependencies.@types/babel__core` | str | - | - | Value: ^7.20.5 |
| `packages.node_modules/@vitejs/plugin-react.dependencies.react-refresh` | str | - | - | Value: ^0.17.0 |
| `packages.node_modules/@vitejs/plugin-react.engines` | object | - | - | Config section |
| `packages.node_modules/@vitejs/plugin-react.engines.node` | str | - | - | Value: ^14.18.0 || >=16.0.0 |
| `packages.node_modules/@vitejs/plugin-react.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/@vitejs/plugin-react.peerDependencies.vite` | str | - | - | Value: ^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 |
| `packages.node_modules/any-promise` | object | - | - | Config section |
| `packages.node_modules/any-promise.version` | str | - | - | Value: 1.3.0 |
| `packages.node_modules/any-promise.resolved` | str | - | - | Value: https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz |
| `packages.node_modules/any-promise.integrity` | str | - | - | Value: sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A== |
| `packages.node_modules/any-promise.dev` | bool | - | - | Value: True |
| `packages.node_modules/any-promise.license` | str | - | - | Value: MIT |
| `packages.node_modules/anymatch` | object | - | - | Config section |
| `packages.node_modules/anymatch.version` | str | - | - | Value: 3.1.3 |
| `packages.node_modules/anymatch.resolved` | str | - | - | Value: https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz |
| `packages.node_modules/anymatch.integrity` | str | - | - | Value: sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw== |
| `packages.node_modules/anymatch.dev` | bool | - | - | Value: True |
| `packages.node_modules/anymatch.license` | str | - | - | Value: ISC |
| `packages.node_modules/anymatch.dependencies` | object | - | - | Config section |
| `packages.node_modules/anymatch.dependencies.normalize-path` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/anymatch.dependencies.picomatch` | str | - | - | Value: ^2.0.4 |
| `packages.node_modules/anymatch.engines` | object | - | - | Config section |
| `packages.node_modules/anymatch.engines.node` | str | - | - | Value: >= 8 |
| `packages.node_modules/arg` | object | - | - | Config section |
| `packages.node_modules/arg.version` | str | - | - | Value: 5.0.2 |
| `packages.node_modules/arg.resolved` | str | - | - | Value: https://registry.npmjs.org/arg/-/arg-5.0.2.tgz |
| `packages.node_modules/arg.integrity` | str | - | - | Value: sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg== |
| `packages.node_modules/arg.dev` | bool | - | - | Value: True |
| `packages.node_modules/arg.license` | str | - | - | Value: MIT |
| `packages.node_modules/autoprefixer` | object | - | - | Config section |
| `packages.node_modules/autoprefixer.version` | str | - | - | Value: 10.5.6 |
| `packages.node_modules/autoprefixer.resolved` | str | - | - | Value: https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.6.tgz |
| `packages.node_modules/autoprefixer.integrity` | str | - | - | Value: sha512-HiH4oYNc5+DQEx/b8FPfMj+WHH/WWUBmbN5r1Uf/ixtfyFkk+wGIlfJT/RD5eAyzlwkeYRtZUCI8qrEi26pl2g== |
| `packages.node_modules/autoprefixer.dev` | bool | - | - | Value: True |
| `packages.node_modules/autoprefixer.funding` | array | - | - | List of values |
| `packages.node_modules/autoprefixer.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/autoprefixer.funding[].url` | str | - | - | Value: https://opencollective.com/postcss/ |
| `packages.node_modules/autoprefixer.license` | str | - | - | Value: MIT |
| `packages.node_modules/autoprefixer.dependencies` | object | - | - | Config section |
| `packages.node_modules/autoprefixer.dependencies.browserslist` | str | - | - | Value: ^4.28.9 |
| `packages.node_modules/autoprefixer.dependencies.caniuse-lite` | str | - | - | Value: ^1.0.30001810 |
| `packages.node_modules/autoprefixer.dependencies.fraction.js` | str | - | - | Value: ^5.3.4 |
| `packages.node_modules/autoprefixer.dependencies.picocolors` | str | - | - | Value: ^1.1.1 |
| `packages.node_modules/autoprefixer.dependencies.postcss-value-parser` | str | - | - | Value: ^4.2.0 |
| `packages.node_modules/autoprefixer.bin` | object | - | - | Config section |
| `packages.node_modules/autoprefixer.bin.autoprefixer` | str | - | - | Value: bin/autoprefixer |
| `packages.node_modules/autoprefixer.engines` | object | - | - | Config section |
| `packages.node_modules/autoprefixer.engines.node` | str | - | - | Value: ^10 || ^12 || >=14 |
| `packages.node_modules/autoprefixer.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/autoprefixer.peerDependencies.postcss` | str | - | - | Value: ^8.1.0 |
| `packages.node_modules/baseline-browser-mapping` | object | - | - | Config section |
| `packages.node_modules/baseline-browser-mapping.version` | str | - | - | Value: 2.11.22 |
| `packages.node_modules/baseline-browser-mapping.resolved` | str | - | - | Value: https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.22.tgz |
| `packages.node_modules/baseline-browser-mapping.integrity` | str | - | - | Value: sha512-pWc4w51fBFd7mav43/zKRC+RI6f4yfzQoVlfvE8dECePyfkn1bzLp01Fj0QACcyCZyFhiEMyD2qScfKRWgWibA== |
| `packages.node_modules/baseline-browser-mapping.dev` | bool | - | - | Value: True |
| `packages.node_modules/baseline-browser-mapping.license` | str | - | - | Value: Apache-2.0 |
| `packages.node_modules/baseline-browser-mapping.bin` | object | - | - | Config section |
| `packages.node_modules/baseline-browser-mapping.bin.baseline-browser-mapping` | str | - | - | Value: dist/cli.cjs |
| `packages.node_modules/baseline-browser-mapping.engines` | object | - | - | Config section |
| `packages.node_modules/baseline-browser-mapping.engines.node` | str | - | - | Value: >=6.0.0 |
| `packages.node_modules/binary-extensions` | object | - | - | Config section |
| `packages.node_modules/binary-extensions.version` | str | - | - | Value: 2.3.0 |
| `packages.node_modules/binary-extensions.resolved` | str | - | - | Value: https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz |
| `packages.node_modules/binary-extensions.integrity` | str | - | - | Value: sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw== |
| `packages.node_modules/binary-extensions.dev` | bool | - | - | Value: True |
| `packages.node_modules/binary-extensions.license` | str | - | - | Value: MIT |
| `packages.node_modules/binary-extensions.engines` | object | - | - | Config section |
| `packages.node_modules/binary-extensions.engines.node` | str | - | - | Value: >=8 |
| `packages.node_modules/binary-extensions.funding` | object | - | - | Config section |
| `packages.node_modules/binary-extensions.funding.url` | str | - | - | Value: https://github.com/sponsors/sindresorhus |
| `packages.node_modules/braces` | object | - | - | Config section |
| `packages.node_modules/braces.version` | str | - | - | Value: 3.0.3 |
| `packages.node_modules/braces.resolved` | str | - | - | Value: https://registry.npmjs.org/braces/-/braces-3.0.3.tgz |
| `packages.node_modules/braces.integrity` | str | - | - | Value: sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA== |
| `packages.node_modules/braces.dev` | bool | - | - | Value: True |
| `packages.node_modules/braces.license` | str | - | - | Value: MIT |
| `packages.node_modules/braces.dependencies` | object | - | - | Config section |
| `packages.node_modules/braces.dependencies.fill-range` | str | - | - | Value: ^7.1.1 |
| `packages.node_modules/braces.engines` | object | - | - | Config section |
| `packages.node_modules/braces.engines.node` | str | - | - | Value: >=8 |
| `packages.node_modules/browserslist` | object | - | - | Config section |
| `packages.node_modules/browserslist.version` | str | - | - | Value: 4.28.9 |
| `packages.node_modules/browserslist.resolved` | str | - | - | Value: https://registry.npmjs.org/browserslist/-/browserslist-4.28.9.tgz |
| `packages.node_modules/browserslist.integrity` | str | - | - | Value: sha512-EWazOblFYUvlGZcfGhPUPmYh3nikUxBVb+y9MJun5f3hBi812X+8MSQTujLBtgK3cf51fJWbWfOjyeO954d+Eg== |
| `packages.node_modules/browserslist.dev` | bool | - | - | Value: True |
| `packages.node_modules/browserslist.funding` | array | - | - | List of values |
| `packages.node_modules/browserslist.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/browserslist.funding[].url` | str | - | - | Value: https://opencollective.com/browserslist |
| `packages.node_modules/browserslist.license` | str | - | - | Value: MIT |
| `packages.node_modules/browserslist.dependencies` | object | - | - | Config section |
| `packages.node_modules/browserslist.dependencies.baseline-browser-mapping` | str | - | - | Value: ^2.11.20 |
| `packages.node_modules/browserslist.dependencies.caniuse-lite` | str | - | - | Value: ^1.0.30001810 |
| `packages.node_modules/browserslist.dependencies.electron-to-chromium` | str | - | - | Value: ^1.5.420 |
| `packages.node_modules/browserslist.dependencies.node-releases` | str | - | - | Value: ^2.0.54 |
| `packages.node_modules/browserslist.dependencies.update-browserslist-db` | str | - | - | Value: ^1.3.2 |
| `packages.node_modules/browserslist.bin` | object | - | - | Config section |
| `packages.node_modules/browserslist.bin.browserslist` | str | - | - | Value: cli.js |
| `packages.node_modules/browserslist.engines` | object | - | - | Config section |
| `packages.node_modules/browserslist.engines.node` | str | - | - | Value: ^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7 |
| `packages.node_modules/camelcase-css` | object | - | - | Config section |
| `packages.node_modules/camelcase-css.version` | str | - | - | Value: 2.0.1 |
| `packages.node_modules/camelcase-css.resolved` | str | - | - | Value: https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz |
| `packages.node_modules/camelcase-css.integrity` | str | - | - | Value: sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA== |
| `packages.node_modules/camelcase-css.dev` | bool | - | - | Value: True |
| `packages.node_modules/camelcase-css.license` | str | - | - | Value: MIT |
| `packages.node_modules/camelcase-css.engines` | object | - | - | Config section |
| `packages.node_modules/camelcase-css.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/caniuse-lite` | object | - | - | Config section |
| `packages.node_modules/caniuse-lite.version` | str | - | - | Value: 1.0.30001810 |
| `packages.node_modules/caniuse-lite.resolved` | str | - | - | Value: https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz |
| `packages.node_modules/caniuse-lite.integrity` | str | - | - | Value: sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg== |
| `packages.node_modules/caniuse-lite.dev` | bool | - | - | Value: True |
| `packages.node_modules/caniuse-lite.funding` | array | - | - | List of values |
| `packages.node_modules/caniuse-lite.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/caniuse-lite.funding[].url` | str | - | - | Value: https://opencollective.com/browserslist |
| `packages.node_modules/caniuse-lite.license` | str | - | - | Value: CC-BY-4.0 |
| `packages.node_modules/chokidar` | object | - | - | Config section |
| `packages.node_modules/chokidar.version` | str | - | - | Value: 3.6.0 |
| `packages.node_modules/chokidar.resolved` | str | - | - | Value: https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz |
| `packages.node_modules/chokidar.integrity` | str | - | - | Value: sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw== |
| `packages.node_modules/chokidar.dev` | bool | - | - | Value: True |
| `packages.node_modules/chokidar.license` | str | - | - | Value: MIT |
| `packages.node_modules/chokidar.dependencies` | object | - | - | Config section |
| `packages.node_modules/chokidar.dependencies.anymatch` | str | - | - | Value: ~3.1.2 |
| `packages.node_modules/chokidar.dependencies.braces` | str | - | - | Value: ~3.0.2 |
| `packages.node_modules/chokidar.dependencies.glob-parent` | str | - | - | Value: ~5.1.2 |
| `packages.node_modules/chokidar.dependencies.is-binary-path` | str | - | - | Value: ~2.1.0 |
| `packages.node_modules/chokidar.dependencies.is-glob` | str | - | - | Value: ~4.0.1 |
| `packages.node_modules/chokidar.dependencies.normalize-path` | str | - | - | Value: ~3.0.0 |
| `packages.node_modules/chokidar.dependencies.readdirp` | str | - | - | Value: ~3.6.0 |
| `packages.node_modules/chokidar.engines` | object | - | - | Config section |
| `packages.node_modules/chokidar.engines.node` | str | - | - | Value: >= 8.10.0 |
| `packages.node_modules/chokidar.funding` | object | - | - | Config section |
| `packages.node_modules/chokidar.funding.url` | str | - | - | Value: https://paulmillr.com/funding/ |
| `packages.node_modules/chokidar.optionalDependencies` | object | - | - | Config section |
| `packages.node_modules/chokidar.optionalDependencies.fsevents` | str | - | - | Value: ~2.3.2 |
| `packages.node_modules/chokidar/node_modules/glob-parent` | object | - | - | Config section |
| `packages.node_modules/chokidar/node_modules/glob-parent.version` | str | - | - | Value: 5.1.2 |
| `packages.node_modules/chokidar/node_modules/glob-parent.resolved` | str | - | - | Value: https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz |
| `packages.node_modules/chokidar/node_modules/glob-parent.integrity` | str | - | - | Value: sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow== |
| `packages.node_modules/chokidar/node_modules/glob-parent.dev` | bool | - | - | Value: True |
| `packages.node_modules/chokidar/node_modules/glob-parent.license` | str | - | - | Value: ISC |
| `packages.node_modules/chokidar/node_modules/glob-parent.dependencies` | object | - | - | Config section |
| `packages.node_modules/chokidar/node_modules/glob-parent.dependencies.is-glob` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/chokidar/node_modules/glob-parent.engines` | object | - | - | Config section |
| `packages.node_modules/chokidar/node_modules/glob-parent.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/clsx` | object | - | - | Config section |
| `packages.node_modules/clsx.version` | str | - | - | Value: 2.1.1 |
| `packages.node_modules/clsx.resolved` | str | - | - | Value: https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz |
| `packages.node_modules/clsx.integrity` | str | - | - | Value: sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA== |
| `packages.node_modules/clsx.license` | str | - | - | Value: MIT |
| `packages.node_modules/clsx.engines` | object | - | - | Config section |
| `packages.node_modules/clsx.engines.node` | str | - | - | Value: >=6 |
| `packages.node_modules/commander` | object | - | - | Config section |
| `packages.node_modules/commander.version` | str | - | - | Value: 4.1.1 |
| `packages.node_modules/commander.resolved` | str | - | - | Value: https://registry.npmjs.org/commander/-/commander-4.1.1.tgz |
| `packages.node_modules/commander.integrity` | str | - | - | Value: sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA== |
| `packages.node_modules/commander.dev` | bool | - | - | Value: True |
| `packages.node_modules/commander.license` | str | - | - | Value: MIT |
| `packages.node_modules/commander.engines` | object | - | - | Config section |
| `packages.node_modules/commander.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/convert-source-map` | object | - | - | Config section |
| `packages.node_modules/convert-source-map.version` | str | - | - | Value: 2.0.0 |
| `packages.node_modules/convert-source-map.resolved` | str | - | - | Value: https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz |
| `packages.node_modules/convert-source-map.integrity` | str | - | - | Value: sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg== |
| `packages.node_modules/convert-source-map.dev` | bool | - | - | Value: True |
| `packages.node_modules/convert-source-map.license` | str | - | - | Value: MIT |
| `packages.node_modules/cssesc` | object | - | - | Config section |
| `packages.node_modules/cssesc.version` | str | - | - | Value: 3.0.0 |
| `packages.node_modules/cssesc.resolved` | str | - | - | Value: https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz |
| `packages.node_modules/cssesc.integrity` | str | - | - | Value: sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg== |
| `packages.node_modules/cssesc.dev` | bool | - | - | Value: True |
| `packages.node_modules/cssesc.license` | str | - | - | Value: MIT |
| `packages.node_modules/cssesc.bin` | object | - | - | Config section |
| `packages.node_modules/cssesc.bin.cssesc` | str | - | - | Value: bin/cssesc |
| `packages.node_modules/cssesc.engines` | object | - | - | Config section |
| `packages.node_modules/cssesc.engines.node` | str | - | - | Value: >=4 |
| `packages.node_modules/csstype` | object | - | - | Config section |
| `packages.node_modules/csstype.version` | str | - | - | Value: 3.2.3 |
| `packages.node_modules/csstype.resolved` | str | - | - | Value: https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz |
| `packages.node_modules/csstype.integrity` | str | - | - | Value: sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ== |
| `packages.node_modules/csstype.license` | str | - | - | Value: MIT |
| `packages.node_modules/d3-array` | object | - | - | Config section |
| `packages.node_modules/d3-array.version` | str | - | - | Value: 3.2.4 |
| `packages.node_modules/d3-array.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz |
| `packages.node_modules/d3-array.integrity` | str | - | - | Value: sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg== |
| `packages.node_modules/d3-array.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-array.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-array.dependencies.internmap` | str | - | - | Value: 1 - 2 |
| `packages.node_modules/d3-array.engines` | object | - | - | Config section |
| `packages.node_modules/d3-array.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-color` | object | - | - | Config section |
| `packages.node_modules/d3-color.version` | str | - | - | Value: 3.1.0 |
| `packages.node_modules/d3-color.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz |
| `packages.node_modules/d3-color.integrity` | str | - | - | Value: sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA== |
| `packages.node_modules/d3-color.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-color.engines` | object | - | - | Config section |
| `packages.node_modules/d3-color.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-ease` | object | - | - | Config section |
| `packages.node_modules/d3-ease.version` | str | - | - | Value: 3.0.1 |
| `packages.node_modules/d3-ease.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz |
| `packages.node_modules/d3-ease.integrity` | str | - | - | Value: sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w== |
| `packages.node_modules/d3-ease.license` | str | - | - | Value: BSD-3-Clause |
| `packages.node_modules/d3-ease.engines` | object | - | - | Config section |
| `packages.node_modules/d3-ease.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-format` | object | - | - | Config section |
| `packages.node_modules/d3-format.version` | str | - | - | Value: 3.1.2 |
| `packages.node_modules/d3-format.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz |
| `packages.node_modules/d3-format.integrity` | str | - | - | Value: sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg== |
| `packages.node_modules/d3-format.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-format.engines` | object | - | - | Config section |
| `packages.node_modules/d3-format.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-interpolate` | object | - | - | Config section |
| `packages.node_modules/d3-interpolate.version` | str | - | - | Value: 3.0.1 |
| `packages.node_modules/d3-interpolate.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz |
| `packages.node_modules/d3-interpolate.integrity` | str | - | - | Value: sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g== |
| `packages.node_modules/d3-interpolate.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-interpolate.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-interpolate.dependencies.d3-color` | str | - | - | Value: 1 - 3 |
| `packages.node_modules/d3-interpolate.engines` | object | - | - | Config section |
| `packages.node_modules/d3-interpolate.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-path` | object | - | - | Config section |
| `packages.node_modules/d3-path.version` | str | - | - | Value: 3.1.0 |
| `packages.node_modules/d3-path.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz |
| `packages.node_modules/d3-path.integrity` | str | - | - | Value: sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ== |
| `packages.node_modules/d3-path.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-path.engines` | object | - | - | Config section |
| `packages.node_modules/d3-path.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-scale` | object | - | - | Config section |
| `packages.node_modules/d3-scale.version` | str | - | - | Value: 4.0.2 |
| `packages.node_modules/d3-scale.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz |
| `packages.node_modules/d3-scale.integrity` | str | - | - | Value: sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ== |
| `packages.node_modules/d3-scale.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-scale.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-scale.dependencies.d3-array` | str | - | - | Value: 2.10.0 - 3 |
| `packages.node_modules/d3-scale.dependencies.d3-format` | str | - | - | Value: 1 - 3 |
| `packages.node_modules/d3-scale.dependencies.d3-interpolate` | str | - | - | Value: 1.2.0 - 3 |
| `packages.node_modules/d3-scale.dependencies.d3-time` | str | - | - | Value: 2.1.1 - 3 |
| `packages.node_modules/d3-scale.dependencies.d3-time-format` | str | - | - | Value: 2 - 4 |
| `packages.node_modules/d3-scale.engines` | object | - | - | Config section |
| `packages.node_modules/d3-scale.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-shape` | object | - | - | Config section |
| `packages.node_modules/d3-shape.version` | str | - | - | Value: 3.2.0 |
| `packages.node_modules/d3-shape.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz |
| `packages.node_modules/d3-shape.integrity` | str | - | - | Value: sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA== |
| `packages.node_modules/d3-shape.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-shape.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-shape.dependencies.d3-path` | str | - | - | Value: ^3.1.0 |
| `packages.node_modules/d3-shape.engines` | object | - | - | Config section |
| `packages.node_modules/d3-shape.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-time` | object | - | - | Config section |
| `packages.node_modules/d3-time.version` | str | - | - | Value: 3.1.0 |
| `packages.node_modules/d3-time.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz |
| `packages.node_modules/d3-time.integrity` | str | - | - | Value: sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q== |
| `packages.node_modules/d3-time.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-time.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-time.dependencies.d3-array` | str | - | - | Value: 2 - 3 |
| `packages.node_modules/d3-time.engines` | object | - | - | Config section |
| `packages.node_modules/d3-time.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-time-format` | object | - | - | Config section |
| `packages.node_modules/d3-time-format.version` | str | - | - | Value: 4.1.0 |
| `packages.node_modules/d3-time-format.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz |
| `packages.node_modules/d3-time-format.integrity` | str | - | - | Value: sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg== |
| `packages.node_modules/d3-time-format.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-time-format.dependencies` | object | - | - | Config section |
| `packages.node_modules/d3-time-format.dependencies.d3-time` | str | - | - | Value: 1 - 3 |
| `packages.node_modules/d3-time-format.engines` | object | - | - | Config section |
| `packages.node_modules/d3-time-format.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/d3-timer` | object | - | - | Config section |
| `packages.node_modules/d3-timer.version` | str | - | - | Value: 3.0.1 |
| `packages.node_modules/d3-timer.resolved` | str | - | - | Value: https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz |
| `packages.node_modules/d3-timer.integrity` | str | - | - | Value: sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA== |
| `packages.node_modules/d3-timer.license` | str | - | - | Value: ISC |
| `packages.node_modules/d3-timer.engines` | object | - | - | Config section |
| `packages.node_modules/d3-timer.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/debug` | object | - | - | Config section |
| `packages.node_modules/debug.version` | str | - | - | Value: 4.4.3 |
| `packages.node_modules/debug.resolved` | str | - | - | Value: https://registry.npmjs.org/debug/-/debug-4.4.3.tgz |
| `packages.node_modules/debug.integrity` | str | - | - | Value: sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA== |
| `packages.node_modules/debug.dev` | bool | - | - | Value: True |
| `packages.node_modules/debug.license` | str | - | - | Value: MIT |
| `packages.node_modules/debug.dependencies` | object | - | - | Config section |
| `packages.node_modules/debug.dependencies.ms` | str | - | - | Value: ^2.1.3 |
| `packages.node_modules/debug.engines` | object | - | - | Config section |
| `packages.node_modules/debug.engines.node` | str | - | - | Value: >=6.0 |
| `packages.node_modules/debug.peerDependenciesMeta` | object | - | - | Config section |
| `packages.node_modules/debug.peerDependenciesMeta.supports-color` | object | - | - | Config section |
| `packages.node_modules/debug.peerDependenciesMeta.supports-color.optional` | bool | - | - | Value: True |
| `packages.node_modules/decimal.js-light` | object | - | - | Config section |
| `packages.node_modules/decimal.js-light.version` | str | - | - | Value: 2.5.1 |
| `packages.node_modules/decimal.js-light.resolved` | str | - | - | Value: https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz |
| `packages.node_modules/decimal.js-light.integrity` | str | - | - | Value: sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg== |
| `packages.node_modules/decimal.js-light.license` | str | - | - | Value: MIT |
| `packages.node_modules/didyoumean` | object | - | - | Config section |
| `packages.node_modules/didyoumean.version` | str | - | - | Value: 1.2.2 |
| `packages.node_modules/didyoumean.resolved` | str | - | - | Value: https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz |
| `packages.node_modules/didyoumean.integrity` | str | - | - | Value: sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw== |
| `packages.node_modules/didyoumean.dev` | bool | - | - | Value: True |
| `packages.node_modules/didyoumean.license` | str | - | - | Value: Apache-2.0 |
| `packages.node_modules/dlv` | object | - | - | Config section |
| `packages.node_modules/dlv.version` | str | - | - | Value: 1.1.3 |
| `packages.node_modules/dlv.resolved` | str | - | - | Value: https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz |
| `packages.node_modules/dlv.integrity` | str | - | - | Value: sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA== |
| `packages.node_modules/dlv.dev` | bool | - | - | Value: True |
| `packages.node_modules/dlv.license` | str | - | - | Value: MIT |
| `packages.node_modules/dom-helpers` | object | - | - | Config section |
| `packages.node_modules/dom-helpers.version` | str | - | - | Value: 5.2.1 |
| `packages.node_modules/dom-helpers.resolved` | str | - | - | Value: https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz |
| `packages.node_modules/dom-helpers.integrity` | str | - | - | Value: sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA== |
| `packages.node_modules/dom-helpers.license` | str | - | - | Value: MIT |
| `packages.node_modules/dom-helpers.dependencies` | object | - | - | Config section |
| `packages.node_modules/dom-helpers.dependencies.@babel/runtime` | str | - | - | Value: ^7.8.7 |
| `packages.node_modules/dom-helpers.dependencies.csstype` | str | - | - | Value: ^3.0.2 |
| `packages.node_modules/electron-to-chromium` | object | - | - | Config section |
| `packages.node_modules/electron-to-chromium.version` | str | - | - | Value: 1.5.427 |
| `packages.node_modules/electron-to-chromium.resolved` | str | - | - | Value: https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.427.tgz |
| `packages.node_modules/electron-to-chromium.integrity` | str | - | - | Value: sha512-n14zb3FdsChZ2BNobqNHAJMcP3ifFv4paox2LvCrfVAQcqGiSURgbJl+PfMpHVCNFkStnNc+RRVtPBTVW5PDgw== |
| `packages.node_modules/electron-to-chromium.dev` | bool | - | - | Value: True |
| `packages.node_modules/electron-to-chromium.license` | str | - | - | Value: ISC |
| `packages.node_modules/es-errors` | object | - | - | Config section |
| `packages.node_modules/es-errors.version` | str | - | - | Value: 1.3.0 |
| `packages.node_modules/es-errors.resolved` | str | - | - | Value: https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz |
| `packages.node_modules/es-errors.integrity` | str | - | - | Value: sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw== |
| `packages.node_modules/es-errors.dev` | bool | - | - | Value: True |
| `packages.node_modules/es-errors.license` | str | - | - | Value: MIT |
| `packages.node_modules/es-errors.engines` | object | - | - | Config section |
| `packages.node_modules/es-errors.engines.node` | str | - | - | Value: >= 0.4 |
| `packages.node_modules/esbuild` | object | - | - | Config section |
| `packages.node_modules/esbuild.version` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.resolved` | str | - | - | Value: https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz |
| `packages.node_modules/esbuild.integrity` | str | - | - | Value: sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw== |
| `packages.node_modules/esbuild.dev` | bool | - | - | Value: True |
| `packages.node_modules/esbuild.hasInstallScript` | bool | - | - | Value: True |
| `packages.node_modules/esbuild.license` | str | - | - | Value: MIT |
| `packages.node_modules/esbuild.bin` | object | - | - | Config section |
| `packages.node_modules/esbuild.bin.esbuild` | str | - | - | Value: bin/esbuild |
| `packages.node_modules/esbuild.engines` | object | - | - | Config section |
| `packages.node_modules/esbuild.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/esbuild.optionalDependencies` | object | - | - | Config section |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/aix-ppc64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/android-arm` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/android-arm64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/android-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/darwin-arm64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/darwin-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/freebsd-arm64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/freebsd-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-arm` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-arm64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-ia32` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-loong64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-mips64el` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-ppc64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-riscv64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-s390x` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/linux-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/netbsd-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/openbsd-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/sunos-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/win32-arm64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/win32-ia32` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/esbuild.optionalDependencies.@esbuild/win32-x64` | str | - | - | Value: 0.21.5 |
| `packages.node_modules/escalade` | object | - | - | Config section |
| `packages.node_modules/escalade.version` | str | - | - | Value: 3.2.0 |
| `packages.node_modules/escalade.resolved` | str | - | - | Value: https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz |
| `packages.node_modules/escalade.integrity` | str | - | - | Value: sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA== |
| `packages.node_modules/escalade.dev` | bool | - | - | Value: True |
| `packages.node_modules/escalade.license` | str | - | - | Value: MIT |
| `packages.node_modules/escalade.engines` | object | - | - | Config section |
| `packages.node_modules/escalade.engines.node` | str | - | - | Value: >=6 |
| `packages.node_modules/eventemitter3` | object | - | - | Config section |
| `packages.node_modules/eventemitter3.version` | str | - | - | Value: 4.0.7 |
| `packages.node_modules/eventemitter3.resolved` | str | - | - | Value: https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz |
| `packages.node_modules/eventemitter3.integrity` | str | - | - | Value: sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw== |
| `packages.node_modules/eventemitter3.license` | str | - | - | Value: MIT |
| `packages.node_modules/fast-equals` | object | - | - | Config section |
| `packages.node_modules/fast-equals.version` | str | - | - | Value: 5.4.2 |
| `packages.node_modules/fast-equals.resolved` | str | - | - | Value: https://registry.npmjs.org/fast-equals/-/fast-equals-5.4.2.tgz |
| `packages.node_modules/fast-equals.integrity` | str | - | - | Value: sha512-Ywe6jodPTWOTL9/k0bV7gdfP8twKL5Y8I8CZ933fAY5gBekICZSUQTbyH6ut2NZCNyB05mSUwAuEqdEIaOOlDQ== |
| `packages.node_modules/fast-equals.license` | str | - | - | Value: MIT |
| `packages.node_modules/fast-equals.engines` | object | - | - | Config section |
| `packages.node_modules/fast-equals.engines.node` | str | - | - | Value: >=6.0.0 |
| `packages.node_modules/fast-glob` | object | - | - | Config section |
| `packages.node_modules/fast-glob.version` | str | - | - | Value: 3.3.3 |
| `packages.node_modules/fast-glob.resolved` | str | - | - | Value: https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz |
| `packages.node_modules/fast-glob.integrity` | str | - | - | Value: sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg== |
| `packages.node_modules/fast-glob.dev` | bool | - | - | Value: True |
| `packages.node_modules/fast-glob.license` | str | - | - | Value: MIT |
| `packages.node_modules/fast-glob.dependencies` | object | - | - | Config section |
| `packages.node_modules/fast-glob.dependencies.@nodelib/fs.stat` | str | - | - | Value: ^2.0.2 |
| `packages.node_modules/fast-glob.dependencies.@nodelib/fs.walk` | str | - | - | Value: ^1.2.3 |
| `packages.node_modules/fast-glob.dependencies.glob-parent` | str | - | - | Value: ^5.1.2 |
| `packages.node_modules/fast-glob.dependencies.merge2` | str | - | - | Value: ^1.3.0 |
| `packages.node_modules/fast-glob.dependencies.micromatch` | str | - | - | Value: ^4.0.8 |
| `packages.node_modules/fast-glob.engines` | object | - | - | Config section |
| `packages.node_modules/fast-glob.engines.node` | str | - | - | Value: >=8.6.0 |
| `packages.node_modules/fast-glob/node_modules/glob-parent` | object | - | - | Config section |
| `packages.node_modules/fast-glob/node_modules/glob-parent.version` | str | - | - | Value: 5.1.2 |
| `packages.node_modules/fast-glob/node_modules/glob-parent.resolved` | str | - | - | Value: https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz |
| `packages.node_modules/fast-glob/node_modules/glob-parent.integrity` | str | - | - | Value: sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow== |
| `packages.node_modules/fast-glob/node_modules/glob-parent.dev` | bool | - | - | Value: True |
| `packages.node_modules/fast-glob/node_modules/glob-parent.license` | str | - | - | Value: ISC |
| `packages.node_modules/fast-glob/node_modules/glob-parent.dependencies` | object | - | - | Config section |
| `packages.node_modules/fast-glob/node_modules/glob-parent.dependencies.is-glob` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/fast-glob/node_modules/glob-parent.engines` | object | - | - | Config section |
| `packages.node_modules/fast-glob/node_modules/glob-parent.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/fastq` | object | - | - | Config section |
| `packages.node_modules/fastq.version` | str | - | - | Value: 1.20.3 |
| `packages.node_modules/fastq.resolved` | str | - | - | Value: https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz |
| `packages.node_modules/fastq.integrity` | str | - | - | Value: sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw== |
| `packages.node_modules/fastq.dev` | bool | - | - | Value: True |
| `packages.node_modules/fastq.license` | str | - | - | Value: ISC |
| `packages.node_modules/fastq.dependencies` | object | - | - | Config section |
| `packages.node_modules/fastq.dependencies.reusify` | str | - | - | Value: ^1.0.4 |
| `packages.node_modules/fill-range` | object | - | - | Config section |
| `packages.node_modules/fill-range.version` | str | - | - | Value: 7.1.1 |
| `packages.node_modules/fill-range.resolved` | str | - | - | Value: https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz |
| `packages.node_modules/fill-range.integrity` | str | - | - | Value: sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg== |
| `packages.node_modules/fill-range.dev` | bool | - | - | Value: True |
| `packages.node_modules/fill-range.license` | str | - | - | Value: MIT |
| `packages.node_modules/fill-range.dependencies` | object | - | - | Config section |
| `packages.node_modules/fill-range.dependencies.to-regex-range` | str | - | - | Value: ^5.0.1 |
| `packages.node_modules/fill-range.engines` | object | - | - | Config section |
| `packages.node_modules/fill-range.engines.node` | str | - | - | Value: >=8 |
| `packages.node_modules/fraction.js` | object | - | - | Config section |
| `packages.node_modules/fraction.js.version` | str | - | - | Value: 5.3.4 |
| `packages.node_modules/fraction.js.resolved` | str | - | - | Value: https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz |
| `packages.node_modules/fraction.js.integrity` | str | - | - | Value: sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ== |
| `packages.node_modules/fraction.js.dev` | bool | - | - | Value: True |
| `packages.node_modules/fraction.js.license` | str | - | - | Value: MIT |
| `packages.node_modules/fraction.js.engines` | object | - | - | Config section |
| `packages.node_modules/fraction.js.engines.node` | str | - | - | Value: * |
| `packages.node_modules/fraction.js.funding` | object | - | - | Config section |
| `packages.node_modules/fraction.js.funding.type` | str | - | - | Value: github |
| `packages.node_modules/fraction.js.funding.url` | str | - | - | Value: https://github.com/sponsors/rawify |
| `packages.node_modules/framer-motion` | object | - | - | Config section |
| `packages.node_modules/framer-motion.version` | str | - | - | Value: 11.18.2 |
| `packages.node_modules/framer-motion.resolved` | str | - | - | Value: https://registry.npmjs.org/framer-motion/-/framer-motion-11.18.2.tgz |
| `packages.node_modules/framer-motion.integrity` | str | - | - | Value: sha512-5F5Och7wrvtLVElIpclDT0CBzMVg3dL22B64aZwHtsIY8RB4mXICLrkajK4G9R+ieSAGcgrLeae2SeUTg2pr6w== |
| `packages.node_modules/framer-motion.license` | str | - | - | Value: MIT |
| `packages.node_modules/framer-motion.dependencies` | object | - | - | Config section |
| `packages.node_modules/framer-motion.dependencies.motion-dom` | str | - | - | Value: ^11.18.1 |
| `packages.node_modules/framer-motion.dependencies.motion-utils` | str | - | - | Value: ^11.18.1 |
| `packages.node_modules/framer-motion.dependencies.tslib` | str | - | - | Value: ^2.4.0 |
| `packages.node_modules/framer-motion.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/framer-motion.peerDependencies.@emotion/is-prop-valid` | str | - | - | Value: * |
| `packages.node_modules/framer-motion.peerDependencies.react` | str | - | - | Value: ^18.0.0 || ^19.0.0 |
| `packages.node_modules/framer-motion.peerDependencies.react-dom` | str | - | - | Value: ^18.0.0 || ^19.0.0 |
| `packages.node_modules/framer-motion.peerDependenciesMeta` | object | - | - | Config section |
| `packages.node_modules/framer-motion.peerDependenciesMeta.@emotion/is-prop-valid` | object | - | - | Config section |
| `packages.node_modules/framer-motion.peerDependenciesMeta.@emotion/is-prop-valid.optional` | bool | - | - | Value: True |
| `packages.node_modules/framer-motion.peerDependenciesMeta.react` | object | - | - | Config section |
| `packages.node_modules/framer-motion.peerDependenciesMeta.react.optional` | bool | - | - | Value: True |
| `packages.node_modules/framer-motion.peerDependenciesMeta.react-dom` | object | - | - | Config section |
| `packages.node_modules/framer-motion.peerDependenciesMeta.react-dom.optional` | bool | - | - | Value: True |
| `packages.node_modules/fsevents` | object | - | - | Config section |
| `packages.node_modules/fsevents.version` | str | - | - | Value: 2.3.3 |
| `packages.node_modules/fsevents.resolved` | str | - | - | Value: https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz |
| `packages.node_modules/fsevents.integrity` | str | - | - | Value: sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw== |
| `packages.node_modules/fsevents.dev` | bool | - | - | Value: True |
| `packages.node_modules/fsevents.hasInstallScript` | bool | - | - | Value: True |
| `packages.node_modules/fsevents.license` | str | - | - | Value: MIT |
| `packages.node_modules/fsevents.optional` | bool | - | - | Value: True |
| `packages.node_modules/fsevents.os` | array | - | - | List of values |
| `packages.node_modules/fsevents.engines` | object | - | - | Config section |
| `packages.node_modules/fsevents.engines.node` | str | - | - | Value: ^8.16.0 || ^10.6.0 || >=11.0.0 |
| `packages.node_modules/function-bind` | object | - | - | Config section |
| `packages.node_modules/function-bind.version` | str | - | - | Value: 1.1.2 |
| `packages.node_modules/function-bind.resolved` | str | - | - | Value: https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz |
| `packages.node_modules/function-bind.integrity` | str | - | - | Value: sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA== |
| `packages.node_modules/function-bind.dev` | bool | - | - | Value: True |
| `packages.node_modules/function-bind.license` | str | - | - | Value: MIT |
| `packages.node_modules/function-bind.funding` | object | - | - | Config section |
| `packages.node_modules/function-bind.funding.url` | str | - | - | Value: https://github.com/sponsors/ljharb |
| `packages.node_modules/gensync` | object | - | - | Config section |
| `packages.node_modules/gensync.version` | str | - | - | Value: 1.0.0-beta.2 |
| `packages.node_modules/gensync.resolved` | str | - | - | Value: https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz |
| `packages.node_modules/gensync.integrity` | str | - | - | Value: sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg== |
| `packages.node_modules/gensync.dev` | bool | - | - | Value: True |
| `packages.node_modules/gensync.license` | str | - | - | Value: MIT |
| `packages.node_modules/gensync.engines` | object | - | - | Config section |
| `packages.node_modules/gensync.engines.node` | str | - | - | Value: >=6.9.0 |
| `packages.node_modules/glob-parent` | object | - | - | Config section |
| `packages.node_modules/glob-parent.version` | str | - | - | Value: 6.0.2 |
| `packages.node_modules/glob-parent.resolved` | str | - | - | Value: https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz |
| `packages.node_modules/glob-parent.integrity` | str | - | - | Value: sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A== |
| `packages.node_modules/glob-parent.dev` | bool | - | - | Value: True |
| `packages.node_modules/glob-parent.license` | str | - | - | Value: ISC |
| `packages.node_modules/glob-parent.dependencies` | object | - | - | Config section |
| `packages.node_modules/glob-parent.dependencies.is-glob` | str | - | - | Value: ^4.0.3 |
| `packages.node_modules/glob-parent.engines` | object | - | - | Config section |
| `packages.node_modules/glob-parent.engines.node` | str | - | - | Value: >=10.13.0 |
| `packages.node_modules/hasown` | object | - | - | Config section |
| `packages.node_modules/hasown.version` | str | - | - | Value: 2.0.4 |
| `packages.node_modules/hasown.resolved` | str | - | - | Value: https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz |
| `packages.node_modules/hasown.integrity` | str | - | - | Value: sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A== |
| `packages.node_modules/hasown.dev` | bool | - | - | Value: True |
| `packages.node_modules/hasown.license` | str | - | - | Value: MIT |
| `packages.node_modules/hasown.dependencies` | object | - | - | Config section |
| `packages.node_modules/hasown.dependencies.function-bind` | str | - | - | Value: ^1.1.2 |
| `packages.node_modules/hasown.engines` | object | - | - | Config section |
| `packages.node_modules/hasown.engines.node` | str | - | - | Value: >= 0.4 |
| `packages.node_modules/internmap` | object | - | - | Config section |
| `packages.node_modules/internmap.version` | str | - | - | Value: 2.0.3 |
| `packages.node_modules/internmap.resolved` | str | - | - | Value: https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz |
| `packages.node_modules/internmap.integrity` | str | - | - | Value: sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg== |
| `packages.node_modules/internmap.license` | str | - | - | Value: ISC |
| `packages.node_modules/internmap.engines` | object | - | - | Config section |
| `packages.node_modules/internmap.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/is-binary-path` | object | - | - | Config section |
| `packages.node_modules/is-binary-path.version` | str | - | - | Value: 2.1.0 |
| `packages.node_modules/is-binary-path.resolved` | str | - | - | Value: https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz |
| `packages.node_modules/is-binary-path.integrity` | str | - | - | Value: sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw== |
| `packages.node_modules/is-binary-path.dev` | bool | - | - | Value: True |
| `packages.node_modules/is-binary-path.license` | str | - | - | Value: MIT |
| `packages.node_modules/is-binary-path.dependencies` | object | - | - | Config section |
| `packages.node_modules/is-binary-path.dependencies.binary-extensions` | str | - | - | Value: ^2.0.0 |
| `packages.node_modules/is-binary-path.engines` | object | - | - | Config section |
| `packages.node_modules/is-binary-path.engines.node` | str | - | - | Value: >=8 |
| `packages.node_modules/is-core-module` | object | - | - | Config section |
| `packages.node_modules/is-core-module.version` | str | - | - | Value: 2.16.2 |
| `packages.node_modules/is-core-module.resolved` | str | - | - | Value: https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz |
| `packages.node_modules/is-core-module.integrity` | str | - | - | Value: sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA== |
| `packages.node_modules/is-core-module.dev` | bool | - | - | Value: True |
| `packages.node_modules/is-core-module.license` | str | - | - | Value: MIT |
| `packages.node_modules/is-core-module.dependencies` | object | - | - | Config section |
| `packages.node_modules/is-core-module.dependencies.hasown` | str | - | - | Value: ^2.0.3 |
| `packages.node_modules/is-core-module.engines` | object | - | - | Config section |
| `packages.node_modules/is-core-module.engines.node` | str | - | - | Value: >= 0.4 |
| `packages.node_modules/is-core-module.funding` | object | - | - | Config section |
| `packages.node_modules/is-core-module.funding.url` | str | - | - | Value: https://github.com/sponsors/ljharb |
| `packages.node_modules/is-extglob` | object | - | - | Config section |
| `packages.node_modules/is-extglob.version` | str | - | - | Value: 2.1.1 |
| `packages.node_modules/is-extglob.resolved` | str | - | - | Value: https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz |
| `packages.node_modules/is-extglob.integrity` | str | - | - | Value: sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ== |
| `packages.node_modules/is-extglob.dev` | bool | - | - | Value: True |
| `packages.node_modules/is-extglob.license` | str | - | - | Value: MIT |
| `packages.node_modules/is-extglob.engines` | object | - | - | Config section |
| `packages.node_modules/is-extglob.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/is-glob` | object | - | - | Config section |
| `packages.node_modules/is-glob.version` | str | - | - | Value: 4.0.3 |
| `packages.node_modules/is-glob.resolved` | str | - | - | Value: https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz |
| `packages.node_modules/is-glob.integrity` | str | - | - | Value: sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg== |
| `packages.node_modules/is-glob.dev` | bool | - | - | Value: True |
| `packages.node_modules/is-glob.license` | str | - | - | Value: MIT |
| `packages.node_modules/is-glob.dependencies` | object | - | - | Config section |
| `packages.node_modules/is-glob.dependencies.is-extglob` | str | - | - | Value: ^2.1.1 |
| `packages.node_modules/is-glob.engines` | object | - | - | Config section |
| `packages.node_modules/is-glob.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/is-number` | object | - | - | Config section |
| `packages.node_modules/is-number.version` | str | - | - | Value: 7.0.0 |
| `packages.node_modules/is-number.resolved` | str | - | - | Value: https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz |
| `packages.node_modules/is-number.integrity` | str | - | - | Value: sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng== |
| `packages.node_modules/is-number.dev` | bool | - | - | Value: True |
| `packages.node_modules/is-number.license` | str | - | - | Value: MIT |
| `packages.node_modules/is-number.engines` | object | - | - | Config section |
| `packages.node_modules/is-number.engines.node` | str | - | - | Value: >=0.12.0 |
| `packages.node_modules/jiti` | object | - | - | Config section |
| `packages.node_modules/jiti.version` | str | - | - | Value: 1.21.7 |
| `packages.node_modules/jiti.resolved` | str | - | - | Value: https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz |
| `packages.node_modules/jiti.integrity` | str | - | - | Value: sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A== |
| `packages.node_modules/jiti.dev` | bool | - | - | Value: True |
| `packages.node_modules/jiti.license` | str | - | - | Value: MIT |
| `packages.node_modules/jiti.bin` | object | - | - | Config section |
| `packages.node_modules/jiti.bin.jiti` | str | - | - | Value: bin/jiti.js |
| `packages.node_modules/js-tokens` | object | - | - | Config section |
| `packages.node_modules/js-tokens.version` | str | - | - | Value: 4.0.0 |
| `packages.node_modules/js-tokens.resolved` | str | - | - | Value: https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz |
| `packages.node_modules/js-tokens.integrity` | str | - | - | Value: sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ== |
| `packages.node_modules/js-tokens.license` | str | - | - | Value: MIT |
| `packages.node_modules/jsesc` | object | - | - | Config section |
| `packages.node_modules/jsesc.version` | str | - | - | Value: 3.1.0 |
| `packages.node_modules/jsesc.resolved` | str | - | - | Value: https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz |
| `packages.node_modules/jsesc.integrity` | str | - | - | Value: sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA== |
| `packages.node_modules/jsesc.dev` | bool | - | - | Value: True |
| `packages.node_modules/jsesc.license` | str | - | - | Value: MIT |
| `packages.node_modules/jsesc.bin` | object | - | - | Config section |
| `packages.node_modules/jsesc.bin.jsesc` | str | - | - | Value: bin/jsesc |
| `packages.node_modules/jsesc.engines` | object | - | - | Config section |
| `packages.node_modules/jsesc.engines.node` | str | - | - | Value: >=6 |
| `packages.node_modules/json5` | object | - | - | Config section |
| `packages.node_modules/json5.version` | str | - | - | Value: 2.2.3 |
| `packages.node_modules/json5.resolved` | str | - | - | Value: https://registry.npmjs.org/json5/-/json5-2.2.3.tgz |
| `packages.node_modules/json5.integrity` | str | - | - | Value: sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg== |
| `packages.node_modules/json5.dev` | bool | - | - | Value: True |
| `packages.node_modules/json5.license` | str | - | - | Value: MIT |
| `packages.node_modules/json5.bin` | object | - | - | Config section |
| `packages.node_modules/json5.bin.json5` | str | - | - | Value: lib/cli.js |
| `packages.node_modules/json5.engines` | object | - | - | Config section |
| `packages.node_modules/json5.engines.node` | str | - | - | Value: >=6 |
| `packages.node_modules/lilconfig` | object | - | - | Config section |
| `packages.node_modules/lilconfig.version` | str | - | - | Value: 3.1.3 |
| `packages.node_modules/lilconfig.resolved` | str | - | - | Value: https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz |
| `packages.node_modules/lilconfig.integrity` | str | - | - | Value: sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw== |
| `packages.node_modules/lilconfig.dev` | bool | - | - | Value: True |
| `packages.node_modules/lilconfig.license` | str | - | - | Value: MIT |
| `packages.node_modules/lilconfig.engines` | object | - | - | Config section |
| `packages.node_modules/lilconfig.engines.node` | str | - | - | Value: >=14 |
| `packages.node_modules/lilconfig.funding` | object | - | - | Config section |
| `packages.node_modules/lilconfig.funding.url` | str | - | - | Value: https://github.com/sponsors/antonk52 |
| `packages.node_modules/lines-and-columns` | object | - | - | Config section |
| `packages.node_modules/lines-and-columns.version` | str | - | - | Value: 1.2.4 |
| `packages.node_modules/lines-and-columns.resolved` | str | - | - | Value: https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz |
| `packages.node_modules/lines-and-columns.integrity` | str | - | - | Value: sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg== |
| `packages.node_modules/lines-and-columns.dev` | bool | - | - | Value: True |
| `packages.node_modules/lines-and-columns.license` | str | - | - | Value: MIT |
| `packages.node_modules/lodash` | object | - | - | Config section |
| `packages.node_modules/lodash.version` | str | - | - | Value: 4.18.1 |
| `packages.node_modules/lodash.resolved` | str | - | - | Value: https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz |
| `packages.node_modules/lodash.integrity` | str | - | - | Value: sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q== |
| `packages.node_modules/lodash.license` | str | - | - | Value: MIT |
| `packages.node_modules/loose-envify` | object | - | - | Config section |
| `packages.node_modules/loose-envify.version` | str | - | - | Value: 1.4.0 |
| `packages.node_modules/loose-envify.resolved` | str | - | - | Value: https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz |
| `packages.node_modules/loose-envify.integrity` | str | - | - | Value: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q== |
| `packages.node_modules/loose-envify.license` | str | - | - | Value: MIT |
| `packages.node_modules/loose-envify.dependencies` | object | - | - | Config section |
| `packages.node_modules/loose-envify.dependencies.js-tokens` | str | - | - | Value: ^3.0.0 || ^4.0.0 |
| `packages.node_modules/loose-envify.bin` | object | - | - | Config section |
| `packages.node_modules/loose-envify.bin.loose-envify` | str | - | - | Value: cli.js |
| `packages.node_modules/lru-cache` | object | - | - | Config section |
| `packages.node_modules/lru-cache.version` | str | - | - | Value: 5.1.1 |
| `packages.node_modules/lru-cache.resolved` | str | - | - | Value: https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz |
| `packages.node_modules/lru-cache.integrity` | str | - | - | Value: sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w== |
| `packages.node_modules/lru-cache.dev` | bool | - | - | Value: True |
| `packages.node_modules/lru-cache.license` | str | - | - | Value: ISC |
| `packages.node_modules/lru-cache.dependencies` | object | - | - | Config section |
| `packages.node_modules/lru-cache.dependencies.yallist` | str | - | - | Value: ^3.0.2 |
| `packages.node_modules/lucide-react` | object | - | - | Config section |
| `packages.node_modules/lucide-react.version` | str | - | - | Value: 0.395.0 |
| `packages.node_modules/lucide-react.resolved` | str | - | - | Value: https://registry.npmjs.org/lucide-react/-/lucide-react-0.395.0.tgz |
| `packages.node_modules/lucide-react.integrity` | str | - | - | Value: sha512-6hzdNH5723A4FLaYZWpK50iyZH8iS2Jq5zuPRRotOFkhu6kxxJiebVdJ72tCR5XkiIeYFOU5NUawFZOac+VeYw== |
| `packages.node_modules/lucide-react.license` | str | - | - | Value: ISC |
| `packages.node_modules/lucide-react.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/lucide-react.peerDependencies.react` | str | - | - | Value: ^16.5.1 || ^17.0.0 || ^18.0.0 |
| `packages.node_modules/merge2` | object | - | - | Config section |
| `packages.node_modules/merge2.version` | str | - | - | Value: 1.4.1 |
| `packages.node_modules/merge2.resolved` | str | - | - | Value: https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz |
| `packages.node_modules/merge2.integrity` | str | - | - | Value: sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg== |
| `packages.node_modules/merge2.dev` | bool | - | - | Value: True |
| `packages.node_modules/merge2.license` | str | - | - | Value: MIT |
| `packages.node_modules/merge2.engines` | object | - | - | Config section |
| `packages.node_modules/merge2.engines.node` | str | - | - | Value: >= 8 |
| `packages.node_modules/micromatch` | object | - | - | Config section |
| `packages.node_modules/micromatch.version` | str | - | - | Value: 4.0.8 |
| `packages.node_modules/micromatch.resolved` | str | - | - | Value: https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz |
| `packages.node_modules/micromatch.integrity` | str | - | - | Value: sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA== |
| `packages.node_modules/micromatch.dev` | bool | - | - | Value: True |
| `packages.node_modules/micromatch.license` | str | - | - | Value: MIT |
| `packages.node_modules/micromatch.dependencies` | object | - | - | Config section |
| `packages.node_modules/micromatch.dependencies.braces` | str | - | - | Value: ^3.0.3 |
| `packages.node_modules/micromatch.dependencies.picomatch` | str | - | - | Value: ^2.3.1 |
| `packages.node_modules/micromatch.engines` | object | - | - | Config section |
| `packages.node_modules/micromatch.engines.node` | str | - | - | Value: >=8.6 |
| `packages.node_modules/motion-dom` | object | - | - | Config section |
| `packages.node_modules/motion-dom.version` | str | - | - | Value: 11.18.1 |
| `packages.node_modules/motion-dom.resolved` | str | - | - | Value: https://registry.npmjs.org/motion-dom/-/motion-dom-11.18.1.tgz |
| `packages.node_modules/motion-dom.integrity` | str | - | - | Value: sha512-g76KvA001z+atjfxczdRtw/RXOM3OMSdd1f4DL77qCTF/+avrRJiawSG4yDibEQ215sr9kpinSlX2pCTJ9zbhw== |
| `packages.node_modules/motion-dom.license` | str | - | - | Value: MIT |
| `packages.node_modules/motion-dom.dependencies` | object | - | - | Config section |
| `packages.node_modules/motion-dom.dependencies.motion-utils` | str | - | - | Value: ^11.18.1 |
| `packages.node_modules/motion-utils` | object | - | - | Config section |
| `packages.node_modules/motion-utils.version` | str | - | - | Value: 11.18.1 |
| `packages.node_modules/motion-utils.resolved` | str | - | - | Value: https://registry.npmjs.org/motion-utils/-/motion-utils-11.18.1.tgz |
| `packages.node_modules/motion-utils.integrity` | str | - | - | Value: sha512-49Kt+HKjtbJKLtgO/LKj9Ld+6vw9BjH5d9sc40R/kVyH8GLAXgT42M2NnuPcJNuA3s9ZfZBUcwIgpmZWGEE+hA== |
| `packages.node_modules/motion-utils.license` | str | - | - | Value: MIT |
| `packages.node_modules/ms` | object | - | - | Config section |
| `packages.node_modules/ms.version` | str | - | - | Value: 2.1.3 |
| `packages.node_modules/ms.resolved` | str | - | - | Value: https://registry.npmjs.org/ms/-/ms-2.1.3.tgz |
| `packages.node_modules/ms.integrity` | str | - | - | Value: sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA== |
| `packages.node_modules/ms.dev` | bool | - | - | Value: True |
| `packages.node_modules/ms.license` | str | - | - | Value: MIT |
| `packages.node_modules/mz` | object | - | - | Config section |
| `packages.node_modules/mz.version` | str | - | - | Value: 2.7.0 |
| `packages.node_modules/mz.resolved` | str | - | - | Value: https://registry.npmjs.org/mz/-/mz-2.7.0.tgz |
| `packages.node_modules/mz.integrity` | str | - | - | Value: sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q== |
| `packages.node_modules/mz.dev` | bool | - | - | Value: True |
| `packages.node_modules/mz.license` | str | - | - | Value: MIT |
| `packages.node_modules/mz.dependencies` | object | - | - | Config section |
| `packages.node_modules/mz.dependencies.any-promise` | str | - | - | Value: ^1.0.0 |
| `packages.node_modules/mz.dependencies.object-assign` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/mz.dependencies.thenify-all` | str | - | - | Value: ^1.0.0 |
| `packages.node_modules/nanoid` | object | - | - | Config section |
| `packages.node_modules/nanoid.version` | str | - | - | Value: 3.3.19 |
| `packages.node_modules/nanoid.resolved` | str | - | - | Value: https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz |
| `packages.node_modules/nanoid.integrity` | str | - | - | Value: sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug== |
| `packages.node_modules/nanoid.dev` | bool | - | - | Value: True |
| `packages.node_modules/nanoid.funding` | array | - | - | List of values |
| `packages.node_modules/nanoid.funding[].type` | str | - | - | Value: github |
| `packages.node_modules/nanoid.funding[].url` | str | - | - | Value: https://github.com/sponsors/ai |
| `packages.node_modules/nanoid.license` | str | - | - | Value: MIT |
| `packages.node_modules/nanoid.bin` | object | - | - | Config section |
| `packages.node_modules/nanoid.bin.nanoid` | str | - | - | Value: bin/nanoid.cjs |
| `packages.node_modules/nanoid.engines` | object | - | - | Config section |
| `packages.node_modules/nanoid.engines.node` | str | - | - | Value: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1 |
| `packages.node_modules/node-releases` | object | - | - | Config section |
| `packages.node_modules/node-releases.version` | str | - | - | Value: 2.0.55 |
| `packages.node_modules/node-releases.resolved` | str | - | - | Value: https://registry.npmjs.org/node-releases/-/node-releases-2.0.55.tgz |
| `packages.node_modules/node-releases.integrity` | str | - | - | Value: sha512-mIrE/Cw9y+9Au6dS5vDKDhQza9YvG6w+ZrS6X+ZzA7yFW/soAeaups4Qzn1bL6g5FVy8WtP79+0j82oPIbqRjQ== |
| `packages.node_modules/node-releases.dev` | bool | - | - | Value: True |
| `packages.node_modules/node-releases.license` | str | - | - | Value: MIT |
| `packages.node_modules/node-releases.engines` | object | - | - | Config section |
| `packages.node_modules/node-releases.engines.node` | str | - | - | Value: >=18 |
| `packages.node_modules/normalize-path` | object | - | - | Config section |
| `packages.node_modules/normalize-path.version` | str | - | - | Value: 3.0.0 |
| `packages.node_modules/normalize-path.resolved` | str | - | - | Value: https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz |
| `packages.node_modules/normalize-path.integrity` | str | - | - | Value: sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA== |
| `packages.node_modules/normalize-path.dev` | bool | - | - | Value: True |
| `packages.node_modules/normalize-path.license` | str | - | - | Value: MIT |
| `packages.node_modules/normalize-path.engines` | object | - | - | Config section |
| `packages.node_modules/normalize-path.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/object-assign` | object | - | - | Config section |
| `packages.node_modules/object-assign.version` | str | - | - | Value: 4.1.1 |
| `packages.node_modules/object-assign.resolved` | str | - | - | Value: https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz |
| `packages.node_modules/object-assign.integrity` | str | - | - | Value: sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg== |
| `packages.node_modules/object-assign.license` | str | - | - | Value: MIT |
| `packages.node_modules/object-assign.engines` | object | - | - | Config section |
| `packages.node_modules/object-assign.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/object-hash` | object | - | - | Config section |
| `packages.node_modules/object-hash.version` | str | - | - | Value: 3.0.0 |
| `packages.node_modules/object-hash.resolved` | str | - | - | Value: https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz |
| `packages.node_modules/object-hash.integrity` | str | - | - | Value: sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw== |
| `packages.node_modules/object-hash.dev` | bool | - | - | Value: True |
| `packages.node_modules/object-hash.license` | str | - | - | Value: MIT |
| `packages.node_modules/object-hash.engines` | object | - | - | Config section |
| `packages.node_modules/object-hash.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/path-parse` | object | - | - | Config section |
| `packages.node_modules/path-parse.version` | str | - | - | Value: 1.0.7 |
| `packages.node_modules/path-parse.resolved` | str | - | - | Value: https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz |
| `packages.node_modules/path-parse.integrity` | str | - | - | Value: sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw== |
| `packages.node_modules/path-parse.dev` | bool | - | - | Value: True |
| `packages.node_modules/path-parse.license` | str | - | - | Value: MIT |
| `packages.node_modules/picocolors` | object | - | - | Config section |
| `packages.node_modules/picocolors.version` | str | - | - | Value: 1.1.1 |
| `packages.node_modules/picocolors.resolved` | str | - | - | Value: https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz |
| `packages.node_modules/picocolors.integrity` | str | - | - | Value: sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA== |
| `packages.node_modules/picocolors.dev` | bool | - | - | Value: True |
| `packages.node_modules/picocolors.license` | str | - | - | Value: ISC |
| `packages.node_modules/picomatch` | object | - | - | Config section |
| `packages.node_modules/picomatch.version` | str | - | - | Value: 2.3.2 |
| `packages.node_modules/picomatch.resolved` | str | - | - | Value: https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz |
| `packages.node_modules/picomatch.integrity` | str | - | - | Value: sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA== |
| `packages.node_modules/picomatch.dev` | bool | - | - | Value: True |
| `packages.node_modules/picomatch.license` | str | - | - | Value: MIT |
| `packages.node_modules/picomatch.engines` | object | - | - | Config section |
| `packages.node_modules/picomatch.engines.node` | str | - | - | Value: >=8.6 |
| `packages.node_modules/picomatch.funding` | object | - | - | Config section |
| `packages.node_modules/picomatch.funding.url` | str | - | - | Value: https://github.com/sponsors/jonschlinkert |
| `packages.node_modules/pirates` | object | - | - | Config section |
| `packages.node_modules/pirates.version` | str | - | - | Value: 4.0.7 |
| `packages.node_modules/pirates.resolved` | str | - | - | Value: https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz |
| `packages.node_modules/pirates.integrity` | str | - | - | Value: sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA== |
| `packages.node_modules/pirates.dev` | bool | - | - | Value: True |
| `packages.node_modules/pirates.license` | str | - | - | Value: MIT |
| `packages.node_modules/pirates.engines` | object | - | - | Config section |
| `packages.node_modules/pirates.engines.node` | str | - | - | Value: >= 6 |
| `packages.node_modules/postcss` | object | - | - | Config section |
| `packages.node_modules/postcss.version` | str | - | - | Value: 8.5.28 |
| `packages.node_modules/postcss.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz |
| `packages.node_modules/postcss.integrity` | str | - | - | Value: sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A== |
| `packages.node_modules/postcss.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss.funding` | array | - | - | List of values |
| `packages.node_modules/postcss.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/postcss.funding[].url` | str | - | - | Value: https://opencollective.com/postcss/ |
| `packages.node_modules/postcss.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss.dependencies.nanoid` | str | - | - | Value: ^3.3.18 |
| `packages.node_modules/postcss.dependencies.picocolors` | str | - | - | Value: ^1.1.1 |
| `packages.node_modules/postcss.dependencies.source-map-js` | str | - | - | Value: ^1.2.1 |
| `packages.node_modules/postcss.engines` | object | - | - | Config section |
| `packages.node_modules/postcss.engines.node` | str | - | - | Value: ^10 || ^12 || >=14 |
| `packages.node_modules/postcss-import` | object | - | - | Config section |
| `packages.node_modules/postcss-import.version` | str | - | - | Value: 15.1.0 |
| `packages.node_modules/postcss-import.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz |
| `packages.node_modules/postcss-import.integrity` | str | - | - | Value: sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew== |
| `packages.node_modules/postcss-import.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-import.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss-import.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-import.dependencies.postcss-value-parser` | str | - | - | Value: ^4.0.0 |
| `packages.node_modules/postcss-import.dependencies.read-cache` | str | - | - | Value: ^1.0.0 |
| `packages.node_modules/postcss-import.dependencies.resolve` | str | - | - | Value: ^1.1.7 |
| `packages.node_modules/postcss-import.engines` | object | - | - | Config section |
| `packages.node_modules/postcss-import.engines.node` | str | - | - | Value: >=14.0.0 |
| `packages.node_modules/postcss-import.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-import.peerDependencies.postcss` | str | - | - | Value: ^8.0.0 |
| `packages.node_modules/postcss-js` | object | - | - | Config section |
| `packages.node_modules/postcss-js.version` | str | - | - | Value: 4.1.0 |
| `packages.node_modules/postcss-js.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz |
| `packages.node_modules/postcss-js.integrity` | str | - | - | Value: sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw== |
| `packages.node_modules/postcss-js.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-js.funding` | array | - | - | List of values |
| `packages.node_modules/postcss-js.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/postcss-js.funding[].url` | str | - | - | Value: https://opencollective.com/postcss/ |
| `packages.node_modules/postcss-js.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss-js.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-js.dependencies.camelcase-css` | str | - | - | Value: ^2.0.1 |
| `packages.node_modules/postcss-js.engines` | object | - | - | Config section |
| `packages.node_modules/postcss-js.engines.node` | str | - | - | Value: ^12 || ^14 || >= 16 |
| `packages.node_modules/postcss-js.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-js.peerDependencies.postcss` | str | - | - | Value: ^8.4.21 |
| `packages.node_modules/postcss-load-config` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.version` | str | - | - | Value: 6.0.1 |
| `packages.node_modules/postcss-load-config.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz |
| `packages.node_modules/postcss-load-config.integrity` | str | - | - | Value: sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g== |
| `packages.node_modules/postcss-load-config.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-load-config.funding` | array | - | - | List of values |
| `packages.node_modules/postcss-load-config.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/postcss-load-config.funding[].url` | str | - | - | Value: https://opencollective.com/postcss/ |
| `packages.node_modules/postcss-load-config.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss-load-config.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.dependencies.lilconfig` | str | - | - | Value: ^3.1.1 |
| `packages.node_modules/postcss-load-config.engines` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.engines.node` | str | - | - | Value: >= 18 |
| `packages.node_modules/postcss-load-config.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependencies.jiti` | str | - | - | Value: >=1.21.0 |
| `packages.node_modules/postcss-load-config.peerDependencies.postcss` | str | - | - | Value: >=8.0.9 |
| `packages.node_modules/postcss-load-config.peerDependencies.tsx` | str | - | - | Value: ^4.8.1 |
| `packages.node_modules/postcss-load-config.peerDependencies.yaml` | str | - | - | Value: ^2.4.2 |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.jiti` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.jiti.optional` | bool | - | - | Value: True |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.postcss` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.postcss.optional` | bool | - | - | Value: True |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.tsx` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.tsx.optional` | bool | - | - | Value: True |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.yaml` | object | - | - | Config section |
| `packages.node_modules/postcss-load-config.peerDependenciesMeta.yaml.optional` | bool | - | - | Value: True |
| `packages.node_modules/postcss-nested` | object | - | - | Config section |
| `packages.node_modules/postcss-nested.version` | str | - | - | Value: 6.2.0 |
| `packages.node_modules/postcss-nested.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz |
| `packages.node_modules/postcss-nested.integrity` | str | - | - | Value: sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ== |
| `packages.node_modules/postcss-nested.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-nested.funding` | array | - | - | List of values |
| `packages.node_modules/postcss-nested.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/postcss-nested.funding[].url` | str | - | - | Value: https://opencollective.com/postcss/ |
| `packages.node_modules/postcss-nested.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss-nested.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-nested.dependencies.postcss-selector-parser` | str | - | - | Value: ^6.1.1 |
| `packages.node_modules/postcss-nested.engines` | object | - | - | Config section |
| `packages.node_modules/postcss-nested.engines.node` | str | - | - | Value: >=12.0 |
| `packages.node_modules/postcss-nested.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-nested.peerDependencies.postcss` | str | - | - | Value: ^8.2.14 |
| `packages.node_modules/postcss-selector-parser` | object | - | - | Config section |
| `packages.node_modules/postcss-selector-parser.version` | str | - | - | Value: 6.1.4 |
| `packages.node_modules/postcss-selector-parser.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz |
| `packages.node_modules/postcss-selector-parser.integrity` | str | - | - | Value: sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ== |
| `packages.node_modules/postcss-selector-parser.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-selector-parser.license` | str | - | - | Value: MIT |
| `packages.node_modules/postcss-selector-parser.dependencies` | object | - | - | Config section |
| `packages.node_modules/postcss-selector-parser.dependencies.cssesc` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/postcss-selector-parser.dependencies.util-deprecate` | str | - | - | Value: ^1.0.2 |
| `packages.node_modules/postcss-selector-parser.engines` | object | - | - | Config section |
| `packages.node_modules/postcss-selector-parser.engines.node` | str | - | - | Value: >=4 |
| `packages.node_modules/postcss-value-parser` | object | - | - | Config section |
| `packages.node_modules/postcss-value-parser.version` | str | - | - | Value: 4.2.0 |
| `packages.node_modules/postcss-value-parser.resolved` | str | - | - | Value: https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz |
| `packages.node_modules/postcss-value-parser.integrity` | str | - | - | Value: sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ== |
| `packages.node_modules/postcss-value-parser.dev` | bool | - | - | Value: True |
| `packages.node_modules/postcss-value-parser.license` | str | - | - | Value: MIT |
| `packages.node_modules/prop-types` | object | - | - | Config section |
| `packages.node_modules/prop-types.version` | str | - | - | Value: 15.8.1 |
| `packages.node_modules/prop-types.resolved` | str | - | - | Value: https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz |
| `packages.node_modules/prop-types.integrity` | str | - | - | Value: sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg== |
| `packages.node_modules/prop-types.license` | str | - | - | Value: MIT |
| `packages.node_modules/prop-types.dependencies` | object | - | - | Config section |
| `packages.node_modules/prop-types.dependencies.loose-envify` | str | - | - | Value: ^1.4.0 |
| `packages.node_modules/prop-types.dependencies.object-assign` | str | - | - | Value: ^4.1.1 |
| `packages.node_modules/prop-types.dependencies.react-is` | str | - | - | Value: ^16.13.1 |
| `packages.node_modules/prop-types/node_modules/react-is` | object | - | - | Config section |
| `packages.node_modules/prop-types/node_modules/react-is.version` | str | - | - | Value: 16.13.1 |
| `packages.node_modules/prop-types/node_modules/react-is.resolved` | str | - | - | Value: https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz |
| `packages.node_modules/prop-types/node_modules/react-is.integrity` | str | - | - | Value: sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ== |
| `packages.node_modules/prop-types/node_modules/react-is.license` | str | - | - | Value: MIT |
| `packages.node_modules/queue-microtask` | object | - | - | Config section |
| `packages.node_modules/queue-microtask.version` | str | - | - | Value: 1.2.3 |
| `packages.node_modules/queue-microtask.resolved` | str | - | - | Value: https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz |
| `packages.node_modules/queue-microtask.integrity` | str | - | - | Value: sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A== |
| `packages.node_modules/queue-microtask.dev` | bool | - | - | Value: True |
| `packages.node_modules/queue-microtask.funding` | array | - | - | List of values |
| `packages.node_modules/queue-microtask.funding[].type` | str | - | - | Value: github |
| `packages.node_modules/queue-microtask.funding[].url` | str | - | - | Value: https://github.com/sponsors/feross |
| `packages.node_modules/queue-microtask.license` | str | - | - | Value: MIT |
| `packages.node_modules/react` | object | - | - | Config section |
| `packages.node_modules/react.version` | str | - | - | Value: 18.3.1 |
| `packages.node_modules/react.resolved` | str | - | - | Value: https://registry.npmjs.org/react/-/react-18.3.1.tgz |
| `packages.node_modules/react.integrity` | str | - | - | Value: sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ== |
| `packages.node_modules/react.license` | str | - | - | Value: MIT |
| `packages.node_modules/react.dependencies` | object | - | - | Config section |
| `packages.node_modules/react.dependencies.loose-envify` | str | - | - | Value: ^1.1.0 |
| `packages.node_modules/react.engines` | object | - | - | Config section |
| `packages.node_modules/react.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/react-dom` | object | - | - | Config section |
| `packages.node_modules/react-dom.version` | str | - | - | Value: 18.3.1 |
| `packages.node_modules/react-dom.resolved` | str | - | - | Value: https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz |
| `packages.node_modules/react-dom.integrity` | str | - | - | Value: sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw== |
| `packages.node_modules/react-dom.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-dom.dependencies` | object | - | - | Config section |
| `packages.node_modules/react-dom.dependencies.loose-envify` | str | - | - | Value: ^1.1.0 |
| `packages.node_modules/react-dom.dependencies.scheduler` | str | - | - | Value: ^0.23.2 |
| `packages.node_modules/react-dom.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/react-dom.peerDependencies.react` | str | - | - | Value: ^18.3.1 |
| `packages.node_modules/react-is` | object | - | - | Config section |
| `packages.node_modules/react-is.version` | str | - | - | Value: 18.3.1 |
| `packages.node_modules/react-is.resolved` | str | - | - | Value: https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz |
| `packages.node_modules/react-is.integrity` | str | - | - | Value: sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg== |
| `packages.node_modules/react-is.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-refresh` | object | - | - | Config section |
| `packages.node_modules/react-refresh.version` | str | - | - | Value: 0.17.0 |
| `packages.node_modules/react-refresh.resolved` | str | - | - | Value: https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz |
| `packages.node_modules/react-refresh.integrity` | str | - | - | Value: sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ== |
| `packages.node_modules/react-refresh.dev` | bool | - | - | Value: True |
| `packages.node_modules/react-refresh.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-refresh.engines` | object | - | - | Config section |
| `packages.node_modules/react-refresh.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/react-router` | object | - | - | Config section |
| `packages.node_modules/react-router.version` | str | - | - | Value: 6.30.6 |
| `packages.node_modules/react-router.resolved` | str | - | - | Value: https://registry.npmjs.org/react-router/-/react-router-6.30.6.tgz |
| `packages.node_modules/react-router.integrity` | str | - | - | Value: sha512-5HfK7k5im7LTOB0EqCQmfvy4C13G92Ssj1VTmouTK3AJvyjKTnFuCV0vcMAD/JS+JC4DvDIBRrlAeJIFjh5VWg== |
| `packages.node_modules/react-router.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-router.dependencies` | object | - | - | Config section |
| `packages.node_modules/react-router.dependencies.@remix-run/router` | str | - | - | Value: 1.23.4 |
| `packages.node_modules/react-router.engines` | object | - | - | Config section |
| `packages.node_modules/react-router.engines.node` | str | - | - | Value: >=14.0.0 |
| `packages.node_modules/react-router.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/react-router.peerDependencies.react` | str | - | - | Value: >=16.8 |
| `packages.node_modules/react-router-dom` | object | - | - | Config section |
| `packages.node_modules/react-router-dom.version` | str | - | - | Value: 6.30.6 |
| `packages.node_modules/react-router-dom.resolved` | str | - | - | Value: https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.30.6.tgz |
| `packages.node_modules/react-router-dom.integrity` | str | - | - | Value: sha512-0RHKZz7wwffvkU+2MFVT2NnjK44ssLEV+m0CAJaS2Ksmorrwj7WxH00jO0SOCW26/tINUnJHToXblDs33I38YQ== |
| `packages.node_modules/react-router-dom.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-router-dom.dependencies` | object | - | - | Config section |
| `packages.node_modules/react-router-dom.dependencies.@remix-run/router` | str | - | - | Value: 1.23.4 |
| `packages.node_modules/react-router-dom.dependencies.react-router` | str | - | - | Value: 6.30.6 |
| `packages.node_modules/react-router-dom.engines` | object | - | - | Config section |
| `packages.node_modules/react-router-dom.engines.node` | str | - | - | Value: >=14.0.0 |
| `packages.node_modules/react-router-dom.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/react-router-dom.peerDependencies.react` | str | - | - | Value: >=16.8 |
| `packages.node_modules/react-router-dom.peerDependencies.react-dom` | str | - | - | Value: >=16.8 |
| `packages.node_modules/react-smooth` | object | - | - | Config section |
| `packages.node_modules/react-smooth.version` | str | - | - | Value: 4.0.4 |
| `packages.node_modules/react-smooth.resolved` | str | - | - | Value: https://registry.npmjs.org/react-smooth/-/react-smooth-4.0.4.tgz |
| `packages.node_modules/react-smooth.integrity` | str | - | - | Value: sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q== |
| `packages.node_modules/react-smooth.license` | str | - | - | Value: MIT |
| `packages.node_modules/react-smooth.dependencies` | object | - | - | Config section |
| `packages.node_modules/react-smooth.dependencies.fast-equals` | str | - | - | Value: ^5.0.1 |
| `packages.node_modules/react-smooth.dependencies.prop-types` | str | - | - | Value: ^15.8.1 |
| `packages.node_modules/react-smooth.dependencies.react-transition-group` | str | - | - | Value: ^4.4.5 |
| `packages.node_modules/react-smooth.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/react-smooth.peerDependencies.react` | str | - | - | Value: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 |
| `packages.node_modules/react-smooth.peerDependencies.react-dom` | str | - | - | Value: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 |
| `packages.node_modules/react-transition-group` | object | - | - | Config section |
| `packages.node_modules/react-transition-group.version` | str | - | - | Value: 4.4.5 |
| `packages.node_modules/react-transition-group.resolved` | str | - | - | Value: https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz |
| `packages.node_modules/react-transition-group.integrity` | str | - | - | Value: sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g== |
| `packages.node_modules/react-transition-group.license` | str | - | - | Value: BSD-3-Clause |
| `packages.node_modules/react-transition-group.dependencies` | object | - | - | Config section |
| `packages.node_modules/react-transition-group.dependencies.@babel/runtime` | str | - | - | Value: ^7.5.5 |
| `packages.node_modules/react-transition-group.dependencies.dom-helpers` | str | - | - | Value: ^5.0.1 |
| `packages.node_modules/react-transition-group.dependencies.loose-envify` | str | - | - | Value: ^1.4.0 |
| `packages.node_modules/react-transition-group.dependencies.prop-types` | str | - | - | Value: ^15.6.2 |
| `packages.node_modules/react-transition-group.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/react-transition-group.peerDependencies.react` | str | - | - | Value: >=16.6.0 |
| `packages.node_modules/react-transition-group.peerDependencies.react-dom` | str | - | - | Value: >=16.6.0 |
| `packages.node_modules/read-cache` | object | - | - | Config section |
| `packages.node_modules/read-cache.version` | str | - | - | Value: 1.0.2 |
| `packages.node_modules/read-cache.resolved` | str | - | - | Value: https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz |
| `packages.node_modules/read-cache.integrity` | str | - | - | Value: sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA== |
| `packages.node_modules/read-cache.dev` | bool | - | - | Value: True |
| `packages.node_modules/read-cache.license` | str | - | - | Value: MIT |
| `packages.node_modules/readdirp` | object | - | - | Config section |
| `packages.node_modules/readdirp.version` | str | - | - | Value: 3.6.0 |
| `packages.node_modules/readdirp.resolved` | str | - | - | Value: https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz |
| `packages.node_modules/readdirp.integrity` | str | - | - | Value: sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA== |
| `packages.node_modules/readdirp.dev` | bool | - | - | Value: True |
| `packages.node_modules/readdirp.license` | str | - | - | Value: MIT |
| `packages.node_modules/readdirp.dependencies` | object | - | - | Config section |
| `packages.node_modules/readdirp.dependencies.picomatch` | str | - | - | Value: ^2.2.1 |
| `packages.node_modules/readdirp.engines` | object | - | - | Config section |
| `packages.node_modules/readdirp.engines.node` | str | - | - | Value: >=8.10.0 |
| `packages.node_modules/recharts` | object | - | - | Config section |
| `packages.node_modules/recharts.version` | str | - | - | Value: 2.15.4 |
| `packages.node_modules/recharts.resolved` | str | - | - | Value: https://registry.npmjs.org/recharts/-/recharts-2.15.4.tgz |
| `packages.node_modules/recharts.integrity` | str | - | - | Value: sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw== |
| `packages.node_modules/recharts.deprecated` | str | - | - | Value: 1.x and 2.x branches are no longer active. Bump to Recharts v3 to receive latest features and bugfixes. See https://github.com/recharts/recharts/wiki/3.0-migration-guide |
| `packages.node_modules/recharts.license` | str | - | - | Value: MIT |
| `packages.node_modules/recharts.dependencies` | object | - | - | Config section |
| `packages.node_modules/recharts.dependencies.clsx` | str | - | - | Value: ^2.0.0 |
| `packages.node_modules/recharts.dependencies.eventemitter3` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/recharts.dependencies.lodash` | str | - | - | Value: ^4.17.21 |
| `packages.node_modules/recharts.dependencies.react-is` | str | - | - | Value: ^18.3.1 |
| `packages.node_modules/recharts.dependencies.react-smooth` | str | - | - | Value: ^4.0.4 |
| `packages.node_modules/recharts.dependencies.recharts-scale` | str | - | - | Value: ^0.4.4 |
| `packages.node_modules/recharts.dependencies.tiny-invariant` | str | - | - | Value: ^1.3.1 |
| `packages.node_modules/recharts.dependencies.victory-vendor` | str | - | - | Value: ^36.6.8 |
| `packages.node_modules/recharts.engines` | object | - | - | Config section |
| `packages.node_modules/recharts.engines.node` | str | - | - | Value: >=14 |
| `packages.node_modules/recharts.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/recharts.peerDependencies.react` | str | - | - | Value: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 |
| `packages.node_modules/recharts.peerDependencies.react-dom` | str | - | - | Value: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 |
| `packages.node_modules/recharts-scale` | object | - | - | Config section |
| `packages.node_modules/recharts-scale.version` | str | - | - | Value: 0.4.5 |
| `packages.node_modules/recharts-scale.resolved` | str | - | - | Value: https://registry.npmjs.org/recharts-scale/-/recharts-scale-0.4.5.tgz |
| `packages.node_modules/recharts-scale.integrity` | str | - | - | Value: sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w== |
| `packages.node_modules/recharts-scale.license` | str | - | - | Value: MIT |
| `packages.node_modules/recharts-scale.dependencies` | object | - | - | Config section |
| `packages.node_modules/recharts-scale.dependencies.decimal.js-light` | str | - | - | Value: ^2.4.1 |
| `packages.node_modules/resolve` | object | - | - | Config section |
| `packages.node_modules/resolve.version` | str | - | - | Value: 1.22.12 |
| `packages.node_modules/resolve.resolved` | str | - | - | Value: https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz |
| `packages.node_modules/resolve.integrity` | str | - | - | Value: sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA== |
| `packages.node_modules/resolve.dev` | bool | - | - | Value: True |
| `packages.node_modules/resolve.license` | str | - | - | Value: MIT |
| `packages.node_modules/resolve.dependencies` | object | - | - | Config section |
| `packages.node_modules/resolve.dependencies.es-errors` | str | - | - | Value: ^1.3.0 |
| `packages.node_modules/resolve.dependencies.is-core-module` | str | - | - | Value: ^2.16.1 |
| `packages.node_modules/resolve.dependencies.path-parse` | str | - | - | Value: ^1.0.7 |
| `packages.node_modules/resolve.dependencies.supports-preserve-symlinks-flag` | str | - | - | Value: ^1.0.0 |
| `packages.node_modules/resolve.bin` | object | - | - | Config section |
| `packages.node_modules/resolve.bin.resolve` | str | - | - | Value: bin/resolve |
| `packages.node_modules/resolve.engines` | object | - | - | Config section |
| `packages.node_modules/resolve.engines.node` | str | - | - | Value: >= 0.4 |
| `packages.node_modules/resolve.funding` | object | - | - | Config section |
| `packages.node_modules/resolve.funding.url` | str | - | - | Value: https://github.com/sponsors/ljharb |
| `packages.node_modules/reusify` | object | - | - | Config section |
| `packages.node_modules/reusify.version` | str | - | - | Value: 1.1.0 |
| `packages.node_modules/reusify.resolved` | str | - | - | Value: https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz |
| `packages.node_modules/reusify.integrity` | str | - | - | Value: sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw== |
| `packages.node_modules/reusify.dev` | bool | - | - | Value: True |
| `packages.node_modules/reusify.license` | str | - | - | Value: MIT |
| `packages.node_modules/reusify.engines` | object | - | - | Config section |
| `packages.node_modules/reusify.engines.iojs` | str | - | - | Value: >=1.0.0 |
| `packages.node_modules/reusify.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/rollup` | object | - | - | Config section |
| `packages.node_modules/rollup.version` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.resolved` | str | - | - | Value: https://registry.npmjs.org/rollup/-/rollup-4.63.2.tgz |
| `packages.node_modules/rollup.integrity` | str | - | - | Value: sha512-l5eyksV4tPBj6lJyEa37YzIOCSOV7lkZzEHUdpjWZbtD7wTcFYmEYXSgm5bT4vV+dZLb9rBG1W9GROOG4NS4Ew== |
| `packages.node_modules/rollup.dev` | bool | - | - | Value: True |
| `packages.node_modules/rollup.license` | str | - | - | Value: MIT |
| `packages.node_modules/rollup.dependencies` | object | - | - | Config section |
| `packages.node_modules/rollup.dependencies.@types/estree` | str | - | - | Value: 1.0.9 |
| `packages.node_modules/rollup.bin` | object | - | - | Config section |
| `packages.node_modules/rollup.bin.rollup` | str | - | - | Value: dist/bin/rollup |
| `packages.node_modules/rollup.engines` | object | - | - | Config section |
| `packages.node_modules/rollup.engines.node` | str | - | - | Value: >=18.0.0 |
| `packages.node_modules/rollup.engines.npm` | str | - | - | Value: >=8.0.0 |
| `packages.node_modules/rollup.optionalDependencies` | object | - | - | Config section |
| `packages.node_modules/rollup.optionalDependencies.@napi-rs/lzma-linux-x64-gnu` | str | - | - | Value: 1.5.1 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-android-arm-eabi` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-android-arm64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-darwin-arm64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-darwin-x64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-freebsd-arm64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-freebsd-x64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-arm-gnueabihf` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-arm-musleabihf` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-arm64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-arm64-musl` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-loong64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-loong64-musl` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-ppc64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-ppc64-musl` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-riscv64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-riscv64-musl` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-s390x-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-x64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-linux-x64-musl` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-openbsd-x64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-openharmony-arm64` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-win32-arm64-msvc` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-win32-ia32-msvc` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-win32-x64-gnu` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.@rollup/rollup-win32-x64-msvc` | str | - | - | Value: 4.63.2 |
| `packages.node_modules/rollup.optionalDependencies.fsevents` | str | - | - | Value: ~2.3.2 |
| `packages.node_modules/run-parallel` | object | - | - | Config section |
| `packages.node_modules/run-parallel.version` | str | - | - | Value: 1.2.0 |
| `packages.node_modules/run-parallel.resolved` | str | - | - | Value: https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz |
| `packages.node_modules/run-parallel.integrity` | str | - | - | Value: sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA== |
| `packages.node_modules/run-parallel.dev` | bool | - | - | Value: True |
| `packages.node_modules/run-parallel.funding` | array | - | - | List of values |
| `packages.node_modules/run-parallel.funding[].type` | str | - | - | Value: github |
| `packages.node_modules/run-parallel.funding[].url` | str | - | - | Value: https://github.com/sponsors/feross |
| `packages.node_modules/run-parallel.license` | str | - | - | Value: MIT |
| `packages.node_modules/run-parallel.dependencies` | object | - | - | Config section |
| `packages.node_modules/run-parallel.dependencies.queue-microtask` | str | - | - | Value: ^1.2.2 |
| `packages.node_modules/scheduler` | object | - | - | Config section |
| `packages.node_modules/scheduler.version` | str | - | - | Value: 0.23.2 |
| `packages.node_modules/scheduler.resolved` | str | - | - | Value: https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz |
| `packages.node_modules/scheduler.integrity` | str | - | - | Value: sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ== |
| `packages.node_modules/scheduler.license` | str | - | - | Value: MIT |
| `packages.node_modules/scheduler.dependencies` | object | - | - | Config section |
| `packages.node_modules/scheduler.dependencies.loose-envify` | str | - | - | Value: ^1.1.0 |
| `packages.node_modules/semver` | object | - | - | Config section |
| `packages.node_modules/semver.version` | str | - | - | Value: 6.3.1 |
| `packages.node_modules/semver.resolved` | str | - | - | Value: https://registry.npmjs.org/semver/-/semver-6.3.1.tgz |
| `packages.node_modules/semver.integrity` | str | - | - | Value: sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA== |
| `packages.node_modules/semver.dev` | bool | - | - | Value: True |
| `packages.node_modules/semver.license` | str | - | - | Value: ISC |
| `packages.node_modules/semver.bin` | object | - | - | Config section |
| `packages.node_modules/semver.bin.semver` | str | - | - | Value: bin/semver.js |
| `packages.node_modules/source-map-js` | object | - | - | Config section |
| `packages.node_modules/source-map-js.version` | str | - | - | Value: 1.2.1 |
| `packages.node_modules/source-map-js.resolved` | str | - | - | Value: https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz |
| `packages.node_modules/source-map-js.integrity` | str | - | - | Value: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA== |
| `packages.node_modules/source-map-js.dev` | bool | - | - | Value: True |
| `packages.node_modules/source-map-js.license` | str | - | - | Value: BSD-3-Clause |
| `packages.node_modules/source-map-js.engines` | object | - | - | Config section |
| `packages.node_modules/source-map-js.engines.node` | str | - | - | Value: >=0.10.0 |
| `packages.node_modules/sucrase` | object | - | - | Config section |
| `packages.node_modules/sucrase.version` | str | - | - | Value: 3.35.1 |
| `packages.node_modules/sucrase.resolved` | str | - | - | Value: https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz |
| `packages.node_modules/sucrase.integrity` | str | - | - | Value: sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw== |
| `packages.node_modules/sucrase.dev` | bool | - | - | Value: True |
| `packages.node_modules/sucrase.license` | str | - | - | Value: MIT |
| `packages.node_modules/sucrase.dependencies` | object | - | - | Config section |
| `packages.node_modules/sucrase.dependencies.@jridgewell/gen-mapping` | str | - | - | Value: ^0.3.2 |
| `packages.node_modules/sucrase.dependencies.commander` | str | - | - | Value: ^4.0.0 |
| `packages.node_modules/sucrase.dependencies.lines-and-columns` | str | - | - | Value: ^1.1.6 |
| `packages.node_modules/sucrase.dependencies.mz` | str | - | - | Value: ^2.7.0 |
| `packages.node_modules/sucrase.dependencies.pirates` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/sucrase.dependencies.tinyglobby` | str | - | - | Value: ^0.2.11 |
| `packages.node_modules/sucrase.dependencies.ts-interface-checker` | str | - | - | Value: ^0.1.9 |
| `packages.node_modules/sucrase.bin` | object | - | - | Config section |
| `packages.node_modules/sucrase.bin.sucrase` | str | - | - | Value: bin/sucrase |
| `packages.node_modules/sucrase.bin.sucrase-node` | str | - | - | Value: bin/sucrase-node |
| `packages.node_modules/sucrase.engines` | object | - | - | Config section |
| `packages.node_modules/sucrase.engines.node` | str | - | - | Value: >=16 || 14 >=14.17 |
| `packages.node_modules/supports-preserve-symlinks-flag` | object | - | - | Config section |
| `packages.node_modules/supports-preserve-symlinks-flag.version` | str | - | - | Value: 1.0.0 |
| `packages.node_modules/supports-preserve-symlinks-flag.resolved` | str | - | - | Value: https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz |
| `packages.node_modules/supports-preserve-symlinks-flag.integrity` | str | - | - | Value: sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w== |
| `packages.node_modules/supports-preserve-symlinks-flag.dev` | bool | - | - | Value: True |
| `packages.node_modules/supports-preserve-symlinks-flag.license` | str | - | - | Value: MIT |
| `packages.node_modules/supports-preserve-symlinks-flag.engines` | object | - | - | Config section |
| `packages.node_modules/supports-preserve-symlinks-flag.engines.node` | str | - | - | Value: >= 0.4 |
| `packages.node_modules/supports-preserve-symlinks-flag.funding` | object | - | - | Config section |
| `packages.node_modules/supports-preserve-symlinks-flag.funding.url` | str | - | - | Value: https://github.com/sponsors/ljharb |
| `packages.node_modules/tailwind-merge` | object | - | - | Config section |
| `packages.node_modules/tailwind-merge.version` | str | - | - | Value: 2.6.1 |
| `packages.node_modules/tailwind-merge.resolved` | str | - | - | Value: https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.6.1.tgz |
| `packages.node_modules/tailwind-merge.integrity` | str | - | - | Value: sha512-Oo6tHdpZsGpkKG88HJ8RR1rg/RdnEkQEfMoEk2x1XRI3F1AxeU+ijRXpiVUF4UbLfcxxRGw6TbUINKYdWVsQTQ== |
| `packages.node_modules/tailwind-merge.license` | str | - | - | Value: MIT |
| `packages.node_modules/tailwind-merge.funding` | object | - | - | Config section |
| `packages.node_modules/tailwind-merge.funding.type` | str | - | - | Value: github |
| `packages.node_modules/tailwind-merge.funding.url` | str | - | - | Value: https://github.com/sponsors/dcastil |
| `packages.node_modules/tailwindcss` | object | - | - | Config section |
| `packages.node_modules/tailwindcss.version` | str | - | - | Value: 3.4.19 |
| `packages.node_modules/tailwindcss.resolved` | str | - | - | Value: https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz |
| `packages.node_modules/tailwindcss.integrity` | str | - | - | Value: sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ== |
| `packages.node_modules/tailwindcss.dev` | bool | - | - | Value: True |
| `packages.node_modules/tailwindcss.license` | str | - | - | Value: MIT |
| `packages.node_modules/tailwindcss.dependencies` | object | - | - | Config section |
| `packages.node_modules/tailwindcss.dependencies.@alloc/quick-lru` | str | - | - | Value: ^5.2.0 |
| `packages.node_modules/tailwindcss.dependencies.arg` | str | - | - | Value: ^5.0.2 |
| `packages.node_modules/tailwindcss.dependencies.chokidar` | str | - | - | Value: ^3.6.0 |
| `packages.node_modules/tailwindcss.dependencies.didyoumean` | str | - | - | Value: ^1.2.2 |
| `packages.node_modules/tailwindcss.dependencies.dlv` | str | - | - | Value: ^1.1.3 |
| `packages.node_modules/tailwindcss.dependencies.fast-glob` | str | - | - | Value: ^3.3.2 |
| `packages.node_modules/tailwindcss.dependencies.glob-parent` | str | - | - | Value: ^6.0.2 |
| `packages.node_modules/tailwindcss.dependencies.is-glob` | str | - | - | Value: ^4.0.3 |
| `packages.node_modules/tailwindcss.dependencies.jiti` | str | - | - | Value: ^1.21.7 |
| `packages.node_modules/tailwindcss.dependencies.lilconfig` | str | - | - | Value: ^3.1.3 |
| `packages.node_modules/tailwindcss.dependencies.micromatch` | str | - | - | Value: ^4.0.8 |
| `packages.node_modules/tailwindcss.dependencies.normalize-path` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/tailwindcss.dependencies.object-hash` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/tailwindcss.dependencies.picocolors` | str | - | - | Value: ^1.1.1 |
| `packages.node_modules/tailwindcss.dependencies.postcss` | str | - | - | Value: ^8.4.47 |
| `packages.node_modules/tailwindcss.dependencies.postcss-import` | str | - | - | Value: ^15.1.0 |
| `packages.node_modules/tailwindcss.dependencies.postcss-js` | str | - | - | Value: ^4.0.1 |
| `packages.node_modules/tailwindcss.dependencies.postcss-load-config` | str | - | - | Value: ^4.0.2 || ^5.0 || ^6.0 |
| `packages.node_modules/tailwindcss.dependencies.postcss-nested` | str | - | - | Value: ^6.2.0 |
| `packages.node_modules/tailwindcss.dependencies.postcss-selector-parser` | str | - | - | Value: ^6.1.2 |
| `packages.node_modules/tailwindcss.dependencies.resolve` | str | - | - | Value: ^1.22.8 |
| `packages.node_modules/tailwindcss.dependencies.sucrase` | str | - | - | Value: ^3.35.0 |
| `packages.node_modules/tailwindcss.bin` | object | - | - | Config section |
| `packages.node_modules/tailwindcss.bin.tailwind` | str | - | - | Value: lib/cli.js |
| `packages.node_modules/tailwindcss.bin.tailwindcss` | str | - | - | Value: lib/cli.js |
| `packages.node_modules/tailwindcss.engines` | object | - | - | Config section |
| `packages.node_modules/tailwindcss.engines.node` | str | - | - | Value: >=14.0.0 |
| `packages.node_modules/thenify` | object | - | - | Config section |
| `packages.node_modules/thenify.version` | str | - | - | Value: 3.3.1 |
| `packages.node_modules/thenify.resolved` | str | - | - | Value: https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz |
| `packages.node_modules/thenify.integrity` | str | - | - | Value: sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw== |
| `packages.node_modules/thenify.dev` | bool | - | - | Value: True |
| `packages.node_modules/thenify.license` | str | - | - | Value: MIT |
| `packages.node_modules/thenify.dependencies` | object | - | - | Config section |
| `packages.node_modules/thenify.dependencies.any-promise` | str | - | - | Value: ^1.0.0 |
| `packages.node_modules/thenify-all` | object | - | - | Config section |
| `packages.node_modules/thenify-all.version` | str | - | - | Value: 1.6.0 |
| `packages.node_modules/thenify-all.resolved` | str | - | - | Value: https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz |
| `packages.node_modules/thenify-all.integrity` | str | - | - | Value: sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA== |
| `packages.node_modules/thenify-all.dev` | bool | - | - | Value: True |
| `packages.node_modules/thenify-all.license` | str | - | - | Value: MIT |
| `packages.node_modules/thenify-all.dependencies` | object | - | - | Config section |
| `packages.node_modules/thenify-all.dependencies.thenify` | str | - | - | Value: >= 3.1.0 < 4 |
| `packages.node_modules/thenify-all.engines` | object | - | - | Config section |
| `packages.node_modules/thenify-all.engines.node` | str | - | - | Value: >=0.8 |
| `packages.node_modules/tiny-invariant` | object | - | - | Config section |
| `packages.node_modules/tiny-invariant.version` | str | - | - | Value: 1.3.3 |
| `packages.node_modules/tiny-invariant.resolved` | str | - | - | Value: https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz |
| `packages.node_modules/tiny-invariant.integrity` | str | - | - | Value: sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg== |
| `packages.node_modules/tiny-invariant.license` | str | - | - | Value: MIT |
| `packages.node_modules/tinyglobby` | object | - | - | Config section |
| `packages.node_modules/tinyglobby.version` | str | - | - | Value: 0.2.17 |
| `packages.node_modules/tinyglobby.resolved` | str | - | - | Value: https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz |
| `packages.node_modules/tinyglobby.integrity` | str | - | - | Value: sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g== |
| `packages.node_modules/tinyglobby.dev` | bool | - | - | Value: True |
| `packages.node_modules/tinyglobby.license` | str | - | - | Value: MIT |
| `packages.node_modules/tinyglobby.dependencies` | object | - | - | Config section |
| `packages.node_modules/tinyglobby.dependencies.fdir` | str | - | - | Value: ^6.5.0 |
| `packages.node_modules/tinyglobby.dependencies.picomatch` | str | - | - | Value: ^4.0.4 |
| `packages.node_modules/tinyglobby.engines` | object | - | - | Config section |
| `packages.node_modules/tinyglobby.engines.node` | str | - | - | Value: >=12.0.0 |
| `packages.node_modules/tinyglobby.funding` | object | - | - | Config section |
| `packages.node_modules/tinyglobby.funding.url` | str | - | - | Value: https://github.com/sponsors/SuperchupuDev |
| `packages.node_modules/tinyglobby/node_modules/fdir` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/fdir.version` | str | - | - | Value: 6.5.0 |
| `packages.node_modules/tinyglobby/node_modules/fdir.resolved` | str | - | - | Value: https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz |
| `packages.node_modules/tinyglobby/node_modules/fdir.integrity` | str | - | - | Value: sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg== |
| `packages.node_modules/tinyglobby/node_modules/fdir.dev` | bool | - | - | Value: True |
| `packages.node_modules/tinyglobby/node_modules/fdir.license` | str | - | - | Value: MIT |
| `packages.node_modules/tinyglobby/node_modules/fdir.engines` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/fdir.engines.node` | str | - | - | Value: >=12.0.0 |
| `packages.node_modules/tinyglobby/node_modules/fdir.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/fdir.peerDependencies.picomatch` | str | - | - | Value: ^3 || ^4 |
| `packages.node_modules/tinyglobby/node_modules/fdir.peerDependenciesMeta` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/fdir.peerDependenciesMeta.picomatch` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/fdir.peerDependenciesMeta.picomatch.optional` | bool | - | - | Value: True |
| `packages.node_modules/tinyglobby/node_modules/picomatch` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/picomatch.version` | str | - | - | Value: 4.0.7 |
| `packages.node_modules/tinyglobby/node_modules/picomatch.resolved` | str | - | - | Value: https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz |
| `packages.node_modules/tinyglobby/node_modules/picomatch.integrity` | str | - | - | Value: sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA== |
| `packages.node_modules/tinyglobby/node_modules/picomatch.dev` | bool | - | - | Value: True |
| `packages.node_modules/tinyglobby/node_modules/picomatch.license` | str | - | - | Value: MIT |
| `packages.node_modules/tinyglobby/node_modules/picomatch.engines` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/picomatch.engines.node` | str | - | - | Value: >=12 |
| `packages.node_modules/tinyglobby/node_modules/picomatch.funding` | object | - | - | Config section |
| `packages.node_modules/tinyglobby/node_modules/picomatch.funding.url` | str | - | - | Value: https://github.com/sponsors/jonschlinkert |
| `packages.node_modules/to-regex-range` | object | - | - | Config section |
| `packages.node_modules/to-regex-range.version` | str | - | - | Value: 5.0.1 |
| `packages.node_modules/to-regex-range.resolved` | str | - | - | Value: https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz |
| `packages.node_modules/to-regex-range.integrity` | str | - | - | Value: sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ== |
| `packages.node_modules/to-regex-range.dev` | bool | - | - | Value: True |
| `packages.node_modules/to-regex-range.license` | str | - | - | Value: MIT |
| `packages.node_modules/to-regex-range.dependencies` | object | - | - | Config section |
| `packages.node_modules/to-regex-range.dependencies.is-number` | str | - | - | Value: ^7.0.0 |
| `packages.node_modules/to-regex-range.engines` | object | - | - | Config section |
| `packages.node_modules/to-regex-range.engines.node` | str | - | - | Value: >=8.0 |
| `packages.node_modules/ts-interface-checker` | object | - | - | Config section |
| `packages.node_modules/ts-interface-checker.version` | str | - | - | Value: 0.1.13 |
| `packages.node_modules/ts-interface-checker.resolved` | str | - | - | Value: https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz |
| `packages.node_modules/ts-interface-checker.integrity` | str | - | - | Value: sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA== |
| `packages.node_modules/ts-interface-checker.dev` | bool | - | - | Value: True |
| `packages.node_modules/ts-interface-checker.license` | str | - | - | Value: Apache-2.0 |
| `packages.node_modules/tslib` | object | - | - | Config section |
| `packages.node_modules/tslib.version` | str | - | - | Value: 2.8.1 |
| `packages.node_modules/tslib.resolved` | str | - | - | Value: https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz |
| `packages.node_modules/tslib.integrity` | str | - | - | Value: sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w== |
| `packages.node_modules/tslib.license` | str | - | - | Value: 0BSD |
| `packages.node_modules/update-browserslist-db` | object | - | - | Config section |
| `packages.node_modules/update-browserslist-db.version` | str | - | - | Value: 1.3.3 |
| `packages.node_modules/update-browserslist-db.resolved` | str | - | - | Value: https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz |
| `packages.node_modules/update-browserslist-db.integrity` | str | - | - | Value: sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ== |
| `packages.node_modules/update-browserslist-db.dev` | bool | - | - | Value: True |
| `packages.node_modules/update-browserslist-db.funding` | array | - | - | List of values |
| `packages.node_modules/update-browserslist-db.funding[].type` | str | - | - | Value: opencollective |
| `packages.node_modules/update-browserslist-db.funding[].url` | str | - | - | Value: https://opencollective.com/browserslist |
| `packages.node_modules/update-browserslist-db.license` | str | - | - | Value: MIT |
| `packages.node_modules/update-browserslist-db.dependencies` | object | - | - | Config section |
| `packages.node_modules/update-browserslist-db.dependencies.escalade` | str | - | - | Value: ^3.2.0 |
| `packages.node_modules/update-browserslist-db.dependencies.picocolors` | str | - | - | Value: ^1.1.1 |
| `packages.node_modules/update-browserslist-db.bin` | object | - | - | Config section |
| `packages.node_modules/update-browserslist-db.bin.update-browserslist-db` | str | - | - | Value: cli.js |
| `packages.node_modules/update-browserslist-db.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/update-browserslist-db.peerDependencies.browserslist` | str | - | - | Value: >= 4.21.0 |
| `packages.node_modules/util-deprecate` | object | - | - | Config section |
| `packages.node_modules/util-deprecate.version` | str | - | - | Value: 1.0.2 |
| `packages.node_modules/util-deprecate.resolved` | str | - | - | Value: https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz |
| `packages.node_modules/util-deprecate.integrity` | str | - | - | Value: sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw== |
| `packages.node_modules/util-deprecate.dev` | bool | - | - | Value: True |
| `packages.node_modules/util-deprecate.license` | str | - | - | Value: MIT |
| `packages.node_modules/victory-vendor` | object | - | - | Config section |
| `packages.node_modules/victory-vendor.version` | str | - | - | Value: 36.9.2 |
| `packages.node_modules/victory-vendor.resolved` | str | - | - | Value: https://registry.npmjs.org/victory-vendor/-/victory-vendor-36.9.2.tgz |
| `packages.node_modules/victory-vendor.integrity` | str | - | - | Value: sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ== |
| `packages.node_modules/victory-vendor.license` | str | - | - | Value: MIT AND ISC |
| `packages.node_modules/victory-vendor.dependencies` | object | - | - | Config section |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-array` | str | - | - | Value: ^3.0.3 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-ease` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-interpolate` | str | - | - | Value: ^3.0.1 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-scale` | str | - | - | Value: ^4.0.2 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-shape` | str | - | - | Value: ^3.1.0 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-time` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/victory-vendor.dependencies.@types/d3-timer` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/victory-vendor.dependencies.d3-array` | str | - | - | Value: ^3.1.6 |
| `packages.node_modules/victory-vendor.dependencies.d3-ease` | str | - | - | Value: ^3.0.1 |
| `packages.node_modules/victory-vendor.dependencies.d3-interpolate` | str | - | - | Value: ^3.0.1 |
| `packages.node_modules/victory-vendor.dependencies.d3-scale` | str | - | - | Value: ^4.0.2 |
| `packages.node_modules/victory-vendor.dependencies.d3-shape` | str | - | - | Value: ^3.1.0 |
| `packages.node_modules/victory-vendor.dependencies.d3-time` | str | - | - | Value: ^3.0.0 |
| `packages.node_modules/victory-vendor.dependencies.d3-timer` | str | - | - | Value: ^3.0.1 |
| `packages.node_modules/vite` | object | - | - | Config section |
| `packages.node_modules/vite.version` | str | - | - | Value: 5.4.21 |
| `packages.node_modules/vite.resolved` | str | - | - | Value: https://registry.npmjs.org/vite/-/vite-5.4.21.tgz |
| `packages.node_modules/vite.integrity` | str | - | - | Value: sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw== |
| `packages.node_modules/vite.dev` | bool | - | - | Value: True |
| `packages.node_modules/vite.license` | str | - | - | Value: MIT |
| `packages.node_modules/vite.dependencies` | object | - | - | Config section |
| `packages.node_modules/vite.dependencies.esbuild` | str | - | - | Value: ^0.21.3 |
| `packages.node_modules/vite.dependencies.postcss` | str | - | - | Value: ^8.4.43 |
| `packages.node_modules/vite.dependencies.rollup` | str | - | - | Value: ^4.20.0 |
| `packages.node_modules/vite.bin` | object | - | - | Config section |
| `packages.node_modules/vite.bin.vite` | str | - | - | Value: bin/vite.js |
| `packages.node_modules/vite.engines` | object | - | - | Config section |
| `packages.node_modules/vite.engines.node` | str | - | - | Value: ^18.0.0 || >=20.0.0 |
| `packages.node_modules/vite.funding` | object | - | - | Config section |
| `packages.node_modules/vite.funding.url` | str | - | - | Value: https://github.com/vitejs/vite?sponsor=1 |
| `packages.node_modules/vite.optionalDependencies` | object | - | - | Config section |
| `packages.node_modules/vite.optionalDependencies.fsevents` | str | - | - | Value: ~2.3.3 |
| `packages.node_modules/vite.peerDependencies` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependencies.@types/node` | str | - | - | Value: ^18.0.0 || >=20.0.0 |
| `packages.node_modules/vite.peerDependencies.less` | str | - | - | Value: * |
| `packages.node_modules/vite.peerDependencies.lightningcss` | str | - | - | Value: ^1.21.0 |
| `packages.node_modules/vite.peerDependencies.sass` | str | - | - | Value: * |
| `packages.node_modules/vite.peerDependencies.sass-embedded` | str | - | - | Value: * |
| `packages.node_modules/vite.peerDependencies.stylus` | str | - | - | Value: * |
| `packages.node_modules/vite.peerDependencies.sugarss` | str | - | - | Value: * |
| `packages.node_modules/vite.peerDependencies.terser` | str | - | - | Value: ^5.4.0 |
| `packages.node_modules/vite.peerDependenciesMeta` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.@types/node` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.@types/node.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.less` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.less.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.lightningcss` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.lightningcss.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.sass` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.sass.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.sass-embedded` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.sass-embedded.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.stylus` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.stylus.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.sugarss` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.sugarss.optional` | bool | - | - | Value: True |
| `packages.node_modules/vite.peerDependenciesMeta.terser` | object | - | - | Config section |
| `packages.node_modules/vite.peerDependenciesMeta.terser.optional` | bool | - | - | Value: True |
| `packages.node_modules/yallist` | object | - | - | Config section |
| `packages.node_modules/yallist.version` | str | - | - | Value: 3.1.1 |
| `packages.node_modules/yallist.resolved` | str | - | - | Value: https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz |
| `packages.node_modules/yallist.integrity` | str | - | - | Value: sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g== |
| `packages.node_modules/yallist.dev` | bool | - | - | Value: True |
| `packages.node_modules/yallist.license` | str | - | - | Value: ISC |

**Actual current content:**
```json
{
  "name": "netra-frontend",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "netra-frontend",
      "version": "0.1.0",
      "dependencies": {
        "clsx": "^2.1.1",
        "framer-motion": "^11.2.10",
        "lucide-react": "^0.395.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^6.24.0",
        "recharts": "^2.12.7",
        "tailwind-merge": "^2.3.0"
      },
      "devDependencies": {
        "@vitejs/plugin-react": "^4.3.1",
        "autoprefixer": "^10.4.19",
        "postcss": "^8.4.38",
        "tailwindcss": "^3.4.4",
        "vite": "^5.3.1"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.8.tgz",
      "integrity": "sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz",
      "integrity": "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz",
      "integrity": "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/lzma-linux-x64-gnu": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/lzma-linux-x64-gnu/-/lzma-linux-x64-gnu-1.5.1.tgz",
      "integrity": "sha512-oTXEIha4SsuXdTA4Iyskj0kpdx2yVXdhd75c2v3xGrHFfVMsbhTPZU/nMPL4sWKo4pBHm3aucLaqGlF696dTyQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^22.20 || ^24.12 || >=25"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@remix-run/router": {
      "version": "1.23.4",
      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.23.4.tgz",
      "integrity": "sha512-q7j5geK7xs3UJSdm9/iytUNclBnLmYx1EnSeCFXHPeutdqgIMeFeHtUZgS3EhlKxdBEAu8OwtJCwmLrEzpSs7Q==",
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.63.2.tgz",
      "integrity": "sha512-Xa6RDoWa+hNiX6PgsljlH6W75RaONx3y6PVlbLhkEWW+GaPQ3dP5gwbL/erAzQHWwkvW5UxdD5l87Qx2FAQ/4A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.63.2.tgz",
      "integrity": "sha512-vNASxsghMfQ5s+v3PrpnJd+ryL/26lxCCaGI+sDJ7VzmHiYXIrrVltsDhaawxLM1WcoMU2oYlbPHLaYQtBzhcg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.63.2.tgz",
      "integrity": "sha512-0dWDjmlrpZAgjPD/aPzUDhBW8APLRjAni5bOrM76wiiZm+E+KTMVKNhAzaTBohz8UyO2fKNAl0+fygbe2HZXOA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.63.2.tgz",
      "integrity": "sha512-N58uktcwzk3+qT4KHEuNdIxX1N01RWrkfVoml69EAbSaNDL+sbNVLx2RMl4Qd23lpA0fgPvyh5hHb4weD5WKmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.63.2.tgz",
      "integrity": "sha512-HWF2zH8EAp2scWRpt2PGe6iUGz7zi04waXsdRr3zb4DWCk2ImIo5FZu0jjmD53nP/DGSvnW0e7/1ToCNZs2lZw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.63.2.tgz",
      "integrity": "sha512-MkvcwHMnzPSMOQEwB6wHnLzmc+hT8BGc5bW/Mhmjjgx3wbj6VBnlc47XsK74kD0K9MikFfXpQqyz4NUXaUW62A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.63.2.tgz",
      "integrity": "sha512-xe1bCKPJaKsD0tfd7Rb6bGfUogJTpKbTEEthsfdb7hTfTRNJVQTdirabQx0o6ERVba/smkM720soMY+0QnrlSQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.63.2.tgz",
      "integrity": "sha512-yOM7LdK0p6gk6+Q773OEwtlsikT1TL3yMmYsTtRlDRPha5vV2DC5x7LqRWDr6f3cSYNMKVqxzffXv8ivxNBIFQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.63.2.tgz",
      "integrity": "sha512-qiWuJJV3DybA2IfzvRimeKXGrGuVPv1zobSY/26KnP3HbV0VcNb3ECzgvtbvF3xjSMkcooou6HASXZuLdjnhpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.63.2.tgz",
      "integrity": "sha512-akcZquRzCY/KpUoZAMBhGf7oi4LmXq1BzRA5CPAC3rkUf28Y/sAYV3jSL+JKd7cwEyFvR5G0XVZ0gaMedP+60A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.63.2.tgz",
      "integrity": "sha512-fNwYHrPyYyxauPzX/cpYw8Z7LQpp+DGA0KCoswA0aVFBpmdMil9XgjB8V3Ny64Ihu797+GKcuJqnsOKEmor7fA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.63.2.tgz",
      "integrity": "sha512-XfvsgzR7DZqREdst7K1Mj3ilSUM5xLAHJcIMDFPKdxTs9q5VHOT8aMA+a683fqBu7DQl8+Sd9HCsQYL8EMY9qA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.63.2.tgz",
      "integrity": "sha512-Pp7gVZggEFlbcuztay+/U0gVG9S1XAh8i7I1Re/htbAzo43P5wHZHw6pTyzotISqlKohoh9RpIfnOz3RbemK1w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.63.2.tgz",
      "integrity": "sha512-zkgL2xff6i7u5hau/m6FGeS8gRkLEdgLw522WGmdWWlLd9btmNl3S80mcEjtGq+kvgUekQ3+BOYLLLcPlS2LIA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.63.2.tgz",
      "integrity": "sha512-qOheJomrkVCbbHFJ7L3J97cnhfogKqguAQphv26+3ZsAQIF1L19b+dArl//s8rjJHJLz9byykyM8NBP4nmSa1g==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.63.2.tgz",
      "integrity": "sha512-XlxLD54wQhH3FciCgMofxBw27NzUe818gJH410qWvc41UT0ZFcgxVjyX5/EK8MPTupjeVWqN5oy+9pCA9mqfCA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.63.2.tgz",
      "integrity": "sha512-vdryWeRb2bLJZf0Fv/W8se6nvsHe2PkTCxV0meheK3nQE+G90VCJcke51Miy1yQRsfm2uqIyjXOu4wmUzbTtkQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.63.2.tgz",
      "integrity": "sha512-bcq2h2pkKmH2po4cZV8VWzO4lL40STyu/nLoFpYMQp9C2tCVNTdcVv86MwSsn3D5s1FBe2Ty1atqvVAUTMimNg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.63.2.tgz",
      "integrity": "sha512-EGoo5DMVMRkTId8fuTDaoxVlR5ZTsKULUezRjd9gCw5eeY+DjCvDpZAOlNUvKPGX+7rS1RWx6j+yOpNPx0cUgQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.63.2.tgz",
      "integrity": "sha512-MErl12k7BFHZG1TI9QF/3lSSZARzq9KgNy/FjnqFMCkv+N4RSSzoUCA5h2mqHX4Mox3WaTVKblyzhQ1zRb2ZuQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.63.2.tgz",
      "integrity": "sha512-ILs8k07Wh4p0PsNY4wYLEaXZKMOpVhrG5QDB0yHhGhuzOfDlnyHN6sflL4El/MpUP1y8uY2lUZrv4oBS6pTT3g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.63.2.tgz",
      "integrity": "sha512-hKgB3nz/TKD3Wv78XEsyXzQsNjvhOHmwKQTvXADGOyU/cIClZDO7DsoggbdmJDPGp5V80tA3Vfv61PaKTLH3LA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.63.2.tgz",
      "integrity": "sha512-T4wf1mudIDxN8Q/CWIBJC1u5gQUc+r5mPvlwoSbIvNkyVTP2TAFeobEmst5AQ4gMyAz4sSByVdoTDfvTmGK/8g==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.63.2.tgz",
      "integrity": "sha512-tC3IY7qoaD9Ll3/8WJQn49j5V2f/NuI9S41NOE2iM5MPs3sPIvOkVToLcz/7Bz4pyF7PSvrtwu8I/pUrGOSecQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.63.2.tgz",
      "integrity": "sha512-6NHnk/K3eq2ZFYcU1X8g67s9qIJRCOTT92gwLMVBp08dB2uuuwI1/Q/empzL2Bfr2f2WRLJVwpp90RmacQyFkw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-kVd74ta9eof3eJOvbNd1vGKS/XERRyQbT26Og63hIsvDO84cjD5gEOhsXf26w3FSoNlPVz84DOFcKv/oou+fMw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.6",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.6.tgz",
      "integrity": "sha512-HiH4oYNc5+DQEx/b8FPfMj+WHH/WWUBmbN5r1Uf/ixtfyFkk+wGIlfJT/RD5eAyzlwkeYRtZUCI8qrEi26pl2g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.9",
        "caniuse-lite": "^1.0.30001810",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.22",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.22.tgz",
      "integrity": "sha512-pWc4w51fBFd7mav43/zKRC+RI6f4yfzQoVlfvE8dECePyfkn1bzLp01Fj0QACcyCZyFhiEMyD2qScfKRWgWibA==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.9",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.9.tgz",
      "integrity": "sha512-EWazOblFYUvlGZcfGhPUPmYh3nikUxBVb+y9MJun5f3hBi812X+8MSQTujLBtgK3cf51fJWbWfOjyeO954d+Eg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.20",
        "caniuse-lite": "^1.0.30001810",
        "electron-to-chromium": "^1.5.420",
        "node-releases": "^2.0.54",
        "update-browserslist-db": "^1.3.2"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz",
      "integrity": "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dom-helpers": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.8.7",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.427",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.427.tgz",
      "integrity": "sha512-n14zb3FdsChZ2BNobqNHAJMcP3ifFv4paox2LvCrfVAQcqGiSURgbJl+PfMpHVCNFkStnNc+RRVtPBTVW5PDgw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
      "license": "MIT"
    },
    "node_modules/fast-equals": {
      "version": "5.4.2",
      "resolved": "https://registry.npmjs.org/fast-equals/-/fast-equals-5.4.2.tgz",
      "integrity": "sha512-Ywe6jodPTWOTL9/k0bV7gdfP8twKL5Y8I8CZ933fAY5gBekICZSUQTbyH6ut2NZCNyB05mSUwAuEqdEIaOOlDQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/framer-motion": {
      "version": "11.18.2",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-11.18.2.tgz",
      "integrity": "sha512-5F5Och7wrvtLVElIpclDT0CBzMVg3dL22B64aZwHtsIY8RB4mXICLrkajK4G9R+ieSAGcgrLeae2SeUTg2pr6w==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^11.18.1",
        "motion-utils": "^11.18.1",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash": {
      "version": "4.18.1",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.395.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.395.0.tgz",
      "integrity": "sha512-6hzdNH5723A4FLaYZWpK50iyZH8iS2Jq5zuPRRotOFkhu6kxxJiebVdJ72tCR5XkiIeYFOU5NUawFZOac+VeYw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/motion-dom": {
      "version": "11.18.1",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-11.18.1.tgz",
      "integrity": "sha512-g76KvA001z+atjfxczdRtw/RXOM3OMSdd1f4DL77qCTF/+avrRJiawSG4yDibEQ215sr9kpinSlX2pCTJ9zbhw==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^11.18.1"
      }
    },
    "node_modules/motion-utils": {
      "version": "11.18.1",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-11.18.1.tgz",
      "integrity": "sha512-49Kt+HKjtbJKLtgO/LKj9Ld+6vw9BjH5d9sc40R/kVyH8GLAXgT42M2NnuPcJNuA3s9ZfZBUcwIgpmZWGEE+hA==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.55",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.55.tgz",
      "integrity": "sha512-mIrE/Cw9y+9Au6dS5vDKDhQza9YvG6w+ZrS6X+ZzA7yFW/soAeaups4Qzn1bL6g5FVy8WtP79+0j82oPIbqRjQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz",
      "integrity": "sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/prop-types/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
      "integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
      "license": "MIT"
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "6.30.6",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-6.30.6.tgz",
      "integrity": "sha512-5HfK7k5im7LTOB0EqCQmfvy4C13G92Ssj1VTmouTK3AJvyjKTnFuCV0vcMAD/JS+JC4DvDIBRrlAeJIFjh5VWg==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.4"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8"
      }
    },
    "node_modules/react-router-dom": {
      "version": "6.30.6",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.30.6.tgz",
      "integrity": "sha512-0RHKZz7wwffvkU+2MFVT2NnjK44ssLEV+m0CAJaS2Ksmorrwj7WxH00jO0SOCW26/tINUnJHToXblDs33I38YQ==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.4",
        "react-router": "6.30.6"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8",
        "react-dom": ">=16.8"
      }
    },
    "node_modules/react-smooth": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/react-smooth/-/react-smooth-4.0.4.tgz",
      "integrity": "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==",
      "license": "MIT",
      "dependencies": {
        "fast-equals": "^5.0.1",
        "prop-types": "^15.8.1",
        "react-transition-group": "^4.4.5"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-transition-group": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz",
      "integrity": "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/runtime": "^7.5.5",
        "dom-helpers": "^5.0.1",
        "loose-envify": "^1.4.0",
        "prop-types": "^15.6.2"
      },
      "peerDependencies": {
        "react": ">=16.6.0",
        "react-dom": ">=16.6.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/recharts": {
      "version": "2.15.4",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-2.15.4.tgz",
      "integrity": "sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==",
      "deprecated": "1.x and 2.x branches are no longer active. Bump to Recharts v3 to receive latest features and bugfixes. See https://github.com/recharts/recharts/wiki/3.0-migration-guide",
      "license": "MIT",
      "dependencies": {
        "clsx": "^2.0.0",
        "eventemitter3": "^4.0.1",
        "lodash": "^4.17.21",
        "react-is": "^18.3.1",
        "react-smooth": "^4.0.4",
        "recharts-scale": "^0.4.4",
        "tiny-invariant": "^1.3.1",
        "victory-vendor": "^36.6.8"
      },
      "engines": {
        "node": ">=14"
      },
      "peerDependencies": {
        "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/recharts-scale": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/recharts-scale/-/recharts-scale-0.4.5.tgz",
      "integrity": "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==",
      "license": "MIT",
      "dependencies": {
        "decimal.js-light": "^2.4.1"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.63.2",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.63.2.tgz",
      "integrity": "sha512-l5eyksV4tPBj6lJyEa37YzIOCSOV7lkZzEHUdpjWZbtD7wTcFYmEYXSgm5bT4vV+dZLb9rBG1W9GROOG4NS4Ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.9"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@napi-rs/lzma-linux-x64-gnu": "1.5.1",
        "@rollup/rollup-android-arm-eabi": "4.63.2",
        "@rollup/rollup-android-arm64": "4.63.2",
        "@rollup/rollup-darwin-arm64": "4.63.2",
        "@rollup/rollup-darwin-x64": "4.63.2",
        "@rollup/rollup-freebsd-arm64": "4.63.2",
        "@rollup/rollup-freebsd-x64": "4.63.2",
        "@rollup/rollup-linux-arm-gnueabihf": "4.63.2",
        "@rollup/rollup-linux-arm-musleabihf": "4.63.2",
        "@rollup/rollup-linux-arm64-gnu": "4.63.2",
        "@rollup/rollup-linux-arm64-musl": "4.63.2",
        "@rollup/rollup-linux-loong64-gnu": "4.63.2",
        "@rollup/rollup-linux-loong64-musl": "4.63.2",
        "@rollup/rollup-linux-ppc64-gnu": "4.63.2",
        "@rollup/rollup-linux-ppc64-musl": "4.63.2",
        "@rollup/rollup-linux-riscv64-gnu": "4.63.2",
        "@rollup/rollup-linux-riscv64-musl": "4.63.2",
        "@rollup/rollup-linux-s390x-gnu": "4.63.2",
        "@rollup/rollup-linux-x64-gnu": "4.63.2",
        "@rollup/rollup-linux-x64-musl": "4.63.2",
        "@rollup/rollup-openbsd-x64": "4.63.2",
        "@rollup/rollup-openharmony-arm64": "4.63.2",
        "@rollup/rollup-win32-arm64-msvc": "4.63.2",
        "@rollup/rollup-win32-ia32-msvc": "4.63.2",
        "@rollup/rollup-win32-x64-gnu": "4.63.2",
        "@rollup/rollup-win32-x64-msvc": "4.63.2",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.6.1.tgz",
      "integrity": "sha512-Oo6tHdpZsGpkKG88HJ8RR1rg/RdnEkQEfMoEk2x1XRI3F1AxeU+ijRXpiVUF4UbLfcxxRGw6TbUINKYdWVsQTQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz",
      "integrity": "sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/victory-vendor": {
      "version": "36.9.2",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-36.9.2.tgz",
      "integrity": "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "5.4.21",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.21.tgz",
      "integrity": "sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    }
  }
}
```

## 05_FRONTEND/package.json
**Owner:** Cherry (P4)
**Read by:** venv, ., 08_TESTING, 05_FRONTEND
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `name` | str | - | - | Value: netra-frontend |
| `private` | bool | - | - | Value: True |
| `version` | str | - | - | Value: 0.1.0 |
| `type` | str | - | - | Value: module |
| `scripts` | object | - | - | Config section |
| `scripts.dev` | str | - | - | Value: vite |
| `scripts.build` | str | - | - | Value: vite build |
| `scripts.preview` | str | - | - | Value: vite preview |
| `dependencies` | object | - | - | Config section |
| `dependencies.react` | str | - | - | Value: ^18.3.1 |
| `dependencies.react-dom` | str | - | - | Value: ^18.3.1 |
| `dependencies.react-router-dom` | str | - | - | Value: ^6.24.0 |
| `dependencies.framer-motion` | str | - | - | Value: ^11.2.10 |
| `dependencies.recharts` | str | - | - | Value: ^2.12.7 |
| `dependencies.lucide-react` | str | - | - | Value: ^0.395.0 |
| `dependencies.clsx` | str | - | - | Value: ^2.1.1 |
| `dependencies.tailwind-merge` | str | - | - | Value: ^2.3.0 |
| `devDependencies` | object | - | - | Config section |
| `devDependencies.@vitejs/plugin-react` | str | - | - | Value: ^4.3.1 |
| `devDependencies.autoprefixer` | str | - | - | Value: ^10.4.19 |
| `devDependencies.postcss` | str | - | - | Value: ^8.4.38 |
| `devDependencies.tailwindcss` | str | - | - | Value: ^3.4.4 |
| `devDependencies.vite` | str | - | - | Value: ^5.3.1 |

**Actual current content:**
```json
{
  "name": "netra-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "framer-motion": "^11.2.10",
    "recharts": "^2.12.7",
    "lucide-react": "^0.395.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
```

## 05_FRONTEND/public/sample_data/sample_cart.json
**Owner:** Cherry (P4)
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

## 05_FRONTEND/public/sample_data/sample_events.json
**Owner:** Cherry (P4)
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

## 05_FRONTEND/public/sample_data/sample_inventory.json
**Owner:** Cherry (P4)
**Read by:** ., 05_FRONTEND
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

## 05_FRONTEND/public/sample_data/sample_queue.json
**Owner:** Cherry (P4)
**Read by:** ., 05_FRONTEND
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
**Read by:** ., 05_FRONTEND
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
**Read by:** ., 05_FRONTEND
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
**Read by:** 07_INTEGRATION, 03_AI, .
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
**Read by:** 03_AI, ., 05_FRONTEND
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
**Read by:** 07_INTEGRATION, 03_AI, .
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
**Read by:** 07_INTEGRATION, 03_AI, .
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
**Read by:** ., 05_FRONTEND
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
**Read by:** ., 08_TESTING
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
      "mqtt_topic": "netra/queue",
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
**Read by:** ., 08_TESTING
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

## package.json
**Owner:** Mighty (P5)
**Read by:** venv, ., 08_TESTING, 05_FRONTEND
**Purpose:** Configuration file

**Schema:**
| Field (dot-path) | Type | Required | Allowed values / enum | Notes |
|---|---|---|---|---|
| `name` | str | - | - | Value: netra-retail-intelligence |
| `private` | bool | - | - | Value: True |
| `version` | str | - | - | Value: 1.0.0 |
| `type` | str | - | - | Value: module |
| `scripts` | object | - | - | Config section |
| `scripts.dev` | str | - | - | Value: vite |
| `scripts.build` | str | - | - | Value: vite build |
| `scripts.preview` | str | - | - | Value: vite preview |
| `dependencies` | object | - | - | Config section |
| `dependencies.react` | str | - | - | Value: ^19.1.1 |
| `dependencies.react-dom` | str | - | - | Value: ^19.1.1 |
| `devDependencies` | object | - | - | Config section |
| `devDependencies.@vitejs/plugin-react` | str | - | - | Value: ^5.0.2 |
| `devDependencies.vite` | str | - | - | Value: ^7.1.3 |

**Actual current content:**
```json
{
  "name": "netra-retail-intelligence",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.2",
    "vite": "^7.1.3"
  }
}
```

## Cross-Reference Map
| JSON File | Owner | Consumers (Read By) |
|---|---|---|
| `00_PROJECT/project_config.json` | Mighty (P5) | . |
| `01_ARCHITECTURE/architecture_config.json` | Phantom (P1) | . |
| `02_HARDWARE/cart_node/calibration/cart_01.json` | Mighty (P5) | 02_HARDWARE |
| `02_HARDWARE/esp32_shelf_node/calibration/shelf_A.json` | Mighty (P5) | 06_DATA, 02_HARDWARE, 05_FRONTEND |
| `02_HARDWARE/registry/cart_registry.json` | Mighty (P5) | . |
| `02_HARDWARE/registry/entry_registry.json` | Mighty (P5) | . |
| `02_HARDWARE/registry/queue_registry.json` | Mighty (P5) | . |
| `02_HARDWARE/registry/shelf_registry.json` | Mighty (P5) | . |
| `03_AI/AI_CONFIG.json` | Phantom (P1) | 04_BACKEND, 03_AI, ., 08_TESTING |
| `03_AI/MODEL_REGISTRY.json` | Phantom (P1) | . |
| `04_BACKEND/backend_config.json` | Soham (P2) | 04_BACKEND, . |
| `05_FRONTEND/dist/sample_data/sample_cart.json` | Cherry (P4) | . |
| `05_FRONTEND/dist/sample_data/sample_events.json` | Cherry (P4) | . |
| `05_FRONTEND/dist/sample_data/sample_inventory.json` | Cherry (P4) | ., 05_FRONTEND |
| `05_FRONTEND/dist/sample_data/sample_queue.json` | Cherry (P4) | ., 05_FRONTEND |
| `05_FRONTEND/package-lock.json` | Cherry (P4) | None detected |
| `05_FRONTEND/package.json` | Cherry (P4) | venv, ., 08_TESTING, 05_FRONTEND |
| `05_FRONTEND/public/sample_data/sample_cart.json` | Cherry (P4) | . |
| `05_FRONTEND/public/sample_data/sample_events.json` | Cherry (P4) | . |
| `05_FRONTEND/public/sample_data/sample_inventory.json` | Cherry (P4) | ., 05_FRONTEND |
| `05_FRONTEND/public/sample_data/sample_queue.json` | Cherry (P4) | ., 05_FRONTEND |
| `06_DATA/sample/sample_cart.json` | Soham (P2) | . |
| `06_DATA/sample/sample_events.json` | Soham (P2) | . |
| `06_DATA/sample/sample_inventory.json` | Soham (P2) | ., 05_FRONTEND |
| `06_DATA/sample/sample_queue.json` | Soham (P2) | ., 05_FRONTEND |
| `06_DATA/schemas/cart_schema.json` | Phantom (P1) | 07_INTEGRATION, 03_AI, . |
| `06_DATA/schemas/event_schema.json` | Phantom (P1) | 03_AI, ., 05_FRONTEND |
| `06_DATA/schemas/inventory_schema.json` | Phantom (P1) | 07_INTEGRATION, 03_AI, . |
| `06_DATA/schemas/queue_schema.json` | Phantom (P1) | 07_INTEGRATION, 03_AI, . |
| `07_INTEGRATION/api_contract.json` | Soham (P2) & Phantom (P1) | ., 05_FRONTEND |
| `07_INTEGRATION/device_registry.json` | Soham (P2) & Phantom (P1) | ., 08_TESTING |
| `07_INTEGRATION/integration_config.json` | Soham (P2) & Phantom (P1) | ., 08_TESTING |
| `08_TESTING/test_config.json` | Team+1 (P6) | . |
| `09_SECURITY/security_config.json` | Cherry (P4) | . |
| `10_DEMO/demo_config.json` | Mighty (P5) | . |
| `package.json` | Mighty (P5) | venv, ., 08_TESTING, 05_FRONTEND |