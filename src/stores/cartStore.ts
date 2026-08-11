import { create } from 'zustand';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string | null;
  addItem: (product: Product, quantity: number, variations: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  setShipping: (cost: number) => void;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[], shipping: number, discountValue: number, discountType: 'percentage' | 'fixed') => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
  
  let discount = 0;
  if (discountType === 'percentage') {
    discount = subtotal * (discountValue / 100);
  } else if (discountType === 'fixed') {
    discount = discountValue;
  }
  
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal - discount + tax + shipping;

  return { subtotal, tax, discount, total: total > 0 ? total : 0 };
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0, // default shipping, will be set in checkout
  discount: 0,
  total: 0,
  couponCode: null,

  addItem: (product, quantity, variations) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
      );

      let newItems = [...state.items];
      if (existingItemIndex > -1) {
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          product,
          quantity,
          selectedVariations: variations,
        });
      }

      // Re-calculate
      // Assuming existing coupon applies to new total, simplified for demo
      let discountValue = 0;
      let discountType: 'percentage' | 'fixed' = 'fixed';
      if (state.couponCode === 'WELCOME10') { discountValue = 10; discountType = 'percentage'; }
      if (state.couponCode === 'SAVE20') { discountValue = 20; discountType = 'fixed'; }
      if (state.couponCode === 'FREESHIP') { discountValue = 0; discountType = 'fixed'; }

      const totals = calculateTotals(newItems, state.couponCode === 'FREESHIP' ? 0 : state.shipping, discountValue, discountType);

      return { items: newItems, ...totals, shipping: state.couponCode === 'FREESHIP' ? 0 : state.shipping };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      let discountValue = 0;
      let discountType: 'percentage' | 'fixed' = 'fixed';
      if (state.couponCode === 'WELCOME10') { discountValue = 10; discountType = 'percentage'; }
      if (state.couponCode === 'SAVE20') { discountValue = 20; discountType = 'fixed'; }
      const totals = calculateTotals(newItems, state.couponCode === 'FREESHIP' ? 0 : state.shipping, discountValue, discountType);
      return { items: newItems, ...totals };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      let discountValue = 0;
      let discountType: 'percentage' | 'fixed' = 'fixed';
      if (state.couponCode === 'WELCOME10') { discountValue = 10; discountType = 'percentage'; }
      if (state.couponCode === 'SAVE20') { discountValue = 20; discountType = 'fixed'; }
      const totals = calculateTotals(newItems, state.couponCode === 'FREESHIP' ? 0 : state.shipping, discountValue, discountType);
      return { items: newItems, ...totals };
    });
  },

  applyCoupon: (code) => {
    set((state) => {
      let discountValue = 0;
      let discountType: 'percentage' | 'fixed' = 'fixed';
      let shipping = state.shipping;

      if (code === 'WELCOME10') {
        discountValue = 10;
        discountType = 'percentage';
      } else if (code === 'SAVE20') {
        discountValue = 20;
        discountType = 'fixed';
      } else if (code === 'FREESHIP') {
        shipping = 0;
      } else {
        throw new Error('Invalid coupon code');
      }

      const totals = calculateTotals(state.items, shipping, discountValue, discountType);
      return { ...totals, shipping, couponCode: code };
    });
  },

  removeCoupon: () => {
    set((state) => {
      // restore shipping if it was free ship, let's assume standard 15 if not set (checkout handles this)
      const totals = calculateTotals(state.items, state.shipping, 0, 'fixed');
      return { ...totals, couponCode: null };
    });
  },

  setShipping: (cost) => {
    set((state) => {
      let shipping = state.couponCode === 'FREESHIP' ? 0 : cost;
      let discountValue = 0;
      let discountType: 'percentage' | 'fixed' = 'fixed';
      if (state.couponCode === 'WELCOME10') { discountValue = 10; discountType = 'percentage'; }
      if (state.couponCode === 'SAVE20') { discountValue = 20; discountType = 'fixed'; }
      
      const totals = calculateTotals(state.items, shipping, discountValue, discountType);
      return { ...totals, shipping };
    });
  },

  clearCart: () => set({ items: [], subtotal: 0, tax: 0, discount: 0, total: 0, shipping: 0, couponCode: null }),
}));
