import { z } from 'zod';

/**
 * Event status constants from TheSportsDB API
 * Includes sports: American Football, Baseball, Basketball, Football, Handball, Ice Hockey, Rugby, Volleyball
 */
export const EVENT_STATUS = {
  // Not Started
  NOT_STARTED: 'NS',
  TIME_TO_BE_DEFINED: 'TBD',
  
  // Finished states
  FINISHED: 'FT',
  AFTER_OVERTIME: 'AOT',
  AFTER_EXTRA_TIME: 'AET',
  AFTER_PENALTIES: 'AP',
  PENALTY_FINISHED: 'PEN',
  
  // American Football / Basketball Quarters
  Q1: 'Q1',
  Q2: 'Q2',
  Q3: 'Q3',
  Q4: 'Q4',
  
  // Baseball Innings
  IN1: 'IN1',
  IN2: 'IN2',
  IN3: 'IN3',
  IN4: 'IN4',
  IN5: 'IN5',
  IN6: 'IN6',
  IN7: 'IN7',
  IN8: 'IN8',
  IN9: 'IN9',
  
  // Ice Hockey Periods
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
  
  // Volleyball Sets
  S1: 'S1',
  S2: 'S2',
  S3: 'S3',
  S4: 'S4',
  S5: 'S5',
  
  // Common in-play states
  FIRST_HALF: '1H',
  SECOND_HALF: '2H',
  HALFTIME: 'HT',
  BREAK_TIME: 'BT',
  OVERTIME: 'OT',
  EXTRA_TIME: 'ET',
  PENALTY_IN_PROGRESS: 'P',
  PENALTY_TIME: 'PT',
  
  // Postponed/Cancelled/Other
  POSTPONED_SHORT: 'PST',
  POSTPONED: 'POST',
  CANCELLED: 'CANC',
  INTERRUPTED: 'INTR',
  INTERRUPTED_SHORT: 'INT',
  ABANDONED: 'ABD',
  SUSPENDED: 'SUSP',
  AWARDED: 'AWD',
  AWARDED_SHORT: 'AW',
  WALKOVER: 'WO',
} as const;

export interface EventFilters {
  sport: string;
  league: string;
  searchQuery: string;
  selectedDate?: Date;
}

const nullableStringToEmpty = z.string().nullable().transform((value) => value ?? '');
const nullableStringToNull = z.string().nullable().optional().transform((value) => value ?? null);
const scoreSchema = z
  .union([z.string(), z.number()])
  .nullable()
  .transform((value) => (value === null || value === '' ? null : String(value)));

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
  intHomeScore: scoreSchema,
  intAwayScore: scoreSchema,
  strThumb: nullableStringToNull,
  strStatus: z.string().nullable().transform((value) => value ?? EVENT_STATUS.NOT_STARTED),
  strVenue: z.string().nullable().transform((value) => value ?? null),
  strCountry: z.string().nullable().transform((value) => value ?? null),
  strPoster: nullableStringToNull,
});

export const sportEventArraySchema = z.array(sportEventSchema);

export type SportEvent = z.infer<typeof sportEventSchema>;
