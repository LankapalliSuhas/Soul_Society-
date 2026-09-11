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
