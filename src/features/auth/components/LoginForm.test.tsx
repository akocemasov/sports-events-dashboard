import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuthStore } from '@/store/authStore';

const pushMock = jest.fn();
const loginMock = jest.fn();
const toastSuccessMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
  },
}));

jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

const useAuthStoreMock = jest.mocked(useAuthStore);

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStoreMock.mockReturnValue({
      login: loginMock,
    } as unknown as ReturnType<typeof useAuthStore>);
  });

  it('shows validation error when fields are missing', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('logs in successfully and redirects', async () => {
    const user = userEvent.setup();
    loginMock.mockResolvedValue(true);

    render(<LoginForm />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toastSuccessMock).toHaveBeenCalledWith('Successfully logged in!');
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  it('shows error when login fails', async () => {
    const user = userEvent.setup();
    loginMock.mockResolvedValue(false);

    render(<LoginForm />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Login failed. Please try again.')).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
