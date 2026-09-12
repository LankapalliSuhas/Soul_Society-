from services.alert_service import create_alert
from fastapi.testclient import TestClient
from main import app
import asyncio

client = TestClient(app)

def test_alert():
    asyncio.run(create_alert({'level': 'CRITICAL', 'source': 'test', 'message': 'low stock'}))
    res = client.get('/api/alerts')
    assert res.status_code == 200
