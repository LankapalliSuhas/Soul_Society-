from datetime import datetime
from database.database import insert_alert
from websocket.manager import manager

async def create_alert(alert: dict):
    alert.setdefault("timestamp", datetime.utcnow().isoformat())
    insert_alert(alert)
    await manager.broadcast({"type": "ALERT", "data": alert})
    return alert
