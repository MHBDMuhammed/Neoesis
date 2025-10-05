'use client';

import * as React from 'react';
import { SearchBar } from '@/components/toc/SearchBar';
import { FilterChips } from '@/components/toc/FilterChips';
import { ProgressBar } from '@/components/toc/ProgressBar';
import { SectionCard } from '@/components/toc/SectionCard';
import { curriculum } from '@/lessons';
import { useLessonSearch } from '@/hooks/use-lesson-search';
import { BookOpen } from 'lucide-react';
import type { Section, SectionWithLessons } from '@/types/lesson';

export default function TableOfContentsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSections, setSelectedSections] = React.useState<Set<string>>(
    new Set()
  );

  // Apply search
  const searchResults = useLessonSearch(curriculum.lessons, searchQuery);

  // Apply section filter
  const filteredLessons = React.useMemo(() => {
    if (selectedSections.size === 0) {
      return searchResults;
    }
    return searchResults.filter((lesson) =>
      selectedSections.has(lesson.meta.section)
    );
  }, [searchResults, selectedSections]);

  // Group filtered lessons by section
  const filteredSections = React.useMemo(() => {
    const sectionMap = new Map<string, SectionWithLessons>();

    // Initialize all sections
    curriculum.sections.forEach((section) => {
      sectionMap.set(section.section.id, {
        ...section,
        lessons: [],
      });
    });

    // Add filtered lessons to their sections
    filteredLessons.forEach((lesson) => {
      const section = sectionMap.get(lesson.meta.section);
      if (section) {
        section.lessons.push(lesson);
        // Recalculate total minutes for filtered lessons
        section.totalMinutes = section.lessons.reduce(
          (sum, l) => sum + l.meta.estimatedMinutes,
          0
        );
      }
    });

    // Return only sections that have lessons
    return Array.from(sectionMap.values()).filter(
      (section) => section.lessons.length > 0
    );
  }, [filteredLessons]);

  const handleToggleSection = React.useCallback((sectionId: string) => {
    setSelectedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setSelectedSections(new Set());
  }, []);

  const sections: Section[] = React.useMemo(
    () => curriculum.sections.map((s) => s.section),
    []
  );

  const showEmptyState =
    filteredSections.length === 0 && (searchQuery || selectedSections.size > 0);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Table of Contents
              </h1>
              <p className="text-muted-foreground">
                Explore our complete curriculum
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar />
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredLessons.length}
            totalCount={curriculum.lessons.length}
          />

          <FilterChips
            sections={sections}
            selectedSections={selectedSections}
            onToggle={handleToggleSection}
            onClearAll={handleClearFilters}
          />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {showEmptyState ? (
            <div
              data-testid="empty-state"
              className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 py-16 text-center"
            >
              <div className="mx-auto max-w-md space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
                  <BookOpen className="size-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    No lessons match your filters
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search query or selected sections
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Clear filters
                </button>
              </div>
            </div>
          ) : (
            filteredSections.map((section) => (
              <SectionCard key={section.section.id} section={section} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
