import sys, os
import importlib.util
from services.queue_service import process_queue_event
import asyncio

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

eta_pred = load_module('eta_predictor', os.path.abspath('03_AI/queue/eta_predictor.py'))

def test_queue():
    status = eta_pred.predict_queue_eta('L1', 5, 'MEDIUM', 30, 2, 3, 5)
    evt = {'schema_version': 1, 'event_id': 'q_1', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'cam_q', 'event_type': 'QUEUE_UPDATE', 'payload': status}
    asyncio.run(process_queue_event(evt))
