import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FILTER_ALL_VALUE } from '@/config/constants';
import { EventFilters } from '@/features/events/components/EventFilters/EventFilters';
import { useEventsStore } from '@/store/eventsStore';

jest.mock('@/store/eventsStore', () => ({
  useEventsStore: jest.fn(),
}));

jest.mock('@/features/events/components/EventFilters/SearchBar', () => ({
  SearchBar: ({ onChange }: { onChange: (value: string) => void }) => (
    <button type="button" onClick={() => onChange('lakers')}>
      Mock Search
    </button>
  ),
}));

jest.mock('@/features/events/components/EventFilters/FilterList', () => ({
  FilterList: ({ onClearFilters }: { onClearFilters: () => void }) => (
    <button type="button" onClick={onClearFilters}>
      Mock Clear
    </button>
  ),
}));

const useEventsStoreMock = jest.mocked(useEventsStore);

describe('EventFilters', () => {
  it('updates search query via SearchBar callback', async () => {
    const user = userEvent.setup();
    const setFilters = jest.fn();

    useEventsStoreMock.mockReturnValue({
      events: [],
      filters: {
        sport: FILTER_ALL_VALUE,
        league: FILTER_ALL_VALUE,
        searchQuery: '',
        selectedDate: undefined,
      },
      setFilters,
    } as unknown as ReturnType<typeof useEventsStore>);

    render(<EventFilters />);
    await user.click(screen.getByRole('button', { name: 'Mock Search' }));

    expect(setFilters).toHaveBeenCalledWith({ searchQuery: 'lakers' });
  });

  it('clears filters using default values', async () => {
    const user = userEvent.setup();
    const setFilters = jest.fn();

    useEventsStoreMock.mockReturnValue({
      events: [],
      filters: {
        sport: 'Soccer',
        league: 'EPL',
        searchQuery: 'chelsea',
        selectedDate: new Date('2026-02-20'),
      },
      setFilters,
    } as unknown as ReturnType<typeof useEventsStore>);

    render(<EventFilters />);
    await user.click(screen.getByRole('button', { name: 'Mock Clear' }));

    expect(setFilters).toHaveBeenCalledWith({
      sport: FILTER_ALL_VALUE,
      league: FILTER_ALL_VALUE,
      searchQuery: '',
      selectedDate: undefined,
    });
  });
});
