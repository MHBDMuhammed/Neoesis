'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ObjectivesPanel } from './ObjectivesPanel';
import { ReadingProgress } from './ReadingProgress';
import { Quiz } from './Quiz';
import { FocusMode } from './FocusMode';
import { ReaderSettings } from './ReaderSettings';
import { StickyTOC } from './StickyTOC';
import { LessonNav } from './LessonNav';
import { NotesPanel } from './notes/NotesPanel';
import { TextHighlighter } from './notes/TextHighlighter';
import { useLessonTimer } from '@/hooks/use-lesson-timer';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import type { LessonMeta } from '@/types/lesson';

interface LessonLayoutProps {
  lesson: {
    meta: LessonMeta;
    prev: { meta: LessonMeta } | null;
    next: { meta: LessonMeta } | null;
  };
  children: React.ReactNode;
}

/**
 * LessonLayout - Advanced lesson layout with rich features
 *
 * Features:
 * - Focus Mode (full-screen reader)
 * - Reader Settings (font, theme, width)
 * - Sticky TOC (auto-generated from headings)
 * - Rich navigation cards
 * - Notes Panel
 * - Text Highlighter
 * - Sidebar toggle controls
 */
export function LessonLayout({
  lesson,
  children,
}: LessonLayoutProps) {
  const articleRef = React.useRef<HTMLElement>(null);
  const lastParagraphRef = React.useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(
    lastParagraphRef as React.RefObject<HTMLElement | null>
  );

  const [focusModeActive, setFocusModeActive] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Start 30-second timer for "in_progress" status
  useLessonTimer(lesson.meta.slug);

  // Close drawer on route change
  React.useEffect(() => {
    setDrawerOpen(false);
  }, [lesson.meta.slug]);

  // Lesson content
  const lessonContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <article
        ref={articleRef}
        data-testid="lesson-content"
        className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border lg:prose-h1:text-3xl lg:prose-h2:text-2xl lg:prose-h3:text-xl"
      >
        {children}
      </article>

      {lesson.meta.quiz && <Quiz lesson={lesson} />}

      <div ref={lastParagraphRef} className="h-px" aria-hidden="true" />
    </motion.div>
  );

  // Focus Mode
  if (focusModeActive) {
    return (
      <>
        <FocusMode
          isActive={focusModeActive}
          onToggle={() => setFocusModeActive(false)}
        >
          {lessonContent}
        </FocusMode>
        <TextHighlighter contentRef={articleRef} lessonSlug={lesson.meta.slug} />
      </>
    );
  }

  return (
    <main
      id="main-content"
      data-testid="enhanced-lesson-layout"
      className="min-h-screen bg-background"
    >
      {/* Backdrop Overlay */}
      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* Drawer Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: drawerOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 start-0 z-50 w-full max-w-sm overflow-y-auto border-e bg-background shadow-2xl sm:max-w-md"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ders İçeriği</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDrawerOpen(false)}
              aria-label="Menüyü kapat"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="space-y-8 px-6 py-6">
          {/* Progress Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              İlerleme
            </h3>
            <ReadingProgress
              progress={scrollProgress}
              estimatedMinutes={lesson.meta.estimatedMinutes}
              lessonSlug={lesson.meta.slug}
            />
          </div>

          {/* Table of Contents */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              İçindekiler
            </h3>
            <StickyTOC contentRef={articleRef} />
          </div>

          {/* Objectives */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Öğrenme Hedefleri
            </h3>
            <ObjectivesPanel objectives={lesson.meta.objectives} />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Navigasyon
            </h3>
            <LessonNav current={lesson} />
          </div>
        </div>
      </motion.aside>

      {/* Main Layout */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Action Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="default"
            onClick={() => setDrawerOpen(true)}
            className="gap-2"
          >
            <Menu className="size-4" />
            <span className="hidden sm:inline">İçerik Menüsü</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusModeActive(true)}
              className="gap-2"
            >
              <Maximize2 className="size-4" />
              <span className="hidden sm:inline">Odaklanma</span>
            </Button>
            <ReaderSettings />
            <NotesPanel lessonSlug={lesson.meta.slug} />
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl">
          {lessonContent}
        </div>
      </div>

      {/* Text Highlighter */}
      <TextHighlighter contentRef={articleRef} lessonSlug={lesson.meta.slug} />
    </main>
  );
}
