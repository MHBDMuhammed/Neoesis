'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'limbo-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  // Hydrate theme from localStorage and detect OS preference
  React.useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored && ['light', 'dark', 'high-contrast'].includes(stored)) {
      setThemeState(stored);
      return;
    }

    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia(
      '(prefers-contrast: more)'
    ).matches;
    if (prefersHighContrast) {
      setThemeState('high-contrast');
      return;
    }

    // Check for dark mode preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      setThemeState('dark');
      return;
    }
  }, [storageKey]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);

      // Update document class for CSS
      const root = document.documentElement;
      root.classList.remove('light', 'dark', 'high-contrast');
      root.classList.add(newTheme);
    },
    [storageKey]
  );

  // Listen for OS preference changes
  React.useEffect(() => {
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTheme('high-contrast');
      }
    };

    const handleDarkChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(storageKey);
      // Only auto-switch if user hasn't manually set a theme
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    contrastQuery.addEventListener('change', handleContrastChange);
    darkQuery.addEventListener('change', handleDarkChange);

    return () => {
      contrastQuery.removeEventListener('change', handleContrastChange);
      darkQuery.removeEventListener('change', handleDarkChange);
    };
  }, [storageKey, setTheme]);

  // Update document class when theme changes
  React.useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast');
    root.classList.add(theme);
  }, [theme, mounted]);

  const value = React.useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
