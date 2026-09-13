# 08_TESTING/hardware/test_registry_split.py
import json
import os

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def test_registry_files_exist_and_valid():
    paths = [
        "02_HARDWARE/registry/devices.json",
        "02_HARDWARE/registry/components.json",
        "02_HARDWARE/registry/calibration_index.json",
        "02_HARDWARE/registry/bom_summary.json"
    ]
    for p in paths:
        assert os.path.exists(p), f"{p} does not exist"
        load_json(p)

def test_device_id_matches_device_registry():
    devices = load_json("02_HARDWARE/registry/devices.json")
    dev_reg = load_json("07_INTEGRATION/device_registry.json")
    
    dev_ids = {d["device_id"] for d in devices}
    reg_ids = {d["device_id"] for d in dev_reg["devices"]}
    assert dev_ids == reg_ids, "Mismatch between devices.json and device_registry.json"

def test_mqtt_topic_matches_integration_config():
    devices = load_json("02_HARDWARE/registry/devices.json")
    integ = load_json("07_INTEGRATION/integration_config.json")
    
    integ_inputs = {p["input"] for p in integ["pipelines"].values()}
    for d in devices:
        assert d["mqtt_topic"] in integ_inputs, f"Topic {d['mqtt_topic']} not in integration_config.json inputs"

def test_parent_device_id_exists():
    devices = load_json("02_HARDWARE/registry/devices.json")
    components = load_json("02_HARDWARE/registry/components.json")
    
    dev_ids = {d["device_id"] for d in devices}
    for c in components:
        if c.get("parent_device_id"):
            assert c["parent_device_id"] in dev_ids, f"Parent device {c['parent_device_id']} missing"

def test_calibration_target_exists():
    devices = load_json("02_HARDWARE/registry/devices.json")
    components = load_json("02_HARDWARE/registry/components.json")
    calib = load_json("02_HARDWARE/registry/calibration_index.json")
    
    valid_targets = {d["device_id"] for d in devices} | {c["component_id"] for c in components}
    for c in calib:
        assert c["target_id"] in valid_targets, f"Calibration target {c['target_id']} missing"

def test_bom_count():
    devices = load_json("02_HARDWARE/registry/devices.json")
    components = load_json("02_HARDWARE/registry/components.json")
    
    cam_count = sum(1 for d in devices if d["type"] == "ESP32-CAM")
    wroom_count = sum(1 for d in devices if d["type"] == "ESP32-WROOM")
    hx711_count = sum(1 for c in components if c["type"] == "HX711")
    load_cell_count = sum(1 for c in components if c["type"] == "load_cell")
    pir_count = sum(1 for c in components if c["type"] == "PIR")
    
    assert cam_count == 2
    assert wroom_count == 2
    assert hx711_count == 3
    assert load_cell_count == 3
    assert pir_count == 1
