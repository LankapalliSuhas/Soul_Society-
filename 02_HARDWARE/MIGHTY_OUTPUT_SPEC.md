# Mighty's Output Spec — Hardware Registry (v1.0, LOCKED)

## File 1: `02_HARDWARE/registry/devices.json`
**Purpose:** every physical device with its own MQTT topic.
**Consumers:** Soham (device_registry.json mirror), Phantom (sensor fusion bounds), Akash (HMAC provisioning).
**Schema:**
| Field | Type | Required | Notes |
|---|---|---|---|
| device_id | string | Yes | Must match device_registry.json exactly |
| type | string | Yes | ESP32-CAM \| ESP32-WROOM |
| camera | string\|null | No | OV2640 or null |
| quantity | integer | Yes | |
| role | string | Yes | entry_exit \| queue_detection \| shelf_sensor \| cart_sensor |
| mqtt_topic | string | Yes | Must match integration_config.json's pipeline input exactly |
| location | string | Yes | |
| calibration_ref | string\|null | No | Path into calibration_index.json |

## File 2: `02_HARDWARE/registry/components.json`
**Purpose:** sub-components with no MQTT topic of their own, read locally by a parent device.
**Consumers:** Phantom (sensor_fusion.weights mapping), test_config.json's hardware tests.
**Schema:**
| Field | Type | Required | Notes |
|---|---|---|---|
| component_id | string | Yes | |
| type | string | Yes | HX711 \| load_cell \| PIR |
| quantity | integer | Yes | |
| role | string | Yes | shelf_weight \| cart_weight \| cart_motion \| spare |
| parent_device_id | string | Yes | Must exist in devices.json |

## File 3: `02_HARDWARE/registry/calibration_index.json`
**Purpose:** calibration status/location per device or component.
**Consumers:** test_config.json's load_cell_calibration test, Phantom (weight_tolerance validation).
**Schema:**
| Field | Type | Required | Notes |
|---|---|---|---|
| target_id | string | Yes | Must exist in devices.json or components.json |
| calibration_path | string | Yes | Relative path under 02_HARDWARE/<node>/calibration/ |
| last_calibrated | string\|null | No | ISO 8601 or null if never calibrated |
| status | string | Yes | uncalibrated \| calibrated \| stale |

## File 4: `02_HARDWARE/registry/bom_summary.json`
**Purpose:** procurement-facing view.
**Consumers:** Team+1 (expense ledger, inventory sheet reconciliation).
**Schema:**
| Field | Type | Required | Notes |
|---|---|---|---|
| item_id | string | Yes | matches a device_id or component_id |
| name | string | Yes | |
| quantity_required | integer | Yes | |
| quantity_available | integer | Yes | |
| unit_cost | number | Yes | |
| total_cost | number | Yes | quantity_available × unit_cost |
| procurement_status | string | Yes | purchased \| pending \| unavailable |

## Cross-File Integrity Rules (Mighty must self-check before handing off):
1. devices.json + components.json together must equal the BOM exactly: 2× ESP32-CAM+OV2640, 2× ESP32-WROOM, 3× HX711, 3× load cells, 1× PIR.
2. Every mqtt_topic in devices.json must already exist in integration_config.json's pipeline inputs — no new topics invented here.
3. Every parent_device_id in components.json must exist in devices.json.
4. Every target_id in calibration_index.json must exist in devices.json or components.json.
5. Every role value must match one of AI_CONFIG.json's sensor_fusion.weights keys (shelf, cart, pir) where applicable.
6. No file may reference hardware not in the confirmed BOM.

## Format Lock
This structure is permanent for the rest of the project. Any future field addition requires updating this spec first, then the files, then notifying Soham/Phantom/Akash/Team+1 — never the reverse.
