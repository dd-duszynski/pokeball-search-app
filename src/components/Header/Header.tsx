import { usePokemonForms } from "@/hooks";
import styles from "./Header.module.css";

export function Header() {
  const { forms, loading, error } = usePokemonForms();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Pokeball Search App</h1>
      <p className={styles.subtitle}>
        {loading
          ? "Fetching Pokemon data…"
          : error
            ? "Could not load data."
            : `${forms.length.toLocaleString()} pokemons ready`}
      </p>
    </header>
  );
}
