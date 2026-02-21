import { EVENT_STATUS } from '@/config/constants';
import { SportEvent } from '@/types/events';
import { sportEventArraySchema, sportEventSchema } from '@/types/events';

/**
 * Utility to check if event is finished (game has ended with final result)
 * Finished statuses: FT, AOT, AET, AP, PEN
 */
export const isEventFinished = (status: string | null): boolean => {
  if (!status) return false;

  const finishedStatuses: string[] = [
    EVENT_STATUS.FINISHED,
    EVENT_STATUS.AFTER_OVERTIME,
    EVENT_STATUS.AFTER_EXTRA_TIME,
    EVENT_STATUS.AFTER_PENALTIES,
    EVENT_STATUS.PENALTY_FINISHED,
  ];
  return finishedStatuses.includes(status);
};

/**
 * Utility to check if event is live (game is currently in play)
 * Live statuses include: Quarter/Period/Inning indicators, Halftime, Break Time, etc.
 */
export const isEventLive = (status: string | null): boolean => {
  if (!status) return false;

  const liveStatuses: string[] = [
    // Quarters
    EVENT_STATUS.Q1,
    EVENT_STATUS.Q2,
    EVENT_STATUS.Q3,
    EVENT_STATUS.Q4,
    // Innings
    EVENT_STATUS.IN1,
    EVENT_STATUS.IN2,
    EVENT_STATUS.IN3,
    EVENT_STATUS.IN4,
    EVENT_STATUS.IN5,
    EVENT_STATUS.IN6,
    EVENT_STATUS.IN7,
    EVENT_STATUS.IN8,
    EVENT_STATUS.IN9,
    // Periods
    EVENT_STATUS.P1,
    EVENT_STATUS.P2,
    EVENT_STATUS.P3,
    // Sets
    EVENT_STATUS.S1,
    EVENT_STATUS.S2,
    EVENT_STATUS.S3,
    EVENT_STATUS.S4,
    EVENT_STATUS.S5,
    // Halves and time states
    EVENT_STATUS.FIRST_HALF,
    EVENT_STATUS.SECOND_HALF,
    EVENT_STATUS.HALFTIME,
    EVENT_STATUS.BREAK_TIME,
    EVENT_STATUS.OVERTIME,
    EVENT_STATUS.EXTRA_TIME,
    EVENT_STATUS.PENALTY_IN_PROGRESS,
    EVENT_STATUS.PENALTY_TIME,
  ];
  return liveStatuses.includes(status);
};

/**
 * Utility to check if an event is marked as favorite
 */
export const isFavoriteEvent = (
  eventId: string,
  dateKey: string,
  favoritesByDate: Record<string, string[]>
): boolean => {
  const favoritesForDate = favoritesByDate[dateKey] ?? [];
  return favoritesForDate.includes(eventId);
};

/**
 * Format event status for display
 */
export const formatEventStatus = (status: string | null): string => {
  if (!status) return 'Not Started';

  const statusMap: Record<string, string> = {
    // Finished states
    [EVENT_STATUS.FINISHED]: 'Match Finished',
    [EVENT_STATUS.AFTER_OVERTIME]: 'After Overtime',
    [EVENT_STATUS.AFTER_EXTRA_TIME]: 'After Extra Time',
    [EVENT_STATUS.AFTER_PENALTIES]: 'After Penalties',
    [EVENT_STATUS.PENALTY_FINISHED]: 'Finished (Penalties)',

    // Not started
    [EVENT_STATUS.NOT_STARTED]: 'Not Started',
    [EVENT_STATUS.TIME_TO_BE_DEFINED]: 'Time To Be Defined',

    // Quarters
    [EVENT_STATUS.Q1]: 'Quarter 1',
    [EVENT_STATUS.Q2]: 'Quarter 2',
    [EVENT_STATUS.Q3]: 'Quarter 3',
    [EVENT_STATUS.Q4]: 'Quarter 4',

    // Innings
    [EVENT_STATUS.IN1]: 'Inning 1',
    [EVENT_STATUS.IN2]: 'Inning 2',
    [EVENT_STATUS.IN3]: 'Inning 3',
    [EVENT_STATUS.IN4]: 'Inning 4',
    [EVENT_STATUS.IN5]: 'Inning 5',
    [EVENT_STATUS.IN6]: 'Inning 6',
    [EVENT_STATUS.IN7]: 'Inning 7',
    [EVENT_STATUS.IN8]: 'Inning 8',
    [EVENT_STATUS.IN9]: 'Inning 9',

    // Periods
    [EVENT_STATUS.P1]: 'Period 1',
    [EVENT_STATUS.P2]: 'Period 2',
    [EVENT_STATUS.P3]: 'Period 3',

    // Sets
    [EVENT_STATUS.S1]: 'Set 1',
    [EVENT_STATUS.S2]: 'Set 2',
    [EVENT_STATUS.S3]: 'Set 3',
    [EVENT_STATUS.S4]: 'Set 4',
    [EVENT_STATUS.S5]: 'Set 5',

    // Common states
    [EVENT_STATUS.FIRST_HALF]: 'First Half',
    [EVENT_STATUS.SECOND_HALF]: 'Second Half',
    [EVENT_STATUS.HALFTIME]: 'Halftime',
    [EVENT_STATUS.BREAK_TIME]: 'Break Time',
    [EVENT_STATUS.OVERTIME]: 'Overtime',
    [EVENT_STATUS.EXTRA_TIME]: 'Extra Time',
    [EVENT_STATUS.PENALTY_IN_PROGRESS]: 'Penalty In Progress',
    [EVENT_STATUS.PENALTY_TIME]: 'Penalty Time',

    // Postponed/Cancelled/Other
    [EVENT_STATUS.POSTPONED_SHORT]: 'Postponed',
    [EVENT_STATUS.POSTPONED]: 'Postponed',
    [EVENT_STATUS.CANCELLED]: 'Cancelled',
    [EVENT_STATUS.INTERRUPTED]: 'Interrupted',
    [EVENT_STATUS.INTERRUPTED_SHORT]: 'Interrupted',
    [EVENT_STATUS.ABANDONED]: 'Abandoned',
    [EVENT_STATUS.SUSPENDED]: 'Suspended',
    [EVENT_STATUS.AWARDED]: 'Awarded',
    [EVENT_STATUS.AWARDED_SHORT]: 'Awarded',
    [EVENT_STATUS.WALKOVER]: 'Walkover',
  };

  return statusMap[status] || status;
};

/**
 * Parses and validates an array of raw API events
 * Returns normalized SportEvent array on success, null on validation failure
 */
export const parseEventsArray = (payload: unknown): SportEvent[] | null => {
  const parsed = sportEventArraySchema.safeParse(payload ?? []);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
};

/**
 * Parses and validates a single raw API event
 * Returns normalized SportEvent on success, null on validation failure
 */
export const parseEventSingle = (payload: unknown): SportEvent | null => {
  const parsed = sportEventSchema.safeParse(payload ?? null);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
};

/**
 * Extracts unique sports from a list of events
 */
export const getUniqueSports = (events: SportEvent[]): string[] => {
  return Array.from(new Set(events.map((e) => e.strSport)));
};

/**
 * Extracts unique leagues from a list of events
 */
export const getUniqueLeagues = (events: SportEvent[]): string[] => {
  return Array.from(new Set(events.map((e) => e.strLeague)));
};
