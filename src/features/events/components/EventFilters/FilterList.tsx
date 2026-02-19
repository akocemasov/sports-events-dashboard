'use client';

import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { FILTER_ALL_VALUE } from '@/config/filterConfig';

interface FilterListProps {
  sports: string[];
  leagues: string[];
  selectedSport: string;
  selectedLeague: string;
  selectedDate?: Date;
  onSportChange: (sport: string) => void;
  onLeagueChange: (league: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onClearFilters: () => void;
}

export const FilterList = ({
  sports,
  leagues,
  selectedSport,
  selectedLeague,
  selectedDate,
  onSportChange,
  onLeagueChange,
  onDateChange,
  onClearFilters,
}: FilterListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date
        </Label>
        <DatePicker date={selectedDate} onDateChange={onDateChange} />
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sport
        </Label>
        <Select value={selectedSport} onValueChange={onSportChange}>
          <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport === FILTER_ALL_VALUE ? 'All Sports' : sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          League
        </Label>
        <Select value={selectedLeague} onValueChange={onLeagueChange}>
          <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <SelectValue placeholder="All Leagues" />
          </SelectTrigger>
          <SelectContent>
            {leagues.map((league) => (
              <SelectItem key={league} value={league}>
                {league === FILTER_ALL_VALUE ? 'All Leagues' : league}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
