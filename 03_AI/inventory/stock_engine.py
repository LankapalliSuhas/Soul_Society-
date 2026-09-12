# 03_AI/inventory/stock_engine.py
from datetime import datetime, timezone
from typing import Dict, Any

def update_inventory_status(sku: str, shelf_id: str, tare_weight: float, unit_weight: float, current_weight: float, low_threshold: int) -> Dict[str, Any]:
    """
    Calculates exact estimated quantity from net weight (ΔW).
    Returns inventory_schema compliant dict.
    """
    net_weight = max(0.0, current_weight - tare_weight)
    
    if unit_weight > 0:
        est_qty = int(round(net_weight / unit_weight))
    else:
        est_qty = 0
        
    status = "NORMAL"
    if est_qty == 0:
        status = "OUT_OF_STOCK"
    elif est_qty <= low_threshold:
        status = "LOW"
        
    return {
        "sku": sku,
        "shelf_id": shelf_id,
        "tare_weight_grams": float(tare_weight),
        "unit_weight_grams": float(unit_weight),
        "current_weight_grams": float(current_weight),
        "estimated_quantity": est_qty,
        "threshold": int(low_threshold),
        "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "confidence": 0.95,
        "status": status
    }
