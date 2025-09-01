
import { Filters, Product } from './types';

export function applyFilters(list: Product[], f: Filters): Product[] {
  return list.filter(p => {
    if (f.inStockOnly && p.stock <= 0) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;

    if (f.q) {
      const q = f.q.toLowerCase();
      const hay = [
        p.name, p.sku, p.category, p.description ?? '',
        ...(p.material ?? []), ...(p.color ?? []), ...(p.certifications ?? [])
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
