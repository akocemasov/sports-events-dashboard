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
      className={`p-2 bg-surface-card rounded-full shadow-md hover:scale-110 transition-transform ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-5 h-5 ${isFavorite ? 'fill-danger-500 text-danger-500' : 'text-text-muted'}`}
      />
    </button>
  );
};
