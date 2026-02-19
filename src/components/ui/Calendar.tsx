'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/utils/cn';

import { buttonVariants } from './Button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        root: 'w-fit',
        months: 'flex flex-col sm:flex-row gap-3',
        month: 'flex flex-col gap-4',
        month_caption: 'relative flex items-center justify-center w-full h-8',
        caption_label: 'text-sm font-medium pointer-events-none',
        nav: 'absolute inset-x-1 top-3 z-10 flex h-8 items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-70 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-70 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/60 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100 rounded-md'
        ),
        range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
        range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return <Icon className={cn('size-4 text-muted-foreground', className)} />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
