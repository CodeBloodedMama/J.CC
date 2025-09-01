import { productSortStrategies } from "../../domain/sorting/productStrategies";
import type { Product } from "../../domain/types";
import { stableSort } from "../../domain/sorting/strategy";

const base = (over: Partial<Product>): Product => ({
  id: "id",
  name: "X",
  sku: "SKU",
  category: "Sofa",
  price: 0,
  currency: "DKK",
  stock: 0,
  createdAt: "2025-01-01",
  ...over,
});

const list: Product[] = [
  base({
    id: "a",
    name: "Item 2",
    price: 200,
    createdAt: "2025-01-02",
    rating: 4.2,
  }),
  base({
    id: "b",
    name: "Item 10",
    price: 100,
    createdAt: "2025-01-03",
    rating: 4.5,
  }),
  base({
    id: "c",
    name: "Æble",
    price: 100,
    createdAt: "2025-01-01",
    rating: 3.8,
  }),
];

describe("product sort strategies", () => {
  test("priceAsc", () => {
    const out = stableSort(list, productSortStrategies.priceAsc.compare);
    expect(out.map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  test("priceDesc", () => {
    const out = stableSort(list, productSortStrategies.priceDesc.compare);
    expect(out.map((p) => p.id)).toEqual(["a", "b", "c"]);
  });

  test("newest", () => {
    const out = stableSort(list, productSortStrategies.newest.compare);
    expect(out.map((p) => p.id)).toEqual(["b", "a", "c"]);
  });

  test("oldest", () => {
    const out = stableSort(list, productSortStrategies.oldest.compare);
    expect(out.map((p) => p.id)).toEqual(["c", "a", "b"]);
  });

  test("nameAZ (locale da + numeric)", () => {
    const out = stableSort(list, productSortStrategies.nameAZ.compare);
    expect(out.map((p) => p.name)).toEqual(["Item 2", "Item 10", "Æble"]);
  });

  test("ratingDesc (mangler rating ⇒ -1)", () => {
    const withMissing = [
      ...list,
      base({ id: "d", name: "NoRating", rating: undefined }),
    ];
    const out = stableSort(
      withMissing,
      productSortStrategies.ratingDesc.compare,
    );
    expect(out.map((p) => p.id)).toEqual(["b", "a", "c", "d"]);
  });
});
