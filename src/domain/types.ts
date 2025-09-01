
export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  currency: 'DKK' | 'EUR' | 'USD';
  stock: number;
  rating?: number;
  createdAt: string; // ISO
  imageUrl?: string;
  description?: string;
  material?: string[];
  color?: string[];
  size?: string;
  dimensions?: string;
  certifications?: string[];
};

export type SortKey = 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'nameAZ' | 'nameZA' | 'ratingDesc';

export type Filters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
};
