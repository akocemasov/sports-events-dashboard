'use client';

import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';

import { LoadingState } from '@/components/LoadingState';
import { eventsQueryKeys, fetchEventDetails } from '@/features/events/services/eventsApi';
import { isEventFinished, isEventLive } from '@/features/events/utils/parse';
import { useEventsStore } from '@/store/eventsStore';
import { SportEvent } from '@/types/events';

import { BackToEventsLink } from './BackToEventsLink';
import { EventDetailFooter } from './EventDetailFooter';
import { EventDetailHeader } from './EventDetailHeader';
import { EventDetailMatchInfo } from './EventDetailMatchInfo';

interface EventDetailViewProps {
  eventId: string;
}

export const EventDetailView = ({ eventId }: EventDetailViewProps) => {
  const { favorites, toggleFavorite } = useEventsStore();
  const { data: event, isLoading } = useQuery<SportEvent | null>({
    queryKey: eventsQueryKeys.eventDetails(eventId),
    queryFn: () => fetchEventDetails(eventId),
    enabled: !!eventId,
  });

  if (isLoading || !eventId) {
    return <LoadingState message="Loading event details..." />;
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Event not found</h2>
        <BackToEventsLink />
      </div>
    );
  }

  const isFavorite = favorites.includes(event.idEvent);
  const isLive = isEventLive(event.strStatus);
  const isFinished = isEventFinished(event.strStatus);

  const handleFavoriteToggle = (_e: React.MouseEvent) => {
    toggleFavorite(event.idEvent);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <BackToEventsLink />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <EventDetailHeader
          sport={event.strSport}
          league={event.strLeague}
          leagueBadge={event.strLeagueBadge}
          isLive={isLive}
          isFavorite={isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
        />

        <div className="p-6">
          <EventDetailMatchInfo
            eventThumb={event.strThumb}
            homeTeam={event.strHomeTeam}
            awayTeam={event.strAwayTeam}
            homeScore={event.intHomeScore}
            awayScore={event.intAwayScore}
            status={event.strStatus}
            isFinished={isFinished}
            homeTeamBadge={event.strHomeTeamBadge}
            awayTeamBadge={event.strAwayTeamBadge}
          />
        </div>

        <EventDetailFooter
          date={format(parseISO(event.dateEvent), 'MMMM dd, yyyy')}
          time={event.strTime?.substring(0, 5) || 'TBD'}
          venue={event.strVenue}
          country={event.strCountry}
        />
      </div>
    </div>
  );
};
