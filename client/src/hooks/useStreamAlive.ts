import { useEffect, useState } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useStreamAlive() {
  const [alive, setAlive] = useState<boolean | null>(null);

  const check = () =>
    fetch(`${SERVER_URL}/live/stream`)
      .then((r) => r.json())
      .then((d: { streamAlive: boolean }) => setAlive(d.streamAlive))
      .catch(() => setAlive(null));

  useEffect(() => {
    check();
  }, []);

  return { alive, refresh: check };
}
