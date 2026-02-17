'use client';

import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { LoadingState } from '@/components/LoadingState';
import { eventsQueryKeys, fetchEventDetails } from '@/features/events/services/eventsApi';
import { SportEvent, useEventsStore } from '@/store/eventsStore';

import { BettingOdds } from './BettingOdds';
import { EventDetailHeader } from './EventDetailHeader';
import { EventInfo } from './EventInfo';
import { EventMatchDetails } from './EventMatchDetails';
import { TeamStatistics } from './TeamStatistics';

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
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(event.idEvent);
  const isLive = event.strStatus === 'Live' || event.strStatus === 'In Progress';
  const isFinished = event.strStatus === 'Match Finished';

  // Mock odds data
  const odds = generateMockOdds();

  // Mock team stats
  const { homeStats, awayStats } = generateMockTeamStats();

  const handleFavoriteToggle = () => {
    toggleFavorite(event.idEvent);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to events
      </Link>

      {/* Event header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8">
          <EventDetailHeader
            sport={event.strSport}
            league={event.strLeague}
            isLive={isLive}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
          />

          <EventMatchDetails
            homeTeam={event.strHomeTeam}
            awayTeam={event.strAwayTeam}
            homeScore={event.intHomeScore}
            awayScore={event.intAwayScore}
            status={event.strStatus}
            isFinished={isFinished}
          />

          <EventInfo
            date={format(parseISO(event.dateEvent), 'MMMM dd, yyyy')}
            time={event.strTime?.substring(0, 5) || 'TBD'}
            venue={event.strVenue}
          />
        </div>
      </div>

      <BettingOdds homeOdds={odds.home} drawOdds={odds.draw} awayOdds={odds.away} />

      <TeamStatistics
        homeTeamName={event.strHomeTeam}
        awayTeamName={event.strAwayTeam}
        homeStats={homeStats}
        awayStats={awayStats}
      />
    </div>
  );
};

const generateMockOdds = () => ({
  home: (2.5 + Math.random()).toFixed(2),
  draw: (3.2 + Math.random()).toFixed(2),
  away: (2.8 + Math.random()).toFixed(2),
});

const generateMockTeamStats = () => ({
  homeStats: {
    wins: Math.floor(Math.random() * 15) + 5,
    losses: Math.floor(Math.random() * 10),
    draws: Math.floor(Math.random() * 8),
    goalsScored: Math.floor(Math.random() * 40) + 20,
    goalsConceded: Math.floor(Math.random() * 30) + 10,
  },
  awayStats: {
    wins: Math.floor(Math.random() * 15) + 5,
    losses: Math.floor(Math.random() * 10),
    draws: Math.floor(Math.random() * 8),
    goalsScored: Math.floor(Math.random() * 40) + 20,
    goalsConceded: Math.floor(Math.random() * 30) + 10,
  },
});
