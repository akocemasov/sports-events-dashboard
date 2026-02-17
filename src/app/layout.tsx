import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/features/shared/ui/Sonner';
import { Providers } from '@/features/shared/components/Providers';
import '@/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sports Event Dashboard',
  description: 'A full-featured web dashboard for sports events and results',
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
