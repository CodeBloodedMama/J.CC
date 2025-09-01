import { useEffect, useMemo, useState } from "react";
import { Product, Filters, SortKey } from "../domain/types";
import { applyFilters } from "../domain/filtering";
import { stableSort } from "../domain/sorting/strategy";
import { productSortStrategies } from "../domain/sorting/productStrategies";
import { JsonProductRepository } from "../services/JsonProductRepository";

export type State =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "ready"; products: Product[] };

export function useProducts() {
  const [all, setAll] = useState<Product[]>([]);
  const [state, setState] = useState<State>({ type: "loading" });
  const [filters, setFilters] = useState<Filters>({});
  const [sortKey, setSortKey] = useState<SortKey>("priceAsc");

  useEffect(() => {
    (async () => {
      try {
        setState({ type: "loading" });
        const list = await JsonProductRepository.list();
        setAll(list);
        setState({ type: "ready", products: list });
      } catch (e: any) {
        setState({ type: "error", message: e?.message ?? "Ukendt fejl" });
      }
    })();
  }, []);

  const categories = useMemo(
    () =>
      Array.from(new Set(all.map((p) => p.category))).sort((a, b) =>
        a.localeCompare(b, "da"),
      ),
    [all],
  );

  const view = useMemo(() => {
    const f = applyFilters(all, filters);
    const strategy = productSortStrategies[sortKey];
    return stableSort(f, strategy.compare);
  }, [all, filters, sortKey]);

  return {
    state,
    products: view,
    categories,
    filters,
    setFilters,
    sortKey,
    setSortKey,
    repo: JsonProductRepository,
  };
}
