import { useState } from "react";
import CommandCenter from "./pages/CommandCenter";
import Inventory from "./pages/Inventory";
import Queue from "./pages/Queue";
import LiveEvents from "./pages/LiveEvents";

const NAV_ITEMS = [
  { key: "command", label: "Command Center", Page: CommandCenter },
  { key: "inventory", label: "Inventory", Page: Inventory },
  { key: "queue", label: "Queue", Page: Queue },
  { key: "events", label: "Live Events", Page: LiveEvents },
];

const ICONS = {
  command: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  inventory: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  queue: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c.5-3.5 2.6-5.5 5-5.5s4.5 2 5 5.5M13 20c.4-3 2.1-5 4.5-5s3.9 1.7 4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M12 3v9l6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function App() {
  const [active, setActive] = useState("command");
  const ActivePage = NAV_ITEMS.find((n) => n.key === active).Page;

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-3.5 right-4 bg-leafDeep text-oat text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full z-50 shadow-hero">
        UI PREVIEW · MOCK DATA
      </div>

      <aside className="w-[216px] flex-shrink-0 bg-linen border-r border-border p-7 flex flex-col gap-9 relative overflow-hidden md:flex-col">
        <div
          className="absolute right-[-40px] bottom-[-40px] w-[180px] h-[180px] opacity-60 pointer-events-none"
          style={{ background: "radial-gradient(circle, #DDE9D7 0%, transparent 70%)" }}
        />
        <div className="pl-1.5 relative z-10">
          <div className="w-[30px] h-[30px] rounded-[9px] bg-leafDeep flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M4 20V8l8-5 8 5v12" stroke="#F7F3EA" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 20v-6h6v6" stroke="#F7F3EA" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="font-display font-extrabold text-[19px] text-leafDeep">NETRA</div>
          <div className="text-xs text-inkSoft mt-0.5">Retail Intelligence</div>
        </div>

        <nav className="flex flex-col gap-1 relative z-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                active === item.key
                  ? "bg-spring text-leafDeep font-semibold"
                  : "text-inkSoft hover:bg-linen2 hover:text-ink"
              }`}
            >
              {active === item.key && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-sm bg-leafDeep" />
              )}
              {ICONS[item.key]}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto text-[11.5px] text-inkSoft pl-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-linen2 border border-borderSoft px-2.5 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" /> Simulated feed
          </div>
          <div>NITW · Soul_Society · SIH</div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-11 py-9 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <ActivePage />
        </div>
      </main>
    </div>
  );
}
