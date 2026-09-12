import os
import sys
import json
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
# The module name is 03_AI, wait. Python can't import modules starting with numbers naturally without importlib.
# Let's use importlib to import the modules since they start with a number.
import importlib.util

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

counter_mod = load_module('counter', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/entry_exit/counter.py')))
line_crossing_mod = load_module('line_crossing', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/entry_exit/line_crossing.py')))
tracking_mod = load_module('tracking', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/entry_exit/tracking.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_occupancy_counter():
    counter = counter_mod.OccupancyCounter()
    assert counter.process_event("ENTRY") == 1
    assert counter.process_event("ENTRY") == 2
    assert counter.process_event("EXIT") == 1
    assert counter.process_event("EXIT") == 0
    assert counter.process_event("EXIT") == 0  # Should not go below 0

def test_evaluate_line_crossing():
    event = line_crossing_mod.evaluate_line_crossing("cam_01", "main_door", "in", 0.95)
    assert event["schema_version"] == 1
    assert event["event_type"] == "ENTRY"
    assert event["confidence"] == 0.95
    assert "timestamp" in event
    
    event_out = line_crossing_mod.evaluate_line_crossing("cam_01", "main_door", "out", 0.88)
    assert event_out["event_type"] == "EXIT"

def test_tracking():
    # prev_y < threshold <= curr_y for "in"
    curr = [(10, 50)]
    prev = [(10, 30)]
    events = tracking_mod.track_centroids(curr, prev, 40)
    assert len(events) == 1
    assert events[0]["direction"] == "in"
    
    # Duplicate event logic within duplicate_event_window_seconds could be tested at the pipeline level, but checking basics here
