from fastapi import APIRouter
from database.database import get_alerts

router = APIRouter()

@router.get("/alerts")
def alerts():
    return get_alerts()
