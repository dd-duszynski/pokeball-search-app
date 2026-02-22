import type { TPokemonType } from "@/types";
import styles from "./PokemonHeader.module.css";

type PokemonHeaderProps = {
  id: number;
  name: string;
  types: TPokemonType[];
};

const TYPE_COLORS: Record<string, string> = {
  bug: "#A8B820",
  dark: "#705848",
  dragon: "#7038F8",
  electric: "#F8D030",
  fairy: "#EE99AC",
  fighting: "#C03028",
  fire: "#F08030",
  flying: "#A890F0",
  ghost: "#705898",
  grass: "#78C850",
  ground: "#E0C068",
  ice: "#98D8D8",
  normal: "#A8A878",
  poison: "#A040A0",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  water: "#6890F0",
};

export function PokemonHeader({ name, id, types }: PokemonHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{name}</h1>
      <span className={styles.idBadge}>#{String(id).padStart(4, "0")}</span>
      <div className={styles.types} aria-label="Types">
        {types.map(({ type }) => (
          <span
            key={type.name}
            className={styles.typeChip}
            style={{ backgroundColor: TYPE_COLORS[type.name] ?? "#888" }}
          >
            {type.name}
          </span>
        ))}
      </div>
    </header>
  );
}
