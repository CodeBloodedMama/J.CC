
import { Product } from '../domain/types';

export interface ProductQuery {
  list(): Promise<Product[]>;
  get(id: string): Promise<Product | undefined>;
}

export interface ProductCommand {
  create(p: Product): Promise<void>;
  update(id: string, patch: Partial<Product>): Promise<void>;
  delete(id: string): Promise<void>;
}

export type ProductRepository = ProductQuery & ProductCommand;
