import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  isRead: boolean;
  date: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message, type = 'info') => set((state) => ({
    notifications: [
      {
        id: Math.random().toString(36).substring(2, 9),
        type,
        message,
        isRead: false,
        date: new Date().toISOString()
      },
      ...state.notifications
    ]
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true }))
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}));
