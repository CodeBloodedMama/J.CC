
import { Product } from './types';

const allowedCategories = new Set([
  'Sofa','Dyne','Pude','Reol','Skab','Gardin','Seng','Bord','Kommode','Lænestol','Puf','Sengetøj','Other'
]);

export function makeProduct(raw: any): Product {
  const price = Math.max(0, Number(raw.price ?? 0));
  const stock = Math.max(0, Number(raw.stock ?? 0));
  const rating = clamp(Number(raw.rating ?? 0), 0, 5);
  const currency = (raw.currency ?? 'DKK') as Product['currency'];
  const createdAt = safeIso(raw.createdAt);
  const category = String(raw.category ?? 'Other');
  const normalizedCategory = allowedCategories.has(category) ? category : 'Other';
  const material = Array.isArray(raw.material) ? raw.material.map(String) : (raw.material ? [String(raw.material)] : []);
  const color = Array.isArray(raw.color) ? raw.color.map(String) : (raw.color ? [String(raw.color)] : []);
  const certifications = Array.isArray(raw.certifications) ? raw.certifications.map(String) : [];
  return {
    id: String(raw.id ?? cryptoRandomId()),
    name: String(raw.name ?? 'Ukendt produkt'),
    sku: String(raw.sku ?? ''),
    category: normalizedCategory,
    price,
    currency,
    stock,
    rating,
    createdAt,
    imageUrl: raw.imageUrl ? String(raw.imageUrl) : undefined,
    description: raw.description ? String(raw.description) : undefined,
    material,
    color,
    size: raw.size ? String(raw.size) : undefined,
    dimensions: raw.dimensions ? String(raw.dimensions) : undefined,
    certifications,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, isFinite(n) ? n : min));
}

function safeIso(v: any): string {
  const t = Date.parse(v);
  if (Number.isFinite(t)) return new Date(t).toISOString();
  return new Date().toISOString();
}

function cryptoRandomId(): string {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
