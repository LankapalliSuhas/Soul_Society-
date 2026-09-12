from services.cart_service import process_cart_event
import asyncio

def test_cart():
    evt = {'schema_version': 1, 'event_id': 'cart_1', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'scale_2', 'event_type': 'CART_UPDATE', 'payload': {'cart_id': 'c1', 'timestamp': '2026-01-01T00:00:00Z', 'tare_weight_grams': 10000, 'current_weight_grams': 11000, 'weight_change_grams': 1000, 'item_burden': 'LOW', 'confidence': 0.9}}
    asyncio.run(process_cart_event(evt))
