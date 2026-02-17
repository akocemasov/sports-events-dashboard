import { API_KEY, BASE_URL } from '@/config/constants';
import { parseEventsArray, parseEventSingle } from '@/features/events/utils/parse';
import { mockEvents } from '@/mocks/mockEvents';
import { SportEvent } from '@/store/eventsStore';
import { fetchWithTimeout } from '@/utils/api';

export const eventsQueryKeys = {
  upcomingEvents: (date?: string) => ['events', 'upcoming', date ?? 'today'] as const,
  eventDetails: (eventId: string) => ['events', 'details', eventId] as const,
  searchEvents: (query: string) => ['events', 'search', query] as const,
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
};

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
};

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
};

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
};

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
};

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
};
