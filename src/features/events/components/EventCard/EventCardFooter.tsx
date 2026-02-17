'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardFooterProps {
  date: string;
  time: string;
  venue?: string | null;
}

export const EventCardFooter = ({ date, time, venue }: EventCardFooterProps) => {
  return (
    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {time}
          </div>
        </div>
        {venue && (
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{venue}</span>
          </div>
        )}
      </div>
    </div>
  );
};
