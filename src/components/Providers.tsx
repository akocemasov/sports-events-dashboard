'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './AppLayout';
import { useAuthStore } from '@/stores/authStore';

export function Providers({ children }: { children: ReactNode }) {
  const { checkAuth } = useAuthStore();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    // Initialize auth on app load
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
}
