import { applyFilters } from "../../domain/filtering";
import type { Product, Filters } from "../../domain/types";

const p = (over: Partial<Product>): Product => ({
  id: "x",
  name: "Sofa NORDEN",
  sku: "SOFA-001",
  category: "Sofa",
  price: 1000,
  currency: "DKK",
  stock: 5,
  createdAt: "2025-01-01",
  description: "god sofa",
  material: ["Stof"],
  color: ["Grå"],
  certifications: [],
  ...over,
});

const data: Product[] = [
  p({ id: "a", name: "Sofa NORDEN", category: "Sofa", price: 2000, stock: 5 }),
  p({
    id: "b",
    name: "Dyne BASIC",
    category: "Dyne",
    price: 199,
    stock: 0,
    description: "OEKO-TEX",
  }),
  p({
    id: "c",
    name: "Pude DREAM",
    category: "Pude",
    price: 129,
    stock: 34,
    material: ["Mikrofiber"],
  }),
];

describe("applyFilters", () => {
  it("kategori", () => {
    const out = applyFilters(data, { category: "Dyne" });
    expect(out.map((x) => x.id)).toEqual(["b"]);
  });

  it("pris interval", () => {
    const out = applyFilters(data, { minPrice: 150, maxPrice: 1000 });
    expect(out.map((x) => x.id)).toEqual(["b", "c"]);
  });

  it("kun på lager", () => {
    const out = applyFilters(data, { inStockOnly: true });
    expect(out.map((x) => x.id)).toEqual(["a", "c"]);
  });

  it("q søger i flere felter", () => {
    expect(applyFilters(data, { q: "BASIC" }).map((x) => x.id)).toEqual(["b"]);
    expect(applyFilters(data, { q: "mikrofiber" }).map((x) => x.id)).toEqual([
      "c",
    ]);
    expect(applyFilters(data, { q: "OEKO" }).map((x) => x.id)).toEqual(["b"]);
  });

  it("kombinerede filtre (AND)", () => {
    const f: Filters = { category: "Sofa", minPrice: 1500, inStockOnly: true };
    const out = applyFilters(data, f);
    expect(out.map((x) => x.id)).toEqual(["a"]);
  });
});
