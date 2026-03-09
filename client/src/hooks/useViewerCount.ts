import { useEffect, useState } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useViewerCount(enabled: boolean, intervalMs = 30000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const check = () =>
      fetch(`${SERVER_URL}/live/viewers`)
        .then((r) => r.json())
        .then((d: { viewerCount: number }) => setCount(d.viewerCount))
        .catch(() => {});

    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs]);

  return count;
}
