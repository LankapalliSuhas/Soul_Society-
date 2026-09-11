from fastapi import APIRouter
from schemas import Event
from services.event_processor import process_event

router = APIRouter()

@router.post("/events")
async def create_event(event: Event):
    return await process_event(event.dict())
