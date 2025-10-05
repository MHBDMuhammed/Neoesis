import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logEvent } from '@/lib/telemetry';
import type { ProgressState, LessonProgress } from '@/contracts/progress.schema';

/**
 * Progress store interface with state and actions
 */
interface ProgressStore extends ProgressState {
  markInProgress: (slug: string) => void;
  markCompleted: (slug: string) => void;
  recordQuizScore: (
    lessonSlug: string,
    quizId: string,
    correct: boolean,
    attemptsUsed: number
  ) => void;
  getLesson: (slug: string) => LessonProgress | undefined;
  getGlobalProgress: () => { completedCount: number; totalCount: number };
}

/**
 * Initial state for the progress store
 */
const initialState: ProgressState = {
  lessons: {},
  globalProgress: {
    completedCount: 0,
    totalCount: 3, // Updated to match current curriculum size
  },
};

/**
 * Zustand store for tracking user progress across lessons
 * Persisted to localStorage with key 'limbo-progress'
 */
export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Mark a lesson as in_progress
       * Creates a new lesson progress entry if it doesn't exist
       */
      markInProgress: (slug: string) => {
        set((state) => {
          const existingLesson = state.lessons[slug];

          // Don't downgrade completed lessons
          if (existingLesson?.status === 'completed') {
            return state;
          }

          const updatedLesson: LessonProgress = existingLesson
            ? {
                ...existingLesson,
                status: 'in_progress',
                lastVisited: new Date().toISOString(),
              }
            : {
                status: 'in_progress',
                lastVisited: new Date().toISOString(),
                scrollProgress: 0,
                quizScores: {},
              };

          return {
            ...state,
            lessons: {
              ...state.lessons,
              [slug]: updatedLesson,
            },
          };
        });
      },

      /**
       * Mark a lesson as completed
       * Updates global progress counter
       */
      markCompleted: (slug: string) => {
        set((state) => {
          const existingLesson = state.lessons[slug];

          // Don't mark as completed if already completed
          if (existingLesson?.status === 'completed') {
            return state;
          }

          const updatedLesson: LessonProgress = existingLesson
            ? {
                ...existingLesson,
                status: 'completed',
                lastVisited: new Date().toISOString(),
                scrollProgress: 100,
              }
            : {
                status: 'completed',
                lastVisited: new Date().toISOString(),
                scrollProgress: 100,
                quizScores: {},
              };

          // Increment completed count since we know it wasn't completed before (early return above)
          const completedCountDelta = 1;

          // Log telemetry event for lesson completion
          logEvent('lesson_completed', {
            slug,
            completedAt: updatedLesson.lastVisited,
            scrollProgress: updatedLesson.scrollProgress,
            totalCompleted: state.globalProgress.completedCount + completedCountDelta
          });

          return {
            ...state,
            lessons: {
              ...state.lessons,
              [slug]: updatedLesson,
            },
            globalProgress: {
              ...state.globalProgress,
              completedCount: state.globalProgress.completedCount + completedCountDelta,
            },
          };
        });
      },

      /**
       * Record a quiz score for a lesson
       * Updates the quiz scores record with attempt information
       */
      recordQuizScore: (
        lessonSlug: string,
        quizId: string,
        correct: boolean,
        attemptsUsed: number
      ) => {
        set((state) => {
          const existingLesson = state.lessons[lessonSlug];

          const updatedLesson: LessonProgress = existingLesson
            ? {
                ...existingLesson,
                lastVisited: new Date().toISOString(),
                quizScores: {
                  ...existingLesson.quizScores,
                  [quizId]: {
                    correct,
                    attemptsUsed,
                  },
                },
              }
            : {
                status: 'not_started',
                lastVisited: new Date().toISOString(),
                scrollProgress: 0,
                quizScores: {
                  [quizId]: {
                    correct,
                    attemptsUsed,
                  },
                },
              };

          return {
            ...state,
            lessons: {
              ...state.lessons,
              [lessonSlug]: updatedLesson,
            },
          };
        });
      },

      /**
       * Get a specific lesson's progress
       * Returns undefined if lesson has not been started
       */
      getLesson: (slug: string) => {
        return get().lessons[slug];
      },

      /**
       * Get global progress statistics
       * Returns completed count and total count
       */
      getGlobalProgress: () => {
        const state = get();
        return {
          completedCount: state.globalProgress.completedCount,
          totalCount: state.globalProgress.totalCount,
        };
      },
    }),
    {
      name: 'limbo-progress', // localStorage key
    }
  )
);
