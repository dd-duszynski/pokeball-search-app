import { SpriteCard } from "@/components/SpriteCard/SpriteCard";
import type { TPokemonFormSprites } from "@/types";
import styles from "./PokemonSprites.module.css";

type PokemonSpritesProps = {
  sprites: TPokemonFormSprites;
};

export function PokemonSprites({ sprites }: PokemonSpritesProps) {
  const items = (
    [
      { src: sprites.front_default, label: "Front" },
      { src: sprites.back_default, label: "Back" },
      { src: sprites.front_shiny, label: "Shiny" },
      { src: sprites.back_shiny, label: "Shiny back" },
      { src: sprites.front_female, label: "Female" },
      { src: sprites.back_female, label: "Female back" },
    ] as { src: string | null; label: string }[]
  ).filter((s): s is { src: string; label: string } => s.src !== null);

  if (items.length === 0) return null;

  return (
    <section aria-label="Sprites">
      <h2 className={styles.sectionTitle}>Sprites</h2>
      <div className={styles.spritesGrid}>
        {items.map((s) => (
          <SpriteCard key={s.label} src={s.src} label={s.label} />
        ))}
      </div>
    </section>
  );
}
