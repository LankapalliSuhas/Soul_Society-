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

eta_predictor_mod = load_module('eta_predictor', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/queue/eta_predictor.py')))
service_rate_mod = load_module('service_rate', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/queue/service_rate.py')))
queue_forecast_mod = load_module('queue_forecast', os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/queue/queue_forecast.py')))

def load_ai_config():
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../03_AI/AI_CONFIG.json'))
    with open(config_path, 'r') as f:
        return json.load(f)

def test_predict_queue_eta():
    config = load_ai_config()
    alpha = config['queue']['base_service_time_seconds']
    beta = config['queue']['per_item_time_seconds']
    warning = config['queue']['warning_people']
    critical = config['queue']['critical_people']
    
    event = eta_predictor_mod.predict_queue_eta("LANE_1", 5, "LOW", alpha, beta, warning, critical)
    # LOW burden = 3 items. T_i = 30 + 5*3 = 45. ETA = 5 * 45 = 225.
    assert event["estimated_wait_seconds"] == 225.0
    assert event["status"] == "WARNING"
    
    # Exact critical threshold edge case
    event2 = eta_predictor_mod.predict_queue_eta("LANE_1", critical, "HIGH", alpha, beta, warning, critical)
    assert event2["status"] == "CRITICAL"

def test_service_rate():
    assert service_rate_mod.calculate_historical_service_rate([1.5, 2.5, 2.0]) == 2.0
    assert service_rate_mod.calculate_historical_service_rate([]) == 2.0

def test_forecast_queue():
    assert queue_forecast_mod.forecast_queue_growth(5.0, 3.0, 10) == 20
