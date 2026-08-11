import { create } from 'zustand';
import type { Product } from '../types';

interface CompareState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  addItem: (product) => set((state) => {
    if (state.items.length >= 4) {
      throw new Error('You can only compare up to 4 products');
    }
    if (!state.items.find(item => item.id === product.id)) {
      return { items: [...state.items, product] };
    }
    return state;
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCompare: () => set({ items: [] }),
  isInCompare: (id) => get().items.some(item => item.id === id),
}));
