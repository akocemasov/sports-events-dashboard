'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { LoadingState } from '@/components/LoadingState';
import EventCard from '@/features/events/components/EventCard';
import { eventsQueryKeys, fetchEventsPerDay } from '@/features/events/services/eventsApi';
import { useEventsStore } from '@/store/eventsStore';

import { EmptyFavoritesState } from './EmptyFavoritesState';
import { FavoritesHeader } from './FavoritesHeader';

export const FavoritesView = () => {
  const { filters, getFavoritesForDate } = useEventsStore();
  const selectedDateStr = filters.selectedDate
    ? format(filters.selectedDate, 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');
  const favoriteIds = getFavoritesForDate(selectedDateStr);

  const { data, isLoading } = useQuery({
    queryKey: eventsQueryKeys.eventsPerDay(selectedDateStr),
    queryFn: () => fetchEventsPerDay(selectedDateStr),
  });

  const favoriteEvents = (data ?? []).filter((e) => favoriteIds.includes(e.idEvent));

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
              <p className="text-sm text-text-secondary">
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
