import type { TPokemonAbility } from "@/types";
import styles from "./PokemonAbilities.module.css";

type PokemonAbilitiesProps = {
  abilities: TPokemonAbility[];
}

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  if (abilities.length === 0) return null;

  return (
    <section aria-label="Abilities">
      <h2 className={styles.sectionTitle}>Abilities</h2>
      <ul className={styles.abilitiesList}>
        {abilities
          .sort((a, b) => a.slot - b.slot)
          .map(({ ability, is_hidden }) => (
            <li key={ability.name} className={styles.abilityItem}>
              <span className={styles.abilityName}>
                {ability.name.replace(/-/g, " ")}
              </span>
              {is_hidden && (
                <span className={styles.hiddenBadge}>Hidden</span>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
