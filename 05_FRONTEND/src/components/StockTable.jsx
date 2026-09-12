// Inventory table. Only displays fields actually present on each item.

const STATUS_BADGE = {
  critical: "bg-roseBg text-rose",
  low: "bg-amberBg text-amber",
  ok: "bg-okBg text-ok",
};

const ROW_TINT = {
  critical: "bg-rose/[0.07]",
  low: "bg-amber/[0.08]",
};

export default function StockTable({ items = [] }) {
  const sorted = [...items].sort(
    (a, b) => (a.status === "critical" ? -1 : 1) - (b.status === "critical" ? -1 : 1)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {["SKU", "Product", "Stock", "Status", "Confidence"].map((h) => (
              <th
                key={h}
                className="text-left text-[11px] uppercase tracking-wide text-inkSoft font-semibold pb-2.5 border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((item) => (
            <tr key={item.sku} className={`border-b border-borderSoft last:border-none ${ROW_TINT[item.status] || ""}`}>
              <td className="py-3 font-semibold">{item.sku}</td>
              <td className="py-3">{item.name}</td>
              <td className="py-3">
                {item.stock}
                {item.par != null ? ` / ${item.par}` : ""}
              </td>
              <td className="py-3">
                <span className={`inline-flex items-center text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_BADGE[item.status] || STATUS_BADGE.ok}`}>
                  {item.status}
                </span>
              </td>
              <td className="py-3">
                {item.confidence != null && (
                  <>
                    <span className="inline-block align-middle w-[70px] h-[5px] rounded-full bg-spring overflow-hidden mr-2">
                      <span
                        className="block h-full bg-leaf"
                        style={{ width: `${Math.round(item.confidence * 100)}%` }}
                      />
                    </span>
                    {Math.round(item.confidence * 100)}%
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
