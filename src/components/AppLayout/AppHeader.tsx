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
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt={APP_NAME} width={40} height={40} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Events
            </Link>
            <Link
              href="/favorites"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive('/favorites')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="relative inline-flex">
                Favorites
                <Badge
                  variant="outline"
                  className="absolute -top-1.5 -right-5 h-4 min-w-4 border-red-500 bg-red-500 px-1 text-[10px] leading-none text-white"
                >
                  {favoritesCount}
                </Badge>
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {effectiveTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-900 dark:text-white">{userName}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-4 pb-3 border-t border-gray-200 dark:border-gray-800 pt-3 mt-2">
          <Link
            href="/"
            className={`flex-1 text-center text-sm font-medium py-2 rounded-lg transition-colors ${
              isActive('/')
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Events
          </Link>
          <Link
            href="/favorites"
            className={`flex-1 text-center text-sm font-medium py-2 rounded-lg transition-colors ${
              isActive('/favorites')
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="relative inline-flex">
              Favorites
              <Badge
                variant="outline"
                className="absolute -top-1.5 -right-5 h-4 min-w-4 border-red-500 bg-red-500 px-1 text-[10px] leading-none text-white"
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
