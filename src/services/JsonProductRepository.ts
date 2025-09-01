
import { Product } from '../domain/types';
import { ProductRepository } from './ProductRepository';
import { makeProduct } from '../domain/factory';

const LS_KEY = 'products_overrides_v1';

function loadOverrides(): Record<string, Product> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '{}'); } catch { return {}; }
}
function saveOverrides(map: Record<string, Product>) {
  localStorage.setItem(LS_KEY, JSON.stringify(map));
}

export const JsonProductRepository: ProductRepository = {
  async list(): Promise<Product[]> {
    const res = await fetch('/products.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Kunne ikke hente products.json');
    const raw = await res.json();
    const base: Product[] = Array.isArray(raw) ? raw.map(makeProduct) : [];
    const overrides = Object.values(loadOverrides());
    const map = new Map(overrides.map(p => [p.id, p]));
    return base.map(p => map.get(p.id) ?? p);
  },
  async get(id: string): Promise<Product | undefined> {
    const list = await this.list();
    return list.find(p => p.id === id);
  },
  async create(p: Product): Promise<void> {
    const map = loadOverrides();
    map[p.id] = p;
    saveOverrides(map);
  },
  async update(id: string, patch: Partial<Product>): Promise<void> {
    const existing = await this.get(id);
    if (!existing) throw new Error('Produkt ikke fundet');
    const map = loadOverrides();
    map[id] = { ...existing, ...patch };
    saveOverrides(map);
  },
  async delete(id: string): Promise<void> {
    const map = loadOverrides();
    delete map[id];
    saveOverrides(map);
  }
};
