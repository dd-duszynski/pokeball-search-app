import type { TPokemonFormSprites } from "./TPokemonFormSprites";

export type TPokemonFormDetail = {
  form_name: string;
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  order: number;
  pokemon: { name: string; url: string };
  sprites: TPokemonFormSprites;
};
