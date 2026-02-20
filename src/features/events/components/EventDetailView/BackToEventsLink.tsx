import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const BackToEventsLink = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-text-secondary hover:text-link transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to events
    </Link>
  );
};
