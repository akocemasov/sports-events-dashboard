'use client';

interface LiveIndicatorProps {
  isLive?: boolean;
  className?: string;
}

export const LiveIndicator = ({ isLive = true, className = '' }: LiveIndicatorProps) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
        isLive
          ? 'bg-red-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
      } ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isLive ? 'bg-white animate-pulse' : 'bg-gray-400 dark:bg-gray-500'
        }`}
      />
      LIVE
    </div>
  );
};
