import { PokemonCard } from "@/components";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import type { TPokemonResult } from "@/types";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./PokemonSearch.module.css";

type PokemonSearchProps = {
  forms: TPokemonResult[];
  loading: boolean;
  error: string | null;
};

export function PokemonSearch({ forms, loading, error }: PokemonSearchProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const uid = useId();
  const inputId = `${uid}-input`;
  const listboxId = `${uid}-listbox`;

  const results = usePokemonSearch(forms, query);
  const isExpanded = isOpen && results.length > 0;

  const activeOptionId =
    isExpanded && activeIndex >= 0 ? `${uid}-option-${activeIndex}` : undefined;

  // On mount: if the URL already has a query (user pressed Back), restore focus
  // so the listbox opens automatically via the onFocus handler.
  useEffect(() => {
    if ((searchParams.get("q") ?? "").length > 0) {
      inputRef.current?.focus();
    }
  }, []);

  // Scroll the highlighted item into view when navigating with keys.
  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const item = listboxRef.current.children[activeIndex] as
        | HTMLElement
        | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const acceptOption = useCallback(
    (result: TPokemonResult) => {
      setIsOpen(false);
      setActiveIndex(-1);
      navigate(`/pokemon/${result.id}`);
    },
    [navigate],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      setActiveIndex(-1);
      setIsOpen(true);
      setSearchParams(val ? { q: val } : {}, { replace: true });
    },
    [setSearchParams],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isExpanded) {
        if (e.key === "ArrowDown") {
          setIsOpen(true);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % results.length);
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
          break;

        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) acceptOption(results[activeIndex]);
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          break;

        case "Tab":
          // Let Tab move focus naturally; just close the listbox.
          setIsOpen(false);
          setActiveIndex(-1);
          break;

        default:
          break;
      }
    },
    [isExpanded, results, activeIndex, acceptOption],
  );

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        Search Pokemon
      </label>

      <div className={styles.combobox}>
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={isExpanded}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          type="search"
          autoComplete="off"
          spellCheck={false}
          className={styles.input}
          placeholder={loading ? "Loading…" : "e.g. bulbasaur"}
          disabled={loading || !!error}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setIsOpen(false);
            setActiveIndex(-1);
          }}
        />
        {loading && <span className={styles.spinner} aria-hidden="true" />}
      </div>

      {error && (
        <p role="alert" className={styles.error}>
          ⚠ {error}
        </p>
      )}

      <ul
        ref={listboxRef}
        role="listbox"
        id={listboxId}
        aria-label="Pokemon suggestions"
        className={`${styles.listbox} ${isExpanded ? styles.open : ""}`}
      >
        {isExpanded &&
          results.map((pokemon, i) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isActive={i === activeIndex}
              optionId={`${uid}-option-${i}`}
              onActivate={() => setActiveIndex(i)}
              onSelect={() => acceptOption(pokemon)}
            />
          ))}
      </ul>
    </div>
  );
}
