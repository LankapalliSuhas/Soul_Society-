import asyncio
from services.event_processor import process_event

def handle_message(payload: dict):
    asyncio.run(process_event(payload))
