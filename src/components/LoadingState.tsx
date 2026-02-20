import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">{message}</p>
      </div>
    </div>
  );
};
