from fastapi.testclient import TestClient
from main import app
import json, time
import asyncio
from services.event_service import process_event

client = TestClient(app)

def test_entry_dashboard():
    evt = {'schema_version': 1, 'event_id': 'evt_123', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'cam_1', 'event_type': 'ENTRY'}
    asyncio.run(process_event(evt))
    t0 = time.time()
    res = client.get('/api/dashboard')
    assert res.status_code == 200
    assert (time.time() - t0) * 1000 <= 2000 # event_to_dashboard_ms
