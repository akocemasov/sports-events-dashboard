'use client';

interface LiveIndicatorProps {
  className?: string;
}

export const LiveIndicator = ({ className = '' }: LiveIndicatorProps) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full ${className}`}
    >
      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      LIVE
    </div>
  );
};
