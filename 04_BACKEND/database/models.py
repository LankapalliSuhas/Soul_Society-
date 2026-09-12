# 04_BACKEND/database/models.py
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

class InventoryModel(BaseModel):
    sku: str
    shelf_id: str
    tare_weight_grams: float = Field(..., ge=0)
    unit_weight_grams: float = Field(..., gt=0)
    current_weight_grams: float = Field(..., ge=0)
    estimated_quantity: int = Field(..., ge=0)
    threshold: int = Field(..., ge=0)
    status: str
    last_updated: datetime
    confidence: float = Field(..., ge=0, le=1)

class CartModel(BaseModel):
    cart_id: str
    timestamp: datetime
    tare_weight_grams: float = Field(..., ge=0)
    current_weight_grams: float = Field(..., ge=0)
    weight_change_grams: float
    estimated_item_count: Optional[int] = Field(None, ge=0)
    item_burden: str
    confidence: float = Field(..., ge=0, le=1)

class QueueModel(BaseModel):
    timestamp: datetime
    lane: str
    people_count: int = Field(..., ge=0)
    item_burden: str
    estimated_item_count: Optional[int] = Field(None, ge=0)
    estimated_wait_seconds: float = Field(..., ge=0)
    service_rate_per_minute: Optional[float] = Field(None, ge=0)
    confidence: float = Field(..., ge=0, le=1)
    status: str
    item_burden_source: str
