// Shared inline state for loading / error / empty / reconnecting messages,
// so a single failed fetch never breaks the rest of the page.

const STYLES = {
  error: "bg-roseBg text-rose border-rose/30",
  warning: "bg-amberBg text-amber border-amber/30",
  info: "bg-linen2 text-inkSoft border-borderSoft",
  empty: "bg-linen2 text-inkSoft border-borderSoft",
};

export default function AlertBanner({ type = "info", message }) {
  if (!message) return null;
  return (
    <div className={`text-sm rounded-lg border px-4 py-3 ${STYLES[type] || STYLES.info}`}>
      {message}
    </div>
  );
}
