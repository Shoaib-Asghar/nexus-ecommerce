import { create } from 'zustand';
import type { Product } from '../types';
import { mockProducts } from '../data/products';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: mockProducts,
  addProduct: (product) => set((state) => ({
    products: [product, ...state.products]
  })),
  updateProduct: (id, updatedFields) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
}));
