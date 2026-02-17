'use client';

import { Heart, MapPin, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { SportEvent } from '@/features/events/store/eventsStore';
import { useEventsStore } from '@/features/events/store/eventsStore';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

interface EventCardProps {
  event: SportEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { favorites, toggleFavorite } = useEventsStore();
  const isFavorite = favorites.includes(event.idEvent);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'MMM dd, yyyy');
    } catch {
      return dateStr;
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(event.idEvent);

    if (isFavorite) {
      toast.success('Removed from favorites');
    } else {
      toast.success('Added to favorites');
    }
  };

  const isLive = event.strStatus === 'Live' || event.strStatus === 'In Progress';
  const isFinished = event.strStatus === 'Match Finished';

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
      )}

      {/* Favorite button */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-3 right-3 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </button>

      <Link href={`/event/${event.idEvent}`} className="block">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
              {event.strSport}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{event.strLeague}</span>
          </div>
        </div>

        {/* Match details */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between gap-4">
            {/* Home team */}
            <div className="flex-1 text-right">
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {event.strHomeTeam}
              </p>
            </div>

            {/* Score or VS */}
            <div className="flex-shrink-0 text-center min-w-[60px]">
              {isFinished || event.intHomeScore !== null ? (
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {event.intHomeScore || '0'} - {event.intAwayScore || '0'}
                </div>
              ) : (
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">VS</div>
              )}
            </div>

            {/* Away team */}
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {event.strAwayTeam}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(event.dateEvent)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {event.strTime?.substring(0, 5) || 'TBD'}
              </div>
            </div>
            {event.strVenue && (
              <div className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{event.strVenue}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
