'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { FILTER_ALL_VALUE } from '@/config/filterConfig';
import { getUniqueLeagues, getUniqueSports } from '@/features/events/utils/parse';
import { useEventsStore } from '@/store/eventsStore';

import { FilterList } from './FilterList';
import { SearchBar } from './SearchBar';

export const EventFilters = () => {
  const { events, filters, setFilters } = useEventsStore();
  const [showFilters, setShowFilters] = useState(false);

  const sports = [FILTER_ALL_VALUE, ...getUniqueSports(events)];
  const leagues = [FILTER_ALL_VALUE, ...getUniqueLeagues(events)];

  const handleClearFilters = () => {
    setFilters({
      sport: FILTER_ALL_VALUE,
      league: FILTER_ALL_VALUE,
      searchQuery: '',
      selectedDate: undefined,
    });
  };

  return (
    <div className="space-y-4">
      <SearchBar
        value={filters.searchQuery}
        onChange={(value) => setFilters({ searchQuery: value })}
        placeholder="Search by team or event name..."
      />

      <Button
        onClick={() => setShowFilters(!showFilters)}
        variant="ghost"
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
        <FilterList
          sports={sports}
          leagues={leagues}
          selectedSport={filters.sport}
          selectedLeague={filters.league}
          selectedDate={filters.selectedDate}
          onSportChange={(sport) => setFilters({ sport })}
          onLeagueChange={(league) => setFilters({ league })}
          onDateChange={(date) => setFilters({ selectedDate: date })}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
};
