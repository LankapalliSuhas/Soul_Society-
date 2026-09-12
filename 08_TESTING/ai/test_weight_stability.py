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

weight_filter_mod = load_module('weight_filter', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/inventory/weight_filter.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_weight_smoothing_stable():
    config = load_ai_config()
    tol = config['inventory']['weight_tolerance_grams']
    min_stable = config['inventory']['minimum_stable_readings']
    
    readings = [1000.0, 1005.0, 995.0, 1000.0, 1010.0]  # spread is 15 <= 80
    smoothed = weight_filter_mod.apply_weight_smoothing(readings, min_stable, tol)
    assert smoothed == sum(readings[-min_stable:]) / min_stable

def test_weight_smoothing_unstable_edge():
    config = load_ai_config()
    tol = config['inventory']['weight_tolerance_grams']
    min_stable = config['inventory']['minimum_stable_readings']
    
    readings = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0 + tol + 1]  # spread is > tol
    smoothed = weight_filter_mod.apply_weight_smoothing(readings, min_stable, tol)
    assert smoothed == readings[-1]  # returns last if unstable
