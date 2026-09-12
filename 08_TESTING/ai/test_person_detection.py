import os
import sys
import json
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
import importlib.util

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

people_counter_mod = load_module('people_counter', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/queue/people_counter.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_extract_people_count_basic():
    config = load_ai_config()
    thresh = config['person_detection']['confidence_threshold']
    
    detections = [
        {"class": "person", "confidence": 0.8},
        {"class": "person", "confidence": 0.9},
        {"class": "dog", "confidence": 0.9}
    ]
    assert people_counter_mod.extract_people_count(detections, thresh) == 2

def test_extract_people_count_edge_case():
    config = load_ai_config()
    thresh = config['person_detection']['confidence_threshold']
    
    detections = [
        {"class": "person", "confidence": thresh},  # Exact threshold
        {"class": "person", "confidence": thresh - 0.01},  # Just below
    ]
    assert people_counter_mod.extract_people_count(detections, thresh) == 1
