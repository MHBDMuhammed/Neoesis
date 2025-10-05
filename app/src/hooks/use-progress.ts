import { useProgressStore } from '@/lib/progress-store';
import type { LessonProgress } from '@/contracts/progress.schema';

/**
 * Custom hook to check if user has started any lesson
 * @returns true if any lesson has been visited
 */
export function useHasStarted(): boolean {
  return useProgressStore((state) => {
    const lessons = Object.values(state.lessons);
    return lessons.length > 0;
  });
}

/**
 * Custom hook to get the last visited lesson
 * @returns tuple of [slug, LessonProgress] for the most recently visited lesson, or null
 */
export function useLastLesson(): [string, LessonProgress] | null {
  return useProgressStore((state) => {
    const lessons = Object.entries(state.lessons);

    if (lessons.length === 0) {
      return null;
    }

    // Sort by lastVisited timestamp (most recent first)
    const sorted = lessons.sort(
      (a, b) =>
        new Date(b[1].lastVisited).getTime() -
        new Date(a[1].lastVisited).getTime()
    );

    return sorted[0] as [string, LessonProgress];
  });
}

/**
 * Custom hook to get completion percentage
 * @returns percentage (0-100) of completed lessons
 */
export function useCompletionPercent(): number {
  return useProgressStore((state) => {
    const { completedCount, totalCount } = state.globalProgress;

    if (totalCount === 0) {
      return 0;
    }

    return Math.round((completedCount / totalCount) * 100);
  });
}

/**
 * Custom hook to get a specific lesson's status
 * @param slug - The lesson slug
 * @returns the lesson status ('not_started', 'in_progress', or 'completed')
 */
export function useLessonStatus(
  slug: string
): 'not_started' | 'in_progress' | 'completed' {
  return useProgressStore((state) => {
    const lesson = state.lessons[slug];
    return lesson?.status ?? 'not_started';
  });
}

/**
 * Custom hook to get a specific lesson's progress
 * @param slug - The lesson slug
 * @returns the lesson progress object or undefined if not started
 */
export function useLessonProgress(slug: string): LessonProgress | undefined {
  return useProgressStore((state) => state.lessons[slug]);
}

/**
 * Custom hook to get global progress statistics
 * @returns object with completedCount and totalCount
 */
export function useGlobalProgress(): {
  completedCount: number;
  totalCount: number;
} {
  return useProgressStore((state) => state.globalProgress);
}
