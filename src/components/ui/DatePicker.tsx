'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/utils/cn';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}

export const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark:bg-zinc-950 dark:border-zinc-800" align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} />
      </PopoverContent>
    </Popover>
  );
};
