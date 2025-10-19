'use client';

import * as React from 'react';
import { SearchBar } from '@/components/toc/SearchBar';
import { FilterChips } from '@/components/toc/FilterChips';
import { TOCHero } from '@/components/toc/TOCHero';
import { ViewModeToggle, type ViewMode } from '@/components/toc/ViewModeToggle';
import { SectionCard } from '@/components/toc/SectionCard';
import { curriculum } from '@/lessons';
import { useLessonSearch } from '@/hooks/use-lesson-search';
import { useProgressStore } from '@/lib/progress-store';
import { BookOpen } from 'lucide-react';
import type { Section, SectionWithLessons } from '@/types/lesson';

export default function TableOfContentsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSections, setSelectedSections] = React.useState<Set<string>>(
    new Set()
  );
  const [viewMode, setViewMode] = React.useState<ViewMode>('list');

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

  // Calculate stats
  const progress = useProgressStore();
  const totalLessons = curriculum.lessons.length;
  const totalMinutes = curriculum.lessons.reduce(
    (sum, lesson) => sum + lesson.meta.estimatedMinutes,
    0
  );
  const totalHours = Math.ceil(totalMinutes / 60);
  const completedLessons = curriculum.lessons.filter(
    (lesson) => progress.getLesson(lesson.meta.slug)?.status === 'completed'
  ).length;

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <TOCHero
          totalLessons={totalLessons}
          totalHours={totalHours}
          completedLessons={completedLessons}
        />

        {/* Search, Filters, and View Mode */}
        <div className="space-y-6 rounded-2xl border bg-card p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                resultCount={filteredLessons.length}
                totalCount={curriculum.lessons.length}
              />
            </div>
            <ViewModeToggle mode={viewMode} onChange={setViewMode} />
          </div>

          <FilterChips
            sections={sections}
            selectedSections={selectedSections}
            onToggle={handleToggleSection}
            onClearAll={handleClearFilters}
          />
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {showEmptyState ? (
            <div
              data-testid="empty-state"
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/30 py-20 text-center"
            >
              <div className="mx-auto max-w-md space-y-6">
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-muted">
                  <BookOpen className="size-10 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    Filtrelerinizle eşleşen ders bulunamadı
                  </h3>
                  <p className="text-muted-foreground">
                    Arama sorgunuzu veya seçili bölümleri ayarlamayı deneyin
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          ) : (
            filteredSections.map((section) => (
              <SectionCard
                key={section.section.id}
                section={section}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
