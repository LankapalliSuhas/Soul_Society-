#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# NETRA Backend Scaffold — Person 2 (Backend & Integration)
# Based on: backend 1 workflow + backend 2 file list
# Run from repo root: Soul-Society-/
# ============================================================

# ---------- 04_BACKEND ----------
mkdir -p 04_BACKEND/{api,mqtt,websocket,database/migrations,services,validators,middleware,tests/{test_api,test_mqtt,test_database,test_services}}

cat > 04_BACKEND/README.md <<'EOF'
# NETRA Backend & Integration

FastAPI + MQTT + SQLite + WebSocket backend for NETRA.
Owned by Person 2 — Backend & Integration.
EOF

cat > 04_BACKEND/backend_config.json <<'EOF'
{
  "app_name": "NETRA Backend",
  "api_prefix": "/api",
  "host": "0.0.0.0",
  "port": 8000,
  "mqtt": {
    "broker": "localhost",
    "port": 1883,
    "client_id": "netra_backend",
    "keepalive": 60,
    "topics": ["netra/events/#"]
  },
  "database": {
    "path": "99_RUNTIME/database/netra.db"
  },
  "websocket": {
    "path": "/ws/live"
  },
  "logging": {
    "level": "INFO"
  }
}
EOF

cat > 04_BACKEND/config.py <<'EOF'
import json
from pathlib import Path

CONFIG_PATH = Path(__file__).parent / "backend_config.json"

class Settings:
    def __init__(self):
        with open(CONFIG_PATH) as f:
            self.data = json.load(f)

    def __getattr__(self, item):
        return self.data[item]

settings = Settings()
EOF

cat > 04_BACKEND/main.py <<'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database.database import init_db
from mqtt.client import start_mqtt
from api import health, events, inventory, queue, cart, alerts, dashboard
from websocket import live_events

