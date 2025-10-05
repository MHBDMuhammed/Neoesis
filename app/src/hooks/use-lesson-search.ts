'use client';

import { useState, useEffect, useMemo } from 'react';
import { createLessonSearch } from '@/lib/search';
import type { LessonWithMeta } from '@/types/lesson';

/**
 * Hook for fuzzy searching lessons with debounced input
 *
 * Features:
 * - 300ms debounce delay to reduce search frequency during typing
 * - Client-side only (marked with 'use client')
 * - Searches across title, description, objectives, and section
 * - Returns full LessonWithMeta objects (not just metadata)
 *
 * @param lessons - Array of lessons to search
 * @param query - Search query string
 * @returns Filtered array of lessons matching the query
 *
 * @example
 * ```tsx
 * function SearchableList() {
 *   const [query, setQuery] = useState('');
 *   const filteredLessons = useLessonSearch(lessons, query);
 *
 *   return (
 *     <>
 *       <input value={query} onChange={e => setQuery(e.target.value)} />
 *       {filteredLessons.map(lesson => <LessonCard key={lesson.meta.slug} lesson={lesson} />)}
 *     </>
 *   );
 * }
 * ```
 */
export function useLessonSearch(
  lessons: LessonWithMeta[],
  query: string
): LessonWithMeta[] {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce search query (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Memoize Fuse instance to avoid recreating on every render
  const fuse = useMemo(() => {
    const lessonMeta = lessons.map(l => l.meta);
    return createLessonSearch(lessonMeta);
  }, [lessons]);

  // Perform search and map back to full LessonWithMeta objects
  const filteredLessons = useMemo(() => {
    // Return all lessons if query is empty or too short
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      return lessons;
    }

    // Search returns Fuse result objects with { item, refIndex }
    const results = fuse.search(debouncedQuery.trim());

    // Map results back to full LessonWithMeta objects using slug
    return results.map(result => {
      const lesson = lessons.find(l => l.meta.slug === result.item.slug);
      return lesson!; // Safe because search results come from same dataset
    });
  }, [debouncedQuery, lessons, fuse]);

  return filteredLessons;
}
