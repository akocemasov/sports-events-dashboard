interface LiveIndicatorProps {
  isLive?: boolean;
  className?: string;
}

export const LiveIndicator = ({ isLive = true, className = '' }: LiveIndicatorProps) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
        isLive ? 'bg-danger-500 text-white' : 'bg-surface-interactive text-text-muted'
      } ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-text-muted'}`}
      />
      LIVE
    </div>
  );
};
