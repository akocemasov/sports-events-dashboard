'use client';

interface EventCardMatchInfoProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  isFinished: boolean;
}

export const EventCardMatchInfo = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  isFinished,
}: EventCardMatchInfoProps) => {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex-1 text-right">
          <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {homeTeam}
          </p>
        </div>

        {/* Score or VS */}
        <div className="shrink-0 text-center min-w-15">
          {isFinished || homeScore !== null ? (
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {homeScore || '0'} - {awayScore || '0'}
            </div>
          ) : (
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">VS</div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
            {awayTeam}
          </p>
        </div>
      </div>
    </div>
  );
};
