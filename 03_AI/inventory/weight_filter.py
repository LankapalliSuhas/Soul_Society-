# 03_AI/inventory/weight_filter.py
from typing import List

def apply_weight_smoothing(raw_readings: List[float], min_stable_count: int, tolerance_grams: float) -> float:
    """
    Returns the median of recent readings if they fall within tolerance.
    Otherwise returns the most recent reading as unstable fallback.
    """
    if len(raw_readings) < min_stable_count:
        return raw_readings[-1] if raw_readings else 0.0
        
    recent = raw_readings[-min_stable_count:]
    spread = max(recent) - min(recent)
    
    if spread <= tolerance_grams:
        return sum(recent) / len(recent)
    return recent[-1]
