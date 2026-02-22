import { render, screen } from '@testing-library/react';

import RegisterPage from './page';

jest.mock('@/features/auth/components/RegisterForm', () => ({
  RegisterForm: () => <div>RegisterForm Mock</div>,
}));

describe('RegisterPage', () => {
  it('renders RegisterForm', () => {
    render(<RegisterPage />);
    expect(screen.getByText('RegisterForm Mock')).toBeInTheDocument();
  });
});
