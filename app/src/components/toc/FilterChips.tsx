'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import type { Section } from '@/types/lesson';

interface FilterChipsProps {
  sections: Section[];
  selectedSections: Set<string>;
  onToggle: (sectionId: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  sections,
  selectedSections,
  onToggle,
  onClearAll,
}: FilterChipsProps) {
  const activeCount = selectedSections.size;
  const hasActiveFilters = activeCount > 0;

  return (
    <div
      data-testid="filter-chips"
      className="space-y-3"
      role="group"
      aria-label="Filter lessons by section"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">
            Filter by Section
          </h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {activeCount} selected
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="size-3" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const isSelected = selectedSections.has(section.id);
          return (
            <button
              key={section.id}
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggle(section.id)}
              className={`
                group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all
                ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-accent hover:text-accent-foreground'
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              `}
            >
              <span className="capitalize">
                {section.title || section.id.replace(/-/g, ' ')}
              </span>
              {isSelected && (
                <X className="size-3 transition-transform group-hover:scale-110" />
              )}
            </button>
          );
        })}
      </div>

      {!hasActiveFilters && (
        <p className="text-xs text-muted-foreground">
          Select sections to filter lessons
        </p>
      )}
    </div>
  );
}
