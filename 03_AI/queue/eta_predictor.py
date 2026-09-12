# 03_AI/queue/eta_predictor.py
from datetime import datetime, timezone
from typing import Dict, Any

def predict_queue_eta(lane: str, people_count: int, item_burden: str, base_service_time: int, per_item_time: int, warning_thresh: int, critical_thresh: int) -> Dict[str, Any]:
    """
    Computes ETA using formula: T_i = α + β·N_i
    Returns queue_schema compliant dict.
    """
    # α = base_service_time, β = per_item_time
    # Estimate average items based on burden state
    burden_multiplier = {"LOW": 3, "MEDIUM": 10, "HIGH": 25, "UNKNOWN": 5}
    est_items_per_person = burden_multiplier.get(item_burden, 5)
    
    time_per_person = base_service_time + (per_item_time * est_items_per_person)
    eta_seconds = float(people_count * time_per_person)
    
    status = "NORMAL"
    if people_count >= critical_thresh:
        status = "CRITICAL"
    elif people_count >= warning_thresh:
        status = "WARNING"
        
    return {
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "lane": lane,
        "people_count": int(people_count),
        "item_burden": item_burden,
        "estimated_wait_seconds": eta_seconds,
        "item_burden_source": "VISION_ESTIMATE",
        "status": status,
        "confidence": 0.85
    }
