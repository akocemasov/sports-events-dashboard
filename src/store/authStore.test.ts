import { useAuthStore } from '@/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('logs in and persists user', async () => {
    const loginPromise = useAuthStore.getState().login('test@example.com', 'password123');
    await jest.advanceTimersByTimeAsync(500);

    await expect(loginPromise).resolves.toBe(true);
    const state = useAuthStore.getState();

    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('test@example.com');
    expect(localStorage.getItem('auth_user')).toContain('test@example.com');
  });

  it('registers and stores provided name', async () => {
    const registerPromise = useAuthStore
      .getState()
      .register('new@example.com', 'password123', 'John Doe');
    await jest.advanceTimersByTimeAsync(500);

    await expect(registerPromise).resolves.toBe(true);
    const state = useAuthStore.getState();

    expect(state.user?.name).toBe('John Doe');
    expect(state.isAuthenticated).toBe(true);
  });

  it('logs out and clears storage', async () => {
    const loginPromise = useAuthStore.getState().login('test@example.com', 'password123');
    await jest.advanceTimersByTimeAsync(500);
    await loginPromise;

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem('auth_user')).toBeNull();
  });

  it('hydrates auth state from storage', () => {
    localStorage.setItem(
      'auth_user',
      JSON.stringify({ id: '1', email: 'persisted@example.com', name: 'persisted' })
    );

    useAuthStore.getState().checkAuth();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('persisted@example.com');
  });

  it('removes invalid stored auth payload', () => {
    localStorage.setItem('auth_user', 'not-json');

    useAuthStore.getState().checkAuth();

    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
