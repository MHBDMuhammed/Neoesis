'use client';

import { useEffect, useRef } from 'react';
import { useProgressStore } from '@/lib/progress-store';

/**
 * Custom hook to automatically mark a lesson as in_progress after 30 seconds
 * Triggers only once per lesson mount
 *
 * @param lessonSlug - The slug of the current lesson
 */
export function useLessonTimer(lessonSlug: string): void {
  const markInProgress = useProgressStore((state) => state.markInProgress);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate triggers if component remounts
    if (hasTriggeredRef.current) {
      return;
    }

    // Set up 30-second timer
    const timerId = setTimeout(() => {
      markInProgress(lessonSlug);
      hasTriggeredRef.current = true;
    }, 30000); // 30 seconds in milliseconds

    // Cleanup timer if component unmounts before 30s
    return () => {
      clearTimeout(timerId);
    };
  }, [lessonSlug, markInProgress]);
}
