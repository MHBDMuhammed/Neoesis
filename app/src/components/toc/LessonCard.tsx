'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { LessonWithMeta } from '@/types/lesson';
import { useProgressStore } from '@/lib/progress-store';

interface LessonCardProps {
  lesson: LessonWithMeta;
  viewMode?: 'grid' | 'list';
}

/**
 * LessonCard - Modern lesson card with progress tracking
 *
 * Features:
 * - Progress indicator
 * - Completion badge
 * - Quiz indicator
 * - Hover animations
 * - Two view modes (grid/list)
 * - Status icons
 */
export function LessonCard({
  lesson,
  viewMode = 'list',
}: LessonCardProps) {
  const router = useRouter();
  const progressData = useProgressStore((state) =>
    state.getLesson(lesson.meta.slug)
  );

  const isCompleted = progressData?.status === 'completed';
  const quizScores = progressData?.quizScores;
  const hasQuiz = lesson.meta.quiz !== undefined;

  // Calculate average quiz score if available
  const quizScore = quizScores
    ? Math.round(
        (Object.values(quizScores).filter((s) => s.correct).length /
          Object.keys(quizScores).length) *
          100
      )
    : undefined;

  const handleClick = () => {
    router.push(`/lesson/${lesson.meta.slug}`);
  };

  const StatusIcon = isCompleted ? CheckCircle2 : Circle;

  if (viewMode === 'grid') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          onClick={handleClick}
          className="group relative h-full cursor-pointer rounded-xl border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
        >
          {/* Status Badge */}
          <div className="absolute top-4 end-4">
            <StatusIcon
              className={`size-5 ${
                isCompleted
                  ? 'text-green-500'
                  : 'text-muted-foreground/30'
              }`}
            />
          </div>

          <div className="space-y-4">
            {/* Title */}
            <h3 className="text-lg font-semibold line-clamp-2 pe-8 group-hover:text-primary transition-colors">
              {lesson.meta.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lesson.meta.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>{lesson.meta.estimatedMinutes} dk</span>
              </div>
              {hasQuiz && (
                <Badge variant="secondary" className="text-xs">
                  Quiz
                </Badge>
              )}
            </div>

            {/* Progress */}
            {isCompleted && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600 font-medium">
                    Tamamlandı
                  </span>
                  {quizScore !== undefined && (
                    <span className="text-muted-foreground">
                      Quiz: %{quizScore}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full group-hover:bg-primary/10"
            >
              <PlayCircle className="me-2 size-4" />
              {isCompleted ? 'Tekrar İzle' : 'Başla'}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // List view
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={handleClick}
        className="group flex items-center gap-4 rounded-lg border bg-background p-4 cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
      >
        {/* Status Icon */}
        <div className="shrink-0">
          <StatusIcon
            className={`size-6 ${
              isCompleted
                ? 'text-green-500'
                : 'text-muted-foreground/30'
            }`}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {lesson.meta.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>{lesson.meta.estimatedMinutes} dk</span>
              </div>
              {hasQuiz && (
                <Badge variant="secondary" className="text-xs">
                  Quiz
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {lesson.meta.description}
          </p>

          {/* Progress Bar */}
          {isCompleted && (
            <div className="flex items-center gap-3">
              <Progress value={100} className="h-1.5 flex-1" />
              <span className="text-xs text-green-600 font-medium">
                Tamamlandı
              </span>
              {quizScore !== undefined && (
                <span className="text-xs text-muted-foreground">
                  Quiz: %{quizScore}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action */}
        <Button variant="ghost" size="sm" className="shrink-0">
          <PlayCircle className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}
