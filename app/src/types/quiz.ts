/**
 * Enhanced Quiz Types for Neosis
 * Supports 6 different quiz formats
 */

export type QuizType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-blanks'
  | 'code'
  | 'matching'
  | 'ordering';

/**
 * Base quiz interface - common fields for all quiz types
 */
export interface BaseQuiz {
  id: string;
  type: QuizType;
  prompt: string;
  explanation: string;
  hint?: string;
  relatedSections?: string[]; // IDs or slugs of related content sections
}

/**
 * Multiple Choice Quiz (existing)
 */
export interface MultipleChoiceQuiz extends BaseQuiz {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // Index of correct option
}

/**
 * True/False Quiz
 */
export interface TrueFalseQuiz extends BaseQuiz {
  type: 'true-false';
  correctAnswer: boolean;
  trueExplanation?: string; // Explanation if answer is true
  falseExplanation?: string; // Explanation if answer is false
}

/**
 * Fill in the Blanks Quiz
 */
export interface FillBlanksQuiz extends BaseQuiz {
  type: 'fill-blanks';
  template: string; // Text with {{blank}} placeholders
  blanks: {
    id: string;
    correctAnswers: string[]; // Multiple acceptable answers
    caseSensitive?: boolean;
  }[];
}

/**
 * Code Quiz - Write code that passes tests
 */
export interface CodeQuiz extends BaseQuiz {
  type: 'code';
  language: 'javascript' | 'typescript' | 'python' | 'html' | 'css';
  starterCode: string;
  tests: {
    description: string;
    testCode: string; // Code to run for validation
  }[];
  solution?: string; // Reference solution (hidden by default)
}

/**
 * Matching Quiz - Match pairs
 */
export interface MatchingQuiz extends BaseQuiz {
  type: 'matching';
  pairs: {
    id: string;
    left: string;
    right: string;
  }[];
}

/**
 * Ordering Quiz - Put items in correct sequence
 */
export interface OrderingQuiz extends BaseQuiz {
  type: 'ordering';
  items: {
    id: string;
    content: string;
  }[];
  correctOrder: string[]; // Array of IDs in correct order
}

/**
 * Union type of all quiz types
 */
export type Quiz =
  | MultipleChoiceQuiz
  | TrueFalseQuiz
  | FillBlanksQuiz
  | CodeQuiz
  | MatchingQuiz
  | OrderingQuiz;

/**
 * Quiz attempt result
 */
export interface QuizAttempt {
  quizId: string;
  correct: boolean;
  attemptsUsed: number;
  hintUsed: boolean;
  score: number; // Percentage (0-100)
  timestamp: string;
}

/**
 * Quiz feedback configuration
 */
export interface QuizFeedbackConfig {
  showConfetti: boolean; // Show confetti on correct answer
  showShakeAnimation: boolean; // Shake on wrong answer
  showDetailedExplanation: boolean; // Show why correct/incorrect
  showRelatedSections: boolean; // Show links to related content
  allowHints: boolean; // Allow hint system
  hintPenalty: number; // Points deducted for using hint (0-100)
}
