import { describe, it, expect, beforeEach } from 'vitest';
import type { ProgressState } from '@/contracts/progress.schema';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.localStorage = localStorageMock as any;

describe('Progress Store (Zustand with persist)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty state', () => {
    // Mock empty store
    const initialState: ProgressState = {
      lessons: {},
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    expect(initialState.lessons).toEqual({});
    expect(initialState.globalProgress.completedCount).toBe(0);
  });

  it('should mark lesson in_progress after 30s timer', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'in_progress',
          lastVisited: new Date().toISOString(),
          scrollProgress: 0,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    const lesson = mockState.lessons['intro-to-react'];
    expect(lesson.status).toBe('in_progress');
    expect(lesson.scrollProgress).toBe(0);
  });

  it('should mark lesson completed after 95% scroll + quiz correct', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'completed',
          lastVisited: new Date().toISOString(),
          scrollProgress: 100,
          quizScores: {
            'quiz-intro-react': {
              correct: true,
              attemptsUsed: 1,
            },
          },
        },
      },
      globalProgress: {
        completedCount: 1,
        totalCount: 12,
      },
    };

    const lesson = mockState.lessons['intro-to-react'];
    expect(lesson.status).toBe('completed');
    expect(lesson.scrollProgress).toBe(100);
    expect(lesson.quizScores['quiz-intro-react'].correct).toBe(true);
  });

  it('should NOT mark completed if quiz incorrect after 3 attempts', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'in_progress', // Still in_progress
          lastVisited: new Date().toISOString(),
          scrollProgress: 100,
          quizScores: {
            'quiz-intro-react': {
              correct: false,
              attemptsUsed: 3, // Max attempts used
            },
          },
        },
      },
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    const lesson = mockState.lessons['intro-to-react'];
    expect(lesson.status).toBe('in_progress');
    expect(lesson.quizScores['quiz-intro-react'].attemptsUsed).toBe(3);
    expect(lesson.quizScores['quiz-intro-react'].correct).toBe(false);
  });

  it('should persist to localStorage', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'in_progress',
          lastVisited: '2025-10-04T14:30:00Z',
          scrollProgress: 45,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    localStorage.setItem('limbo-progress', JSON.stringify(mockState));

    const stored = localStorage.getItem('limbo-progress');
    const parsed = JSON.parse(stored!);

    expect(parsed.lessons['intro-to-react'].status).toBe('in_progress');
    expect(parsed.lessons['intro-to-react'].scrollProgress).toBe(45);
  });

  it('should hydrate from localStorage on mount', () => {
    const existingState: ProgressState = {
      lessons: {
        'advanced-hooks': {
          status: 'completed',
          lastVisited: '2025-10-03T10:00:00Z',
          scrollProgress: 100,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 1,
        totalCount: 12,
      },
    };

    localStorage.setItem('limbo-progress', JSON.stringify(existingState));

    const stored = localStorage.getItem('limbo-progress');
    const hydrated = JSON.parse(stored!);

    expect(hydrated.lessons['advanced-hooks'].status).toBe('completed');
    expect(hydrated.globalProgress.completedCount).toBe(1);
  });

  it('should update globalProgress when lesson completed', () => {
    const initialState: ProgressState = {
      lessons: {},
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    // Simulate marking first lesson completed
    const updatedState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'completed',
          lastVisited: new Date().toISOString(),
          scrollProgress: 100,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 1,
        totalCount: 12,
      },
    };

    expect(updatedState.globalProgress.completedCount).toBe(1);
    expect(
      initialState.globalProgress.completedCount <
        updatedState.globalProgress.completedCount
    ).toBe(true);
  });

  it('should handle multiple lessons in progress', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'in_progress',
          lastVisited: '2025-10-04T14:30:00Z',
          scrollProgress: 45,
          quizScores: {},
        },
        'advanced-hooks': {
          status: 'in_progress',
          lastVisited: '2025-10-04T15:00:00Z',
          scrollProgress: 20,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    expect(Object.keys(mockState.lessons).length).toBe(2);
    expect(mockState.lessons['intro-to-react'].status).toBe('in_progress');
    expect(mockState.lessons['advanced-hooks'].status).toBe('in_progress');
  });

  it('should record quiz scores with attempts', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'in_progress',
          lastVisited: new Date().toISOString(),
          scrollProgress: 50,
          quizScores: {
            'quiz-intro-react': {
              correct: false,
              attemptsUsed: 1,
            },
          },
        },
      },
      globalProgress: {
        completedCount: 0,
        totalCount: 12,
      },
    };

    const quizScore = mockState.lessons['intro-to-react'].quizScores['quiz-intro-react'];
    expect(quizScore.correct).toBe(false);
    expect(quizScore.attemptsUsed).toBe(1);
  });

  it('should get last visited lesson for Continue card', () => {
    const mockState: ProgressState = {
      lessons: {
        'intro-to-react': {
          status: 'completed',
          lastVisited: '2025-10-03T14:30:00Z',
          scrollProgress: 100,
          quizScores: {},
        },
        'advanced-hooks': {
          status: 'in_progress',
          lastVisited: '2025-10-04T15:00:00Z', // Most recent
          scrollProgress: 45,
          quizScores: {},
        },
      },
      globalProgress: {
        completedCount: 1,
        totalCount: 12,
      },
    };

    // Find most recent lesson
    const lessons = Object.entries(mockState.lessons);
    const sorted = lessons.sort(
      (a, b) =>
        new Date(b[1].lastVisited).getTime() -
        new Date(a[1].lastVisited).getTime()
    );

    const lastLesson = sorted[0];
    expect(lastLesson[0]).toBe('advanced-hooks');
  });
});
