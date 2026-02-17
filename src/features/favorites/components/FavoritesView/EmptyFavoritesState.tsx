'use client';

import { Heart } from 'lucide-react';

export const EmptyFavoritesState = () => {
  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <Heart className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Start adding events to your favorites by clicking the heart icon
      </p>
    </div>
  );
};
