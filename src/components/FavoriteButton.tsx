'use client';

import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

export const FavoriteButton = ({ isFavorite, onToggle, className = '' }: FavoriteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-5 h-5 ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'
        }`}
      />
    </button>
  );
};
