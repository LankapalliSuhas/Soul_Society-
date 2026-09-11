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
