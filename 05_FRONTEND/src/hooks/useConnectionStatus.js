import { useEffect, useRef, useState } from "react";
import { connectLiveEvents } from "../websocket/liveEvents";

// Owns one WebSocket connection and exposes:
//   status  — "connected" | "reconnecting" | "disconnected"
//   events  — bounded list of received events, newest first
//
// Command Center and Live Events each call this hook independently; for a
// project this size a shared/global connection isn't worth the extra
// abstraction, so each page opens (and cleans up) its own socket.

export function useConnectionStatus({ maxEvents = 40 } = {}) {
  const [status, setStatus] = useState("connecting");
  const [events, setEvents] = useState([]);
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current = connectLiveEvents({
      onStatusChange: setStatus,
      onEvent: (event) => {
        setEvents((prev) => [event, ...prev].slice(0, maxEvents));
      },
    });

    return () => controllerRef.current?.disconnect();
  }, [maxEvents]);

  return { status, events };
}
