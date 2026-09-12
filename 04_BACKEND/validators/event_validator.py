from database.models import EventModel as Event

def validate_event(raw: dict):
    return Event(**raw).model_dump()
