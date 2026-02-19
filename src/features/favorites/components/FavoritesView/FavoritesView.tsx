'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { LoadingState } from '@/components/LoadingState';
import EventCard from '@/features/events/components/EventCard';
import { eventsQueryKeys, fetchEventsPerDay } from '@/features/events/services/eventsApi';
import { useEventsStore } from '@/store/eventsStore';

import { EmptyFavoritesState } from './EmptyFavoritesState';
import { FavoritesHeader } from './FavoritesHeader';

export const FavoritesView = () => {
  const { events, favorites, setEvents } = useEventsStore();
  const favoriteEvents = events.filter((e) => favorites.includes(e.idEvent));

  const { data, isLoading } = useQuery({
    queryKey: eventsQueryKeys.eventsPerDay(),
    queryFn: () => fetchEventsPerDay(),
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  return (
    <div className="space-y-6">
      <FavoritesHeader />

      {isLoading ? (
        <LoadingState message="Loading favorites..." />
      ) : (
        <>
          {favoriteEvents.length === 0 ? (
            <EmptyFavoritesState />
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {favoriteEvents.length} favorite event
                {favoriteEvents.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteEvents.map((event) => (
                  <EventCard key={event.idEvent} event={event} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
