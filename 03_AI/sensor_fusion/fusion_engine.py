# 03_AI/sensor_fusion/fusion_engine.py
def resolve_event_conflict(shelf_data: dict, cart_data: dict, pir_data: dict, fusion_weights: dict) -> float:
    """
    Combines weighted confidences from AI_CONFIG: {shelf: 0.5, cart: 0.4, pir: 0.1}
    """
    w_shelf = fusion_weights.get("shelf", 0.5)
    w_cart = fusion_weights.get("cart", 0.4)
    w_pir = fusion_weights.get("pir", 0.1)
    
    c_shelf = shelf_data.get("confidence", 0.0)
    c_cart = cart_data.get("confidence", 0.0)
    c_pir = pir_data.get("confidence", 0.0)
    
    final_confidence = (c_shelf * w_shelf) + (c_cart * w_cart) + (c_pir * w_pir)
    return final_confidence