app = FastAPI(title=settings.data["app_name"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()
    start_mqtt()

prefix = settings.data["api_prefix"]

app.include_router(health.router, prefix=prefix)
app.include_router(events.router, prefix=prefix)
app.include_router(inventory.router, prefix=prefix)
app.include_router(queue.router, prefix=prefix)
app.include_router(cart.router, prefix=prefix)
app.include_router(alerts.router, prefix=prefix)
app.include_router(dashboard.router, prefix=prefix)
app.include_router(live_events.router)
EOF

cat > 04_BACKEND/mqtt_client.py <<'EOF'
from mqtt.client import start_mqtt
EOF

cat > 04_BACKEND/database.py <<'EOF'
from database.database import *
EOF

cat > 04_BACKEND/models.py <<'EOF'
# Re-export database models if needed.
EOF

cat > 04_BACKEND/schemas.py <<'EOF'
from pydantic import BaseModel
from typing import Optional, Any, Dict

class Event(BaseModel):
    schema_version: int
    event_id: str
    timestamp: str
    device_id: str
    event_type: str
    zone: Optional[str] = None
    value: Optional[float] = None
    unit: Optional[str] = None
    payload: Optional[Dict[str, Any]] = None

class InventoryItem(BaseModel):
    sku: str
    shelf_id: str
    current_weight_grams: float
    estimated_quantity: int
    threshold: int
    status: str
    confidence: float

class CartItem(BaseModel):
    cart_id: str
    current_weight_grams: float
    weight_change_grams: float
    estimated_item_count: int
    item_burden: str
    confidence: float

class QueueItem(BaseModel):
    timestamp: str
    lane: str
    people_count: int
    item_burden: str
    estimated_wait_seconds: int
    service_rate_per_minute: float
    confidence: float
    status: str
EOF

# ---------- API ----------
touch 04_BACKEND/api/__init__.py

cat > 04_BACKEND/api/health.py <<'EOF'
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
EOF

cat > 04_BACKEND/api/events.py <<'EOF'
from fastapi import APIRouter
from schemas import Event
from services.event_processor import process_event

router = APIRouter()

@router.post("/events")
async def create_event(event: Event):
    return await process_event(event.dict())
EOF

cat > 04_BACKEND/api/inventory.py <<'EOF'
from fastapi import APIRouter
from database.database import get_inventory

router = APIRouter()

@router.get("/inventory")
def inventory():
    return get_inventory()
EOF

cat > 04_BACKEND/api/queue.py <<'EOF'
from fastapi import APIRouter
from database.database import get_queue

router = APIRouter()

@router.get("/queue")
def queue():
    return get_queue()
EOF

cat > 04_BACKEND/api/cart.py <<'EOF'
from fastapi import APIRouter
from database.database import get_cart

router = APIRouter()

@router.get("/cart")
def cart():
    return get_cart()
EOF

cat > 04_BACKEND/api/alerts.py <<'EOF'
from fastapi import APIRouter
from database.database import get_alerts

router = APIRouter()

@router.get("/alerts")
def alerts():
    return get_alerts()
EOF

cat > 04_BACKEND/api/dashboard.py <<'EOF'
from fastapi import APIRouter
from database.database import get_inventory, get_queue, get_cart, get_alerts

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    return {
        "inventory": get_inventory(),
        "queue": get_queue(),
        "cart": get_cart(),
        "alerts": get_alerts(),
    }
EOF

# ---------- MQTT ----------
touch 04_BACKEND/mqtt/__init__.py

cat > 04_BACKEND/mqtt/client.py <<'EOF'
import json
import paho.mqtt.client as mqtt
from config import settings
from mqtt.handlers import handle_message

def start_mqtt():
    client = mqtt.Client(client_id=settings.mqtt["client_id"])
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(
        settings.mqtt["broker"],
        settings.mqtt["port"],
        settings.mqtt["keepalive"],
    )
    client.loop_start()
    return client

def on_connect(client, userdata, flags, rc):
    for topic in settings.mqtt["topics"]:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        handle_message(payload)
    except Exception as e:
        print(f"MQTT message error: {e}")
EOF

cat > 04_BACKEND/mqtt/handlers.py <<'EOF'
import asyncio
from services.event_processor import process_event

def handle_message(payload: dict):
    asyncio.run(process_event(payload))
EOF

cat > 04_BACKEND/mqtt/topics.py <<'EOF'
TOPICS = {
    "events": "netra/events/#",
    "entry": "netra/entry",
    "exit": "netra/exit",
    "inventory": "netra/inventory/#",
    "cart": "netra/cart/#",
    "queue": "netra/queue/#",
}
EOF

cat > 04_BACKEND/mqtt/reconnect.py <<'EOF'
# Placeholder for MQTT reconnect logic.
EOF

# ---------- WebSocket ----------
touch 04_BACKEND/websocket/__init__.py

cat > 04_BACKEND/websocket/manager.py <<'EOF'
from fastapi import WebSocket
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active:
            self.active.remove(websocket)

    async def broadcast(self, message: dict):
        dead = []
        for ws in self.active:
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws)

manager = ConnectionManager()
EOF

cat > 04_BACKEND/websocket/live_events.py <<'EOF'
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from websocket.manager import manager

router = APIRouter()

@router.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
EOF

# ---------- Database ----------
touch 04_BACKEND/database/__init__.py

cat > 04_BACKEND/database/schema.sql <<'EOF'
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT,
  timestamp TEXT,
  device_id TEXT,
  event_type TEXT,
  zone TEXT,
  value REAL,
  unit TEXT,
  raw TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT,
  shelf_id TEXT,
  current_weight_grams REAL,
  estimated_quantity INTEGER,
  threshold INTEGER,
  status TEXT,
  confidence REAL,
  UNIQUE(sku, shelf_id)
);

CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id TEXT UNIQUE,
  current_weight_grams REAL,
  weight_change_grams REAL,
  estimated_item_count INTEGER,
  item_burden TEXT,
  confidence REAL
);

CREATE TABLE IF NOT EXISTS queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  lane TEXT,
  people_count INTEGER,
  item_burden TEXT,
  estimated_wait_seconds INTEGER,
  service_rate_per_minute REAL,
  confidence REAL,
  status TEXT
);

CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  level TEXT,
  source TEXT,
  message TEXT,
  payload TEXT
);
EOF

