// Vertical event timeline. Newest event first, with a distinct treatment
// for the just-arrived item and for malformed/unparseable events.

function formatTime(t) {
  const d = t instanceof Date ? t : new Date(t);
  return d.toTimeString().slice(0, 8);
}

export default function EventTimeline({ events = [], limit = 20 }) {
  const list = events.slice(0, limit);

  if (list.length === 0) {
    return <div className="text-sm text-inkSoft">No events yet.</div>;
  }

  return (
    <div className="relative pl-1.5">
      {list.map((e, idx) => {
        const isNew = idx === 0 && e.type !== "MALFORMED_EVENT";
        const isMalformed = e.type === "MALFORMED_EVENT";
        const dotColor = isMalformed ? "bg-amber" : isNew ? "bg-rose" : "bg-leaf";
        const typeColor = isMalformed ? "text-amber" : isNew ? "text-rose" : "text-leafDeep";

        return (
          <div key={idx} className="flex gap-3.5 py-2.5">
            <div className="flex flex-col items-center w-2.5">
              <span className={`w-2 h-2 rounded-full mt-1 ${dotColor}`} />
              {idx < list.length - 1 && <span className="flex-1 w-px bg-border mt-1" />}
            </div>
            <div className="flex-1 pb-0.5">
              <div className="text-[11px] text-inkSoft tabular-nums">{formatTime(e.time)}</div>
              <div className={`text-[12.5px] font-bold tracking-wide my-0.5 ${typeColor}`}>{e.type}</div>
              <div className="text-[12.5px] text-inkSoft">{e.detail}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
