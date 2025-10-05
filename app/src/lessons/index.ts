import type { LessonMeta, LessonWithMeta, SectionWithLessons, CurriculumRegistry } from '@/types/lesson';
import { LessonMetaSchema } from '@/contracts/lesson-meta.schema';
import { sections } from '@/lib/curriculum';

/**
 * Lesson Registry - Aggregates all lessons into a curriculum structure
 *
 * Explicitly imports all lesson files for Next.js compatibility
 * Validates metadata with Zod schemas at build time
 * Builds prev/next links and section groupings
 */

// Explicit imports for all lessons
// Note: Add new lessons here following the pattern
import * as Lesson01Intro from './01-intro';
import * as Lesson02JsxBasics from './02-jsx-basics';
import * as Lesson03StateBasics from './03-state-basics';

const lessonModules: Record<string, { meta: LessonMeta; default: React.ComponentType }> = {
  './01-intro.tsx': Lesson01Intro,
  './02-jsx-basics.tsx': Lesson02JsxBasics,
  './03-state-basics.tsx': Lesson03StateBasics
};

/**
 * Builds the complete curriculum structure
 * - Validates all lesson metadata
 * - Sorts lessons by section order, then lesson order
 * - Links prev/next for navigation
 * - Groups lessons by section
 * - Creates fast lookup map by slug
 */
function buildCurriculum(): CurriculumRegistry {
  const lessons: LessonWithMeta[] = [];
  const errors: string[] = [];

  // Validate and collect all lessons
  for (const [path, module] of Object.entries(lessonModules)) {
    if (path === './index.ts') continue; // Skip self

    const { meta, default: Component } = module;

    // Validate meta with Zod schema
    const result = LessonMetaSchema.safeParse(meta);
    if (!result.success) {
      errors.push(`${path}: ${result.error.message}`);
      continue;
    }

    // Verify section exists
    const sectionExists = sections.some(s => s.id === result.data.section);
    if (!sectionExists) {
      errors.push(`${path}: Invalid section "${result.data.section}" - must be one of: ${sections.map(s => s.id).join(', ')}`);
      continue;
    }

    lessons.push({
      meta: result.data,
      Component,
      prev: null, // Linked in next step
      next: null
    });
  }

  // Fail build if validation errors
  if (errors.length > 0) {
    throw new Error(`Lesson validation failed:\n${errors.join('\n')}`);
  }

  // Check for duplicate slugs
  const slugs = new Set<string>();
  for (const lesson of lessons) {
    if (slugs.has(lesson.meta.slug)) {
      throw new Error(`Duplicate slug: ${lesson.meta.slug}`);
    }
    slugs.add(lesson.meta.slug);
  }

  // Sort lessons by section order, then lesson order
  lessons.sort((a, b) => {
    const sectionA = sections.find(s => s.id === a.meta.section)!;
    const sectionB = sections.find(s => s.id === b.meta.section)!;

    if (sectionA.order !== sectionB.order) {
      return sectionA.order - sectionB.order;
    }
    return a.meta.order - b.meta.order;
  });

  // Link prev/next
  for (let i = 0; i < lessons.length; i++) {
    lessons[i].prev = i > 0 ? lessons[i - 1] : null;
    lessons[i].next = i < lessons.length - 1 ? lessons[i + 1] : null;
  }

  // Group lessons by section
  const sectionMap = new Map<string, LessonWithMeta[]>();
  for (const lesson of lessons) {
    const sectionLessons = sectionMap.get(lesson.meta.section) || [];
    sectionLessons.push(lesson);
    sectionMap.set(lesson.meta.section, sectionLessons);
  }

  const sectionsWithLessons: SectionWithLessons[] = sections.map(section => {
    const sectionLessons = sectionMap.get(section.id) || [];

    // Check for duplicate orders within section
    const orders = new Set<number>();
    for (const lesson of sectionLessons) {
      if (orders.has(lesson.meta.order)) {
        throw new Error(
          `Duplicate order ${lesson.meta.order} in section ${section.id}`
        );
      }
      orders.add(lesson.meta.order);
    }

    return {
      section,
      lessons: sectionLessons,
      totalMinutes: sectionLessons.reduce((sum, l) => sum + l.meta.estimatedMinutes, 0)
    };
  });

  // Build lesson map for fast lookup
  const lessonMap = new Map(
    lessons.map(lesson => [lesson.meta.slug, lesson])
  );

  return {
    lessons,
    lessonMap,
    sections: sectionsWithLessons
  };
}

// Export curriculum singleton
export const curriculum = buildCurriculum();
export const { lessons, lessonMap, sections: sectionsWithLessons } = curriculum;
