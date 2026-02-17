'use client';

interface EventCardHeaderProps {
  sport: string;
  league: string;
}

export const EventCardHeader = ({ sport, league }: EventCardHeaderProps) => {
  return (
    <div className="px-4 pt-4 pb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
          {sport}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{league}</span>
      </div>
    </div>
  );
};
