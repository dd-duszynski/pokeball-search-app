import type { TPokemonResult } from "@/types";
import { useMemo } from "react";

export function usePokemonSearch(
  forms: TPokemonResult[],
  query: string,
): TPokemonResult[] {
  return useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q.length === 0) return [];
    return forms.filter((f) => f.name.startsWith(q)).slice(0, 5);
  }, [forms, query]);
}
