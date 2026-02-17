'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, Loader2 } from 'lucide-react';
import { EventCard } from '@/features/events/components/EventCard';
import { useEventsStore } from '@/features/events/store/eventsStore';
import { fetchUpcomingEvents, sportsQueryKeys } from '@/features/events/services/sportsApi';

export const FavoritesView = () => {
  const { events, favorites, loadFavorites, setEvents } = useEventsStore();
  const favoriteEvents = events.filter((e) => favorites.includes(e.idEvent));

  const { data, isLoading } = useQuery({
    queryKey: sportsQueryKeys.upcomingEvents(),
    queryFn: () => fetchUpcomingEvents(),
  });

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Events you&apos;ve saved to your watchlist
        </p>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading favorites...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Events grid */}
          {favoriteEvents.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Heart className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start adding events to your favorites by clicking the heart icon
              </p>
            </div>
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
