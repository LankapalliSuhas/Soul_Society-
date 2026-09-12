import { useApi } from "../hooks/useApi";
import { useConnectionStatus } from "../hooks/useConnectionStatus";
import { getOccupancy, getQueueLanes, getInventory, getSystemHealth } from "../services/api";
import OccupancyCounter from "../components/OccupancyCounter";
import SystemHealthBadge from "../components/SystemHealthBadge";
import EventTimeline from "../components/EventTimeline";
import AlertBanner from "../components/AlertBanner";

const STATUS_TEXT = {
  connected: "Live connection active",
  reconnecting: "Reconnecting…",
  disconnected: "Connection lost",
  connecting: "Connecting…",
};

export default function CommandCenter() {
  const occ = useApi(getOccupancy, { pollMs: 6000 });
  const queue = useApi(getQueueLanes, { pollMs: 5000 });
  const inventory = useApi(getInventory, { pollMs: 8000 });
  const health = useApi(getSystemHealth, { pollMs: 10000 });
  const { status, events } = useConnectionStatus({ maxEvents: 40 });

  const lanes = queue.data || [];
  const inventoryItems = inventory.data || [];
  const alerts = inventoryItems.filter((i) => i.status !== "ok");
  const totalWaiting = lanes.reduce((a, l) => a + l.people_count, 0);

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-2.5 mb-7">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight">Command Center</h1>
          <div className="text-sm text-inkSoft mt-1">What&apos;s happening in the store right now</div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="inline-flex items-center gap-1.5 bg-linen border border-border rounded-full px-3 py-1.5 text-xs text-inkSoft shadow-soft">
            <span className={`w-1.5 h-1.5 rounded-full ${status === "connected" ? "bg-ok animate-pulse" : "bg-rose"}`} />
            {STATUS_TEXT[status] || status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mb-6 items-stretch">
        <OccupancyCounter
          occupancy={occ.data?.occupancy}
          history={occ.data?.history}
          delta={occ.error ? "" : "holding steady"}
        />
        <div className="flex flex-col gap-3.5">
          <div className="flex-1 bg-linen border border-border rounded-lg px-5 py-4 shadow-soft flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Queue</div>
              <div className="font-display text-[22px] font-bold text-leafDeep">
                {totalWaiting} <small className="text-xs font-medium text-inkSoft ml-1">waiting</small>
              </div>
              <div className="text-[11.5px] text-inkSoft mt-1">across {lanes.length || "—"} lanes</div>
            </div>
          </div>
          <div className="flex-1 bg-linen border border-border rounded-lg px-5 py-4 shadow-soft flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Critical stock</div>
              <div className="font-display text-[22px] font-bold text-leafDeep">
                {inventoryItems.filter((i) => i.status === "critical").length}{" "}
                <small className="text-xs font-medium text-inkSoft ml-1">SKUs</small>
              </div>
              <div className="text-[11.5px] text-inkSoft mt-1">below reorder threshold</div>
            </div>
          </div>
          <div className="flex-1 bg-linen border border-border rounded-lg px-5 py-4 shadow-soft">
            <SystemHealthBadge healthy={health.data?.healthy} pct={health.data?.pct || 0} note={health.data?.note} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 mb-5 items-start">
        <div className="panel">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Queue overview</h2>
            <span className="text-xs text-inkSoft">{lanes.length} lanes</span>
          </div>
          {queue.error && <AlertBanner type="error" message="Queue data unavailable" />}
          {queue.isEmpty && <AlertBanner type="empty" message="No queue data available" />}
          <div className="space-y-2.5">
            {lanes.map((l) => (
              <div key={l.lane} className="flex items-center gap-3.5 py-1">
                <div className="w-11 font-bold text-sm text-leafDeep">{l.lane}</div>
                <div className="flex-1 h-[7px] rounded-full bg-spring overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round(l.burden * 100)}%`,
                      background: l.status === "critical" ? "#A76B62" : l.status === "busy" ? "#B78B55" : "#71866A",
                    }}
                  />
                </div>
                <div className="w-24 text-right text-xs text-inkSoft">
                  {l.people_count} people · {l.eta_min} min
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Inventory attention</h2>
            <span className="text-xs text-inkSoft">{alerts.length} active</span>
          </div>
          {inventory.error && <AlertBanner type="error" message="Unable to load inventory" />}
          {alerts.length === 0 && !inventory.error && <AlertBanner type="empty" message="No inventory alerts" />}
          <div className="space-y-2.5">
            {alerts.map((a) => (
              <div key={a.sku} className="flex gap-2.5 items-start py-1">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.status === "low" ? "bg-amber" : "bg-rose"}`} />
                <div>
                  <div className="text-sm font-semibold">{a.name}</div>
                  <div className="text-xs text-inkSoft">{a.sku} · {a.stock} units left · {a.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel mb-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Live activity</h2>
          <span className="text-xs text-inkSoft">streaming</span>
        </div>
        <div className="max-h-[220px] overflow-hidden">
          <EventTimeline events={events} limit={5} />
        </div>
      </div>
    </div>
  );
}
