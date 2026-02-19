'use client';

import Image from 'next/image';

import { FavoriteButton } from '@/components/FavoriteButton';
import { LiveIndicator } from '@/components/LiveIndicator';

interface EventDetailHeaderProps {
  sport: string;
  league: string;
  leagueBadge?: string | null;
  isLive: boolean;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}

export const EventDetailHeader = ({
  sport,
  league,
  leagueBadge,
  isLive,
  isFavorite,
  onFavoriteToggle,
}: EventDetailHeaderProps) => {
  return (
    <div className="p-4 pb-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between gap-6">
        <div className="shrink-0">
          <LiveIndicator isLive={isLive} className="px-3 py-2 text-sm" />
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 text-sm min-w-0">
            <span className="text-gray-600 dark:text-gray-400 shrink-0">Sport:</span>
            <span className="font-medium text-blue-600 dark:text-blue-400 truncate">{sport}</span>
          </div>

          <div className="flex items-center gap-2 text-sm min-w-0">
            <span className="text-gray-600 dark:text-gray-400 shrink-0">League:</span>
            <span className="text-gray-900 dark:text-white truncate">{league}</span>
          </div>
        </div>

        {leagueBadge && (
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src={leagueBadge}
              alt="League badge"
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
        )}
        </div>

        <div className="shrink-0">
          <FavoriteButton isFavorite={isFavorite} onToggle={onFavoriteToggle} />
        </div>
      </div>
    </div>
  );
};
