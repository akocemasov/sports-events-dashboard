import { create } from 'zustand';

export interface SportEvent {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  strSport: string;
  dateEvent: string;
  strTime: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strThumb: string | null;
  strStatus: string;
  strVenue: string | null;
  strCountry: string | null;
}

interface EventFilters {
  sport: string;
  league: string;
  dateFrom: string;
  dateTo: string;
  searchQuery: string;
  sortBy: 'time' | 'popularity' | 'odds';
}

interface EventState {
  events: SportEvent[];
  filteredEvents: SportEvent[];
  favorites: string[];
  filters: EventFilters;
  isLoading: boolean;
  error: string | null;

  setEvents: (events: SportEvent[]) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  toggleFavorite: (eventId: string) => void;
  applyFilters: () => void;
  loadFavorites: () => void;
  updateEventScores: (eventId: string, homeScore: string, awayScore: string) => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  filteredEvents: [],
  favorites: [],
  filters: {
    sport: 'all',
    league: 'all',
    dateFrom: '',
    dateTo: '',
    searchQuery: '',
    sortBy: 'time',
  },
  isLoading: false,
  error: null,

  setEvents: (events) => {
    set({ events });
    get().applyFilters();
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },

  toggleFavorite: (eventId) => {
    set((state) => {
      const isFavorite = state.favorites.includes(eventId);
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => id !== eventId)
        : [...state.favorites, eventId];

      localStorage.setItem('event_favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },

  loadFavorites: () => {
    const favStr = localStorage.getItem('event_favorites');
    if (favStr) {
      try {
        const favorites = JSON.parse(favStr);
        set({ favorites });
      } catch (_error) {
        console.error('Failed to load favorites');
      }
    }
  },

  applyFilters: () => {
    const { events, filters } = get();
    let filtered = [...events];

    // Filter by sport
    if (filters.sport !== 'all') {
      filtered = filtered.filter((e) => e.strSport === filters.sport);
    }

    // Filter by league
    if (filters.league !== 'all') {
      filtered = filtered.filter((e) => e.strLeague === filters.league);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.strEvent.toLowerCase().includes(query) ||
          e.strHomeTeam.toLowerCase().includes(query) ||
          e.strAwayTeam.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter((e) => e.dateEvent >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter((e) => e.dateEvent <= filters.dateTo);
    }

    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === 'time') {
        return (
          new Date(a.dateEvent + ' ' + a.strTime).getTime() -
          new Date(b.dateEvent + ' ' + b.strTime).getTime()
        );
      }
      // For popularity and odds, use random for demo
      return Math.random() - 0.5;
    });

    set({ filteredEvents: filtered });
  },

  updateEventScores: (eventId, homeScore, awayScore) => {
    set((state) => ({
      events: state.events.map((e) =>
        e.idEvent === eventId ? { ...e, intHomeScore: homeScore, intAwayScore: awayScore } : e
      ),
    }));
    get().applyFilters();
  },
}));
