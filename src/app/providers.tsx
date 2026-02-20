'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import AppLayout from '@/components/AppLayout';
import { QUERY_REFETCH_INTERVAL, QUERY_STALE_TIME } from '@/config/appConfig';

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
      refetchInterval: QUERY_REFETCH_INTERVAL,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
}
