import { useConnectionStatus } from "../hooks/useConnectionStatus";
import EventTimeline from "../components/EventTimeline";
import AlertBanner from "../components/AlertBanner";

const STATUS_TEXT = {
  connected: "Live connection active",
  reconnecting: "Reconnecting…",
  disconnected: "Connection lost",
  connecting: "Connecting…",
};

export default function LiveEvents() {
  const { status, events } = useConnectionStatus({ maxEvents: 60 });

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-2.5 mb-7">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight">Live Events</h1>
          <div className="text-sm text-inkSoft mt-1">Raw event stream from backend / WebSocket</div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="inline-flex items-center gap-1.5 bg-linen border border-border rounded-full px-3 py-1.5 text-xs text-inkSoft shadow-soft">
            <span className={`w-1.5 h-1.5 rounded-full ${status === "connected" ? "bg-ok animate-pulse" : "bg-rose"}`} />
            {STATUS_TEXT[status] || status}
          </div>
          <div className="text-[11.5px] text-inkSoft">{events.length} events received</div>
        </div>
      </div>

      {status === "reconnecting" && <AlertBanner type="warning" message="Reconnecting…" />}
      {status === "disconnected" && <AlertBanner type="error" message="Connection lost" />}

      <div className="panel">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Event timeline</h2>
          <span className="text-xs text-inkSoft">newest first</span>
        </div>
        <EventTimeline events={events} limit={60} />
      </div>
    </div>
  );
}
