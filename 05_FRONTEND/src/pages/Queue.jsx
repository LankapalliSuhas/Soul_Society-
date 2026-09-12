import { useApi } from "../hooks/useApi";
import { getQueueLanes } from "../services/api";
import LaneCard from "../components/LaneCard";
import QueueETAChart from "../charts/QueueETAChart";
import AlertBanner from "../components/AlertBanner";

export default function Queue() {
  const { data, loading, error, isEmpty } = useApi(getQueueLanes, { pollMs: 5000 });
  const lanes = data || [];

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-2.5 mb-7">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight">Queue</h1>
          <div className="text-sm text-inkSoft mt-1">Which lane needs attention, at a glance</div>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-linen border border-border rounded-full px-3 py-1.5 text-xs text-inkSoft shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
          {loading ? "Loading…" : "Updated live"}
        </div>
      </div>

      {error && <AlertBanner type="error" message="Queue data unavailable" />}
      {isEmpty && <AlertBanner type="empty" message="No queue data available" />}

      {!isEmpty && (
        <>
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
            {lanes.map((lane) => (
              <LaneCard key={lane.lane} lane={lane} />
            ))}
          </div>

          <div className="panel">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">ETA by lane</h2>
              <span className="text-xs text-inkSoft">minutes to checkout</span>
            </div>
            <QueueETAChart lanes={lanes} />
          </div>
        </>
      )}
    </div>
  );
}
