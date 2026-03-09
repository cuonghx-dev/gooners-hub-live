import { useQuery } from '@tanstack/react-query';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useViewerCount(enabled: boolean, intervalMs = 30000) {
  const { data } = useQuery({
    queryKey: ['viewerCount'],
    queryFn: () =>
      fetch(`${SERVER_URL}/live/viewers`)
        .then((r) => r.json())
        .then((d: { viewerCount: number }) => d.viewerCount),
    enabled,
    refetchInterval: enabled ? intervalMs : false,
    refetchOnWindowFocus: false,
  });

  return data ?? 0;
}
