'use client';

import { Heart } from 'lucide-react';

import { LiveIndicator } from '@/components/LiveIndicator';
import { Button } from '@/components/ui/Button';

interface EventDetailHeaderProps {
  sport: string;
  league: string;
  isLive: boolean;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export const EventDetailHeader = ({
  sport,
  league,
  isLive,
  isFavorite,
  onFavoriteToggle,
}: EventDetailHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
          {sport}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{league}</span>
        {isLive && <LiveIndicator />}
      </div>
      <Button
        onClick={onFavoriteToggle}
        variant="ghost"
        size="icon"
        className="hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Heart
          className={`w-6 h-6 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </Button>
    </div>
  );
};
