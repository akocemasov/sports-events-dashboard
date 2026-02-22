'use client';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';

import { isEventFinished, isEventLive, isFavoriteEvent } from '@/features/events/utils/parse';
import { useEventsStore } from '@/store/eventsStore';
import { SportEvent } from '@/types/events';

import { EventCardFooter } from './EventCardFooter';
import { EventCardHeader } from './EventCardHeader';
import { EventCardMatchInfo } from './EventCardMatchInfo';

interface EventCardProps {
  event: SportEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { favoritesByDate, toggleFavorite } = useEventsStore();
  const eventDateKey = event.dateEvent;
  const isFavorite = isFavoriteEvent(event.idEvent, eventDateKey, favoritesByDate);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'MMM dd, yyyy');
    } catch {
      return dateStr;
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(event.idEvent, eventDateKey);

    if (isFavorite) {
      toast.success('Removed from favorites');
    } else {
      toast.success('Added to favorites');
    }
  };

  const isLive = isEventLive(event.strStatus);
  const isFinished = isEventFinished(event.strStatus);

  return (
    <Link
      href={`/event/${event.idEvent}`}
      className="flex flex-col bg-surface-card rounded-xl border border-border-subtle overflow-hidden hover:shadow-lg hover:border-border-strong hover:bg-surface-header transition-all"
    >
      <EventCardHeader
        sport={event.strSport}
        league={event.strLeague}
        leagueBadge={event.strLeagueBadge}
        isLive={isLive}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />

      <div className="flex-1 flex items-center">
        <EventCardMatchInfo
          homeTeam={event.strHomeTeam}
          awayTeam={event.strAwayTeam}
          homeScore={event.intHomeScore}
          awayScore={event.intAwayScore}
          isFinished={isFinished}
          status={event.strStatus}
        />
      </div>

      <EventCardFooter
        date={formatDate(event.dateEvent)}
        time={event.strTime?.substring(0, 5) || 'TBD'}
        venue={event.strVenue}
      />
    </Link>
  );
};
