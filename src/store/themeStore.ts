import { create } from 'zustand';

import { THEME } from '@/config/constants';

type Theme = (typeof THEME)[keyof typeof THEME];

interface ThemeState {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: THEME.SYSTEM,
  effectiveTheme: THEME.LIGHT,

  setTheme: (theme) => {
    localStorage.setItem('app_theme', theme);
    set({ theme });
    get().initTheme();
  },

  initTheme: () => {
    const { theme } = get();
    let effectiveTheme: 'light' | 'dark' = THEME.LIGHT;

    if (theme === THEME.SYSTEM) {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME.DARK
        : THEME.LIGHT;
    } else {
      effectiveTheme = theme;
    }

    set({ effectiveTheme });

    const root = document.documentElement;
    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease'); // temporarily add transitions for smooth theme switching

    if (effectiveTheme === THEME.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setTimeout(() => {
      root.style.removeProperty('transition'); // remove the transition after 300ms to avoid affecting other animations
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
