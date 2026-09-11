import json
import paho.mqtt.client as mqtt
from config import settings
from mqtt.handlers import handle_message

def start_mqtt():
    client = mqtt.Client(client_id=settings.mqtt["client_id"])
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(
        settings.mqtt["broker"],
        settings.mqtt["port"],
        settings.mqtt["keepalive"],
    )
    client.loop_start()
    return client

def on_connect(client, userdata, flags, rc):
    for topic in settings.mqtt["topics"]:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        handle_message(payload)
    except Exception as e:
        print(f"MQTT message error: {e}")
