'use client';

import { Calendar } from 'lucide-react';

import EventCard from '@/features/events/components/EventCard';
import { SportEvent } from '@/types/events';

interface EventsGridProps {
  events: SportEvent[];
}

export const EventsGrid = ({ events }: EventsGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No events found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.idEvent} event={event} />
      ))}
    </div>
  );
};
