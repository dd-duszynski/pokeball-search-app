import type { TPokemonResult } from "@/types";
import { useState } from "react";
import styles from "./PokemonCard.module.css";

// Inline SVG placeholder shown when the sprite URL 404s.
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23e0e0e0' rx='8'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23aaa'%3E%3F%3C/text%3E%3C/svg%3E";

type PokemonCardProps = {
  isActive: boolean;
  optionId: string;
  pokemon: TPokemonResult;
  onActivate: () => void;
  onSelect: () => void;
};

export function PokemonCard({
  isActive,
  optionId,
  pokemon,
  onActivate,
  onSelect,
}: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);
  return (
    <li
      aria-selected={isActive}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      id={optionId}
      role="option"
      onClick={onSelect}
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={onActivate}
    >
      <img
        alt={pokemon.name}
        className={styles.sprite}
        height={96}
        loading="lazy"
        src={imgError ? PLACEHOLDER : pokemon.spriteUrl}
        width={96}
        onError={() => setImgError(true)}
      />
      <span className={styles.name}>{pokemon.name}</span>
    </li>
  );
}
