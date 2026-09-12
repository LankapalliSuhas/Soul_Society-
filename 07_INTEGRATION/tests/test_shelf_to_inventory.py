import sys, os
import importlib.util
from services.inventory_service import process_inventory_event
import asyncio, time

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

stock = load_module('stock_engine', os.path.abspath('03_AI/inventory/stock_engine.py'))

def test_shelf_to_inventory():
    t0 = time.time()
    status = stock.update_inventory_status('SKU_TEST', 'shelf_1', 500, 100, 1500, 2)
    evt = {'schema_version': 1, 'event_id': 'inv_1', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'scale_1', 'event_type': 'WEIGHT_CHANGE', 'payload': status}
    asyncio.run(process_inventory_event(evt))
    assert (time.time() - t0) * 1000 <= 1000 # event_to_backend_ms
