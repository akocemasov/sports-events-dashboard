'use client';

import { ReactNode, useEffect } from 'react';
import { AppLayout } from './AppLayout';
import { useAuthStore } from '@/stores/authStore';

export function Providers({ children }: { children: ReactNode }) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app load
    checkAuth();
  }, [checkAuth]);

  return <AppLayout>{children}</AppLayout>;
}
