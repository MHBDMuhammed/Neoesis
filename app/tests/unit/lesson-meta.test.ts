import { describe, it, expect } from 'vitest';
import { LessonMetaSchema, QuizDataSchema } from '@/contracts/lesson-meta.schema';

describe('LessonMetaSchema', () => {
  const validMeta = {
    slug: 'intro-to-react',
    title: 'Introduction to React',
    order: 1,
    section: 'fundamentals',
    description: 'Learn React basics: components, props, and state.',
    estimatedMinutes: 12,
    objectives: [
      'Understand React components',
      'Use props to pass data',
      'Manage component state with useState',
    ],
  };

  it('should accept valid lesson metadata', () => {
    const result = LessonMetaSchema.safeParse(validMeta);
    expect(result.success).toBe(true);
  });

  it('should reject invalid slug format', () => {
    const invalidSlug = { ...validMeta, slug: 'Intro_To_React' }; // uppercase and underscore
    const result = LessonMetaSchema.safeParse(invalidSlug);
    expect(result.success).toBe(false);
  });

  it('should reject negative order', () => {
    const negativeOrder = { ...validMeta, order: -1 };
    const result = LessonMetaSchema.safeParse(negativeOrder);
    expect(result.success).toBe(false);
  });

  it('should reject zero order', () => {
    const zeroOrder = { ...validMeta, order: 0 };
    const result = LessonMetaSchema.safeParse(zeroOrder);
    expect(result.success).toBe(false);
  });

  it('should reject less than 3 objectives', () => {
    const tooFewObjectives = { ...validMeta, objectives: ['One', 'Two'] };
    const result = LessonMetaSchema.safeParse(tooFewObjectives);
    expect(result.success).toBe(false);
  });

  it('should reject more than 5 objectives', () => {
    const tooManyObjectives = {
      ...validMeta,
      objectives: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
    };
    const result = LessonMetaSchema.safeParse(tooManyObjectives);
    expect(result.success).toBe(false);
  });

  it('should accept exactly 3 objectives', () => {
    const threeObjectives = {
      ...validMeta,
      objectives: ['One', 'Two', 'Three'],
    };
    const result = LessonMetaSchema.safeParse(threeObjectives);
    expect(result.success).toBe(true);
  });

  it('should accept exactly 5 objectives', () => {
    const fiveObjectives = {
      ...validMeta,
      objectives: ['One', 'Two', 'Three', 'Four', 'Five'],
    };
    const result = LessonMetaSchema.safeParse(fiveObjectives);
    expect(result.success).toBe(true);
  });
});

describe('QuizDataSchema', () => {
  const validQuiz = {
    id: 'quiz-intro-react',
    prompt: 'Which hook manages state in functional components?',
    type: 'single-choice' as const,
    options: ['useEffect', 'useState', 'useContext'],
    correctAnswer: 1,
    explanation: 'useState is the React hook for managing component state.',
    maxAttempts: 3,
  };

  it('should accept valid quiz data', () => {
    const result = QuizDataSchema.safeParse(validQuiz);
    expect(result.success).toBe(true);
  });

  it('should reject correctAnswer out of bounds (too high)', () => {
    const outOfBounds = { ...validQuiz, correctAnswer: 5 }; // options.length = 3
    const result = QuizDataSchema.safeParse(outOfBounds);
    expect(result.success).toBe(false);
  });

  it('should reject correctAnswer out of bounds (negative)', () => {
    const negative = { ...validQuiz, correctAnswer: -1 };
    const result = QuizDataSchema.safeParse(negative);
    expect(result.success).toBe(false);
  });

  it('should reject maxAttempts not equal to 3', () => {
    const wrongAttempts = { ...validQuiz, maxAttempts: 5 };
    const result = QuizDataSchema.safeParse(wrongAttempts);
    expect(result.success).toBe(false);
  });

  it('should reject invalid quiz ID format', () => {
    const invalidId = { ...validQuiz, id: 'invalid_id' }; // underscore not allowed
    const result = QuizDataSchema.safeParse(invalidId);
    expect(result.success).toBe(false);
  });

  it('should reject less than 2 options', () => {
    const tooFewOptions = { ...validQuiz, options: ['One'], correctAnswer: 0 };
    const result = QuizDataSchema.safeParse(tooFewOptions);
    expect(result.success).toBe(false);
  });

  it('should reject more than 5 options', () => {
    const tooManyOptions = {
      ...validQuiz,
      options: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      correctAnswer: 0,
    };
    const result = QuizDataSchema.safeParse(tooManyOptions);
    expect(result.success).toBe(false);
  });
});
