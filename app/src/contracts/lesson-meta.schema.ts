import { z } from 'zod';

/**
 * Quiz data schema (inline quiz within a lesson)
 * Max attempts hardcoded to 3 per Clarification #1
 */
export const QuizDataSchema = z.object({
  id: z.string().regex(/^quiz-[a-z0-9-]+$/, 'Quiz ID must match format: quiz-{lesson-slug}'),
  prompt: z.string().min(10, 'Quiz prompt must be at least 10 characters'),
  type: z.literal('single-choice', {
    description: 'v1 supports single-choice only; multi-choice deferred to v2'
  }),
  options: z
    .array(z.string())
    .min(2, 'Quiz must have at least 2 options')
    .max(5, 'Quiz must have at most 5 options'),
  correctAnswer: z
    .number()
    .int('Correct answer index must be an integer')
    .min(0, 'Correct answer index must be >= 0'),
  explanation: z.string().min(10, 'Explanation must be at least 10 characters'),
  maxAttempts: z.literal(3, {
    description: 'Max attempts is always 3 (Clarification #1)'
  })
}).refine(
  data => data.correctAnswer < data.options.length,
  {
    message: 'correctAnswer index must be within options array bounds',
    path: ['correctAnswer']
  }
);

/**
 * Lesson metadata schema
 * Exported from lessons/*.tsx files
 */
export const LessonMetaSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens only')
    .min(3, 'Slug must be at least 3 characters'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  order: z
    .number()
    .int('Order must be an integer')
    .positive('Order must be positive (1-indexed)'),
  section: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Section ID must be lowercase alphanumeric with hyphens only'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be at most 200 characters'),
  estimatedMinutes: z
    .number()
    .int('Estimated minutes must be an integer')
    .positive('Estimated minutes must be positive'),
  objectives: z
    .array(z.string())
    .min(3, 'Must have at least 3 learning objectives')
    .max(5, 'Must have at most 5 learning objectives'),
  quiz: QuizDataSchema.optional()
});

// Inferred TypeScript types
export type QuizData = z.infer<typeof QuizDataSchema>;
export type LessonMeta = z.infer<typeof LessonMetaSchema>;
