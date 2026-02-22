'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventDetailFooterProps {
  date: string;
  time: string;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
}

export const EventDetailFooter = ({ date, time, venue, city, country }: EventDetailFooterProps) => {
  return (
    <div className="px-4 py-3 bg-surface-header border-t border-border-subtle">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center gap-2 text-text-secondary">
          <Calendar className="w-4 h-4 text-text-muted shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Date:</p>
            <p className="text-sm font-medium truncate">{date}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-text-secondary">
          <Clock className="w-4 h-4 text-text-muted shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Time:</p>
            <p className="text-sm font-medium">{time} UTC</p>
          </div>
        </div>

        {(venue || city) && (
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <MapPin className="w-4 h-4 text-text-muted shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-text-muted">{venue ? 'Venue' : 'Location'}:</p>
              {venue && <p className="text-sm font-medium truncate">{venue}</p>}
              {city || country ? (
                <div className="text-xs truncate">
                  {city && <span className="text-text-muted">{city}, </span>}
                  {country && <span className="text-text-muted font-semibold">{country}</span>}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
