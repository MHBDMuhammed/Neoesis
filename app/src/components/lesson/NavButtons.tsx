'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { logEvent } from '@/lib/telemetry';
import type { LessonMeta } from '@/types/lesson';

interface NavButtonsProps {
  current: {
    meta: LessonMeta;
    prev: { meta: LessonMeta } | null;
    next: { meta: LessonMeta } | null;
  };
}

export function NavButtons({ current }: NavButtonsProps) {
  const { prev, next } = current;

  const handleNavigation = React.useCallback((direction: 'prev' | 'next', targetSlug: string) => {
    logEvent('lesson_navigation', {
      from: current.meta.slug,
      to: targetSlug,
      direction
    });
  }, [current.meta.slug]);

  return (
    <nav
      data-testid="nav-buttons"
      aria-label="Lesson navigation"
      className="flex items-center justify-between gap-4 border-t pt-8"
    >
      {prev ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <Button
            asChild
            variant="outline"
            className="group h-auto w-full justify-start gap-3 p-4 text-left"
          >
            <Link
              href={`/lesson/${prev.meta.slug}`}
              onClick={() => handleNavigation('prev', prev.meta.slug)}
            >
              <ChevronLeft className="size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              <div className="flex-1 space-y-1">
                <div className="text-xs font-medium text-muted-foreground">
                  Önceki Ders
                </div>
                <div className="font-semibold text-foreground group-hover:text-primary">
                  {prev.meta.title}
                </div>
              </div>
            </Link>
          </Button>
        </motion.div>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <Button
            asChild
            className="group h-auto w-full justify-end gap-3 p-4 text-right shadow-md"
          >
            <Link
              href={`/lesson/${next.meta.slug}`}
              onClick={() => handleNavigation('next', next.meta.slug)}
            >
              <div className="flex-1 space-y-1">
                <div className="text-xs font-medium text-primary-foreground/80">
                  Sonraki Ders
                </div>
                <div className="font-semibold text-primary-foreground">
                  {next.meta.title}
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
