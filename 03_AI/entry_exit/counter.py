# 03_AI/entry_exit/counter.py
class OccupancyCounter:
    def __init__(self):
        self.current_occupancy = 0

    def process_event(self, event_type: str) -> int:
        """Updates internal occupancy count based on verified events."""
        if event_type == "ENTRY":
            self.current_occupancy += 1
        elif event_type == "EXIT":
            self.current_occupancy = max(0, self.current_occupancy - 1)
        return self.current_occupancy
