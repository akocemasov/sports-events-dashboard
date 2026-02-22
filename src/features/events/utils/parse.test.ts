import { EVENT_STATUS } from '@/config/constants';
import {
  formatEventStatus,
  getUniqueLeagues,
  getUniqueSports,
  isEventFinished,
  isEventLive,
  isFavoriteEvent,
  parseEventsArray,
  parseEventSingle,
} from '@/features/events/utils/parse';
import { mockEvents } from '@/mocks/mockEvents';

describe('parse utilities', () => {
  it('detects finished and live statuses', () => {
    expect(isEventFinished(EVENT_STATUS.FINISHED)).toBe(true);
    expect(isEventFinished(EVENT_STATUS.AFTER_OVERTIME)).toBe(true);
    expect(isEventFinished(EVENT_STATUS.Q1)).toBe(false);

    expect(isEventLive(EVENT_STATUS.Q1)).toBe(true);
    expect(isEventLive(EVENT_STATUS.HALFTIME)).toBe(true);
    expect(isEventLive(EVENT_STATUS.FINISHED)).toBe(false);
  });

  it('formats known and unknown statuses', () => {
    expect(formatEventStatus(EVENT_STATUS.FINISHED)).toBe('Match Finished');
    expect(formatEventStatus(EVENT_STATUS.HALFTIME)).toBe('Halftime');
    expect(formatEventStatus(null)).toBe('Not Started');
    expect(formatEventStatus('CUSTOM')).toBe('CUSTOM');
  });

  it('checks favorite event by date key', () => {
    const favorites = {
      '2026-02-20': ['1', '12'],
    };

    expect(isFavoriteEvent('1', '2026-02-20', favorites)).toBe(true);
    expect(isFavoriteEvent('2', '2026-02-20', favorites)).toBe(false);
    expect(isFavoriteEvent('1', '2026-02-21', favorites)).toBe(false);
  });

  it('parses valid and invalid event payloads', () => {
    expect(parseEventsArray(mockEvents)).toHaveLength(12);
    expect(parseEventsArray('invalid')).toBeNull();

    expect(parseEventSingle(mockEvents[0])?.idEvent).toBe('1');
    expect(parseEventSingle({ idEvent: 123 })).toBeNull();
  });

  it('returns unique sports and leagues', () => {
    const sports = getUniqueSports(mockEvents);
    const leagues = getUniqueLeagues(mockEvents);

    expect(sports).toContain('Soccer');
    expect(sports).toContain('Basketball');
    expect(leagues).toContain('NBA');
    expect(leagues).toContain('English Premier League');
  });
});
