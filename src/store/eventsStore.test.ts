import { FILTER_ALL_VALUE } from '@/config/constants';
import { mockEvents } from '@/mocks/mockEvents';
import { filterEvents, useEventsStore } from '@/store/eventsStore';

const initialFilters = {
  sport: FILTER_ALL_VALUE,
  league: FILTER_ALL_VALUE,
  searchQuery: '',
  selectedDate: undefined,
};

describe('eventsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useEventsStore.setState({ events: [], favoritesByDate: {}, filters: initialFilters });
  });

  it('sets events and updates filters partially', () => {
    useEventsStore.getState().setEvents(mockEvents);
    useEventsStore.getState().setFilters({ sport: 'Soccer', searchQuery: 'chelsea' });

    const state = useEventsStore.getState();
    expect(state.events).toHaveLength(12);
    expect(state.filters.sport).toBe('Soccer');
    expect(state.filters.searchQuery).toBe('chelsea');
    expect(state.filters.league).toBe(FILTER_ALL_VALUE);
  });

  it('toggles favorites by date key', () => {
    const dateKey = '2026-02-20';

    useEventsStore.getState().toggleFavorite('1', dateKey);
    expect(useEventsStore.getState().getFavoritesForDate(dateKey)).toEqual(['1']);

    useEventsStore.getState().toggleFavorite('2', dateKey);
    expect(useEventsStore.getState().getFavoritesForDate(dateKey)).toEqual(['1', '2']);

    useEventsStore.getState().toggleFavorite('1', dateKey);
    expect(useEventsStore.getState().getFavoritesForDate(dateKey)).toEqual(['2']);
  });
});

describe('filterEvents', () => {
  it('filters and sorts by datetime ascending', () => {
    const filtered = filterEvents(mockEvents, {
      sport: 'Basketball',
      league: FILTER_ALL_VALUE,
      searchQuery: '',
      selectedDate: undefined,
    });

    expect(filtered.map((event) => event.idEvent)).toEqual(['6', '2', '8', '12']);
  });

  it('matches search query against event and team names', () => {
    const filtered = filterEvents(mockEvents, {
      sport: FILTER_ALL_VALUE,
      league: FILTER_ALL_VALUE,
      searchQuery: 'barcelona',
      selectedDate: undefined,
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].idEvent).toBe('3');
  });

  it('applies sport and league filters together', () => {
    const filtered = filterEvents(mockEvents, {
      sport: 'Soccer',
      league: 'English Premier League',
      searchQuery: '',
      selectedDate: undefined,
    });

    expect(filtered.map((event) => event.idEvent)).toEqual(['1', '7']);
  });
});
