import { render, screen } from '@testing-library/react';

import LoginPage from './page';

jest.mock('@/features/auth/components/LoginForm', () => ({
  LoginForm: () => <div>LoginForm Mock</div>,
}));

describe('LoginPage', () => {
  it('renders LoginForm', () => {
    render(<LoginPage />);
    expect(screen.getByText('LoginForm Mock')).toBeInTheDocument();
  });
});
