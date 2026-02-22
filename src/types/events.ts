import { z } from 'zod';

export interface EventFilters {
  sport: string;
  league: string;
  searchQuery: string;
  selectedDate?: Date;
}

const nullableStringToEmpty = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value ?? '');

const nullableStringToNull = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value ?? null);

export const sportEventSchema = z.object({
  idEvent: nullableStringToEmpty,
  strEvent: nullableStringToEmpty,
  strLeague: nullableStringToEmpty,
  strLeagueBadge: nullableStringToNull,
  strSport: nullableStringToEmpty,
  dateEvent: nullableStringToEmpty,
  strTime: nullableStringToEmpty,
  strHomeTeam: nullableStringToEmpty,
  strAwayTeam: nullableStringToEmpty,
  strHomeTeamBadge: nullableStringToNull,
  strAwayTeamBadge: nullableStringToNull,
  intHomeScore: nullableStringToNull,
  intAwayScore: nullableStringToNull,
  strThumb: nullableStringToNull,
  strStatus: nullableStringToEmpty,
  strVenue: nullableStringToNull,
  strCity: nullableStringToNull,
  strCountry: nullableStringToNull,
  strPoster: nullableStringToNull,
});

export const sportEventArraySchema = z.array(sportEventSchema);

export type SportEvent = z.infer<typeof sportEventSchema>;
