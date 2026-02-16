import { SportEvent } from '../stores/eventStore';

// TheSportsDB API v1 configuration
const API_KEY = '123'; // Free API key - use your own in production
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';
const API_TIMEOUT = 8000; // 8 second timeout for API calls
const USE_MOCK_FALLBACK = false; // Only use mock data as last resort fallback

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, timeout: number = API_TIMEOUT): Promise<Response> {
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
}

// Mock data for fallback
const mockEvents: SportEvent[] = [
  {
    idEvent: '1',
    strEvent: 'Manchester United vs Liverpool',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    dateEvent: '2026-02-20',
    strTime: '15:00:00',
    strHomeTeam: 'Manchester United',
    strAwayTeam: 'Liverpool',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Old Trafford',
    strCountry: 'England',
  },
  {
    idEvent: '2',
    strEvent: 'Los Angeles Lakers vs Boston Celtics',
    strLeague: 'NBA',
    strSport: 'Basketball',
    dateEvent: '2026-02-18',
    strTime: '20:30:00',
    strHomeTeam: 'Los Angeles Lakers',
    strAwayTeam: 'Boston Celtics',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Crypto.com Arena',
    strCountry: 'USA',
  },
  {
    idEvent: '3',
    strEvent: 'Real Madrid vs Barcelona',
    strLeague: 'Spanish La Liga',
    strSport: 'Soccer',
    dateEvent: '2026-02-19',
    strTime: '21:00:00',
    strHomeTeam: 'Real Madrid',
    strAwayTeam: 'Barcelona',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Santiago Bernabéu',
    strCountry: 'Spain',
  },
  {
    idEvent: '4',
    strEvent: 'New York Yankees vs Boston Red Sox',
    strLeague: 'MLB',
    strSport: 'Baseball',
    dateEvent: '2026-02-21',
    strTime: '19:00:00',
    strHomeTeam: 'New York Yankees',
    strAwayTeam: 'Boston Red Sox',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Yankee Stadium',
    strCountry: 'USA',
  },
  {
    idEvent: '5',
    strEvent: 'Bayern Munich vs Borussia Dortmund',
    strLeague: 'German Bundesliga',
    strSport: 'Soccer',
    dateEvent: '2026-02-22',
    strTime: '18:30:00',
    strHomeTeam: 'Bayern Munich',
    strAwayTeam: 'Borussia Dortmund',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Allianz Arena',
    strCountry: 'Germany',
  },
  {
    idEvent: '6',
    strEvent: 'Golden State Warriors vs LA Clippers',
    strLeague: 'NBA',
    strSport: 'Basketball',
    dateEvent: '2026-02-17',
    strTime: '22:00:00',
    strHomeTeam: 'Golden State Warriors',
    strAwayTeam: 'LA Clippers',
    intHomeScore: '108',
    intAwayScore: '112',
    strThumb: null,
    strStatus: 'Match Finished',
    strVenue: 'Chase Center',
    strCountry: 'USA',
  },
  {
    idEvent: '7',
    strEvent: 'Chelsea vs Arsenal',
    strLeague: 'English Premier League',
    strSport: 'Soccer',
    dateEvent: '2026-02-23',
    strTime: '17:30:00',
    strHomeTeam: 'Chelsea',
    strAwayTeam: 'Arsenal',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Stamford Bridge',
    strCountry: 'England',
  },
  {
    idEvent: '8',
    strEvent: 'Miami Heat vs Brooklyn Nets',
    strLeague: 'NBA',
    strSport: 'Basketball',
    dateEvent: '2026-02-19',
    strTime: '19:30:00',
    strHomeTeam: 'Miami Heat',
    strAwayTeam: 'Brooklyn Nets',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'FTX Arena',
    strCountry: 'USA',
  },
  {
    idEvent: '9',
    strEvent: 'Dallas Cowboys vs Philadelphia Eagles',
    strLeague: 'NFL',
    strSport: 'American Football',
    dateEvent: '2026-02-24',
    strTime: '20:15:00',
    strHomeTeam: 'Dallas Cowboys',
    strAwayTeam: 'Philadelphia Eagles',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'AT&T Stadium',
    strCountry: 'USA',
  },
  {
    idEvent: '10',
    strEvent: 'Toronto Maple Leafs vs Montreal Canadiens',
    strLeague: 'NHL',
    strSport: 'Ice Hockey',
    dateEvent: '2026-02-18',
    strTime: '19:00:00',
    strHomeTeam: 'Toronto Maple Leafs',
    strAwayTeam: 'Montreal Canadiens',
    intHomeScore: '3',
    intAwayScore: '2',
    strThumb: null,
    strStatus: 'Match Finished',
    strVenue: 'Scotiabank Arena',
    strCountry: 'Canada',
  },
  {
    idEvent: '11',
    strEvent: 'Paris Saint-Germain vs Olympique Marseille',
    strLeague: 'French Ligue 1',
    strSport: 'Soccer',
    dateEvent: '2026-02-25',
    strTime: '21:00:00',
    strHomeTeam: 'Paris Saint-Germain',
    strAwayTeam: 'Olympique Marseille',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'Parc des Princes',
    strCountry: 'France',
  },
  {
    idEvent: '12',
    strEvent: 'Chicago Bulls vs Milwaukee Bucks',
    strLeague: 'NBA',
    strSport: 'Basketball',
    dateEvent: '2026-02-20',
    strTime: '20:00:00',
    strHomeTeam: 'Chicago Bulls',
    strAwayTeam: 'Milwaukee Bucks',
    intHomeScore: null,
    intAwayScore: null,
    strThumb: null,
    strStatus: 'Not Started',
    strVenue: 'United Center',
    strCountry: 'USA',
  },
];

