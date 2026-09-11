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
