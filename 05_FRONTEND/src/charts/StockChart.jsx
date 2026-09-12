// Stock-levels-vs-par bar chart, color matches each item's status.

const COLOR = { critical: "#A76B62", low: "#B78B55", ok: "#71866A" };

export default function StockChart({ items = [] }) {
  return (
    <div>
      {items.map((item) => {
        const pct = item.par ? Math.min(100, (item.stock / item.par) * 100) : 0;
        return (
          <div key={item.sku} className="flex items-center gap-2.5 mb-2.5">
            <div className="w-16 text-xs text-inkSoft flex-shrink-0">{item.sku}</div>
            <div className="flex-1 h-[9px] rounded-full bg-spring overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: COLOR[item.status] || COLOR.ok }}
              />
            </div>
            <div className="w-9 text-right text-xs text-inkSoft flex-shrink-0">{item.stock}</div>
          </div>
        );
      })}
    </div>
  );
}
