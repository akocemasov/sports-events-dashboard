'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Clock, Heart, TrendingUp, BarChart3 } from 'lucide-react';
import { SportEvent, useEventStore } from '@/stores/eventStore';
import { fetchEventDetails, sportsQueryKeys } from '@/services/sportsApi';
import { format, parseISO } from 'date-fns';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EventDetailPage({ params }: PageProps) {
  const [eventId, setEventId] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useEventStore();
  const { data: event, isLoading } = useQuery<SportEvent | null>({
    queryKey: sportsQueryKeys.eventDetails(eventId ?? ''),
    queryFn: () => fetchEventDetails(eventId ?? ''),
    enabled: !!eventId,
  });

  useEffect(() => {
    params.then((p) => {
      setEventId(p.id);
    });
  }, [params]);

  if (isLoading || !eventId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
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
  const odds = {
    home: (2.5 + Math.random()).toFixed(2),
    draw: (3.2 + Math.random()).toFixed(2),
    away: (2.8 + Math.random()).toFixed(2),
  };

  // Mock team stats
  const homeStats = {
    wins: Math.floor(Math.random() * 15) + 5,
    losses: Math.floor(Math.random() * 10),
    draws: Math.floor(Math.random() * 8),
    goalsScored: Math.floor(Math.random() * 40) + 20,
    goalsConceded: Math.floor(Math.random() * 30) + 10,
  };

  const awayStats = {
    wins: Math.floor(Math.random() * 15) + 5,
    losses: Math.floor(Math.random() * 10),
    draws: Math.floor(Math.random() * 8),
    goalsScored: Math.floor(Math.random() * 40) + 20,
    goalsConceded: Math.floor(Math.random() * 30) + 10,
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
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                {event.strSport}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{event.strLeague}</span>
              {isLive && (
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
            <button
              onClick={() => toggleFavorite(event.idEvent)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </button>
          </div>

          {/* Match details */}
          <div className="grid grid-cols-3 gap-4 items-center mb-6">
            {/* Home team */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {event.strHomeTeam.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {event.strHomeTeam}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Home</p>
            </div>

            {/* Score */}
            <div className="text-center">
              {isFinished || event.intHomeScore !== null ? (
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  {event.intHomeScore || '0'} - {event.intAwayScore || '0'}
                </div>
              ) : (
                <div className="text-3xl font-semibold text-gray-500 dark:text-gray-400">VS</div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{event.strStatus}</p>
            </div>

            {/* Away team */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {event.strAwayTeam.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {event.strAwayTeam}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Away</p>
            </div>
          </div>

          {/* Event info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium">{format(parseISO(event.dateEvent), 'MMMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-medium">{event.strTime?.substring(0, 5) || 'TBD'}</p>
              </div>
            </div>
            {event.strVenue && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Venue</p>
                  <p className="font-medium">{event.strVenue}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Odds comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Betting Odds</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Home Win</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{odds.home}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Draw</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{odds.draw}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Away Win</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{odds.away}</p>
          </div>
        </div>
      </div>

      {/* Team statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Statistics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Home team stats */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              {event.strHomeTeam}
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Wins</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {homeStats.wins}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(homeStats.wins / 30) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Goals Scored</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {homeStats.goalsScored}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(homeStats.goalsScored / 60) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Goals Conceded</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {homeStats.goalsConceded}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${(homeStats.goalsConceded / 40) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Away team stats */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              {event.strAwayTeam}
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Wins</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {awayStats.wins}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(awayStats.wins / 30) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Goals Scored</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {awayStats.goalsScored}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(awayStats.goalsScored / 60) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Goals Conceded</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {awayStats.goalsConceded}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${(awayStats.goalsConceded / 40) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
