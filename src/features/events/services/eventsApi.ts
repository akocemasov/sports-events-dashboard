import { API_KEY, BASE_URL } from '@/config/constants';
import { parseEventsArray, parseEventSingle } from '@/features/events/utils/parse';
import { SportEvent } from '@/types/events';
import { fetchWithTimeout } from '@/utils/api';

export const eventsQueryKeys = {
  eventsPerDay: (date?: string) => ['events', 'per-day', date ?? 'today'] as const,
  eventDetails: (eventId: string) => ['event', 'details', eventId] as const,
};

/**
 * Fetches upcoming events for a specific date
 * API Endpoint: eventsday.php
 */
export const fetchEventsPerDay = async (dateStr?: string): Promise<SportEvent[]> => {
  try {
    // Use today's date if not provided
    const targetDate = dateStr || new Date().toISOString().split('T')[0];

    const url = `${BASE_URL}/${API_KEY}/eventsday.php?d=${targetDate}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`API request failed with status ${response.status}`);
      return [];
    }

    const data = await response.json();
    const parsedEvents = parseEventsArray(data?.events);

    if (!parsedEvents) {
      console.warn('Upcoming events payload failed validation');
      return [];
    }

    return parsedEvents;
  } catch (error) {
    console.error('Failed to fetch upcoming events from API:', error);
    return [];
  }
};

/**
 * Fetches details for a specific event by ID
 * API Endpoint: lookupevent.php
 */
export const fetchEventDetails = async (eventId: string): Promise<SportEvent | null> => {
  try {
    const url = `${BASE_URL}/${API_KEY}/lookupevent.php?id=${eventId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.warn(`Failed to fetch event ${eventId}`);
      return null;
    }

    const data = await response.json();
    const parsedEvent = parseEventSingle(data?.events?.[0]);

    if (!parsedEvent) {
      return null;
    }

    return parsedEvent;
  } catch (error) {
    console.error(`Failed to fetch event details for ID ${eventId}:`, error);
    return null;
  }
};
