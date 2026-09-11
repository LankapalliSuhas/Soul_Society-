from pydantic import BaseModel
from typing import Optional, Any, Dict

class Event(BaseModel):
    schema_version: int
    event_id: str
    timestamp: str
    device_id: str
    event_type: str
    zone: Optional[str] = None
    value: Optional[float] = None
    unit: Optional[str] = None
    payload: Optional[Dict[str, Any]] = None

class InventoryItem(BaseModel):
    sku: str
    shelf_id: str
    current_weight_grams: float
    estimated_quantity: int
    threshold: int
    status: str
    confidence: float

class CartItem(BaseModel):
    cart_id: str
    current_weight_grams: float
    weight_change_grams: float
    estimated_item_count: int
    item_burden: str
    confidence: float

class QueueItem(BaseModel):
    timestamp: str
    lane: str
    people_count: int
    item_burden: str
    estimated_wait_seconds: int
    service_rate_per_minute: float
    confidence: float
    status: str
