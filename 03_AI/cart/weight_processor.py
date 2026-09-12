# 03_AI/cart/weight_processor.py
from datetime import datetime, timezone
from typing import Dict, Any

def process_cart_weight(cart_id: str, tare_grams: float, current_grams: float, change_grams: float) -> Dict[str, Any]:
    """
    Outputs cart_schema compliant dict based on cart hardware readings.
    """
    net_weight = max(0.0, current_grams - tare_grams)
    
    burden = "LOW"
    if net_weight > 10000:
        burden = "HIGH"
    elif net_weight > 3000:
        burden = "MEDIUM"
        
    return {
        "cart_id": cart_id,
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "tare_weight_grams": float(tare_grams),
        "current_weight_grams": float(current_grams),
        "weight_change_grams": float(change_grams),
        "item_burden": burden,
        "confidence": 0.90
    }
