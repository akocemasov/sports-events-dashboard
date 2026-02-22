import { fireEvent, render, screen } from '@testing-library/react';

import { FavoriteButton } from '@/components/FavoriteButton';

describe('FavoriteButton', () => {
  it('renders add label when not favorite and triggers toggle', () => {
    const onToggle = jest.fn();

    render(<FavoriteButton isFavorite={false} onToggle={onToggle} />);

    const button = screen.getByRole('button', { name: 'Add to favorites' });
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders remove label when favorite', () => {
    render(<FavoriteButton isFavorite onToggle={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Remove from favorites' })).toBeInTheDocument();
  });
});
