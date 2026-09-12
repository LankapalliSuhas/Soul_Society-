import logo from "../assets/netra-logo.png";

export default function Cover({ onEnter }) {
  return (
    <div className="min-h-screen bg-forest relative overflow-hidden flex items-center px-11">
      {/* soft glow backdrop */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #2C4530 0%, transparent 65%)" }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10 text-center">
        {/* Logo + clickable name — this IS the entry point into the app */}
        <button
          onClick={onEnter}
          className="group inline-flex flex-col items-center gap-3 mb-10 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <img
            src={logo}
            alt="NETRA logo"
            className="w-28 h-28 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          />
          <span className="font-display font-extrabold text-gold text-[40px] tracking-wide leading-none group-hover:text-oat transition-colors">
            NETRA
          </span>
          <span className="text-[11.5px] uppercase tracking-[0.2em] text-oat/60">
            Tap to enter
          </span>
        </button>

        <h1 className="font-display font-extrabold text-oat text-[38px] leading-[1.15] mb-5 max-w-[640px] mx-auto">
          See your store, the moment it changes.
        </h1>

        <p className="text-oat/70 text-[15px] leading-relaxed max-w-[440px] mx-auto mb-9">
          Occupancy, checkout queues, and stock levels — tracked live from
          camera and sensor data. No manual counts, no waiting for reports.
        </p>

        <button
          onClick={onEnter}
          className="inline-flex items-center gap-2 bg-gold text-forestDeep font-bold text-sm px-7 py-3.5 rounded-lg shadow-hero hover:bg-oat transition-colors"
        >
          Enter Command Center
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* live stat badges, echoing the "45% off" corner badge feel — but real data */}
        <div className="flex justify-center gap-3 flex-wrap mt-12">
          {[
            { label: "Lanes live", value: "3" },
            { label: "People in store", value: "128" },
            { label: "SKUs low", value: "4" },
          ].map((s) => (
            <div key={s.label} className="bg-forestDeep border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2">
              <span className="font-display font-bold text-gold text-base">{s.value}</span>
              <span className="text-[11.5px] text-oat/60">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-oat/40 mt-10">
          Built for SIH · NITW · Soul_Society
        </div>
      </div>
    </div>
  );
}
