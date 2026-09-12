from fastapi import APIRouter
from database.models import EventModel as Event
from services.event_service import process_event

router = APIRouter()

@router.post("/events")
async def create_event(event: Event):
    return await process_event(event.dict())
