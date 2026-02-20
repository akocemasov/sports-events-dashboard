'use client';

import { Heart } from 'lucide-react';

export const FavoritesHeader = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Heart className="w-8 h-8 text-danger-500 fill-danger-500" />
        <h1 className="text-3xl font-bold text-text-primary">My Favorites</h1>
      </div>
      <p className="text-text-secondary">Events you&apos;ve saved to your watchlist</p>
    </div>
  );
};
