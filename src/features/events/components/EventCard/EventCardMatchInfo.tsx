import { formatEventStatus } from '@/features/events/utils/parse';

interface EventCardMatchInfoProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  isFinished: boolean;
  status: string | null;
}

export const EventCardMatchInfo = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  isFinished,
  status,
}: EventCardMatchInfoProps) => {
  return (
    <div className="w-full p-4 bg-surface-content">
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex-1 text-right">
          <p className="font-semibold text-text-primary text-sm sm:text-base">{homeTeam}</p>
        </div>

        {/* Score or VS */}
        <div className="shrink-0 text-center min-w-15">
          {isFinished || homeScore !== null ? (
            <div>
              <div className="text-lg font-bold text-text-primary">
                {homeScore || '0'} - {awayScore || '0'}
              </div>
              <div className="text-xs text-text-muted">{formatEventStatus(status)}</div>
            </div>
          ) : (
            <div>
              <div className="text-sm font-semibold text-text-muted">VS</div>
              <div className="text-xs text-text-muted">{formatEventStatus(status)}</div>
            </div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1">
          <p className="font-semibold text-text-primary text-sm sm:text-base">{awayTeam}</p>
        </div>
      </div>
    </div>
  );
};
