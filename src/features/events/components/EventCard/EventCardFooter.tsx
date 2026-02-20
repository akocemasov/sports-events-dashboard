import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardFooterProps {
  date: string;
  time: string;
  venue?: string | null;
}

export const EventCardFooter = ({ date, time, venue }: EventCardFooterProps) => {
  return (
    <div className="px-4 py-3 bg-surface-header border-t border-border-subtle">
      <div className="flex items-center justify-between gap-2 text-xs text-text-secondary">
        <div className="flex items-center gap-1 min-w-0">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{date}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Clock className="w-3.5 h-3.5" />
          {time} UTC
        </div>

        {venue && (
          <div className="flex items-center gap-1 min-w-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{venue}</span>
          </div>
        )}
      </div>
    </div>
  );
};
