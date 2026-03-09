import { useQuery } from '@tanstack/react-query';
import type { Match } from '@/types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL as string;

export function useMatches() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: () =>
      fetch(`${SERVER_URL}/football/matches`)
        .then((r) => {
          if (!r.ok) throw new Error(`API error: ${r.status}`);
          return r.json() as Promise<{ matches: Match[] }>;
        })
        .then((d) => d.matches),
  });

  return {
    matches: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}
