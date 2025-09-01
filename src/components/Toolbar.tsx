import React, { useState, useEffect } from "react";
import { Filters, SortKey } from "../domain/types";
import "./Toolbar.css";

// probs modtager kateforier , nuværende filtre,
// setFilters funktion til at opdatere filtre, nuværende sorteringsnøgle og
// setSortKey funktion til at opdatere sorteringsnøgle
type Props = {
  categories: string[];
  filters: Filters;
  setFilters: (f: Filters) => void;
  sortKey: SortKey;
  setSortKey: (k: SortKey) => void;
};

export default function Toolbar({
  categories,
  filters,
  setFilters,
  sortKey,
  setSortKey,
}: Props) {
  const [q, setQ] = useState(filters.q ?? "");
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? "");

  // Automatisk filtrering ved ændring af søgefelter
  useEffect(() => {
    const h = setTimeout(() => {
      setFilters({
        ...filters,
        q: q || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
    }, 250);
    return () => clearTimeout(h);
  }, [q, minPrice, maxPrice]);

  // Søg-knap til manuel filtrering
  const handleSearch = () => {
    setFilters({
      ...filters,
      q: q || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <div className="toolbar">
      <div className="toolbar__row">
        <input
          className="toolbar__input"
          type="search"
          placeholder="Søg produkter…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Søg"
        />
        <select
          className="toolbar__select"
          value={filters.category ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value || undefined })
          }
          aria-label="Kategori"
        >
          <option value="">Alle kategorier</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label className="toolbar__checkbox">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) =>
              setFilters({ ...filters, inStockOnly: e.target.checked })
            }
          />
          Kun på lager
        </label>
        <div className="toolbar__price">
          <input
            className="toolbar__input toolbar__price-input"
            type="number"
            inputMode="numeric"
            placeholder="Min pris"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            aria-label="Min pris"
          />
          <span className="toolbar__dash">—</span>
          <input
            className="toolbar__input toolbar__price-input"
            type="number"
            inputMode="numeric"
            placeholder="Max pris"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Max pris"
          />
        </div>
        <select
          className="toolbar__select"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          aria-label="Sortering"
        >
          <option value="priceAsc">Pris (lav → høj)</option>
          <option value="priceDesc">Pris (høj → lav)</option>
          <option value="newest">Nyeste</option>
          <option value="oldest">Ældste</option>
          <option value="nameAZ">Navn (A → Å)</option>
          <option value="nameZA">Navn (Å → A)</option>
          <option value="ratingDesc">Rating (høj → lav)</option>
        </select>
        <button
          className="toolbar__search"
          onClick={handleSearch}
          style={{
            padding: ".5rem .75rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--bg-accent)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Søg
        </button>
        <button
          className="toolbar__reset"
          onClick={() => {
            setQ("");
            setMinPrice("");
            setMaxPrice("");
            setFilters({});
          }}
        >
          Ryd filtre
        </button>
      </div>
    </div>
  );
}
