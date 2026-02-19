import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { EventFilters, SportEvent } from '@/types/events';

interface EventState {
  events: SportEvent[];
  favorites: string[];
  filters: EventFilters;

  setEvents: (events: SportEvent[]) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  toggleFavorite: (eventId: string) => void;
}

const defaultFilters: EventFilters = {
  sport: 'all',
  league: 'all',
  searchQuery: '',
};

export const filterEvents = (events: SportEvent[], filters: EventFilters): SportEvent[] => {
  let filtered = [...events];

  if (filters.sport !== 'all') {
    filtered = filtered.filter((event) => event.strSport === filters.sport);
  }

  if (filters.league !== 'all') {
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
    (set) => ({
      events: [],
      favorites: [],
      filters: defaultFilters,

      setEvents: (events) => {
        set({ events });
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      toggleFavorite: (eventId) => {
        set((state) => {
          const isFavorite = state.favorites.includes(eventId);
          return {
            favorites: isFavorite
              ? state.favorites.filter((id) => id !== eventId)
              : [...state.favorites, eventId],
          };
        });
      },
    }),
    {
      name: 'events-store',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
