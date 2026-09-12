# 03_AI/inventory/anomaly_detector.py
def check_weight_anomaly(current_weight: float, tare_weight: float, unit_weight: float, tolerance: float) -> bool:
    """Flags if current weight doesn't divide cleanly into known unit weights."""
    if unit_weight <= 0:
        return False
    net_weight = current_weight - tare_weight
    remainder = net_weight % unit_weight
    # If remainder is not close to 0 or close to unit_weight, it's anomalous
    if remainder > tolerance and (unit_weight - remainder) > tolerance:
        return True
    return False
