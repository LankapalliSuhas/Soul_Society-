from fastapi import APIRouter
from database.database import get_inventory, get_queue, get_cart, get_alerts

router = APIRouter()

@router.get("/dashboard")
def dashboard():
    return {
        "inventory": get_inventory(),
        "queue": get_queue(),
        "cart": get_cart(),
        "alerts": get_alerts(),
    }
