import { render, screen } from '@testing-library/react';

import FavoritesPage from './page';

jest.mock('@/features/favorites/components/FavoritesView', () => ({
  __esModule: true,
  default: () => <div>FavoritesView Mock</div>,
}));

describe('FavoritesPage', () => {
  it('renders FavoritesView', () => {
    render(<FavoritesPage />);
    expect(screen.getByText('FavoritesView Mock')).toBeInTheDocument();
  });
});
