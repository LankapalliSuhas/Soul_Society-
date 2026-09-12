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

fusion_engine_mod = load_module('fusion_engine', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/sensor_fusion/fusion_engine.py')))
confidence_mod = load_module('confidence', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/sensor_fusion/confidence.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_resolve_event_conflict():
    config = load_ai_config()
    weights = config['sensor_fusion']['weights']
    
    shelf_data = {"confidence": 0.8}
    cart_data = {"confidence": 0.9}
    pir_data = {"confidence": 0.5}
    
    final_conf = fusion_engine_mod.resolve_event_conflict(shelf_data, cart_data, pir_data, weights)
    expected = (0.8 * 0.5) + (0.9 * 0.4) + (0.5 * 0.1)
    assert abs(final_conf - expected) < 0.001

def test_determine_fusion_status():
    config = load_ai_config()
    min_conf = config['sensor_fusion']['minimum_confidence']
    
    assert confidence_mod.determine_fusion_status(min_conf, min_conf) == "VERIFIED"
    assert confidence_mod.determine_fusion_status(min_conf - 0.01, min_conf) == "UNCERTAIN"
