// Radial gauge + label for overall system health.

export default function SystemHealthBadge({ healthy, pct = 0, note }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-[11px] uppercase tracking-wide text-inkSoft font-semibold mb-2">
          System health
        </div>
        <div className="font-display text-2xl font-bold text-leafDeep">
          {healthy ? "Nominal" : "Degraded"}
        </div>
        <div className="text-[11.5px] text-inkSoft mt-1">{note}</div>
      </div>
      <div
        className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500"
        style={{
          background: `conic-gradient(#71866A ${pct}%, #E4E7DE 0)`,
        }}
      >
        <div className="w-[34px] h-[34px] rounded-full bg-linen flex items-center justify-center text-[9.5px] font-bold text-leafDeep">
          {pct}%
        </div>
      </div>
    </div>
  );
}
