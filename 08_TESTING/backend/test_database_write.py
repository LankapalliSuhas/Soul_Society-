from database.database import init_db, insert_event
import sqlite3
import os

def test_db_write():
    init_db()
    insert_event({'schema_version': 1, 'event_id': '456', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'd1', 'event_type': 'EXIT'})
    # Ensure it writes without crashing
