import { useApi } from "../hooks/useApi";
import { getInventory } from "../services/api";
import StockTable from "../components/StockTable";
import StockChart from "../charts/StockChart";
import AlertBanner from "../components/AlertBanner";

export default function Inventory() {
  const { data, loading, error, isEmpty } = useApi(getInventory, { pollMs: 8000 });
  const items = data || [];

  const low = items.filter((i) => i.status === "low").length;
  const critical = items.filter((i) => i.status === "critical").length;
  const avgConfidence = items.length
    ? Math.round((items.reduce((a, i) => a + (i.confidence || 0), 0) / items.length) * 100)
    : null;

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-2.5 mb-7">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight">Inventory</h1>
          <div className="text-sm text-inkSoft mt-1">Stock visibility across monitored items</div>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-linen border border-border rounded-full px-3 py-1.5 text-xs text-inkSoft shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
          {loading ? "Loading…" : `${items.length} SKUs tracked`}
        </div>
      </div>

      {error && <AlertBanner type="error" message="Unable to load inventory" />}
      {isEmpty && <AlertBanner type="empty" message="No inventory records available" />}

      {!isEmpty && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="bg-linen border border-border rounded-lg px-5 py-4 shadow-soft">
              <div className="text-[11.5px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Total records</div>
              <div className="font-display text-2xl font-semibold text-leafDeep">{items.length}</div>
            </div>
            <div className="bg-linen border border-border rounded-lg px-5 py-4 shadow-soft">
              <div className="text-[11.5px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Low stock</div>
              <div className="font-display text-2xl font-semibold text-leafDeep">{low}</div>
            </div>
            <div className="bg-linen border border-border rounded-lg px-5 py-4 shadow-soft">
              <div className="text-[11.5px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Critical</div>
              <div className="font-display text-2xl font-semibold text-leafDeep">{critical}</div>
            </div>
            <div className="bg-linen border border-border rounded-lg px-5 py-4 shadow-soft">
              <div className="text-[11.5px] uppercase tracking-wide text-inkSoft font-semibold mb-2">Avg. confidence</div>
              <div className="font-display text-2xl font-semibold text-leafDeep">
                {avgConfidence != null ? `${avgConfidence}%` : "—"}
              </div>
            </div>
          </div>

          <div className="panel mb-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Stock table</h2>
              <span className="text-xs text-inkSoft">sorted by urgency</span>
            </div>
            <StockTable items={items} />
          </div>

          <div className="panel">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Stock levels</h2>
              <span className="text-xs text-inkSoft">units remaining vs. par</span>
            </div>
            <StockChart items={items} />
          </div>
        </>
      )}
    </div>
  );
}
