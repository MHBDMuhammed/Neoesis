import Fuse, { type IFuseOptions } from 'fuse.js';
import type { LessonMeta } from '@/types/lesson';

/**
 * Fuse.js search configuration for lesson search
 *
 * Configuration based on research.md R2:
 * - Threshold 0.3: Allows ~30% character mismatch for typo tolerance
 * - ignoreLocation: true: Match anywhere in string
 * - minMatchCharLength: 2: Require at least 2 characters to match
 * - Keys: title, description, objectives (array), section
 *
 * @see specs/001-produce-a-crisp/research.md R2
 */
export const searchOptions: IFuseOptions<LessonMeta> = {
  keys: [
    { name: 'title', weight: 1 },
    { name: 'description', weight: 1 },
    { name: 'objectives', weight: 1 },
    { name: 'section', weight: 1 }
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2
};

/**
 * Creates a configured Fuse instance for searching lesson metadata
 *
 * @param lessons - Array of lesson metadata to search
 * @returns Configured Fuse.js instance
 *
 * @example
 * ```ts
 * const fuse = createLessonSearch(lessons.map(l => l.meta));
 * const results = fuse.search('react hooks');
 * ```
 */
export function createLessonSearch(lessons: LessonMeta[]): Fuse<LessonMeta> {
  return new Fuse(lessons, searchOptions);
}
