import 'server-only';

import { getServerApiConfig } from '@/config/serverApiConfig';

const allowedEndpoints = new Set(['eventsday.php', 'lookupevent.php']);

const toQueryString = (searchParams: URLSearchParams): string => {
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const buildUpstreamUrl = (
  endpoint: string,
  searchParams: URLSearchParams
): string | null => {
  if (!allowedEndpoints.has(endpoint)) {
    return null;
  }

  const { apiKey, baseUrl } = getServerApiConfig();
  return `${baseUrl}/${apiKey}/${endpoint}${toQueryString(searchParams)}`;
};
