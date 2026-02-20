import { format } from 'date-fns';
import { Heart, LogOut, Moon, Sun, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { APP_NAME } from '@/config/appConfig';
import { useEventsStore } from '@/store/eventsStore';

type AppHeaderProps = {
  pathname: string;
  effectiveTheme: string;
  onToggleTheme: () => void;
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
};

export function AppHeader({
  pathname,
  effectiveTheme,
  onToggleTheme,
  isAuthenticated,
  userName,
  onLogout,
}: AppHeaderProps) {
  const selectedDate = useEventsStore((state) => state.filters.selectedDate);
  const favoritesByDate = useEventsStore((state) => state.favoritesByDate);

  const selectedDateKey = format(selectedDate ?? new Date(), 'yyyy-MM-dd');
  const favoritesCount = favoritesByDate[selectedDateKey]?.length ?? 0;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt={APP_NAME} width={40} height={40} />
            <span className="text-xl font-bold text-text-primary">{APP_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-base font-medium transition-colors ${
                isActive('/') ? 'text-link' : 'text-text-secondary hover:text-link'
              }`}
            >
              Events
            </Link>
            <Link
              href="/favorites"
              className={`flex items-center gap-1 text-base font-medium transition-colors ${
                isActive('/favorites') ? 'text-link' : 'text-text-secondary hover:text-link'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="relative inline-flex">
                Favorites
                <Badge
                  variant="outline"
                  className="absolute -top-1.5 -right-5 h-4 min-w-4 border-danger-500 bg-danger-500 px-1 text-[10px] leading-none text-white"
                >
                  {favoritesCount}
                </Badge>
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-surface-interactive transition-colors"
              aria-label="Toggle theme"
            >
              {effectiveTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-text-secondary" />
              ) : (
                <Moon className="w-5 h-5 text-text-secondary" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-interactive rounded-lg">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-primary">{userName}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-danger-500 hover:bg-danger-400/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-4 pb-3 border-t border-border-subtle pt-3 mt-2">
          <Link
            href="/"
            className={`flex-1 text-center text-base font-medium py-2 rounded-lg transition-colors ${
              isActive('/')
                ? 'bg-brand-600 text-white'
                : 'text-text-secondary hover:bg-surface-interactive'
            }`}
          >
            Events
          </Link>
          <Link
            href="/favorites"
            className={`flex-1 text-center text-base font-medium py-2 rounded-lg transition-colors ${
              isActive('/favorites')
                ? 'bg-brand-600 text-white'
                : 'text-text-secondary hover:bg-surface-interactive'
            }`}
          >
            <span className="relative inline-flex">
              Favorites
              <Badge
                variant="outline"
                className="absolute -top-1.5 -right-5 h-4 min-w-4 border-danger-500 bg-danger-500 px-1 text-[10px] leading-none text-white"
              >
                {favoritesCount}
              </Badge>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