cat > 04_BACKEND/database/database.py <<'EOF'
import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[2] / "99_RUNTIME" / "database" / "netra.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    schema = Path(__file__).parent / "schema.sql"
    with get_conn() as conn:
        conn.executescript(schema.read_text())

def insert_event(event: dict):
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO events (event_id, timestamp, device_id, event_type, zone, value, unit, raw) VALUES (?,?,?,?,?,?,?,?)",
            (
                event.get("event_id"),
                event.get("timestamp"),
                event.get("device_id"),
                event.get("event_type"),
                event.get("zone"),
                event.get("value"),
                event.get("unit"),
                json.dumps(event),
            ),
        )

def upsert_inventory(item: dict):
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO inventory (sku, shelf_id, current_weight_grams, estimated_quantity, threshold, status, confidence)
               VALUES (?,?,?,?,?,?,?)
               ON CONFLICT(sku, shelf_id) DO UPDATE SET
                 current_weight_grams=excluded.current_weight_grams,
                 estimated_quantity=excluded.estimated_quantity,
                 threshold=excluded.threshold,
                 status=excluded.status,
                 confidence=excluded.confidence
            """,
            (
                item["sku"],
                item["shelf_id"],
                item["current_weight_grams"],
                item["estimated_quantity"],
                item["threshold"],
                item["status"],
                item["confidence"],
            ),
        )

def get_inventory():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM inventory")]

def upsert_cart(item: dict):
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO cart (cart_id, current_weight_grams, weight_change_grams, estimated_item_count, item_burden, confidence)
               VALUES (?,?,?,?,?,?)
               ON CONFLICT(cart_id) DO UPDATE SET
                 current_weight_grams=excluded.current_weight_grams,
                 weight_change_grams=excluded.weight_change_grams,
                 estimated_item_count=excluded.estimated_item_count,
                 item_burden=excluded.item_burden,
                 confidence=excluded.confidence
            """,
            (
                item["cart_id"],
                item["current_weight_grams"],
                item["weight_change_grams"],
                item["estimated_item_count"],
                item["item_burden"],
                item["confidence"],
            ),
        )

def get_cart():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM cart")]

