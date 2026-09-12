# 03_AI/queue/queue_forecast.py
def forecast_queue_growth(current_rate_in: float, service_rate: float, minutes_ahead: int) -> int:
    """Simple linear forecast of queue delta over time."""
    net_rate = current_rate_in - service_rate
    return int(round(net_rate * minutes_ahead))
