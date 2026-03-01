import 'server-only';

const DEFAULT_API_KEY = '123';
const DEFAULT_API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

export type ServerApiConfig = {
  apiKey: string;
  baseUrl: string;
};

const removeTrailingSlash = (value: string): string => value.replace(/\/$/, '');

export const getServerApiConfig = (): ServerApiConfig => ({
  apiKey: process.env.API_KEY || DEFAULT_API_KEY,
  baseUrl: removeTrailingSlash(process.env.API_BASE_URL || DEFAULT_API_BASE_URL),
});
