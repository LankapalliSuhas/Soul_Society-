# 03_AI/sensor_fusion/confidence.py
def determine_fusion_status(final_confidence: float, minimum_confidence: float) -> str:
    """Validates if fused sensor state passes minimum threshold."""
    return "VERIFIED" if final_confidence >= minimum_confidence else "UNCERTAIN"
