'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { LessonCard } from './LessonCard';
import type { SectionWithLessons } from '@/types/lesson';
import { useProgressStore } from '@/lib/progress-store';
import type { ViewMode } from './ViewModeToggle';

interface SectionCardProps {
  section: SectionWithLessons;
  viewMode?: ViewMode;
}

/**
 * SectionCard - Modern section card with progress tracking
 *
 * Features:
 * - Section progress indicator
 * - Gradient backgrounds per section
 * - Collapsible lesson list
 * - Stats (lesson count, duration, completion)
 * - Animated entrance
 * - Two view modes support
 */
export function SectionCard({
  section,
  viewMode = 'list',
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const progress = useProgressStore();
  const completedLessons = section.lessons.filter((lesson) =>
    progress.getLesson(lesson.meta.slug)?.status === 'completed'
  ).length;

  const completionPercentage = Math.round(
    (completedLessons / section.lessons.length) * 100
  );

  const hours = Math.floor(section.totalMinutes / 60);
  const minutes = section.totalMinutes % 60;
  const timeDisplay = hours > 0 ? `${hours}s ${minutes}dk` : `${minutes} dk`;

  // Section-specific colors
  const sectionColors = {
    fundamentals: {
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    },
    advanced: {
      gradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    },
    'best-practices': {
      gradient: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/30',
      text: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-500/10 text-green-600 border-green-500/30',
    },
  };

  const colors =
    sectionColors[section.section.id as keyof typeof sectionColors] ||
    sectionColors.fundamentals;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg backdrop-blur-sm`}
    >
      {/* Section Header */}
      <div
        className="cursor-pointer p-6 transition-colors hover:bg-background/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-4">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-12 items-center justify-center rounded-xl ${colors.badge} border`}>
                <BookOpen className="size-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {section.section.title}
                </h2>
                {section.section.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.section.description}
                  </p>
                )}
              </div>
            </div>

            {/* Stats Badge */}
            <Badge variant="outline" className={`shrink-0 ${colors.badge}`}>
              {completedLessons}/{section.lessons.length} Tamamlandı
            </Badge>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="size-4" />
              <span>{section.lessons.length} ders</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>{timeDisplay}</span>
            </div>
            {completedLessons > 0 && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="size-4" />
                <span>{completedLessons} tamamlandı</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">İlerleme</span>
              <span className={`font-semibold ${colors.text}`}>
                %{completionPercentage}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t bg-background/50 p-4"
        >
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.meta.slug}
                  lesson={lesson}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {section.lessons.map((lesson) => (
                <LessonCard
                  key={lesson.meta.slug}
                  lesson={lesson}
                  viewMode="list"
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
