import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProductId: string | null;
  toggleMobileMenu: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  quickViewProductId: null,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openQuickView: (id) => set({ quickViewProductId: id }),
  closeQuickView: () => set({ quickViewProductId: null }),
}));
