'use client';

import Image from 'next/image';

import { FavoriteButton } from '@/components/FavoriteButton';
import { LiveIndicator } from '@/components/LiveIndicator';

interface EventCardHeaderProps {
  sport: string;
  league: string;
  leagueBadge?: string | null;
  isLive: boolean;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}

export const EventCardHeader = ({ sport, league, leagueBadge, isLive, isFavorite, onFavoriteToggle }: EventCardHeaderProps) => {
  return (
    <div className="p-4 pb-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between gap-3">
        <div className="shrink-0">
          <LiveIndicator isLive={isLive} />
        </div>

        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-600 dark:text-gray-400 shrink-0">Sport:</span>
            <span className="font-medium text-blue-600 dark:text-blue-400 truncate">{sport}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-600 dark:text-gray-400 shrink-0">League:</span>
            <div className="flex items-center gap-1.5 min-w-0">
              {leagueBadge && (
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src={leagueBadge}
                    alt="League badge"
                    fill
                    className="object-contain"
                    sizes="16px"
                  />
                </div>
              )}
              <span className="text-gray-900 dark:text-white truncate">{league}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <FavoriteButton isFavorite={isFavorite} onToggle={onFavoriteToggle} />
        </div>
      </div>
    </div>
  );
};
