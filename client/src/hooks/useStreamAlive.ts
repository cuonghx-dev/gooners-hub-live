import { useQuery } from '@tanstack/react-query';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useStreamAlive() {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['streamAlive'],
    queryFn: () =>
      fetch(`${SERVER_URL}/live/stream`)
        .then((r) => r.json())
        .then((d: { streamAlive: boolean }) => d.streamAlive),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return { alive: data ?? null, refresh: refetch, loading: isFetching };
}
