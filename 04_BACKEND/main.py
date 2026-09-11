from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database.database import init_db
from mqtt.client import start_mqtt
from api import health, events, inventory, queue, cart, alerts, dashboard
from websocket import live_events

app = FastAPI(title=settings.data["app_name"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()
    start_mqtt()

prefix = settings.data["api_prefix"]

app.include_router(health.router, prefix=prefix)
app.include_router(events.router, prefix=prefix)
app.include_router(inventory.router, prefix=prefix)
app.include_router(queue.router, prefix=prefix)
app.include_router(cart.router, prefix=prefix)
app.include_router(alerts.router, prefix=prefix)
app.include_router(dashboard.router, prefix=prefix)
app.include_router(live_events.router)
