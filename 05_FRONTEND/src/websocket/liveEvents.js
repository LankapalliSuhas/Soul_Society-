// ============================================================================
// WebSocket connection for the Live Events feed.
//
// Event type names below (QUEUE_UPDATE, INVENTORY_UPDATE, ENTRY, EXIT,
// STOCK_LOW) are PLACEHOLDERS pending 06_DATA/schemas/event_schema.json.
// Do not treat them as final — rename here, once, when the real schema
// arrives, rather than scattering assumptions across components.
//
// connectLiveEvents({ onEvent, onStatusChange }) returns a controller with
// a disconnect() method. Handles: connect, parse, malformed messages,
// disconnect, error, and reconnect-with-backoff.
// ============================================================================

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || import.meta.env.VITE_USE_MOCK === undefined;

const MOCK_EVENT_TYPES = [
  { type: "QUEUE_UPDATE", detail: () => `Lane ${pick(["L01", "L02", "L03"])} → people count updated` },
  { type: "INVENTORY_UPDATE", detail: () => `${pick(["SKU-1042", "SKU-4471", "SKU-2210"])} → stock recalculated` },
  { type: "ENTRY", detail: () => "Entrance camera → occupancy +1" },
  { type: "EXIT", detail: () => "Entrance camera → occupancy -1" },
  { type: "STOCK_LOW", detail: () => `${pick(["SKU-1042", "SKU-4471"])} → below reorder threshold` },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function connectLiveEvents({ onEvent, onStatusChange } = {}) {
  if (USE_MOCK) return connectMock({ onEvent, onStatusChange });
  return connectReal({ onEvent, onStatusChange });
}

// ---------------------------------------------------------------------------
// Mock connection — simulates events + occasional reconnect/malformed cases
// so the UI's failure states are exercised without a real backend.
// ---------------------------------------------------------------------------

function connectMock({ onEvent, onStatusChange }) {
  let alive = true;
  onStatusChange?.("connected");

  const tick = setInterval(() => {
    if (!alive) return;

    if (Math.random() < 0.05) {
      onStatusChange?.("reconnecting");
      setTimeout(() => alive && onStatusChange?.("connected"), 1500);
      return;
    }

    if (Math.random() < 0.05) {
      onEvent?.({ type: "MALFORMED_EVENT", detail: "Unable to read incoming event", time: new Date() });
      return;
    }

    const et = pick(MOCK_EVENT_TYPES);
    onEvent?.({ type: et.type, detail: et.detail(), time: new Date() });
  }, 2200);

  return {
    disconnect() {
      alive = false;
      clearInterval(tick);
      onStatusChange?.("disconnected");
    },
  };
}

// ---------------------------------------------------------------------------
// Real WebSocket connection with reconnect-with-backoff.
// ---------------------------------------------------------------------------

function connectReal({ onEvent, onStatusChange }) {
  let socket = null;
  let closedByClient = false;
  let attempt = 0;

  function open() {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      attempt = 0;
      onStatusChange?.("connected");
    };

    socket.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        onEvent?.({ ...parsed, time: new Date() });
      } catch (err) {
        onEvent?.({ type: "MALFORMED_EVENT", detail: "Unable to read incoming event", time: new Date() });
      }
    };

    socket.onerror = () => {
      onStatusChange?.("reconnecting");
    };

    socket.onclose = () => {
      if (closedByClient) {
        onStatusChange?.("disconnected");
        return;
      }
      onStatusChange?.("reconnecting");
      attempt += 1;
      const delay = Math.min(1000 * 2 ** attempt, 15000);
      setTimeout(open, delay);
    };
  }

  open();

  return {
    disconnect() {
      closedByClient = true;
      socket?.close();
    },
  };
}
