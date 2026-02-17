import { z } from 'zod';

/**
 * Raw API response schema for a single sport event
 */
export const rawSportEventSchema = z.object({
  idEvent: z.string().nullable(),
  strEvent: z.string().nullable(),
  strLeague: z.string().nullable(),
  strSport: z.string().nullable(),
  dateEvent: z.string().nullable(),
  strTime: z.string().nullable(),
  strHomeTeam: z.string().nullable(),
  strAwayTeam: z.string().nullable(),
  intHomeScore: z.union([z.string(), z.number()]).nullable(),
  intAwayScore: z.union([z.string(), z.number()]).nullable(),
  strThumb: z.string().nullable(),
  strStatus: z.string().nullable(),
  strVenue: z.string().nullable(),
  strCountry: z.string().nullable(),
});

/**
 * Schema for array of sport events from API
 */
export const rawSportEventArraySchema = z.array(rawSportEventSchema);

/**
 * Type for raw API event response
 */
export type RawSportEvent = z.infer<typeof rawSportEventSchema>;
