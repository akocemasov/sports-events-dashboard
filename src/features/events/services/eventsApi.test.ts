import {
  eventsQueryKeys,
  fetchEventDetails,
  fetchEventsPerDay,
} from '@/features/events/services/eventsApi';
import { parseEventsArray, parseEventSingle } from '@/features/events/utils/parse';
import { mockEvents } from '@/mocks/mockEvents';
import { fetchWithTimeout } from '@/utils/api';

jest.mock('@/utils/api', () => ({
  fetchWithTimeout: jest.fn(),
}));

jest.mock('@/features/events/utils/parse', () => ({
  parseEventsArray: jest.fn(),
  parseEventSingle: jest.fn(),
}));

const fetchWithTimeoutMock = jest.mocked(fetchWithTimeout);
const parseEventsArrayMock = jest.mocked(parseEventsArray);
const parseEventSingleMock = jest.mocked(parseEventSingle);

describe('eventsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds stable query keys', () => {
    expect(eventsQueryKeys.eventsPerDay('2026-02-20')).toEqual(['events', 'per-day', '2026-02-20']);
    expect(eventsQueryKeys.eventsPerDay()).toEqual(['events', 'per-day', 'today']);
    expect(eventsQueryKeys.eventDetails('10')).toEqual(['event', 'details', '10']);
  });

  it('returns parsed events when API succeeds', async () => {
    fetchWithTimeoutMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ events: mockEvents }),
    } as Response);
    parseEventsArrayMock.mockReturnValue(mockEvents);

    await expect(fetchEventsPerDay('2026-02-20')).resolves.toEqual(mockEvents);

    expect(parseEventsArrayMock).toHaveBeenCalled();
  });

  it('returns empty list when response is not ok or parse fails', async () => {
    fetchWithTimeoutMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    await expect(fetchEventsPerDay('2026-02-20')).resolves.toEqual([]);

    fetchWithTimeoutMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ events: mockEvents }),
    } as Response);
    parseEventsArrayMock.mockReturnValue(null);

    await expect(fetchEventsPerDay('2026-02-20')).resolves.toEqual([]);
  });

  it('returns null for event details when fetch fails or parse fails', async () => {
    fetchWithTimeoutMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    await expect(fetchEventDetails('1')).resolves.toBeNull();

    fetchWithTimeoutMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ events: [mockEvents[0]] }),
    } as Response);
    parseEventSingleMock.mockReturnValue(null);

    await expect(fetchEventDetails('1')).resolves.toBeNull();
  });

  it('returns parsed event details when successful', async () => {
    fetchWithTimeoutMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ events: [mockEvents[0]] }),
    } as Response);
    parseEventSingleMock.mockReturnValue(mockEvents[0]);

    await expect(fetchEventDetails('1')).resolves.toEqual(mockEvents[0]);
  });
});
