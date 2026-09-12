// Lightweight ETA-by-lane bar chart. No external chart library — this is a
// small dashboard, a dozen SVG/DOM bars is plenty and keeps the bundle thin.

export default function QueueETAChart({ lanes = [] }) {
  const maxEta = Math.max(...lanes.map((l) => l.eta_min), 1);

  return (
    <div>
      {lanes.map((l) => (
        <div key={l.lane} className="flex items-center gap-2.5 mb-2.5">
          <div className="w-16 text-xs text-inkSoft flex-shrink-0">{l.lane}</div>
          <div className="flex-1 h-[9px] rounded-full bg-spring overflow-hidden">
            <div
              className="h-full rounded-full bg-leaf"
              style={{ width: `${(l.eta_min / maxEta) * 100}%` }}
            />
          </div>
          <div className="w-9 text-right text-xs text-inkSoft flex-shrink-0">{l.eta_min}m</div>
        </div>
      ))}
    </div>
  );
}
