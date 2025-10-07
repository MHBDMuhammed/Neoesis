import { useProgressStore } from '@/lib/progress-store';

/**
 * Hook to get progress percentage for a specific lesson
 * Returns 0-100 based on lesson completion status
 */
export function useLessonProgress(slug: string | undefined): number {
  const progress = useProgressStore((state) => {
    if (!slug) return 0;

    const lessonProgress = state.lessons[slug];
    if (!lessonProgress) return 0;

    switch (lessonProgress.status) {
      case 'not_started':
        return 0;
      case 'in_progress':
        return 50;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  });

  return progress;
}
