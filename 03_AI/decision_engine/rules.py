# 03_AI/decision_engine/rules.py
def evaluate_restock_rule(inventory_status: str, ai_config: dict) -> bool:
    """Triggers if inventory is low and alerts are enabled."""
    enabled = ai_config.get("decision_engine", {}).get("restock_alert", False)
    return enabled and inventory_status in ["LOW", "OUT_OF_STOCK"]
