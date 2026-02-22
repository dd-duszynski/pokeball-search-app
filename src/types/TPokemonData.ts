import type { TPokemonAbility } from "./TPokemonAbility";
import type { TPokemonStat } from "./TPokemonStat";
import type { TPokemonType } from "./TPokemonType";

export type TPokemonData = {
  abilities: TPokemonAbility[];
  base_experience: number | null;
  height: number;
  id: number;
  stats: TPokemonStat[];
  types: TPokemonType[];
  weight: number;
};
