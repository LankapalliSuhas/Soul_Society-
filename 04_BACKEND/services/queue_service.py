# 04_BACKEND/services/queue_service.py
from database.database import upsert_queue
from websocket.manager import manager

async def process_queue_event(event: dict):
    payload = event.get("payload") or {}

    item = {
        "timestamp": payload.get("timestamp", event.get("timestamp")),
        "lane": payload.get("lane", "UNKNOWN"),
        "people_count": payload.get("people_count", 0),
        "item_burden": payload.get("item_burden", "UNKNOWN"),
        "estimated_item_count": payload.get("estimated_item_count"),
        "estimated_wait_seconds": payload.get("estimated_wait_seconds", 0.0),
        "service_rate_per_minute": payload.get("service_rate_per_minute"),
        "confidence": payload.get("confidence", 0.0),
        "status": payload.get("status", "NORMAL"),
        "item_burden_source": payload.get("item_burden_source", "UNKNOWN"),
    }

    upsert_queue(item)
    await manager.broadcast({"type": "QUEUE_UPDATE", "data": item})
    return item
