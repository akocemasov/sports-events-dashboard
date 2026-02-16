'use client';

import { Heart } from 'lucide-react';
import { EventCard } from '@/components/EventCard';
import { useEventStore } from '@/stores/eventStore';

export default function FavoritesPage() {
  const { events, favorites } = useEventStore();
  const favoriteEvents = events.filter((e) => favorites.includes(e.idEvent));

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
    </div>
  );
}
