import { useQuery } from '@tanstack/react-query';
import type { StandingRow } from '@/types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useStandings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['standings'],
    queryFn: () =>
      fetch(`${SERVER_URL}/football/standings`)
        .then((r) => {
          if (!r.ok) throw new Error(`API error: ${r.status}`);
          return r.json() as Promise<{
            standings: { type: string; table: StandingRow[] }[];
          }>;
        })
        .then((d) => {
          const total = d.standings.find((s) => s.type === 'TOTAL');
          return total?.table ?? [];
        }),
  });

  return {
    table: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}
