from validators.event_validator import validate_event
import pytest

def test_valid_event():
    evt = {'schema_version': 1, 'event_id': '123', 'timestamp': '2026-01-01T00:00:00Z', 'device_id': 'd1', 'event_type': 'ENTRY'}
    validated = validate_event(evt)
    assert validated['event_id'] == '123'
    assert validated['event_type'] == 'ENTRY'
