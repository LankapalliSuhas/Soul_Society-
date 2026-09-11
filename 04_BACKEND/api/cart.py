from fastapi import APIRouter
from database.database import get_cart

router = APIRouter()

@router.get("/cart")
def cart():
    return get_cart()
