// A single queue lane. Only renders fields it's actually given — no
// frontend-side calculation of burden, ETA, or status.

const STATUS_BADGE = {
  critical: "bg-roseBg text-rose",
  busy: "bg-amberBg text-amber",
  clear: "bg-okBg text-ok",
};

export default function LaneCard({ lane }) {
  const { lane: id, people_count, eta_min, burden, status } = lane;
  const isAttention = status === "critical";

  return (
    <div
      className={`relative rounded-lg border p-5 shadow-soft ${
        isAttention ? "border-rose/60 bg-roseBg" : "border-border bg-linen"
      }`}
    >
      {isAttention && (
        <div className="absolute top-4 right-5 text-[10.5px] font-bold uppercase tracking-wide text-rose">
          Attention
        </div>
      )}

      <div className="flex justify-between items-start mb-3.5">
        <div className="font-display font-bold text-sm text-leafDeep">
          LANE {String(id).replace("L", "")}
        </div>
        <span className={`inline-flex items-center text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_BADGE[status] || STATUS_BADGE.clear}`}>
          {status}
        </span>
      </div>

      <div className="font-display text-[26px] font-bold mb-3.5">
        {people_count} <small className="text-xs font-medium text-inkSoft">people</small>
      </div>

      {burden != null && (
        <div className="mb-2.5">
          <div className="text-[10.5px] uppercase tracking-wide text-inkSoft mb-1.5">Item burden</div>
          <div className="h-1.5 rounded-full bg-spring overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(burden * 100)}%`,
                background: isAttention ? "#A76B62" : status === "busy" ? "#B78B55" : "#71866A",
              }}
            />
          </div>
        </div>
      )}

      <div>
        <div className="text-[10.5px] uppercase tracking-wide text-inkSoft mb-1.5">ETA</div>
        <div className="text-[15px] font-bold">{eta_min} min</div>
      </div>
    </div>
  );
}
