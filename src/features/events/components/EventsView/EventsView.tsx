'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { LoadingState } from '@/components/LoadingState';
import EventFilters from '@/features/events/components/EventFilters';
import { eventsQueryKeys, fetchEventsPerDay } from '@/features/events/services/eventsApi';
import { isEventLive } from '@/features/events/utils/parse';
import { filterEvents, useEventsStore } from '@/store/eventsStore';

import { EventsGrid } from './EventsGrid';
import { EventsHeader } from './EventsHeader';
import { EventsStatsOverview } from './EventsStatsOverview';

export const EventsView = () => {
  const { events, filters, setEvents } = useEventsStore();
  const { data, isLoading } = useQuery({
    queryKey: eventsQueryKeys.eventsPerDay(),
    queryFn: () => fetchEventsPerDay(),
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  const filteredEvents = filterEvents(events, filters);

  // Calculate stats
  const liveEventsCount = events.filter((e) => isEventLive(e.strStatus)).length;
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

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEvents.length} events
        </p>
      </div>

      <EventsGrid events={filteredEvents} />
    </div>
  );
};
