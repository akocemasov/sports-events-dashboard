'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventInfoProps {
  date: string;
  time: string;
  venue?: string | null;
}

export const EventInfo = ({ date, time, venue }: EventInfoProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Calendar className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
          <p className="font-medium">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Clock className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
          <p className="font-medium">{time}</p>
        </div>
      </div>
      {venue && (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Venue</p>
            <p className="font-medium">{venue}</p>
          </div>
        </div>
      )}
    </div>
  );
};
