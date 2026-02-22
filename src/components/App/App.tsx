import { usePokemonForms } from "@/hooks/usePokemonForms";
import styles from "./App.module.css";
import { PokemonSearch, Header } from "@/components";

export function App() {
  const { forms, loading, error } = usePokemonForms();

  return (
    <main className={styles.app}>
      <Header />
      <PokemonSearch forms={forms} loading={loading} error={error} />
    </main>
  );
}