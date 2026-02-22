import { fetchWithTimeout } from '@/utils/api';

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn() as jest.Mock;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns fetch response before timeout', async () => {
    const response = { ok: true, status: 200 } as Response;
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue(response);

    const resultPromise = fetchWithTimeout('https://example.com', 1000);
    await jest.advanceTimersByTimeAsync(10);

    await expect(resultPromise).resolves.toBe(response);
    expect(fetchMock).toHaveBeenCalledWith('https://example.com', expect.any(Object));
  });

  it('aborts when fetch does not resolve before timeout', async () => {
    const abortError = new Error('Aborted');

    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockImplementation(
      (_url, init) =>
        new Promise((_, reject) => {
          const signal = init?.signal as AbortSignal;
          signal.addEventListener('abort', () => reject(abortError));
        })
    );

    const request = fetchWithTimeout('https://example.com', 50);
    const assertion = expect(request).rejects.toThrow('Aborted');
    await jest.advanceTimersByTimeAsync(50);

    await assertion;
  });
});
