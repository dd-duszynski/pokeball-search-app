import {
  Layout,
  PokemonAbilities,
  PokemonHeader,
  PokemonPhysical,
  PokemonSprites,
  PokemonStats,
} from "@/components";
import { usePokemonDetail } from "@/hooks";
import { useParams } from "react-router-dom";
import styles from "./PokemonDetailPage.module.css";

export function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const { data, loading, error } = usePokemonDetail(numId);

  if (loading) {
    return (
      <Layout>
        <p className={styles.statusMsg}>Loading…</p>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <p className={styles.statusMsg}>Pokemon not found</p>
      </Layout>
    );
  }

  const { form, pokemon } = data;

  return (
    <Layout>
      <section className={styles.card}>
        <PokemonHeader name={form.name} id={form.id} types={pokemon.types} />
        <PokemonSprites sprites={form.sprites} />
        <PokemonStats stats={pokemon.stats} />
        <PokemonPhysical
          height={pokemon.height}
          weight={pokemon.weight}
          baseExperience={pokemon.base_experience}
        />
        <PokemonAbilities abilities={pokemon.abilities} />
      </section>
    </Layout>
  );
}
