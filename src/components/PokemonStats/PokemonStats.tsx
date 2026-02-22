import { StatBar } from "@/components/StatBar/StatBar";
import type { TPokemonStat } from "@/types";
import styles from "./PokemonStats.module.css";

type PokemonStatsProps = {
  stats: TPokemonStat[];
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="Base stats">
      <h2 className={styles.sectionTitle}>Base stats</h2>
      <div className={styles.statsList}>
        {stats.map(({ stat, base_stat }) => (
          <StatBar key={stat.name} name={stat.name} value={base_stat} />
        ))}
      </div>
    </section>
  );
}
