# 03_AI/inventory/sku_matcher.py
def identify_sku_by_weight(weight_delta: float, catalog: dict, tolerance: float) -> str:
    """Matches a delta weight to known SKUs within the defined tolerance."""
    abs_delta = abs(weight_delta)
    best_match = "UNKNOWN"
    min_diff = float('inf')
    
    for sku, unit_weight in catalog.items():
        diff = abs(abs_delta - unit_weight)
        if diff <= tolerance and diff < min_diff:
            min_diff = diff
            best_match = sku
            
    return best_match
