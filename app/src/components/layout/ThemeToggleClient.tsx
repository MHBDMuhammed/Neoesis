'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Sun, Moon, Contrast } from 'lucide-react';

export function ThemeToggleClient() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = React.useCallback(() => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('high-contrast');
    else setTheme('light');
  }, [theme, setTheme]);

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="size-5" />;
    if (theme === 'high-contrast') return <Contrast className="size-5" />;
    return <Sun className="size-5" />;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="rounded-full"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'high contrast' : 'light'} theme`}
    >
      {getThemeIcon()}
    </Button>
  );
}
