import styles from "./PokemonPhysical.module.css";

type PokemonPhysicalProps = {
  height: number;
  weight: number;
  baseExperience: number | null;
};

export function PokemonPhysical({
  height,
  weight,
  baseExperience,
}: PokemonPhysicalProps) {
  return (
    <section aria-label="Physical attributes">
      <h2 className={styles.sectionTitle}>Physical</h2>
      <div className={styles.physicalGrid}>
        <div className={styles.physicalItem}>
          <span className={styles.physicalLabel}>Height</span>
          <span className={styles.physicalValue}>
            {(height / 10).toFixed(1)} m
          </span>
        </div>
        <div className={styles.physicalItem}>
          <span className={styles.physicalLabel}>Weight</span>
          <span className={styles.physicalValue}>
            {(weight / 10).toFixed(1)} kg
          </span>
        </div>
        {baseExperience !== null && (
          <div className={styles.physicalItem}>
            <span className={styles.physicalLabel}>Base XP</span>
            <span className={styles.physicalValue}>{baseExperience}</span>
          </div>
        )}
      </div>
    </section>
  );
}
