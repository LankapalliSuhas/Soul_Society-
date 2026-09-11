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
