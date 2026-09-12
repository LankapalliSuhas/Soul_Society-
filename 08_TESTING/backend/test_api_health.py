from fastapi.testclient import TestClient
import time
from main import app
client = TestClient(app)

def test_health():
    t0 = time.time()
    res = client.get('/api/health')
    assert res.status_code == 200
    assert (time.time() - t0) * 1000 <= 500  # api_response_ms target
