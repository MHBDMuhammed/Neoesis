'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ObjectivesPanel } from './ObjectivesPanel';
import { MiniTOC } from './MiniTOC';
import { ReadingProgress } from './ReadingProgress';
import { NavButtons } from './NavButtons';
import { Quiz } from './Quiz';
import { useLessonTimer } from '@/hooks/use-lesson-timer';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import type { LessonMeta } from '@/types/lesson';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface LessonLayoutProps {
  lesson: {
    meta: LessonMeta;
    prev: { meta: LessonMeta } | null;
    next: { meta: LessonMeta } | null;
  };
  children: React.ReactNode;
}

export function LessonLayout({ lesson, children }: LessonLayoutProps) {
  const lastParagraphRef = React.useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(lastParagraphRef as React.RefObject<HTMLElement | null>);

  // Start 30-second timer for "in_progress" status
  useLessonTimer(lesson.meta.slug);

  // Render content once to avoid duplication
  const lessonContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <ObjectivesPanel objectives={lesson.meta.objectives} />

      <article data-testid="lesson-content" className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border lg:prose-h1:text-3xl lg:prose-h2:text-2xl lg:prose-h3:text-xl">
        {children}
      </article>

      {lesson.meta.quiz && <Quiz lesson={lesson} />}

      <NavButtons current={lesson} />

      <div ref={lastParagraphRef} className="h-px" aria-hidden="true" />
    </motion.div>
  );

  return (
    <main id="main-content" data-testid="lesson-layout" className="min-h-screen bg-background">
        {/* Desktop: 3-column layout */}
        <div className="mx-auto hidden max-w-[1800px] lg:grid lg:grid-cols-[280px_1fr_280px]">
          {/* Left Sidebar: Mini TOC */}
          <aside className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-e bg-muted/30 p-6 pt-8">
            <MiniTOC currentSlug={lesson.meta.slug} />
          </aside>

          {/* Desktop Content */}
          <div className="px-8 py-12">
            <div className="mx-auto max-w-3xl">{lessonContent}</div>
          </div>

          {/* Right Sidebar: Metadata */}
          <aside
            data-testid="meta-sidebar"
            className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-s bg-muted/30 p-6 pt-8"
          >
            <ReadingProgress
              progress={scrollProgress}
              estimatedMinutes={lesson.meta.estimatedMinutes}
              lessonSlug={lesson.meta.slug}
            />
          </aside>
        </div>

        {/* Mobile/Tablet: Single column with drawer */}
        <div className="lg:hidden">
          {/* Mobile header */}
          <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between px-4 py-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Menu className="size-4" />
                    Menu
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Table of Contents</DialogTitle>
                  </DialogHeader>
                  <MiniTOC currentSlug={lesson.meta.slug} />
                </DialogContent>
              </Dialog>

              <ReadingProgress
                progress={scrollProgress}
                estimatedMinutes={lesson.meta.estimatedMinutes}
                lessonSlug={lesson.meta.slug}
                compact
              />
            </div>
          </div>

          {/* Mobile content */}
          <div className="px-4 py-8">
            <div className="mx-auto max-w-2xl">{lessonContent}</div>
          </div>
        </div>
      </main>
  );
}
