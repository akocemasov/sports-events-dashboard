'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventDetailFooterProps {
  date: string;
  time: string;
  venue?: string | null;
  country?: string | null;
}

export const EventDetailFooter = ({ date, time, venue, country }: EventDetailFooterProps) => {
  return (
    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">Date:</p>
            <p className="text-sm font-medium truncate">{date}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">Time:</p>
            <p className="text-sm font-medium">{time} UTC</p>
          </div>
        </div>

        {venue && (
          <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">{country ? 'Venue' : 'Location'}:</p>
              <p className="text-sm font-medium truncate">{venue}</p>
              {country && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{country}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
