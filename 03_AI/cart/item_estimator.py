# 03_AI/cart/item_estimator.py
def estimate_cart_items(net_weight_grams: float, average_item_weight: float = 300.0) -> int:
    """Naive fallback estimation of item count based on aggregate weight."""
    if average_item_weight <= 0:
        return 0
    return int(max(0, round(net_weight_grams / average_item_weight)))
