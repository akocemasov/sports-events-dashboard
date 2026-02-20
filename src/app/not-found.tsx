import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <Search className="w-24 h-24 text-text-muted mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page not found</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
