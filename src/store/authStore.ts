import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, _password: string) => {
    // Mock authentication - in real app, this would call an API
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
      };

      localStorage.setItem('auth_user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
      return true;
    } catch (_error) {
      return false;
    }
  },

  register: async (email: string, _password: string, name: string) => {
    // Mock registration
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = {
        id: Date.now().toString(),
        email,
        name,
      };

      localStorage.setItem('auth_user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
      return true;
    } catch (_error) {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, isAuthenticated: true });
      } catch (_error) {
        localStorage.removeItem('auth_user');
      }
    }
  },
}));
