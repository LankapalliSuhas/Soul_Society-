# 03_AI/entry_exit/tracking.py
from typing import List, Dict, Any

def track_centroids(current_centroids: List[tuple], previous_centroids: List[tuple], threshold_y: int) -> List[Dict[str, Any]]:
    """
    Tracks centroid movement across a defined Y threshold to determine direction.
    Processes coordinates strictly in memory; no frames saved.
    """
    events = []
    # Simplified tracking: assuming 1-to-1 index match for brevity in prototype
    for curr, prev in zip(current_centroids, previous_centroids):
        _, curr_y = curr
        _, prev_y = prev
        if prev_y < threshold_y <= curr_y:
            events.append({"direction": "in"})
        elif prev_y > threshold_y >= curr_y:
            events.append({"direction": "out"})
    return events
