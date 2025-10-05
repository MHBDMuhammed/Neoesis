import { z } from 'zod';

/**
 * Quiz score schema (per-quiz attempt tracking)
 */
export const QuizScoreSchema = z.object({
  correct: z.boolean({ description: 'Did user answer correctly?' }),
  attemptsUsed: z
    .number()
    .int('Attempts used must be an integer')
    .min(1, 'Attempts used must be >= 1')
    .max(3, 'Attempts used cannot exceed 3 (max attempts)')
});

/**
 * Lesson progress schema (per-lesson tracking)
 */
export const LessonProgressSchema = z.object({
  status: z.enum(['not_started', 'in_progress', 'completed'], {
    description: 'Lesson completion status'
  }),
  lastVisited: z.string().datetime({
    message: 'Last visited must be a valid ISO 8601 timestamp'
  }),
  scrollProgress: z
    .number()
    .int('Scroll progress must be an integer')
    .min(0, 'Scroll progress must be >= 0')
    .max(100, 'Scroll progress must be <= 100'),
  quizScores: z.record(
    z.string(),  // Quiz ID
    QuizScoreSchema
  )
});

/**
 * Global progress state schema (localStorage root object)
 */
export const ProgressStateSchema = z.object({
  lessons: z.record(
    z.string(),  // Lesson slug
    LessonProgressSchema
  ),
  globalProgress: z.object({
    completedCount: z
      .number()
      .int('Completed count must be an integer')
      .min(0, 'Completed count must be >= 0'),
    totalCount: z
      .number()
      .int('Total count must be an integer')
      .min(0, 'Total count must be >= 0')
  })
});

// Inferred TypeScript types
export type QuizScore = z.infer<typeof QuizScoreSchema>;
export type LessonProgress = z.infer<typeof LessonProgressSchema>;
export type ProgressState = z.infer<typeof ProgressStateSchema>;
