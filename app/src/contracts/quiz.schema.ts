import { z } from 'zod';

/**
 * Quiz answer submission schema (client → validation)
 * Validates user-submitted quiz answers before scoring
 */
export const QuizAnswerSchema = z.object({
  quizId: z.string().regex(/^quiz-[a-z0-9-]+$/, 'Invalid quiz ID format'),
  lessonSlug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid lesson slug format'),
  selectedAnswer: z
    .number()
    .int('Selected answer must be an integer index')
    .min(0, 'Selected answer index must be >= 0')
    .max(4, 'Selected answer index must be <= 4 (max 5 options)'),
  attemptNumber: z
    .number()
    .int('Attempt number must be an integer')
    .min(1, 'Attempt number must be >= 1')
    .max(3, 'Attempt number cannot exceed 3')
});

/**
 * Quiz feedback response schema (validation → client)
 * Returned after quiz answer validation
 */
export const QuizFeedbackSchema = z.object({
  correct: z.boolean({ description: 'Was the answer correct?' }),
  explanation: z.string({ description: 'Explanation of correct answer' }),
  attemptsUsed: z.number().int().min(1).max(3),
  attemptsRemaining: z
    .number()
    .int('Attempts remaining must be an integer')
    .min(0, 'Attempts remaining must be >= 0')
    .max(3, 'Attempts remaining cannot exceed 3')
});

// Inferred TypeScript types
export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
export type QuizFeedback = z.infer<typeof QuizFeedbackSchema>;
