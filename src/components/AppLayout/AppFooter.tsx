export function AppFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-text-secondary">
          © 2026{' '}
          <a
            href="https://github.com/akocemasov"
            target="_blank"
            rel="noreferrer"
            className="text-link hover:underline"
          >
            Alex Cocemasov
          </a>
          . Data provided by{' '}
          <a
            href="https://www.thesportsdb.com/"
            target="_blank"
            rel="noreferrer"
            className="text-link hover:underline"
          >
            TheSportsDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
