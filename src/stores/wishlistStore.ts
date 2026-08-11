import { create } from 'zustand';
import type { Product } from '../types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addItem: (product) => set((state) => {
    if (!state.items.find(item => item.id === product.id)) {
      return { items: [...state.items, product] };
    }
    return state;
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearWishlist: () => set({ items: [] }),
  isInWishlist: (id) => get().items.some(item => item.id === id),
}));
