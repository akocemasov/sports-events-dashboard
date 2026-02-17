'use client';

export const DemoNotice = () => {
  return (
    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <p className="text-sm text-blue-800 dark:text-blue-300">
        <strong>Demo Mode:</strong> Enter any email and password to login. This is a frontend-only
        authentication for portfolio demonstration.
      </p>
    </div>
  );
};
