import { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>;
}
