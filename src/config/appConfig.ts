/**
 * Client-safe application configuration constants.
 */

export const APP_NAME = 'SportsEventsDash';
export const API_PROXY_BASE_PATH = '/api/sportsdb';

export const API_TIMEOUT = 8 * 1000; // 8 second timeout for API calls
export const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes - data considered fresh for this duration
export const QUERY_REFETCH_INTERVAL = 30 * 1000; // 30 seconds - periodic background refetch for live data
