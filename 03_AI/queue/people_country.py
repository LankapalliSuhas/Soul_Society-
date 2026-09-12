# 03_AI/queue/people_counter.py
def extract_people_count(detections: list, confidence_thresh: float) -> int:
    """Counts valid person detections above AI_CONFIG threshold."""
    return sum(1 for d in detections if d.get('class') == 'person' and d.get('confidence', 0) >= confidence_thresh)
