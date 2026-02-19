export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2026{' '}
          <a
            href="https://github.com/akocemasov"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Alex Cocemasov
          </a>
          . Data provided by{' '}
          <a
            href="https://www.thesportsdb.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            TheSportsDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
