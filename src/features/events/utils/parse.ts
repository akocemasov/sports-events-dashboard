import { SportEvent } from '@/store/eventsStore';
import { RawSportEvent, rawSportEventArraySchema, rawSportEventSchema } from '@/types/events';

/**
 * Normalizes score values from API (handles null, empty string, number, string)
 */
const normalizeScore = (value: string | number | null): string | null => {
  if (value === null || value === '') {
    return null;
  }
  return String(value);
};

/**
 * Transforms raw API response into normalized SportEvent
 */
export const normalizeSportEvent = (event: RawSportEvent): SportEvent => ({
  idEvent: event.idEvent ?? '',
  strEvent: event.strEvent ?? '',
  strLeague: event.strLeague ?? '',
  strSport: event.strSport ?? '',
  dateEvent: event.dateEvent ?? '',
  strTime: event.strTime ?? '',
  strHomeTeam: event.strHomeTeam ?? '',
  strAwayTeam: event.strAwayTeam ?? '',
  intHomeScore: normalizeScore(event.intHomeScore),
  intAwayScore: normalizeScore(event.intAwayScore),
  strThumb: event.strThumb ?? null,
  strStatus: event.strStatus ?? 'Not Started',
  strVenue: event.strVenue ?? null,
  strCountry: event.strCountry ?? null,
});

/**
 * Parses and validates an array of raw API events
 * Returns normalized SportEvent array on success, null on validation failure
 */
export const parseEventsArray = (payload: unknown): SportEvent[] | null => {
  const parsed = rawSportEventArraySchema.safeParse(payload ?? []);
  if (!parsed.success) {
    return null;
  }
  return parsed.data.map(normalizeSportEvent);
};

/**
 * Parses and validates a single raw API event
 * Returns normalized SportEvent on success, null on validation failure
 */
export const parseEventSingle = (payload: unknown): SportEvent | null => {
  const parsed = rawSportEventSchema.safeParse(payload ?? null);
  if (!parsed.success) {
    return null;
  }
  return normalizeSportEvent(parsed.data);
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
