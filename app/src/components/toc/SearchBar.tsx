'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleClear = React.useCallback(() => {
    onChange('');
  }, [onChange]);

  const showResultCount = value.length >= 2 && resultCount !== undefined;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors" />
        <Input
          type="search"
          placeholder="Ders ara..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`h-12 ps-10 pe-10 transition-all ${
            isFocused ? 'ring-2 ring-ring ring-offset-2' : ''
          }`}
          aria-label="Ders ara"
          aria-describedby={showResultCount ? 'search-results' : undefined}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute end-1 top-1/2 size-8 -translate-y-1/2 p-0 hover:bg-transparent"
            aria-label="Aramayı temizle"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Live region for screen readers */}
      {showResultCount && (
        <p
          id="search-results"
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {totalCount} dersten {resultCount} tanesi bulundu
        </p>
      )}
    </div>
  );
}
