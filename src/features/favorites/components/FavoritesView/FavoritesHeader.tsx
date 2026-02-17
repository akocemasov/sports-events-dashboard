'use client';

import { Heart } from 'lucide-react';

export const FavoritesHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Events you&apos;ve saved to your watchlist</p>
    </div>
  );
};
