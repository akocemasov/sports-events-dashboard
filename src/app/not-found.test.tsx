import { render } from '@testing-library/react';

import NotFound from './not-found';

describe('NotFound', () => {
  it('renders 404 message', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Page not found')).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    const { getByRole } = render(<NotFound />);
    const homeLink = getByRole('link', { name: /back to home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
