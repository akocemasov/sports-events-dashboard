'use client';

import { TrendingUp } from 'lucide-react';

interface BettingOddsProps {
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
}

export const BettingOdds = ({ homeOdds, drawOdds, awayOdds }: BettingOddsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Betting Odds</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Home Win</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{homeOdds}</p>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Draw</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{drawOdds}</p>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Away Win</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{awayOdds}</p>
        </div>
      </div>
    </div>
  );
};
