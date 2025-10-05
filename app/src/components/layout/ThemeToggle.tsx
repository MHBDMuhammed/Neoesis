'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual toggle to avoid SSR issues
const ThemeToggleClient = dynamic(
  () => import('./ThemeToggleClient').then((mod) => mod.ThemeToggleClient),
  {
    ssr: false,
    loading: () => (
      <div className="size-10 animate-pulse rounded-full bg-muted" />
    ),
  }
);

export function ThemeToggle() {
  return <ThemeToggleClient />;
}
