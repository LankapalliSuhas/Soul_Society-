# Database models placeholder.
# 04_BACKEND/database/models.py
# Hand to Soham (Backend Owner)
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class EventModel(BaseModel):
    schema_version: int = 1
    event_id: str
    timestamp: datetime
    device_id: str
    event_type: str
    zone: Optional[str] = None
    entity_id: Optional[str] = None
    payload: Dict[str, Any] = Field(default_factory=dict)
    confidence: Optional[float] = Field(None, ge=0, le=1)
    metadata: Dict[str, Any] = Field(default_factory=dict)
