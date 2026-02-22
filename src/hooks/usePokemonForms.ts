import type { TPokemonFormEntry, TPokemonResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

function extractId(url: string): number | null {
  const match = /\/(\d+)\/?$/.exec(url);
  return match ? parseInt(match[1], 10) : null;
}

const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL;
const SPRITES_URL = import.meta.env.VITE_POKEAPI_SPRITES_URL;

async function fetchPokemonForms(): Promise<TPokemonResult[]> {
  const res = await fetch(`${BASE_URL}/pokemon-form?limit=100000`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: { results: TPokemonFormEntry[] } = await res.json();
  return data.results.reduce<TPokemonResult[]>((acc, entry) => {
    const id = extractId(entry.url);
    if (id !== null) {
      acc.push({
        id,
        name: entry.name,
        spriteUrl: `${SPRITES_URL}/${id}.png`,
      });
    }
    return acc;
  }, []);
}

export function usePokemonForms() {
  const { data, isLoading, error } = useQuery({
    gcTime: Infinity,
    queryKey: ["pokemon-forms"],
    retry: 2,
    staleTime: Infinity,
    queryFn: fetchPokemonForms,
  });

  return {
    forms: data ?? [],
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Failed to load Pokémon data"
      : null,
  };
}
