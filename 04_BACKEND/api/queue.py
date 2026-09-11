from fastapi import APIRouter
from database.database import get_queue

router = APIRouter()

@router.get("/queue")
def queue():
    return get_queue()
