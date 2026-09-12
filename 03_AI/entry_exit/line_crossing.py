# 03_AI/entry_exit/line_crossing.py
import uuid
from datetime import datetime, timezone
from typing import Dict, Any

def evaluate_line_crossing(device_id: str, zone: str, direction: str, raw_confidence: float) -> Dict[str, Any]:
    """
    Evaluates line crossing logic without persisting any image frames.
    Returns an event_schema compliant dict.
    """
    event_type = "ENTRY" if direction.lower() == "in" else "EXIT"
    
    return {
        "schema_version": 1,
        "event_id": str(uuid.uuid4()),
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "device_id": device_id,
        "event_type": event_type,
        "zone": zone,
        "entity_id": None,
        "payload": {"crossing_direction": direction},
        "confidence": float(raw_confidence),
        "metadata": {"processor": "line_crossing_v1"}
    }
