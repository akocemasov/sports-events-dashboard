import '@/styles/index.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/app/providers';
import { Toaster } from '@/components/ui/Sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sports Events Dashboard',
  description: 'A demo web dashboard for sports events and results',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
