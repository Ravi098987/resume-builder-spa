import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('pb_token'),
  isAuthenticated: !!localStorage.getItem('pb_token'),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setToken: (token) => {
    if (token) {
      localStorage.setItem('pb_token', token);
    } else {
      localStorage.removeItem('pb_token');
    }
    set({ token, isAuthenticated: !!token });
  },

  logout: () => {
    localStorage.removeItem('pb_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));