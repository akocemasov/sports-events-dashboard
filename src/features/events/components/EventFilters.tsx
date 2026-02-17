'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useEventsStore } from '@/features/events/store/eventsStore';
import { getUniqueSports, getUniqueLeagues } from '@/features/events/services/sportsApi';
import { useState } from 'react';

export const EventFilters = () => {
  const { events, filters, setFilters } = useEventsStore();
  const [showFilters, setShowFilters] = useState(false);

  const sports = ['all', ...getUniqueSports(events)];
  const leagues = ['all', ...getUniqueLeagues(events)];

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by team or event name..."
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      {/* Filter toggle button (mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filters */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}
      >
        {/* Sport filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sport
          </label>
          <select
            value={filters.sport}
            onChange={(e) => setFilters({ sport: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport === 'all' ? 'All Sports' : sport}
              </option>
            ))}
          </select>
        </div>

        {/* League filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            League
          </label>
          <select
            value={filters.league}
            onChange={(e) => setFilters({ league: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {leagues.map((league) => (
              <option key={league} value={league}>
                {league === 'all' ? 'All Leagues' : league}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({ sortBy: e.target.value as 'time' | 'popularity' | 'odds' })
            }
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="time">Time</option>
            <option value="popularity">Popularity</option>
            <option value="odds">Odds</option>
          </select>
        </div>

        {/* Clear filters */}
        <div className="flex items-end">
          <button
            onClick={() =>
              setFilters({
                sport: 'all',
                league: 'all',
                searchQuery: '',
                sortBy: 'time',
                dateFrom: '',
                dateTo: '',
              })
            }
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
