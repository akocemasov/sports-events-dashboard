'use client';

import Image from 'next/image';

import { formatEventStatus } from '@/features/events/utils/parse';

interface EventDetailMatchInfoProps {
  eventThumb?: string | null;
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  status: string;
  isFinished: boolean;
  homeTeamBadge?: string | null;
  awayTeamBadge?: string | null;
}

export const EventDetailMatchInfo = ({
  eventThumb,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  isFinished,
  homeTeamBadge,
  awayTeamBadge,
}: EventDetailMatchInfoProps) => {
  return (
    <div className="space-y-6">
      {eventThumb && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-transparent">
          <Image src={eventThumb} alt="Event badge" fill className="object-contain" sizes="100vw" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Home team */}
        <div className="text-center">
          {homeTeamBadge ? (
            <div className="relative w-20 h-20 mx-auto mb-3">
              <Image
                src={homeTeamBadge}
                alt={homeTeam}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto mb-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {homeTeam.substring(0, 2).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-bold text-text-primary">{homeTeam}</h2>
          <p className="text-sm text-text-secondary">Home</p>
        </div>

        {/* Score */}
        <div className="text-center">
          {isFinished || homeScore !== null ? (
            <div className="text-5xl font-bold text-text-primary">
              {homeScore || '0'} - {awayScore || '0'}
            </div>
          ) : (
            <div className="text-3xl font-semibold text-text-muted">VS</div>
          )}
          <p className="text-sm text-text-secondary mt-2">{formatEventStatus(status)}</p>
        </div>

        {/* Away team */}
        <div className="text-center">
          {awayTeamBadge ? (
            <div className="relative w-20 h-20 mx-auto mb-3">
              <Image
                src={awayTeamBadge}
                alt={awayTeam}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto mb-3 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {awayTeam.substring(0, 2).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-bold text-text-primary">{awayTeam}</h2>
          <p className="text-sm text-text-secondary">Away</p>
        </div>
      </div>
    </div>
  );
};
