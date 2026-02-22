import { render, screen } from '@testing-library/react';

import EventDetailPage from './page';

jest.mock('@/features/events/components/EventDetailView', () => ({
  __esModule: true,
  default: ({ eventId }: { eventId: string }) => <div>EventDetailView Mock {eventId}</div>,
}));

describe('EventDetailPage', () => {
  it('renders EventDetailView with route param id', async () => {
    const page = await EventDetailPage({ params: Promise.resolve({ id: '123' }) });
    render(page);

    expect(screen.getByText('EventDetailView Mock 123')).toBeInTheDocument();
  });
});
