import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useAuthStore } from '@/store/authStore';

const pushMock = jest.fn();
const registerMock = jest.fn();
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

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStoreMock.mockReturnValue({
      register: registerMock,
    } as unknown as ReturnType<typeof useAuthStore>);
  });

  it('shows required fields validation error', async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument();
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('shows password mismatch validation error', async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);
    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password321');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('registers successfully and redirects', async () => {
    const user = userEvent.setup();
    registerMock.mockResolvedValue(true);

    render(<RegisterForm />);
    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
      expect(toastSuccessMock).toHaveBeenCalledWith('Account created successfully!');
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  it('shows failure error when register fails', async () => {
    const user = userEvent.setup();
    registerMock.mockResolvedValue(false);

    render(<RegisterForm />);
    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Registration failed. Please try again.')).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
