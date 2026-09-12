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

weight_processor_mod = load_module('weight_processor', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/cart/weight_processor.py')))
item_estimator_mod = load_module('item_estimator', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/cart/item_estimator.py')))

def test_process_cart_weight():
    event = weight_processor_mod.process_cart_weight("CART_1", 1000.0, 4500.0, 300.0)
    assert event["item_burden"] == "MEDIUM"
    assert event["weight_change_grams"] == 300.0
    assert event["current_weight_grams"] == 4500.0

    event2 = weight_processor_mod.process_cart_weight("CART_1", 1000.0, 12000.0, 500.0)
    assert event2["item_burden"] == "HIGH"

def test_estimate_cart_items():
    assert item_estimator_mod.estimate_cart_items(1000.0, 300.0) == 3
    assert item_estimator_mod.estimate_cart_items(1000.0, 0.0) == 0
    assert item_estimator_mod.estimate_cart_items(-500.0, 300.0) == 0
