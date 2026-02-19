import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const BackToEventsLink = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to events
    </Link>
  );
};
