import { useCallback, useEffect, useRef, useState } from "react";

// Generic hook around one of the functions exported by services/api.js.
// Handles loading / success / empty / error, and can optionally poll on
// an interval to approximate live-ish REST data.
//
//   const { data, loading, error, refresh } = useApi(getInventory, { pollMs: 8000 });

export function useApi(fetchFn, { pollMs } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchFn();
    if (!mounted.current) return;
    setData(data);
    setError(error);
    setLoading(false);
  }, [fetchFn]);

  useEffect(() => {
    mounted.current = true;
    load();

    let interval;
    if (pollMs) interval = setInterval(load, pollMs);

    return () => {
      mounted.current = false;
      if (interval) clearInterval(interval);
    };
  }, [load, pollMs]);

  const isEmpty = !loading && !error && (data == null || (Array.isArray(data) && data.length === 0));

  return { data, loading, error, isEmpty, refresh: load };
}
