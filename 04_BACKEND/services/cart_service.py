# 04_BACKEND/services/cart_service.py
from database.database import upsert_cart
from websocket.manager import manager

async def process_cart_event(event: dict):
    payload = event.get("payload") or {}

    item = {
        "cart_id": payload.get("cart_id", "UNKNOWN"),
        "timestamp": payload.get("timestamp", event.get("timestamp")),
        "tare_weight_grams": payload.get("tare_weight_grams", 0.0),
        "current_weight_grams": payload.get("current_weight_grams", 0.0),
        "weight_change_grams": payload.get("weight_change_grams", 0.0),
        "estimated_item_count": payload.get("estimated_item_count"),
        "item_burden": payload.get("item_burden", "UNKNOWN"),
        "confidence": payload.get("confidence", 0.0),
    }

    upsert_cart(item)
    await manager.broadcast({"type": "CART_UPDATE", "data": item})
    return item
