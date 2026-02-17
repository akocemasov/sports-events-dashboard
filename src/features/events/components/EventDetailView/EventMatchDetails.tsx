'use client';

interface EventMatchDetailsProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  status: string;
  isFinished: boolean;
}

export const EventMatchDetails = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  isFinished,
}: EventMatchDetailsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center mb-6">
      {/* Home team */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {homeTeam.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{homeTeam}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Home</p>
      </div>

      {/* Score */}
      <div className="text-center">
        {isFinished || homeScore !== null ? (
          <div className="text-5xl font-bold text-gray-900 dark:text-white">
            {homeScore || '0'} - {awayScore || '0'}
          </div>
        ) : (
          <div className="text-3xl font-semibold text-gray-500 dark:text-gray-400">VS</div>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{status}</p>
      </div>

      {/* Away team */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {awayTeam.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{awayTeam}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Away</p>
      </div>
    </div>
  );
};
