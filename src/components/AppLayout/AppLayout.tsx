'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';
import { AppShell } from './AppShell';

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { effectiveTheme, setTheme, initTheme } = useThemeStore();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    initTheme();
    checkAuth();
  }, [initTheme, checkAuth]);

  const handleToggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <AppHeader
        pathname={pathname}
        effectiveTheme={effectiveTheme}
        onToggleTheme={handleToggleTheme}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <AppShell>{children}</AppShell>
      <AppFooter />
    </div>
  );
}
