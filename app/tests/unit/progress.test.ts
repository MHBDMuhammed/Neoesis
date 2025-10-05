import { describe, it, expect } from 'vitest';
import {
  ProgressStateSchema,
  LessonProgressSchema,
  QuizScoreSchema,
} from '@/contracts/progress.schema';

describe('ProgressStateSchema', () => {
  const validProgress = {
    lessons: {
      'intro-to-react': {
        status: 'completed' as const,
        lastVisited: '2025-10-04T14:30:00Z',
        scrollProgress: 100,
        quizScores: {
          'quiz-intro-react': {
            correct: true,
            attemptsUsed: 2,
          },
        },
      },
    },
    globalProgress: {
      completedCount: 1,
      totalCount: 12,
    },
  };

  it('should accept valid progress state', () => {
    const result = ProgressStateSchema.safeParse(validProgress);
    expect(result.success).toBe(true);
  });

  it('should accept empty lessons object', () => {
    const emptyLessons = {
      lessons: {},
      globalProgress: { completedCount: 0, totalCount: 12 },
    };
    const result = ProgressStateSchema.safeParse(emptyLessons);
    expect(result.success).toBe(true);
  });

  it('should reject negative completedCount', () => {
    const negative = {
      ...validProgress,
      globalProgress: { completedCount: -1, totalCount: 12 },
    };
    const result = ProgressStateSchema.safeParse(negative);
    expect(result.success).toBe(false);
  });

  it('should reject negative totalCount', () => {
    const negative = {
      ...validProgress,
      globalProgress: { completedCount: 1, totalCount: -5 },
    };
    const result = ProgressStateSchema.safeParse(negative);
    expect(result.success).toBe(false);
  });
});

describe('LessonProgressSchema', () => {
  const validLessonProgress = {
    status: 'in_progress' as const,
    lastVisited: '2025-10-04T15:00:00Z',
    scrollProgress: 45,
    quizScores: {},
  };

  it('should accept valid lesson progress', () => {
    const result = LessonProgressSchema.safeParse(validLessonProgress);
    expect(result.success).toBe(true);
  });

  it('should reject invalid status enum', () => {
    const invalidStatus = { ...validLessonProgress, status: 'started' }; // not in enum
    const result = LessonProgressSchema.safeParse(invalidStatus);
    expect(result.success).toBe(false);
  });

  it('should reject scrollProgress less than 0', () => {
    const negativeScroll = { ...validLessonProgress, scrollProgress: -10 };
    const result = LessonProgressSchema.safeParse(negativeScroll);
    expect(result.success).toBe(false);
  });

  it('should reject scrollProgress greater than 100', () => {
    const overScroll = { ...validLessonProgress, scrollProgress: 150 };
    const result = LessonProgressSchema.safeParse(overScroll);
    expect(result.success).toBe(false);
  });

  it('should accept scrollProgress at boundaries (0 and 100)', () => {
    const zeroScroll = { ...validLessonProgress, scrollProgress: 0 };
    const fullScroll = { ...validLessonProgress, scrollProgress: 100 };

    expect(LessonProgressSchema.safeParse(zeroScroll).success).toBe(true);
    expect(LessonProgressSchema.safeParse(fullScroll).success).toBe(true);
  });

  it('should reject invalid ISO 8601 timestamp', () => {
    const invalidTimestamp = {
      ...validLessonProgress,
      lastVisited: 'invalid-date',
    };
    const result = LessonProgressSchema.safeParse(invalidTimestamp);
    expect(result.success).toBe(false);
  });

  it('should accept all valid status values', () => {
    const notStarted = { ...validLessonProgress, status: 'not_started' as const };
    const inProgress = { ...validLessonProgress, status: 'in_progress' as const };
    const completed = { ...validLessonProgress, status: 'completed' as const };

    expect(LessonProgressSchema.safeParse(notStarted).success).toBe(true);
    expect(LessonProgressSchema.safeParse(inProgress).success).toBe(true);
    expect(LessonProgressSchema.safeParse(completed).success).toBe(true);
  });
});

describe('QuizScoreSchema', () => {
  it('should accept valid quiz score', () => {
    const validScore = { correct: true, attemptsUsed: 2 };
    const result = QuizScoreSchema.safeParse(validScore);
    expect(result.success).toBe(true);
  });

  it('should reject attemptsUsed less than 1', () => {
    const zeroAttempts = { correct: false, attemptsUsed: 0 };
    const result = QuizScoreSchema.safeParse(zeroAttempts);
    expect(result.success).toBe(false);
  });

  it('should reject attemptsUsed greater than 3', () => {
    const tooManyAttempts = { correct: false, attemptsUsed: 4 };
    const result = QuizScoreSchema.safeParse(tooManyAttempts);
    expect(result.success).toBe(false);
  });

  it('should accept boundary values (1 and 3 attempts)', () => {
    const oneAttempt = { correct: true, attemptsUsed: 1 };
    const threeAttempts = { correct: false, attemptsUsed: 3 };

    expect(QuizScoreSchema.safeParse(oneAttempt).success).toBe(true);
    expect(QuizScoreSchema.safeParse(threeAttempts).success).toBe(true);
  });
});
