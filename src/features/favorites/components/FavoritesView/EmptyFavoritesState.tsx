import { Heart } from 'lucide-react';

export const EmptyFavoritesState = () => {
  return (
    <div className="text-center py-12 bg-surface-card rounded-xl border border-border-subtle">
      <Heart className="w-16 h-16 text-text-muted mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-text-primary mb-2">No favorites yet</h3>
      <p className="text-text-secondary mb-4">
        Start adding events to your favorites by clicking the heart icon
      </p>
    </div>
  );
};
