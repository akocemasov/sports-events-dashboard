'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { LoadingState } from '@/components/LoadingState';
import EventFilters from '@/features/events/components/EventFilters';
import { eventsQueryKeys, fetchUpcomingEvents } from '@/features/events/services/eventsApi';
import { useEventsStore } from '@/store/eventsStore';

import { EventsGrid } from './EventsGrid';
import { EventsHeader } from './EventsHeader';
import { EventsStatsOverview } from './EventsStatsOverview';

export const EventsView = () => {
  const { filteredEvents, setEvents, loadFavorites, updateEventScores, events } = useEventsStore();
  const { data, isLoading } = useQuery({
    queryKey: eventsQueryKeys.upcomingEvents(),
    queryFn: () => fetchUpcomingEvents(),
  });

  useEffect(() => {
    loadFavorites();

    // Simulated live updates - update scores every 10 seconds
    const interval = setInterval(() => {
      handleSimulateLiveUpdates();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  const handleSimulateLiveUpdates = () => {
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
    return <LoadingState message="Loading events..." />;
  }

  return (
    <div className="space-y-6">
      <EventsHeader />

      <EventsStatsOverview
        totalEvents={events.length}
        liveEventsCount={liveEventsCount}
        uniqueSportsCount={uniqueSportsCount}
      />

      <EventFilters />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>
      </div>

      <EventsGrid events={filteredEvents} />
    </div>
  );
};
