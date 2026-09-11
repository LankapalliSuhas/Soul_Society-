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
