import { API_TIMEOUT } from '@/config/constants';

/**
 * Fetches a URL with a timeout
 * Aborts the request if it takes longer than the specified timeout
 *
 * @param url - The URL to fetch
 * @param timeout - Timeout in milliseconds (defaults to API_TIMEOUT)
 * @returns The fetch Response
 * @throws Error if the request times out or fails
 */
export const fetchWithTimeout = async (
  url: string,
  timeout: number = API_TIMEOUT
): Promise<Response> => {
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
