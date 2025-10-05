import { describe, it, expect } from 'vitest';
import { QuizAnswerSchema, QuizFeedbackSchema } from '@/contracts/quiz.schema';

describe('QuizAnswerSchema', () => {
  const validAnswer = {
    quizId: 'quiz-intro-react',
    lessonSlug: 'intro-to-react',
    selectedAnswer: 1,
    attemptNumber: 1,
  };

  it('should accept valid quiz answer', () => {
    const result = QuizAnswerSchema.safeParse(validAnswer);
    expect(result.success).toBe(true);
  });

  it('should reject invalid quizId format', () => {
    const invalidId = { ...validAnswer, quizId: 'invalid_quiz' }; // underscore not allowed
    const result = QuizAnswerSchema.safeParse(invalidId);
    expect(result.success).toBe(false);
  });

  it('should reject invalid lessonSlug format', () => {
    const invalidSlug = { ...validAnswer, lessonSlug: 'Invalid-Slug' }; // uppercase not allowed
    const result = QuizAnswerSchema.safeParse(invalidSlug);
    expect(result.success).toBe(false);
  });

  it('should reject selectedAnswer less than 0', () => {
    const negative = { ...validAnswer, selectedAnswer: -1 };
    const result = QuizAnswerSchema.safeParse(negative);
    expect(result.success).toBe(false);
  });

  it('should reject selectedAnswer greater than 4', () => {
    const tooHigh = { ...validAnswer, selectedAnswer: 5 };
    const result = QuizAnswerSchema.safeParse(tooHigh);
    expect(result.success).toBe(false);
  });

  it('should accept selectedAnswer at boundaries (0 and 4)', () => {
    const zero = { ...validAnswer, selectedAnswer: 0 };
    const four = { ...validAnswer, selectedAnswer: 4 };

    expect(QuizAnswerSchema.safeParse(zero).success).toBe(true);
    expect(QuizAnswerSchema.safeParse(four).success).toBe(true);
  });

  it('should reject attemptNumber less than 1', () => {
    const zero = { ...validAnswer, attemptNumber: 0 };
    const result = QuizAnswerSchema.safeParse(zero);
    expect(result.success).toBe(false);
  });

  it('should reject attemptNumber greater than 3', () => {
    const tooHigh = { ...validAnswer, attemptNumber: 4 };
    const result = QuizAnswerSchema.safeParse(tooHigh);
    expect(result.success).toBe(false);
  });

  it('should accept attemptNumber at boundaries (1 and 3)', () => {
    const one = { ...validAnswer, attemptNumber: 1 };
    const three = { ...validAnswer, attemptNumber: 3 };

    expect(QuizAnswerSchema.safeParse(one).success).toBe(true);
    expect(QuizAnswerSchema.safeParse(three).success).toBe(true);
  });
});

describe('QuizFeedbackSchema', () => {
  const validFeedback = {
    correct: true,
    explanation: 'useState is the React hook for managing component state.',
    attemptsUsed: 1,
    attemptsRemaining: 2,
  };

  it('should accept valid quiz feedback', () => {
    const result = QuizFeedbackSchema.safeParse(validFeedback);
    expect(result.success).toBe(true);
  });

  it('should reject attemptsUsed less than 1', () => {
    const invalid = { ...validFeedback, attemptsUsed: 0 };
    const result = QuizFeedbackSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject attemptsUsed greater than 3', () => {
    const invalid = { ...validFeedback, attemptsUsed: 4 };
    const result = QuizFeedbackSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject attemptsRemaining less than 0', () => {
    const invalid = { ...validFeedback, attemptsRemaining: -1 };
    const result = QuizFeedbackSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should reject attemptsRemaining greater than 3', () => {
    const invalid = { ...validFeedback, attemptsRemaining: 4 };
    const result = QuizFeedbackSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should accept boundary values', () => {
    const minAttempts = {
      ...validFeedback,
      attemptsUsed: 1,
      attemptsRemaining: 0,
    };
    const maxAttempts = {
      ...validFeedback,
      attemptsUsed: 3,
      attemptsRemaining: 0,
    };

    expect(QuizFeedbackSchema.safeParse(minAttempts).success).toBe(true);
    expect(QuizFeedbackSchema.safeParse(maxAttempts).success).toBe(true);
  });

  it('should accept correct and incorrect answers', () => {
    const correct = { ...validFeedback, correct: true };
    const incorrect = { ...validFeedback, correct: false };

    expect(QuizFeedbackSchema.safeParse(correct).success).toBe(true);
    expect(QuizFeedbackSchema.safeParse(incorrect).success).toBe(true);
  });
});
