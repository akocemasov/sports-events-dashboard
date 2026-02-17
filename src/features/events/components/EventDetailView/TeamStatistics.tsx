'use client';

import { BarChart3 } from 'lucide-react';

import { StatBar } from './StatBar';

interface TeamStats {
  wins: number;
  losses: number;
  draws: number;
  goalsScored: number;
  goalsConceded: number;
}

interface TeamStatisticsProps {
  homeTeamName: string;
  awayTeamName: string;
  homeStats: TeamStats;
  awayStats: TeamStats;
}

export const TeamStatistics = ({
  homeTeamName,
  awayTeamName,
  homeStats,
  awayStats,
}: TeamStatisticsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Statistics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home team stats */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{homeTeamName}</h4>
          <div className="space-y-3">
            <StatBar label="Wins" value={homeStats.wins} maxValue={30} color="green" />
            <StatBar
              label="Goals Scored"
              value={homeStats.goalsScored}
              maxValue={60}
              color="blue"
            />
            <StatBar
              label="Goals Conceded"
              value={homeStats.goalsConceded}
              maxValue={40}
              color="red"
            />
          </div>
        </div>

        {/* Away team stats */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{awayTeamName}</h4>
          <div className="space-y-3">
            <StatBar label="Wins" value={awayStats.wins} maxValue={30} color="green" />
            <StatBar
              label="Goals Scored"
              value={awayStats.goalsScored}
              maxValue={60}
              color="blue"
            />
            <StatBar
              label="Goals Conceded"
              value={awayStats.goalsConceded}
              maxValue={40}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