/**
 * Fetches upcoming events for a specific date
 * API Endpoint: eventsday.php
 * Falls back to mock data if API is unreachable
 */
export async function fetchUpcomingEvents(dateStr?: string): Promise<SportEvent[]> {
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
    const events = data.events || [];
    
    // Transform API response to match SportEvent interface
    const transformedEvents = events.map((event: any) => ({
      idEvent: event.idEvent || '',
      strEvent: event.strEvent || '',
      strLeague: event.strLeague || '',
      strSport: event.strSport || '',
      dateEvent: event.dateEvent || '',
      strTime: event.strTime || '',
      strHomeTeam: event.strHomeTeam || '',
      strAwayTeam: event.strAwayTeam || '',
      intHomeScore: event.intHomeScore || null,
      intAwayScore: event.intAwayScore || null,
      strThumb: event.strThumb || null,
      strStatus: event.strStatus || 'Not Started',
      strVenue: event.strVenue || null,
      strCountry: event.strCountry || null,
    }));

    return transformedEvents.length > 0 ? transformedEvents : mockEvents;
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
export async function fetchEventDetails(eventId: string): Promise<SportEvent | null> {
  try {
    const url = `${BASE_URL}/${API_KEY}/lookupevent.php?id=${eventId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch event ${eventId}, checking mock data`);
      const event = mockEvents.find((e) => e.idEvent === eventId);
      return event || null;
    }

    const data = await response.json();
    const event = data.events?.[0];

    if (!event) {
      // Fall back to mock data
      const mockEvent = mockEvents.find((e) => e.idEvent === eventId);
      return mockEvent || null;
    }

    // Transform API response to match SportEvent interface
    return {
      idEvent: event.idEvent || '',
      strEvent: event.strEvent || '',
      strLeague: event.strLeague || '',
      strSport: event.strSport || '',
      dateEvent: event.dateEvent || '',
      strTime: event.strTime || '',
      strHomeTeam: event.strHomeTeam || '',
      strAwayTeam: event.strAwayTeam || '',
      intHomeScore: event.intHomeScore || null,
      intAwayScore: event.intAwayScore || null,
      strThumb: event.strThumb || null,
      strStatus: event.strStatus || 'Not Started',
      strVenue: event.strVenue || null,
      strCountry: event.strCountry || null,
    };
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
export async function searchEvents(query: string): Promise<SportEvent[]> {
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
    const events = data.events || [];

    if (events.length === 0) {
      // Fall back to mock data filtering
      return mockEvents.filter(
        (e) =>
          e.strEvent.toLowerCase().includes(query.toLowerCase()) ||
          e.strHomeTeam.toLowerCase().includes(query.toLowerCase()) ||
          e.strAwayTeam.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Transform API response to match SportEvent interface
    return events.map((event: any) => ({
      idEvent: event.idEvent || '',
      strEvent: event.strEvent || '',
      strLeague: event.strLeague || '',
      strSport: event.strSport || '',
      dateEvent: event.dateEvent || '',
      strTime: event.strTime || '',
      strHomeTeam: event.strHomeTeam || '',
      strAwayTeam: event.strAwayTeam || '',
      intHomeScore: event.intHomeScore || null,
      intAwayScore: event.intAwayScore || null,
      strThumb: event.strThumb || null,
      strStatus: event.strStatus || 'Not Started',
      strVenue: event.strVenue || null,
      strCountry: event.strCountry || null,
    }));
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
export async function fetchTeamUpcomingEvents(teamId: string): Promise<SportEvent[]> {
  try {
    const url = `${BASE_URL}/${API_KEY}/eventsnext.php?id=${teamId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch upcoming events for team ${teamId}, using mock data`);
      return mockEvents;
    }

    const data = await response.json();
    const events = data.events || [];

    if (events.length === 0) {
      return mockEvents;
    }

    return events.map((event: any) => ({
      idEvent: event.idEvent || '',
      strEvent: event.strEvent || '',
      strLeague: event.strLeague || '',
      strSport: event.strSport || '',
      dateEvent: event.dateEvent || '',
      strTime: event.strTime || '',
      strHomeTeam: event.strHomeTeam || '',
      strAwayTeam: event.strAwayTeam || '',
      intHomeScore: event.intHomeScore || null,
      intAwayScore: event.intAwayScore || null,
      strThumb: event.strThumb || null,
      strStatus: event.strStatus || 'Not Started',
      strVenue: event.strVenue || null,
      strCountry: event.strCountry || null,
    }));
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
export async function fetchTeamPastEvents(teamId: string): Promise<SportEvent[]> {
  try {
    const url = `${BASE_URL}/${API_KEY}/eventslast.php?id=${teamId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch past events for team ${teamId}`);
      return [];
    }

    const data = await response.json();
    const events = data.events || [];

    return events.map((event: any) => ({
      idEvent: event.idEvent || '',
      strEvent: event.strEvent || '',
      strLeague: event.strLeague || '',
      strSport: event.strSport || '',
      dateEvent: event.dateEvent || '',
      strTime: event.strTime || '',
      strHomeTeam: event.strHomeTeam || '',
      strAwayTeam: event.strAwayTeam || '',
      intHomeScore: event.intHomeScore || null,
      intAwayScore: event.intAwayScore || null,
      strThumb: event.strThumb || null,
      strStatus: event.strStatus || 'Match Finished',
      strVenue: event.strVenue || null,
      strCountry: event.strCountry || null,
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
export async function fetchEventsByDate(
  date: string,
  sport?: string,
  league?: string
): Promise<SportEvent[]> {
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
    const events = data.events || [];

    return events.length > 0
      ? events.map((event: any) => ({
          idEvent: event.idEvent || '',
          strEvent: event.strEvent || '',
          strLeague: event.strLeague || '',
          strSport: event.strSport || '',
          dateEvent: event.dateEvent || '',
          strTime: event.strTime || '',
          strHomeTeam: event.strHomeTeam || '',
          strAwayTeam: event.strAwayTeam || '',
          intHomeScore: event.intHomeScore || null,
          intAwayScore: event.intAwayScore || null,
          strThumb: event.strThumb || null,
          strStatus: event.strStatus || 'Not Started',
          strVenue: event.strVenue || null,
          strCountry: event.strCountry || null,
        }))
      : mockEvents;
  } catch (error) {
    console.error('Failed to fetch events by date:', error);
    return mockEvents;
  }
}

/**
 * Configuration helper - returns current API configuration
 */
export function getApiConfig() {
  return {
    apiKey: API_KEY,
    baseUrl: BASE_URL,
    timeout: API_TIMEOUT,
    mockFallbackEnabled: USE_MOCK_FALLBACK,
    apiVersion: 'v1',
  };
}

export function getUniqueSports(events: SportEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.strSport)));
}

export function getUniqueLeagues(events: SportEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.strLeague)));
}
