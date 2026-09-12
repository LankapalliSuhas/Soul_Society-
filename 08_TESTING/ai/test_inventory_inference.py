import os
import sys
import json
import pytest
import importlib.util

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

stock_engine_mod = load_module('stock_engine', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/inventory/stock_engine.py')))
sku_matcher_mod = load_module('sku_matcher', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/inventory/sku_matcher.py')))
anomaly_detector_mod = load_module('anomaly_detector', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/inventory/anomaly_detector.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_update_inventory_status():
    config = load_ai_config()
    low_thresh = config['inventory']['low_stock_threshold']
    
    event = stock_engine_mod.update_inventory_status("SKU123", "SHELF_1", 500.0, 100.0, 800.0, low_thresh)
    assert event["estimated_quantity"] == 3
    assert event["status"] == "NORMAL"
    
    # Low stock
    event2 = stock_engine_mod.update_inventory_status("SKU123", "SHELF_1", 500.0, 100.0, 700.0, low_thresh)
    assert event2["estimated_quantity"] == 2
    assert event2["status"] == "LOW"

def test_identify_sku():
    config = load_ai_config()
    tol = config['inventory']['weight_tolerance_grams']
    
    catalog = {"SKU_A": 150.0, "SKU_B": 300.0}
    # Match within tolerance
    assert sku_matcher_mod.identify_sku_by_weight(-140.0, catalog, tol) == "SKU_A"
    assert sku_matcher_mod.identify_sku_by_weight(320.0, catalog, tol) == "SKU_B"
    # Unmatched
    assert sku_matcher_mod.identify_sku_by_weight(500.0, catalog, tol) == "UNKNOWN"

def test_check_weight_anomaly():
    config = load_ai_config()
    tol = config['inventory']['weight_tolerance_grams']
    
    # current=950, tare=500, unit=200 -> net=450 -> remainder=50. 
    # 50 is within 80, but wait. If remainder=50, tolerance=80. 
    # Remainder 50 is NOT > tolerance.
    assert anomaly_detector_mod.check_weight_anomaly(950.0, 500.0, 200.0, tol) == False
    
    # anomaly case: net = 300, unit = 200 -> rem = 100, unit-rem = 100. Both > tol (80)
    assert anomaly_detector_mod.check_weight_anomaly(800.0, 500.0, 200.0, tol) == True
