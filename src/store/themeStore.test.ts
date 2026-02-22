import { THEME } from '@/config/constants';
import { useThemeStore } from '@/store/themeStore';

const mockMatchMedia = (matches: boolean) => {
  const matchMediaMock = window.matchMedia as jest.Mock;
  matchMediaMock.mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe('themeStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    useThemeStore.setState({ theme: THEME.SYSTEM, effectiveTheme: THEME.LIGHT });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sets dark theme and updates root class', () => {
    useThemeStore.getState().setTheme(THEME.DARK);
    jest.advanceTimersByTime(300);

    const state = useThemeStore.getState();
    expect(state.theme).toBe(THEME.DARK);
    expect(state.effectiveTheme).toBe(THEME.DARK);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('app_theme')).toBe(THEME.DARK);
  });

  it('resolves system theme to light when media query does not match dark', () => {
    mockMatchMedia(false);
    useThemeStore.getState().initTheme();
    jest.advanceTimersByTime(300);

    expect(useThemeStore.getState().effectiveTheme).toBe(THEME.LIGHT);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('resolves system theme to dark when media query matches dark', () => {
    mockMatchMedia(true);
    useThemeStore.getState().initTheme();
    jest.advanceTimersByTime(300);

    expect(useThemeStore.getState().effectiveTheme).toBe(THEME.DARK);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
