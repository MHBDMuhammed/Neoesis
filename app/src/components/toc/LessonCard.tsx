'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, PlayCircle, HelpCircle } from 'lucide-react';
import { useLessonStatus } from '@/hooks/use-progress';
import type { LessonWithMeta } from '@/types/lesson';

interface LessonCardProps {
  lesson: LessonWithMeta;
}

const statusConfig = {
  not_started: {
    label: 'Başlanmadı',
    variant: 'outline' as const,
    icon: null,
  },
  in_progress: {
    label: 'Devam Ediyor',
    variant: 'secondary' as const,
    icon: PlayCircle,
  },
  completed: {
    label: 'Tamamlandı',
    variant: 'default' as const,
    icon: CheckCircle2,
  },
};

export function LessonCard({ lesson }: LessonCardProps) {
  const status = useLessonStatus(lesson.meta.slug);
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Link
      href={`/lesson/${lesson.meta.slug}`}
      data-testid="lesson-card"
      className="group relative block rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Status indicator bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 rounded-t-lg transition-all ${
          status === 'completed'
            ? 'bg-primary'
            : status === 'in_progress'
              ? 'bg-primary/50'
              : 'bg-transparent'
        }`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
              {lesson.meta.title}
            </h3>
            {lesson.meta.quiz && (
              <HelpCircle
                className="size-4 shrink-0 text-primary"
                aria-label="Includes quiz"
                data-testid="quiz-icon"
              />
            )}
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {lesson.meta.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={config.variant} className="gap-1 text-xs">
              {StatusIcon && <StatusIcon className="size-3" />}
              {config.label}
            </Badge>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{lesson.meta.estimatedMinutes} min</span>
            </div>

            {lesson.meta.objectives.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {lesson.meta.objectives.length} objectives
              </span>
            )}
          </div>
        </div>

        {/* Visual indicator on hover */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/50 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            className="size-4 text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
