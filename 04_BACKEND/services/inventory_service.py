# 04_BACKEND/services/inventory_service.py
from database.database import upsert_inventory
from websocket.manager import manager
from services.decision_engine import evaluate_inventory
import json
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parents[2] / "03_AI" / "AI_CONFIG.json"
with open(CONFIG_PATH, "r") as f:
    AI_CONFIG = json.load(f)

async def process_inventory_event(event: dict):
    payload = event.get("payload") or {}

    item = {
        "sku": payload.get("sku", "UNKNOWN"),
        "shelf_id": payload.get("shelf_id", "UNKNOWN"),
        "tare_weight_grams": payload.get("tare_weight_grams", 0.0),
        "unit_weight_grams": payload.get("unit_weight_grams", 0.0),
        "current_weight_grams": payload.get("current_weight_grams", 0.0),
        "estimated_quantity": payload.get("estimated_quantity", 0),
        "threshold": payload.get("threshold", AI_CONFIG.get("inventory", {}).get("low_stock_threshold", 2)),
        "status": payload.get("status", "NORMAL"),
        "last_updated": payload.get("last_updated", event.get("timestamp")),
        "confidence": payload.get("confidence", 0.0),
    }

    item["status"] = evaluate_inventory(item)
    upsert_inventory(item)
    await manager.broadcast({"type": "INVENTORY_UPDATE", "data": item})
    return item
