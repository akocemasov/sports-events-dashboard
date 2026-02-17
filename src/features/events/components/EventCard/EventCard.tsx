'use client';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';

import { FavoriteButton } from '@/components/FavoriteButton';
import { LiveIndicator } from '@/components/LiveIndicator';
import { SportEvent } from '@/store/eventsStore';
import { useEventsStore } from '@/store/eventsStore';

import { EventCardFooter } from './EventCardFooter';
import { EventCardHeader } from './EventCardHeader';
import { EventCardMatchInfo } from './EventCardMatchInfo';

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
      {isLive && <LiveIndicator className="absolute top-3 left-3 z-10" />}

      {/* Favorite button */}
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={handleFavoriteToggle}
        className="absolute top-3 right-3 z-10"
      />

      <Link href={`/event/${event.idEvent}`} className="block">
        <EventCardHeader sport={event.strSport} league={event.strLeague} />

        <EventCardMatchInfo
          homeTeam={event.strHomeTeam}
          awayTeam={event.strAwayTeam}
          homeScore={event.intHomeScore}
          awayScore={event.intAwayScore}
          isFinished={isFinished}
        />

        <EventCardFooter
          date={formatDate(event.dateEvent)}
          time={event.strTime?.substring(0, 5) || 'TBD'}
          venue={event.strVenue}
        />
      </Link>
    </div>
  );
};