def upsert_queue(item: dict):
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO queue (timestamp, lane, people_count, item_burden, estimated_wait_seconds, service_rate_per_minute, confidence, status)
               VALUES (?,?,?,?,?,?,?,?)""",
            (
                item["timestamp"],
                item["lane"],
                item["people_count"],
                item["item_burden"],
                item["estimated_wait_seconds"],
                item["service_rate_per_minute"],
                item["confidence"],
                item["status"],
            ),
        )

def get_queue():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM queue ORDER BY id DESC LIMIT 50")]

def insert_alert(alert: dict):
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO alerts (timestamp, level, source, message, payload) VALUES (?,?,?,?,?)",
            (
                alert.get("timestamp"),
                alert.get("level"),
                alert.get("source"),
                alert.get("message"),
                json.dumps(alert.get("payload", {})),
            ),
        )

def get_alerts():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM alerts ORDER BY id DESC LIMIT 50")]
EOF

cat > 04_BACKEND/database/models.py <<'EOF'
# Database models placeholder.
EOF

cat > 04_BACKEND/database/seed.py <<'EOF'
from database.database import init_db

if __name__ == "__main__":
    init_db()
    print("Database initialized.")
EOF

touch 04_BACKEND/database/migrations/.gitkeep

# ---------- Services ----------
touch 04_BACKEND/services/__init__.py

cat > 04_BACKEND/services/event_processor.py <<'EOF'
from validators.event_validator import validate_event
from database.database import insert_event
from services.inventory_service import process_inventory_event
from services.cart_service import process_cart_event
from services.queue_service import process_queue_event
from services.alert_service import create_alert
from websocket.manager import manager

async def process_event(raw: dict):
    event = validate_event(raw)
    insert_event(event)
    await manager.broadcast({"type": "EVENT", "data": event})

    etype = event["event_type"]

    if etype == "WEIGHT_CHANGE":
        await process_inventory_event(event)
    elif etype == "CART_UPDATE":
        await process_cart_event(event)
    elif etype == "QUEUE_UPDATE":
        await process_queue_event(event)
    elif etype in ("ENTRY", "EXIT"):
        await manager.broadcast({"type": etype, "data": event})
    else:
        await create_alert({
            "level": "INFO",
            "source": "event_processor",
            "message": f"Unhandled event type {etype}",
            "payload": event,
        })

    return event
EOF

cat > 04_BACKEND/services/inventory_service.py <<'EOF'
from database.database import upsert_inventory
from websocket.manager import manager
from services.decision_engine import evaluate_inventory

async def process_inventory_event(event: dict):
    payload = event.get("payload") or {}
    weight = event.get("value") or 0

    estimated_quantity = int(weight // 200)

    item = {
        "sku": payload.get("sku", "SKU_001"),
        "shelf_id": event.get("zone", "shelf_A"),
        "current_weight_grams": weight,
        "estimated_quantity": estimated_quantity,
        "threshold": 5,
        "status": "NORMAL",
        "confidence": 0.94,
    }

    item["status"] = evaluate_inventory(item)
    upsert_inventory(item)
    await manager.broadcast({"type": "INVENTORY_UPDATE", "data": item})
    return item
EOF

cat > 04_BACKEND/services/cart_service.py <<'EOF'
from database.database import upsert_cart
from websocket.manager import manager

async def process_cart_event(event: dict):
    payload = event.get("payload") or {}

    item = {
        "cart_id": payload.get("cart_id", "cart_01"),
        "current_weight_grams": event.get("value", 0),
        "weight_change_grams": payload.get("weight_change_grams", 0),
        "estimated_item_count": payload.get("estimated_item_count", 0),
        "item_burden": payload.get("item_burden", "MEDIUM"),
        "confidence": payload.get("confidence", 0.91),
    }

    upsert_cart(item)
    await manager.broadcast({"type": "CART_UPDATE", "data": item})
    return item
EOF

cat > 04_BACKEND/services/queue_service.py <<'EOF'
from database.database import upsert_queue
from websocket.manager import manager

async def process_queue_event(event: dict):
    payload = event.get("payload") or {}

    item = {
        "timestamp": event.get("timestamp"),
        "lane": event.get("zone", "lane_01"),
        "people_count": event.get("value", 0),
        "item_burden": payload.get("item_burden", "MEDIUM"),
        "estimated_wait_seconds": payload.get("estimated_wait_seconds", 0),
        "service_rate_per_minute": payload.get("service_rate_per_minute", 1.2),
        "confidence": payload.get("confidence", 0.87),
        "status": payload.get("status", "NORMAL"),
    }

    upsert_queue(item)
    await manager.broadcast({"type": "QUEUE_UPDATE", "data": item})
    return item
EOF

cat > 04_BACKEND/services/alert_service.py <<'EOF'
from datetime import datetime
from database.database import insert_alert
from websocket.manager import manager

async def create_alert(alert: dict):
    alert.setdefault("timestamp", datetime.utcnow().isoformat())
    insert_alert(alert)
    await manager.broadcast({"type": "ALERT", "data": alert})
    return alert
EOF

cat > 04_BACKEND/services/decision_engine.py <<'EOF'
def evaluate_inventory(item: dict) -> str:
    if item["estimated_quantity"] <= item["threshold"]:
        return "LOW_STOCK"
    return "NORMAL"

def evaluate_queue(item: dict) -> str:
    if item["estimated_wait_seconds"] > 600:
        return "CRITICAL"
    if item["estimated_wait_seconds"] > 300:
        return "WARNING"
    return "NORMAL"
EOF

cat > 04_BACKEND/services/analytics_service.py <<'EOF'
# Placeholder for analytics service.
EOF

# ---------- Validators ----------
touch 04_BACKEND/validators/__init__.py

cat > 04_BACKEND/validators/event_validator.py <<'EOF'
from schemas import Event

def validate_event(raw: dict):
    return Event(**raw).dict()
EOF

# ---------- Middleware ----------
touch 04_BACKEND/middleware/__init__.py

cat > 04_BACKEND/middleware/authentication.py <<'EOF'
# Placeholder for authentication middleware.
EOF

cat > 04_BACKEND/middleware/validation.py <<'EOF'
# Placeholder for validation middleware.
EOF

cat > 04_BACKEND/middleware/error_handler.py <<'EOF'
# Placeholder for error handler middleware.
EOF

# ---------- Tests ----------
touch 04_BACKEND/tests/__init__.py
touch 04_BACKEND/tests/test_api/__init__.py
touch 04_BACKEND/tests/test_mqtt/__init__.py
touch 04_BACKEND/tests/test_database/__init__.py
touch 04_BACKEND/tests/test_services/__init__.py

# ---------- 07_INTEGRATION ----------
mkdir -p 07_INTEGRATION/{pipelines,tests}

cat > 07_INTEGRATION/README.md <<'EOF'
# Integration Layer

Maps MQTT devices → backend event processor → SQLite → REST/WebSocket.
EOF

cat > 07_INTEGRATION/device_registry.json <<'EOF'
{
  "devices": [
    {
      "device_id": "esp32_cam_entry",
      "type": "camera",
      "mqtt_topic": "netra/entry",
      "data_expected": ["ENTRY", "EXIT"]
    },
    {
      "device_id": "esp32_cam_queue",
      "type": "camera",
      "mqtt_topic": "netra/queue",
      "data_expected": ["QUEUE_UPDATE"]
    },
    {
      "device_id": "esp32_sensor_node",
      "type": "sensor",
      "mqtt_topic": "netra/events/weight",
      "data_expected": ["WEIGHT_CHANGE"]
    },
    {
      "device_id": "cart_node",
      "type": "sensor",
      "mqtt_topic": "netra/cart",
      "data_expected": ["CART_UPDATE"]
    }
  ]
}
EOF

cat > 07_INTEGRATION/integration_config.json <<'EOF'
{
  "pipelines": {
    "entry": {
      "input": "netra/entry",
      "output": "websocket"
    },
    "inventory": {
      "input": "netra/events/weight",
      "output": "inventory_schema.json"
    },
    "cart": {
      "input": "netra/cart",
      "output": "cart_schema.json"
    },
    "queue": {
      "input": "netra/queue",
      "output": "queue_schema.json"
    }
  }
}
EOF

cat > 07_INTEGRATION/api_contract.json <<'EOF'
{
  "rest": {
    "GET /api/health": "health check",
    "POST /api/events": "ingest event",
    "GET /api/inventory": "inventory list",
    "GET /api/queue": "queue list",
    "GET /api/cart": "cart list",
    "GET /api/alerts": "alerts list",
    "GET /api/dashboard": "dashboard summary"
  },
  "websocket": {
    "path": "/ws/live",
    "events": [
      "ENTRY",
      "EXIT",
      "INVENTORY_UPDATE",
      "CART_UPDATE",
      "QUEUE_UPDATE",
      "ALERT",
      "HEALTH"
    ]
  }
}
EOF

touch 07_INTEGRATION/pipelines/__init__.py

cat > 07_INTEGRATION/pipelines/entry_pipeline.py <<'EOF'
def run(event):
    return event
EOF

cat > 07_INTEGRATION/pipelines/inventory_pipeline.py <<'EOF'
def run(event):
    return event
EOF

cat > 07_INTEGRATION/pipelines/cart_pipeline.py <<'EOF'
def run(event):
    return event
EOF

cat > 07_INTEGRATION/pipelines/queue_pipeline.py <<'EOF'
def run(event):
    return event
EOF

touch 07_INTEGRATION/tests/__init__.py

cat > 07_INTEGRATION/tests/test_entry_to_dashboard.py <<'EOF'
def test_entry_to_dashboard():
    assert True
EOF

cat > 07_INTEGRATION/tests/test_shelf_to_dashboard.py <<'EOF'
def test_shelf_to_dashboard():
    assert True
EOF

cat > 07_INTEGRATION/tests/test_cart_to_dashboard.py <<'EOF'
def test_cart_to_dashboard():
    assert True
EOF

cat > 07_INTEGRATION/tests/test_queue_to_display.py <<'EOF'
def test_queue_to_display():
    assert True
EOF

# ---------- 06_DATA/schemas ----------
mkdir -p 06_DATA/schemas

cat > 06_DATA/schemas/event_schema.json <<'EOF'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Event",
  "type": "object",
  "required": ["schema_version", "event_id", "timestamp", "device_id", "event_type"],
  "properties": {
    "schema_version": {"type": "integer"},
    "event_id": {"type": "string"},
    "timestamp": {"type": "string"},
    "device_id": {"type": "string"},
    "event_type": {"type": "string"},
    "zone": {"type": "string"},
    "value": {"type": "number"},
    "unit": {"type": "string"},
    "payload": {"type": "object"}
  }
}
EOF

cat > 06_DATA/schemas/inventory_schema.json <<'EOF'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "InventoryItem",
  "type": "object",
  "required": ["sku", "shelf_id", "current_weight_grams", "estimated_quantity", "threshold", "status", "confidence"],
  "properties": {
    "sku": {"type": "string"},
    "shelf_id": {"type": "string"},
    "current_weight_grams": {"type": "number"},
    "estimated_quantity": {"type": "integer"},
    "threshold": {"type": "integer"},
    "status": {"type": "string"},
    "confidence": {"type": "number"}
  }
}
EOF

cat > 06_DATA/schemas/cart_schema.json <<'EOF'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CartItem",
  "type": "object",
  "required": ["cart_id", "current_weight_grams", "weight_change_grams", "estimated_item_count", "item_burden", "confidence"],
  "properties": {
    "cart_id": {"type": "string"},
    "current_weight_grams": {"type": "number"},
    "weight_change_grams": {"type": "number"},
    "estimated_item_count": {"type": "integer"},
    "item_burden": {"type": "string"},
    "confidence": {"type": "number"}
  }
}
EOF

cat > 06_DATA/schemas/queue_schema.json <<'EOF'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "QueueItem",
  "type": "object",
  "required": ["timestamp", "lane", "people_count", "item_burden", "estimated_wait_seconds", "service_rate_per_minute", "confidence", "status"],
  "properties": {
    "timestamp": {"type": "string"},
    "lane": {"type": "string"},
    "people_count": {"type": "integer"},
    "item_burden": {"type": "string"},
    "estimated_wait_seconds": {"type": "integer"},
    "service_rate_per_minute": {"type": "number"},
    "confidence": {"type": "number"},
    "status": {"type": "string"}
  }
}
EOF

# ---------- 08_TESTING ----------
mkdir -p 08_TESTING/{backend,integration,api,unit,hardware,ai,end_to_end}

cat > 08_TESTING/test_config.json <<'EOF'
{
  "backend_url": "http://localhost:8000",
  "mqtt_broker": "localhost",
  "mqtt_port": 1883,
  "test_topics": ["netra/test/#"]
}
EOF

touch 08_TESTING/backend/.gitkeep
touch 08_TESTING/integration/.gitkeep
touch 08_TESTING/api/.gitkeep
touch 08_TESTING/unit/.gitkeep
touch 08_TESTING/hardware/.gitkeep
touch 08_TESTING/ai/.gitkeep
touch 08_TESTING/end_to_end/.gitkeep

# ---------- 99_RUNTIME ----------
mkdir -p 99_RUNTIME/{database,logs,exports,temporary,captures,debug}

touch 99_RUNTIME/database/.gitkeep
touch 99_RUNTIME/logs/.gitkeep
touch 99_RUNTIME/exports/.gitkeep
touch 99_RUNTIME/temporary/.gitkeep
touch 99_RUNTIME/captures/.gitkeep
touch 99_RUNTIME/debug/.gitkeep

# ---------- Root files ----------
cat > requirements.txt <<'EOF'
fastapi
uvicorn[standard]
paho-mqtt
pydantic
EOF

cat > .env.example <<'EOF'
MQTT_BROKER=localhost
MQTT_PORT=1883
DB_PATH=99_RUNTIME/database/netra.db
EOF

cat > docker-compose.yml <<'EOF'
version: "3.9"

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    working_dir: /app/04_BACKEND
    command: uvicorn main:app --host 0.0.0.0 --port 8000

  mqtt:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
EOF

echo "Backend scaffold created successfully."