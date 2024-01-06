import type { BaseModel, Term, TermObject } from './Term';

export interface Product extends BaseModel {
  name: string;
  sku: string;
  barcode: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
  stockTrackable: boolean;
  typeId?: string;
  categoryId?: string;
  unitId?: string;
  parentId?: string;
  thumbnail?: string;
  cost?: number;
  category?: Term;
  type?: Term;
  unit?: Term;
  tags?: TermObject[];
}

export interface ProductMeta extends BaseModel {
  key: string;
  value: string;
  productId: string;
}

export type ProductInput = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'category' | 'type' | 'unit'
>;

export type ProductMetaInput = Omit<
  ProductMeta,
  'id' | 'createdAt' | 'updatedAt'
>;
