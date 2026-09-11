from schemas import Event

def validate_event(raw: dict):
    return Event(**raw).dict()
