import { render, screen } from '@testing-library/react';

import HomePage from './page';

jest.mock('@/features/events/components/EventsView', () => ({
  __esModule: true,
  default: () => <div>EventsView Mock</div>,
}));

describe('HomePage', () => {
  it('renders EventsView', () => {
    render(<HomePage />);
    expect(screen.getByText('EventsView Mock')).toBeInTheDocument();
  });
});
