# 03_AI/decision_engine/actions.py
def evaluate_queue_rule(queue_status: str, ai_config: dict) -> bool:
    """Recommends opening a counter if queue is critical."""
    enabled = ai_config.get("decision_engine", {}).get("counter_recommendation", False)
    return enabled and queue_status == "CRITICAL"
