import { NextRequest, NextResponse } from 'next/server';

import { buildUpstreamUrl } from '@/server/proxy';
import { fetchWithTimeout } from '@/utils/api';

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export const GET = async (request: NextRequest, context: RouteContext): Promise<NextResponse> => {
  const { path } = await context.params;
  const endpoint = path?.[0];

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  const upstreamUrl = buildUpstreamUrl(endpoint, request.nextUrl.searchParams);

  if (!upstreamUrl) {
    return NextResponse.json({ error: 'Endpoint not allowed' }, { status: 404 });
  }

  try {
    const response = await fetchWithTimeout(upstreamUrl);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Failed to proxy SportsDB endpoint ${endpoint}:`, error);
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 500 });
  }
};
