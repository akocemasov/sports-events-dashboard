import { z } from 'zod';
import { SportEvent } from '@/features/events/store/eventsStore';
import { mockEvents } from '@/mocks/mockEvents';

// TheSportsDB API v1 configuration
const API_KEY = '123'; // Free API key
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';
const API_TIMEOUT = 8000; // 8 second timeout for API calls
const USE_MOCK_FALLBACK = false; // Only use mock data as last resort fallback

const rawSportEventSchema = z.object({
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

const rawSportEventArraySchema = z.array(rawSportEventSchema);

const normalizeScore = (value: string | number | null): string | null => {
  if (value === null || value === '') {
    return null;
  }
  return String(value);
};

const normalizeSportEvent = (event: z.infer<typeof rawSportEventSchema>): SportEvent => ({
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

const parseEventsArray = (payload: unknown): SportEvent[] | null => {
  const parsed = rawSportEventArraySchema.safeParse(payload ?? []);
  if (!parsed.success) {
    return null;
  }
  return parsed.data.map(normalizeSportEvent);
};

const parseEventSingle = (payload: unknown): SportEvent | null => {
  const parsed = rawSportEventSchema.safeParse(payload ?? null);
  if (!parsed.success) {
    return null;
  }
  return normalizeSportEvent(parsed.data);
};

// Helper function to fetch with timeout
const fetchWithTimeout = async (url: string, timeout: number = API_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Fetches upcoming events for a specific date
 * API Endpoint: eventsday.php
 * Falls back to mock data if API is unreachable
 */
export const fetchUpcomingEvents = async (dateStr?: string): Promise<SportEvent[]> => {
  try {
    // Use today's date if not provided
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    
    const url = `${BASE_URL}/${API_KEY}/eventsday.php?d=${targetDate}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`API request failed with status ${response.status}, using mock data`);
      return mockEvents;
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents) {
      console.warn('Upcoming events payload failed validation, using mock data');
      return mockEvents;
    }

    return parsedEvents.length > 0 ? parsedEvents : mockEvents;
  } catch (error) {
    console.error('Failed to fetch upcoming events from API:', error);
    console.info('Falling back to mock data');
    return mockEvents;
  }
}

/**
 * Fetches details for a specific event by ID
 * API Endpoint: lookupevent.php
 * Falls back to mock data if API is unreachable
 */
export const fetchEventDetails = async (eventId: string): Promise<SportEvent | null> => {
  try {
    const url = `${BASE_URL}/${API_KEY}/lookupevent.php?id=${eventId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch event ${eventId}, checking mock data`);
      const event = mockEvents.find((e) => e.idEvent === eventId);
      return event || null;
    }

    const data = await response.json();
    const parsedEvent = parseEventSingle(data?.events?.[0]);

    if (!parsedEvent) {
      // Fall back to mock data
      const mockEvent = mockEvents.find((e) => e.idEvent === eventId);
      return mockEvent || null;
    }

    return parsedEvent;
  } catch (error) {
    console.error(`Failed to fetch event details for ID ${eventId}:`, error);
    const mockEvent = mockEvents.find((e) => e.idEvent === eventId);
    return mockEvent || null;
  }
}

/**
 * Searches for events by event name, team name, or other criteria
 * API Endpoint: searchevents.php
 * Falls back to mock data filtering if API is unreachable
 */
export const searchEvents = async (query: string): Promise<SportEvent[]> => {
  try {
    // API search parameter uses underscores for spaces
    const searchQuery = query.replace(/\s+/g, '_');
    const url = `${BASE_URL}/${API_KEY}/searchevents.php?e=${encodeURIComponent(searchQuery)}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn('Search API request failed, using mock data filter');
      return mockEvents.filter(
        (e) =>
          e.strEvent.toLowerCase().includes(query.toLowerCase()) ||
          e.strHomeTeam.toLowerCase().includes(query.toLowerCase()) ||
          e.strAwayTeam.toLowerCase().includes(query.toLowerCase())
      );
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents || parsedEvents.length === 0) {
      // Fall back to mock data filtering
      return mockEvents.filter(
        (e) =>
          e.strEvent.toLowerCase().includes(query.toLowerCase()) ||
          e.strHomeTeam.toLowerCase().includes(query.toLowerCase()) ||
          e.strAwayTeam.toLowerCase().includes(query.toLowerCase())
      );
    }

    return parsedEvents;
  } catch (error) {
    console.error('Search events failed:', error);
    console.info('Falling back to local search in mock data');
    return mockEvents.filter(
      (e) =>
        e.strEvent.toLowerCase().includes(query.toLowerCase()) ||
        e.strHomeTeam.toLowerCase().includes(query.toLowerCase()) ||
        e.strAwayTeam.toLowerCase().includes(query.toLowerCase())
    );
  }
}

/**
 * Fetches upcoming events for a specific team
 * API Endpoint: eventsnext.php
 * Falls back to mock data if API is unreachable
 */
export const fetchTeamUpcomingEvents = async (teamId: string): Promise<SportEvent[]> => {
  try {
    const url = `${BASE_URL}/${API_KEY}/eventsnext.php?id=${teamId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch upcoming events for team ${teamId}, using mock data`);
      return mockEvents;
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents || parsedEvents.length === 0) {
      return mockEvents;
    }

    return parsedEvents;
  } catch (error) {
    console.error(`Failed to fetch team upcoming events for ID ${teamId}:`, error);
    return mockEvents;
  }
}

/**
 * Fetches past events for a specific team
 * API Endpoint: eventslast.php
 * Falls back to mock data if API is unreachable
 */
export const fetchTeamPastEvents = async (teamId: string): Promise<SportEvent[]> => {
  try {
    const url = `${BASE_URL}/${API_KEY}/eventslast.php?id=${teamId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch past events for team ${teamId}`);
      return [];
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents) {
      console.warn('Past events payload failed validation, returning empty list');
      return [];
    }

    return parsedEvents.map((event) => ({
      ...event,
      strStatus: event.strStatus || 'Match Finished',
    }));
  } catch (error) {
    console.error(`Failed to fetch team past events for ID ${teamId}:`, error);
    return [];
  }
}

/**
 * Fetches events by date range
 * Can filter by sport and league
 */
export const fetchEventsByDate = async (
  date: string,
  sport?: string,
  league?: string
): Promise<SportEvent[]> => {
  try {
    let url = `${BASE_URL}/${API_KEY}/eventsday.php?d=${date}`;
    if (sport) url += `&s=${sport}`;
    if (league) url += `&l=${league}`;

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn('Failed to fetch events by date, using mock data');
      return mockEvents;
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents || parsedEvents.length === 0) {
      return mockEvents;
    }

    return parsedEvents;
  } catch (error) {
    console.error('Failed to fetch events by date:', error);
    return mockEvents;
  }
}

/**
 * Configuration helper - returns current API configuration
 */
export const getApiConfig = () => {
  return {
    apiKey: API_KEY,
    baseUrl: BASE_URL,
    timeout: API_TIMEOUT,
    mockFallbackEnabled: USE_MOCK_FALLBACK,
    apiVersion: 'v1',
  };
}

export const sportsQueryKeys = {
  upcomingEvents: (date?: string) => ['events', 'upcoming', date ?? 'today'] as const,
  eventDetails: (eventId: string) => ['events', 'details', eventId] as const,
  searchEvents: (query: string) => ['events', 'search', query] as const,
};

export const getUniqueSports = (events: SportEvent[]): string[] => {
  return Array.from(new Set(events.map((e) => e.strSport)));
};

export const getUniqueLeagues = (events: SportEvent[]): string[] => {
  return Array.from(new Set(events.map((e) => e.strLeague)));
};
