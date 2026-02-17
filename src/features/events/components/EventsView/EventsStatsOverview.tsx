'use client';

import { Star, TrendingUp, Trophy } from 'lucide-react';

interface EventsStatsOverviewProps {
  totalEvents: number;
  liveEventsCount: number;
  uniqueSportsCount: number;
}

export const EventsStatsOverview = ({
  totalEvents,
  liveEventsCount,
  uniqueSportsCount,
}: EventsStatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <Trophy className="w-8 h-8 opacity-80" />
          <span className="text-3xl font-bold">{totalEvents}</span>
        </div>
        <p className="text-blue-100">Total Events</p>
      </div>

      <div className="bg-linear-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <TrendingUp className="w-8 h-8 opacity-80" />
          <span className="text-3xl font-bold">{liveEventsCount}</span>
        </div>
        <p className="text-red-100">Live Now</p>
      </div>

      <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <Star className="w-8 h-8 opacity-80" />
          <span className="text-3xl font-bold">{uniqueSportsCount}</span>
        </div>
        <p className="text-green-100">Sports</p>
      </div>
    </div>
  );
};
