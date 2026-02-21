import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FILTER_ALL_VALUE } from '@/config/constants';
import { EventFilters, SportEvent } from '@/types/events';

interface EventState {
  events: SportEvent[];
  favoritesByDate: Record<string, string[]>;
  filters: EventFilters;

  setEvents: (events: SportEvent[]) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  toggleFavorite: (eventId: string, dateKey: string) => void;
  getFavoritesForDate: (dateKey: string) => string[];
}

const defaultFilters: EventFilters = {
  sport: FILTER_ALL_VALUE,
  league: FILTER_ALL_VALUE,
  searchQuery: '',
  selectedDate: undefined,
};

export const filterEvents = (events: SportEvent[], filters: EventFilters): SportEvent[] => {
  let filtered = [...events];

  if (filters.sport !== FILTER_ALL_VALUE) {
    filtered = filtered.filter((event) => event.strSport === filters.sport);
  }

  if (filters.league !== FILTER_ALL_VALUE) {
    filtered = filtered.filter((event) => event.strLeague === filters.league);
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.strEvent.toLowerCase().includes(query) ||
        event.strHomeTeam.toLowerCase().includes(query) ||
        event.strAwayTeam.toLowerCase().includes(query)
    );
  }

  filtered.sort(
    (a, b) =>
      new Date(a.dateEvent + ' ' + a.strTime).getTime() -
      new Date(b.dateEvent + ' ' + b.strTime).getTime()
  );

  return filtered;
};

export const useEventsStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [],
      favoritesByDate: {},
      filters: defaultFilters,

      setEvents: (events) => {
        set({ events });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      toggleFavorite: (eventId, dateKey) => {
        set((state) => {
          const favoritesForDate = state.favoritesByDate[dateKey] ?? [];
          const isFavorite = favoritesForDate.includes(eventId);

          const updatedFavoritesForDate = isFavorite
            ? favoritesForDate.filter((id) => id !== eventId)
            : [...favoritesForDate, eventId];

          return {
            favoritesByDate: {
              ...state.favoritesByDate,
              [dateKey]: updatedFavoritesForDate,
            },
          };
        });
      },

      getFavoritesForDate: (dateKey) => get().favoritesByDate[dateKey] ?? [],
    }),
    {
      name: 'events-store',
      partialize: (state) => ({
        favoritesByDate: state.favoritesByDate,
        filters: state.filters,
      }),
    }
  )
);
