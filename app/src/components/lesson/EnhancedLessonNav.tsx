'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useLessonProgress } from '@/hooks/use-lesson-progress';
import type { LessonMeta } from '@/types/lesson';

interface EnhancedLessonNavProps {
  current: {
    meta: LessonMeta;
    prev: { meta: LessonMeta } | null;
    next: { meta: LessonMeta } | null;
  };
  className?: string;
}

/**
 * EnhancedLessonNav - Gelişmiş ders navigasyonu
 *
 * Özellikleri:
 * - Kart tabanlı prev/next görünümü (sadece buton değil)
 * - Başlık, açıklama, tahmini süre, ilerleme çubuğu gösterir
 * - Hover animasyonu (lift + shadow)
 * - Klavye kısayolları: ← prev, → next
 * - Mobil swipe gesture desteği (opsiyonel)
 * - Completion durumu göstergesi
 */
export function EnhancedLessonNav({ current, className }: EnhancedLessonNavProps) {
  const { prev, next } = current;
  const prevProgress = useLessonProgress(prev?.meta.slug);
  const nextProgress = useLessonProgress(next?.meta.slug);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt tuşu ile kombine et (input'larda çalışmaması için)
      if (e.altKey) {
        if (e.key === 'ArrowLeft' && prev) {
          e.preventDefault();
          window.location.href = `/lesson/${prev.meta.slug}`;
        }
        if (e.key === 'ArrowRight' && next) {
          e.preventDefault();
          window.location.href = `/lesson/${next.meta.slug}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  // Touch swipe detection
  React.useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 100;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && prev) {
          // Swipe right -> previous lesson
          window.location.href = `/lesson/${prev.meta.slug}`;
        } else if (swipeDistance < 0 && next) {
          // Swipe left -> next lesson
          window.location.href = `/lesson/${next.meta.slug}`;
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [prev, next]);

  return (
    <nav
      className={cn('grid gap-6 border-t pt-8 sm:grid-cols-2', className)}
      aria-label="Ders navigasyonu"
    >
      {/* Previous Lesson Card */}
      {prev ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Link
            href={`/lesson/${prev.meta.slug}`}
            className={cn(
              'group flex h-full flex-col gap-4 rounded-lg border-2 bg-card p-6 transition-colors',
              'hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
          >
            {/* Direction Indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Önceki Ders</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
              {prev.meta.title}
            </h3>

            {/* Description */}
            {prev.meta.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {prev.meta.description}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                <span>{prev.meta.estimatedMinutes} dk</span>
              </div>
              {prev.meta.objectives.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Target className="size-3.5" />
                  <span>{prev.meta.objectives.length} hedef</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {prevProgress > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">İlerleme</span>
                  <span className="font-medium text-primary">%{prevProgress}</span>
                </div>
                <Progress value={prevProgress} className="h-1.5" />
              </div>
            )}

            {/* Keyboard Hint */}
            <div className="hidden text-xs text-muted-foreground lg:block">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Alt
              </kbd>{' '}
              +{' '}
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                ←
              </kbd>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div /> // Empty space
      )}

      {/* Next Lesson Card */}
      {next ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Link
            href={`/lesson/${next.meta.slug}`}
            className={cn(
              'group flex h-full flex-col gap-4 rounded-lg border-2 bg-primary/5 p-6 transition-colors',
              'border-primary/20 hover:border-primary hover:bg-primary/10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
          >
            {/* Direction Indicator */}
            <div className="flex items-center justify-end gap-2 text-xs font-medium text-primary">
              <span>Sonraki Ders</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
              {next.meta.title}
            </h3>

            {/* Description */}
            {next.meta.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {next.meta.description}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                <span>{next.meta.estimatedMinutes} dk</span>
              </div>
              {next.meta.objectives.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Target className="size-3.5" />
                  <span>{next.meta.objectives.length} hedef</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {nextProgress > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">İlerleme</span>
                  <span className="font-medium text-primary">%{nextProgress}</span>
                </div>
                <Progress value={nextProgress} className="h-1.5" />
              </div>
            )}

            {/* Keyboard Hint */}
            <div className="hidden text-end text-xs text-muted-foreground lg:block">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Alt
              </kbd>{' '}
              +{' '}
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                →
              </kbd>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div /> // Empty space
      )}
    </nav>
  );
}
