// Hero panel for Command Center — current occupancy plus a trend sparkline.

function Sparkline({ history = [] }) {
  if (history.length < 2) return null;
  const w = 300, h = 52, pad = 4;
  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = Math.max(1, max - min);
  const step = (w - pad * 2) / (history.length - 1);

  const points = history.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const line = points.map((p) => p.join(",")).join(" ");
  const area = `${pad},${h} ${line} ${w - pad},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-[52px] block">
      <polygon points={area} fill="#71866A" opacity="0.12" />
      <polyline points={line} fill="none" stroke="#405443" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function OccupancyCounter({ occupancy, history, delta }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border p-7 flex flex-col justify-center shadow-hero"
      style={{ background: "linear-gradient(135deg, #EFE9DC 0%, #DDE9D7 130%)" }}
    >
      <svg className="absolute right-[-18px] bottom-[-24px] w-[170px] h-[170px] opacity-[0.14]" viewBox="0 0 100 100" fill="none">
        <path d="M50 8C25 20 12 45 20 72c5 16 20 24 36 20 22-5 34-26 32-52C86 24 70 8 50 8Z" stroke="#405443" strokeWidth="1.4" />
        <path d="M50 8C40 34 38 60 50 92" stroke="#405443" strokeWidth="1.2" />
      </svg>
      <div className="relative z-10">
        <div className="text-[11.5px] uppercase tracking-wide text-leafDeep font-bold mb-2.5">
          Occupancy
        </div>
        <div className="font-display text-[38px] font-bold text-leafDeep">
          {occupancy ?? "—"} <small className="text-sm font-medium text-inkSoft ml-1.5">people inside</small>
        </div>
        <div className="my-3.5">
          <Sparkline history={history} />
        </div>
        <div className="text-[12.5px] font-semibold text-leafDeep">{delta}</div>
      </div>
    </div>
  );
}
