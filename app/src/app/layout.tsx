import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthoringToolbar } from '@/components/authoring/Toolbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Neoesis - The New Mind of Learning',
    template: '%s | Neoesis',
  },
  description:
    'Neoesis is an intelligent learning platform that adapts to you. It doesn\'t just teach — it understands how you learn, guiding you through interactive lessons that turn knowledge into lasting insight.',
  keywords: [
    'learning',
    'education',
    'tutorials',
    'interactive',
    'programming',
    'web development',
    'understanding',
    'insight',
    'adaptive learning',
  ],
  authors: [{ name: 'Neoesis Team' }],
  creator: 'Neoesis',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Neoesis',
    title: 'Neoesis - The New Mind of Learning',
    description:
      'An intelligent learning platform that adapts to you. Transform knowledge into lasting insight through understanding.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="neoesis-theme">
          {/* Skip link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>

          <Header />
          {children}
          <Footer />

          {/* Dev-only authoring toolbar */}
          <Suspense fallback={null}>
            <AuthoringToolbar />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
