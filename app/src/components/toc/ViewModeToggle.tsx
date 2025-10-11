'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

/**
 * ViewModeToggle - Switch between grid and list view modes
 *
 * Features:
 * - Two view modes: grid and list
 * - Icon-based design
 * - Active state indicator
 * - Accessible labels
 */
export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('grid')}
        className={`gap-2 ${
          mode === 'grid'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
            : 'text-muted-foreground'
        }`}
        aria-label="Grid view"
        aria-pressed={mode === 'grid'}
      >
        <LayoutGrid className="size-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('list')}
        className={`gap-2 ${
          mode === 'list'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
            : 'text-muted-foreground'
        }`}
        aria-label="List view"
        aria-pressed={mode === 'list'}
      >
        <LayoutList className="size-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
}
