import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  effectiveTheme: 'light',

  setTheme: (theme) => {
    localStorage.setItem('app_theme', theme);
    set({ theme });
    get().initTheme();
  },

  initTheme: () => {
    const { theme } = get();
    let effectiveTheme: 'light' | 'dark' = 'light';

    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }

    set({ effectiveTheme });

    // Apply to document with smooth transition
    const root = document.documentElement;

    // Add transition class temporarily
    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');

    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Remove transition after animation completes
    setTimeout(() => {
      root.style.removeProperty('transition');
    }, 300);
  },
}));

// Initialize theme from localStorage on startup
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('app_theme') as Theme;
  if (savedTheme) {
    useThemeStore.setState({ theme: savedTheme });
  }
}
