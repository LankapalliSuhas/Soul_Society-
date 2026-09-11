from fastapi import APIRouter
from database.database import get_inventory

router = APIRouter()

@router.get("/inventory")
def inventory():
    return get_inventory()
