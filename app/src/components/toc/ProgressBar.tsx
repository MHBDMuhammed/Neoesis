'use client';

import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock } from 'lucide-react';
import { useGlobalProgress } from '@/hooks/use-progress';
import { curriculum } from '@/lessons';

export function ProgressBar() {
  const globalProgress = useGlobalProgress();
  const totalLessons = curriculum.lessons.length;
  const completedCount = globalProgress.completedCount;
  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Calculate estimated time remaining
  const remainingLessons = totalLessons - completedCount;
  const totalMinutes = curriculum.sections.reduce(
    (sum, section) => sum + section.totalMinutes,
    0
  );
  const avgMinutesPerLesson =
    totalLessons > 0 ? totalMinutes / totalLessons : 0;
  const remainingMinutes = Math.ceil(remainingLessons * avgMinutesPerLesson);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;

  const timeRemaining =
    remainingMinutes > 0
      ? remainingHours > 0
        ? `${remainingHours}h ${remainingMins}m`
        : `${remainingMins}m`
      : 'Complete!';

  return (
    <div
      data-testid="progress-bar"
      className="rounded-lg border bg-gradient-to-br from-card to-card/50 p-6 shadow-sm"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">Your Progress</h3>
          </div>
          <span className="text-2xl font-bold text-primary">{percentage}%</span>
        </div>

        <div className="space-y-2">
          <Progress
            value={percentage}
            className="h-3"
            aria-label={`${percentage}% of curriculum completed`}
          />
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {completedCount}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-foreground">
                {totalLessons}
              </span>{' '}
              lessons completed
            </p>
            {remainingMinutes > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3" />
                <span>{timeRemaining} remaining</span>
              </div>
            )}
          </div>
        </div>

        {percentage === 100 && (
          <div className="mt-4 rounded-md bg-primary/10 p-3 text-center">
            <p className="text-sm font-medium text-primary">
              🎉 Congratulations! You've completed all lessons!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
