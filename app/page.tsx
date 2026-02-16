'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventCard } from '@/components/EventCard';
import { EventFilters } from '@/components/EventFilters';
import { useEventStore } from '@/stores/eventStore';
import { fetchUpcomingEvents, sportsQueryKeys } from '@/services/sportsApi';
import { Loader2, Calendar, Trophy, TrendingUp, Star } from 'lucide-react';

export default function HomePage() {
  const { filteredEvents, setEvents, loadFavorites, updateEventScores, events } = useEventStore();
  const { data, isLoading } = useQuery({
    queryKey: sportsQueryKeys.upcomingEvents(),
    queryFn: () => fetchUpcomingEvents(),
  });

  useEffect(() => {
    loadFavorites();

    // Simulated live updates - update scores every 10 seconds
    const interval = setInterval(() => {
      simulateLiveUpdates();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  const simulateLiveUpdates = () => {
    // Randomly update scores for "live" events
    const liveEvents = filteredEvents.filter(
      (e) => e.strStatus === 'Live' || e.strStatus === 'In Progress'
    );

    if (liveEvents.length > 0) {
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const homeScore = parseInt(randomEvent.intHomeScore || '0');
      const awayScore = parseInt(randomEvent.intAwayScore || '0');

      // Randomly increment one of the scores
      if (Math.random() > 0.5) {
        updateEventScores(randomEvent.idEvent, (homeScore + 1).toString(), awayScore.toString());
      } else {
        updateEventScores(randomEvent.idEvent, homeScore.toString(), (awayScore + 1).toString());
      }
    }
  };

  // Calculate stats
  const liveEventsCount = events.filter(
    (e) => e.strStatus === 'Live' || e.strStatus === 'In Progress'
  ).length;
  const uniqueSportsCount = new Set(events.map((e) => e.strSport)).size;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sports Events Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse upcoming matches and live events from around the world
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{events.length}</span>
          </div>
          <p className="text-blue-100">Total Events</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{liveEventsCount}</span>
          </div>
          <p className="text-red-100">Live Now</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{uniqueSportsCount}</span>
          </div>
          <p className="text-green-100">Sports</p>
        </div>
      </div>

      {/* Filters */}
      <EventFilters />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Events grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.idEvent} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
