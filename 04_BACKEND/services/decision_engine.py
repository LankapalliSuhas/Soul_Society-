def evaluate_inventory(item: dict) -> str:
    if item["estimated_quantity"] <= item["threshold"]:
        return "LOW_STOCK"
    return "NORMAL"

def evaluate_queue(item: dict) -> str:
    if item["estimated_wait_seconds"] > 600:
        return "CRITICAL"
    if item["estimated_wait_seconds"] > 300:
        return "WARNING"
    return "NORMAL"
