# 03_AI/decision_engine/alerts.py
from datetime import datetime, timezone
from typing import Dict, Any

def generate_alert(alert_type: str, message: str) -> Dict[str, Any]:
    """Generates an event_schema compliant ALERT payload."""
    import uuid
    return {
        "schema_version": 1,
        "event_id": str(uuid.uuid4()),
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "device_id": "decision_engine",
        "event_type": "ALERT",
        "zone": None,
        "entity_id": None,
        "payload": {"alert_type": alert_type, "message": message},
        "confidence": 1.0,
        "metadata": {}
    }
