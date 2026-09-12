# 04_BACKEND/database/database.py
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
            "INSERT INTO events (schema_version, event_id, timestamp, device_id, event_type, zone, entity_id, payload, confidence, metadata) VALUES (?,?,?,?,?,?,?,?,?,?)",
            (
                event.get("schema_version", 1),
                event.get("event_id"),
                event.get("timestamp"),
                event.get("device_id"),
                event.get("event_type"),
                event.get("zone"),
                event.get("entity_id"),
                json.dumps(event.get("payload", {})),
                event.get("confidence"),
                json.dumps(event.get("metadata", {})),
            ),
        )

def upsert_inventory(item: dict):
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO inventory (sku, shelf_id, tare_weight_grams, unit_weight_grams, current_weight_grams, estimated_quantity, threshold, status, last_updated, confidence)
               VALUES (?,?,?,?,?,?,?,?,?,?)
               ON CONFLICT(sku, shelf_id) DO UPDATE SET
                 tare_weight_grams=excluded.tare_weight_grams,
                 unit_weight_grams=excluded.unit_weight_grams,
                 current_weight_grams=excluded.current_weight_grams,
                 estimated_quantity=excluded.estimated_quantity,
                 threshold=excluded.threshold,
                 status=excluded.status,
                 last_updated=excluded.last_updated,
                 confidence=excluded.confidence
            """,
            (
                item["sku"],
                item["shelf_id"],
                item["tare_weight_grams"],
                item["unit_weight_grams"],
                item["current_weight_grams"],
                item["estimated_quantity"],
                item["threshold"],
                item["status"],
                item["last_updated"],
                item["confidence"],
            ),
        )

def get_inventory():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM inventory")]

def upsert_cart(item: dict):
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO cart (cart_id, timestamp, tare_weight_grams, current_weight_grams, weight_change_grams, estimated_item_count, item_burden, confidence)
               VALUES (?,?,?,?,?,?,?,?)
               ON CONFLICT(cart_id) DO UPDATE SET
                 timestamp=excluded.timestamp,
                 tare_weight_grams=excluded.tare_weight_grams,
                 current_weight_grams=excluded.current_weight_grams,
                 weight_change_grams=excluded.weight_change_grams,
                 estimated_item_count=excluded.estimated_item_count,
                 item_burden=excluded.item_burden,
                 confidence=excluded.confidence
            """,
            (
                item["cart_id"],
                item["timestamp"],
                item["tare_weight_grams"],
                item["current_weight_grams"],
                item["weight_change_grams"],
                item.get("estimated_item_count"),
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
            """INSERT INTO queue (timestamp, lane, people_count, item_burden, estimated_item_count, estimated_wait_seconds, service_rate_per_minute, confidence, status, item_burden_source)
               VALUES (?,?,?,?,?,?,?,?,?,?)""",
            (
                item["timestamp"],
                item["lane"],
                item["people_count"],
                item["item_burden"],
                item.get("estimated_item_count"),
                item["estimated_wait_seconds"],
                item.get("service_rate_per_minute"),
                item["confidence"],
                item["status"],
                item["item_burden_source"],
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
