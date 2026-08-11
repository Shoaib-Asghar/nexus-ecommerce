import { create } from 'zustand';
import type { Order } from '../types';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => order.id === id ? { ...order, status } : order)
  })),
}));
