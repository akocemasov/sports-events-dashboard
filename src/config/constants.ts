/**
 * Project-wide configuration constants
 * API credentials should be set via environment variables
 */

// API Configuration
export const API_KEY = process.env.NEXT_PUBLIC_SPORTS_API_KEY || '123';
export const BASE_URL =
  process.env.NEXT_PUBLIC_SPORTS_API_BASE_URL || 'https://www.thesportsdb.com/api/v1/json';

// API Request Settings
export const API_TIMEOUT = 8000; // 8 second timeout for API calls
export const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes - data considered fresh for this duration
export const QUERY_REFETCH_INTERVAL = 30 * 1000; // 30 seconds - periodic background refetch for live data

// Feature Flags
export const USE_MOCK_FALLBACK = false; // Only use mock data as last resort fallback

// App Display Name
export const APP_NAME = 'SportsEventsDash';
