import json
from pathlib import Path

CONFIG_PATH = Path(__file__).parent / "backend_config.json"

class Settings:
    def __init__(self):
        with open(CONFIG_PATH) as f:
            self.data = json.load(f)

    def __getattr__(self, item):
        return self.data[item]

settings = Settings()
