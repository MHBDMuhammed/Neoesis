'use client';

import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen } from 'lucide-react';
import { useLessonProgress } from '@/hooks/use-progress';

interface ReadingProgressProps {
  progress: number;
  estimatedMinutes: number;
  lessonSlug: string;
  compact?: boolean;
}

export function ReadingProgress({
  progress,
  estimatedMinutes,
  lessonSlug,
  compact = false,
}: ReadingProgressProps) {
  const lessonProgress = useLessonProgress(lessonSlug);

  // Calculate estimated time remaining
  const remainingMinutes = Math.ceil(
    estimatedMinutes * ((100 - progress) / 100)
  );

  if (compact) {
    return (
      <div
        data-testid="reading-progress"
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Progress value={progress} className="h-1.5 w-24" />
        <span>{progress}%</span>
      </div>
    );
  }

  return (
    <div data-testid="reading-progress" className="space-y-6">
      {/* Reading Progress Card */}
      <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Reading Progress
            </h3>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            aria-label={`${progress}% complete`}
          />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            <span>
              {remainingMinutes > 0
                ? `${remainingMinutes} min remaining`
                : 'Complete!'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="size-4" />
            <span>{estimatedMinutes} min read</span>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {lessonProgress && (
        <div className="rounded-lg border bg-muted/50 p-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Status</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  lessonProgress.status === 'completed'
                    ? 'bg-primary/10 text-primary'
                    : lessonProgress.status === 'in_progress'
                      ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {lessonProgress.status === 'completed'
                  ? 'Completed'
                  : lessonProgress.status === 'in_progress'
                    ? 'In Progress'
                    : 'Not Started'}
              </span>
            </div>
            {lessonProgress.lastVisited && (
              <p className="text-xs text-muted-foreground">
                Last visited:{' '}
                {new Date(lessonProgress.lastVisited).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
