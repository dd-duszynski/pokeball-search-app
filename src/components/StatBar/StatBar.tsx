import styles from "./StatBar.module.css";

const MAX_STAT = 150;
const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Spd",
};

const STAT_FULL_NAMES: Record<string, string> = {
  hp: "Hit Points",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
};

export function StatBar({ name, value }: { name: string; value: number }) {
  const pct = Math.min((value / MAX_STAT) * 100, 100);
  const color = value >= 100 ? "#4caf50" : value >= 60 ? "#ff9800" : "#e53935";

  return (
    <div className={styles.statRow}>
      <span
        className={styles.statName}
        data-tooltip={STAT_FULL_NAMES[name] ?? name}
      >
        {STAT_LABELS[name] ?? name}
      </span>
      <span className={styles.statValue}>{value}</span>
      <div className={styles.statBar}>
        <div
          className={styles.statFill}
          style={{ width: `${pct}%`, backgroundColor: color }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={MAX_STAT}
          aria-label={`${STAT_LABELS[name] ?? name}: ${value}`}
        />
      </div>
    </div>
  );
}
