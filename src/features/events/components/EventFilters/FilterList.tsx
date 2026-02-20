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
import { FILTER_ALL_VALUE } from '@/config/constants';

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
        <Label className="block text-sm font-medium text-text-secondary mb-2">Date</Label>
        <DatePicker date={selectedDate} onDateChange={onDateChange} />
      </div>

      <div>
        <Label id="sport-label" className="block text-sm font-medium text-text-secondary mb-2">
          Sport
        </Label>
        <Select value={selectedSport} onValueChange={onSportChange}>
          <SelectTrigger
            aria-labelledby="sport-label"
            className="w-full bg-surface-content text-text-primary hover:bg-border-strong hover:bg-accent transition-colors"
          >
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
        <Label id="league-label" className="block text-sm font-medium text-text-secondary mb-2">
          League
        </Label>
        <Select value={selectedLeague} onValueChange={onLeagueChange}>
          <SelectTrigger
            aria-labelledby="league-label"
            className="w-full bg-surface-content text-text-primary hover:bg-border-strong hover:bg-accent transition-colors"
          >
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
          className="w-full px-4 py-2 bg-surface-content text-text-secondary rounded-lg hover:bg-border-strong hover:bg-accent transition-colors"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
