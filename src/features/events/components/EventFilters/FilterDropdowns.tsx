'use client';

import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface FilterDropdownsProps {
  sports: string[];
  leagues: string[];
  selectedSport: string;
  selectedLeague: string;
  selectedSortBy: 'time' | 'popularity' | 'odds';
  onSportChange: (sport: string) => void;
  onLeagueChange: (league: string) => void;
  onSortByChange: (sortBy: 'time' | 'popularity' | 'odds') => void;
  onClearFilters: () => void;
}

export const FilterDropdowns = ({
  sports,
  leagues,
  selectedSport,
  selectedLeague,
  selectedSortBy,
  onSportChange,
  onLeagueChange,
  onSortByChange,
  onClearFilters,
}: FilterDropdownsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Sport filter */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sport
        </Label>
        <Select value={selectedSport} onValueChange={onSportChange}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport === 'all' ? 'All Sports' : sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* League filter */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          League
        </Label>
        <Select value={selectedLeague} onValueChange={onLeagueChange}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <SelectValue placeholder="All Leagues" />
          </SelectTrigger>
          <SelectContent>
            {leagues.map((league) => (
              <SelectItem key={league} value={league}>
                {league === 'all' ? 'All Leagues' : league}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort by */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort By
        </Label>
        <Select
          value={selectedSortBy}
          onValueChange={(value) => onSortByChange(value as 'time' | 'popularity' | 'odds')}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="time">Time</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="odds">Odds</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      <div className="flex items-end">
        <Button
          onClick={onClearFilters}
          variant="ghost"
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
