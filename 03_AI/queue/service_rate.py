# 03_AI/queue/service_rate.py
def calculate_historical_service_rate(past_wait_times: list) -> float:
    """Calculates rolling average service rate (people/min)."""
    if not past_wait_times:
        return 2.0  # Fallback default
    return sum(past_wait_times) / len(past_wait_times)
