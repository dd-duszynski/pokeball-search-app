import type {
  TPokemonData,
  TPokemonDetailData,
  TPokemonFormDetail,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL;

async function fetchPokemonDetail(id: number): Promise<TPokemonDetailData> {
  const formRes = await fetch(`${BASE_URL}/pokemon-form/${id}/`);
  if (!formRes.ok) throw new Error(`HTTP ${formRes.status}`);
  const form: TPokemonFormDetail = await formRes.json();

  const pokemonRes = await fetch(form.pokemon.url);
  if (!pokemonRes.ok) throw new Error(`HTTP ${pokemonRes.status}`);
  const pokemon: TPokemonData = await pokemonRes.json();

  return { form, pokemon };
}

export function usePokemonDetail(id: number) {
  const { data, isLoading, error } = useQuery({
    enabled: !!id && !isNaN(id),
    queryKey: ["pokemon-detail", id],
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: () => fetchPokemonDetail(id),
  });

  return {
    data: data ?? null,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Failed to load Pokémon details"
      : null,
  };
}
