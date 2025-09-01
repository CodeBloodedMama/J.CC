import { Product } from "../types";
import { SortStrategy } from "./strategy";

// 3 sorterings hjælpe funktioner til sortering af produkter
//compareNum sammenligner to tal. Default returneres -1 hvis a < b, 1 hvis a > b og 0 hvis de er ens
const cmpNum = (a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1);

// compateDateISO sammenligner ISO date strings ved at parse dem til timestanps
// og sammenligne disse som tal
const cmpDateISO = (a: string, b: string) =>
  cmpNum(Date.parse(a), Date.parse(b));

// cmpText sammenligner to tekst strings ved at bruge localeCompare, som tager højde for danske bogstaver
// og numeriske værdier i teksten (f.eks. "Produkt 2" kommer før "Produkt 10")
const cmpText = (a: string, b: string) =>
  a.localeCompare(b, "da", { numeric: true, sensitivity: "base" });

export const productSortStrategies: Record<string, SortStrategy<Product>> = {
  priceAsc: {
    id: "priceAsc",
    label: "Pris (lav → høj)",
    compare: (a, b) => cmpNum(a.price, b.price),
  },
  priceDesc: {
    id: "priceDesc",
    label: "Pris (høj → lav)",
    compare: (a, b) => cmpNum(b.price, a.price),
  },
  newest: {
    id: "newest",
    label: "Nyeste",
    compare: (a, b) => cmpDateISO(b.createdAt, a.createdAt),
  },
  oldest: {
    id: "oldest",
    label: "Ældste",
    compare: (a, b) => cmpDateISO(a.createdAt, b.createdAt),
  },
  nameAZ: {
    id: "nameAZ",
    label: "Navn (A → Å)",
    compare: (a, b) => cmpText(a.name, b.name),
  },
  nameZA: {
    id: "nameZA",
    label: "Navn (Å → A)",
    compare: (a, b) => cmpText(b.name, a.name),
  },
  ratingDesc: {
    id: "ratingDesc",
    label: "Rating (høj → lav)",
    compare: (a, b) => cmpNum(b.rating ?? -1, a.rating ?? -1),
  },
};
