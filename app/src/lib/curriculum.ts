import type { Section } from '@/types/lesson';

/**
 * Curriculum section definitions
 * Sections organize lessons into logical groups and determine display order
 */
export const sections: Section[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Core concepts and foundational knowledge',
    order: 1
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    description: 'Deep dive into advanced concepts and patterns',
    order: 2
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    description: 'Professional patterns and production-ready techniques',
    order: 3
  }
];
