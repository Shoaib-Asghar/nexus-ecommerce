import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, pass) => {
    // Dummy authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && pass === 'password123') {
          set({
            user: {
              id: 'u1',
              email: 'demo@example.com',
              firstName: 'Demo',
              lastName: 'User',
              role: 'user',
            },
            isAuthenticated: true,
          });
          resolve();
        } else if (email === 'admin@example.com' && pass === 'admin123') {
          set({
            user: {
              id: 'u2',
              email: 'admin@example.com',
              firstName: 'Admin',
              lastName: 'User',
              role: 'admin',
            },
            isAuthenticated: true,
          });
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  },
  register: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set({
          user: {
            id: 'u3',
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: 'user',
          },
          isAuthenticated: true,
        });
        resolve();
      }, 800);
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
