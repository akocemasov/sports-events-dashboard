'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import { QUERY_REFETCH_INTERVAL,QUERY_STALE_TIME } from '@/config/appConfig';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            refetchOnWindowFocus: false,
            refetchInterval: QUERY_REFETCH_INTERVAL,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
}
