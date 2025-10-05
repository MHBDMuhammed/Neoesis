'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ChevronUp,
  ChevronDown,
  FileEdit,
  Palette,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { curriculum } from '@/lessons';
import { cn } from '@/lib/utils';

/**
 * Authoring Toolbar - Dev-only overlay for AI-assisted authoring
 *
 * Shows when:
 * - NODE_ENV === 'development'
 * - NEXT_PUBLIC_AUTHORING_MODE === 'true' OR ?authoring=1 in URL
 *
 * Features:
 * - Current lesson metadata
 * - Quick navigation (prev/next)
 * - File path with "Open in editor" link
 * - Generate lesson action
 * - Design token preview
 * - Audit shortcuts
 */
export function AuthoringToolbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(true);
  const [showTokens, setShowTokens] = React.useState(false);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Check authoring mode flag
  const authoringMode =
    process.env.NEXT_PUBLIC_AUTHORING_MODE === 'true' ||
    searchParams.get('authoring') === '1';

  if (!authoringMode) {
    return null;
  }

  // Extract lesson from path
  const lessonSlug = pathname.startsWith('/lesson/')
    ? pathname.replace('/lesson/', '')
    : null;

  const currentLesson = lessonSlug
    ? curriculum.lessonMap.get(lessonSlug)
    : null;

  return (
    <div
      className={cn(
        'fixed bottom-4 end-4 z-[100] flex flex-col items-end gap-2',
        'font-mono text-xs'
      )}
    >
      {/* Main Toolbar Card */}
      <div
        className={cn(
          'w-96 rounded-lg border-2 border-primary bg-card shadow-2xl',
          'transition-all duration-300',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-primary px-4 py-2 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-green-400" />
            <span className="font-semibold">AI Authoring Mode</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {/* Current Page Info */}
          <div className="mb-4 space-y-2 rounded bg-muted p-3">
            <div className="text-xs font-semibold text-muted-foreground">
              CURRENT PAGE
            </div>
            <div className="text-sm font-medium">{pathname}</div>

            {currentLesson && (
              <>
                <div className="text-sm text-muted-foreground">
                  {currentLesson.meta.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  Section: {currentLesson.meta.section} • Order:{' '}
                  {currentLesson.meta.order} • {currentLesson.meta.estimatedMinutes}min
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  File: src/lessons/{lessonSlug}.tsx
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">
              QUICK ACTIONS
            </div>

            {/* Navigation */}
            {currentLesson && (
              <div className="flex gap-2">
                {currentLesson.prev && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <Link href={`/lesson/${currentLesson.prev.meta.slug}`}>
                      <ChevronLeft className="size-3" />
                      Prev
                    </Link>
                  </Button>
                )}
                {currentLesson.next && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <Link href={`/lesson/${currentLesson.next.meta.slug}`}>
                      Next
                      <ChevronRight className="size-3" />
                    </Link>
                  </Button>
                )}
              </div>
            )}

            {/* File Actions */}
            {currentLesson && (
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => {
                  // This would open in VS Code or editor
                  console.log(`[Authoring] Open: src/lessons/${lessonSlug}.tsx`);
                  alert(
                    `File path copied: src/lessons/${lessonSlug}.tsx\n\nIn a real implementation, this would open your editor.`
                  );
                }}
              >
                <FileEdit className="size-3" />
                <span className="ms-2">Open in Editor</span>
              </Button>
            )}

            {/* Generate Lesson */}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => {
                console.log('[Authoring] Generate lesson');
                alert(
                  'Run in terminal:\n\npnpm gen:lesson\n\nThis will launch the interactive lesson generator.'
                );
              }}
            >
              <Plus className="size-3" />
              <span className="ms-2">Generate New Lesson</span>
            </Button>

            {/* Design Tokens */}
            <Dialog open={showTokens} onOpenChange={setShowTokens}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                >
                  <Palette className="size-3" />
                  <span className="ms-2">Design Tokens</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Design Tokens</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-semibold">Colors</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 rounded border p-2">
                        <div className="size-8 rounded bg-primary" />
                        <div className="text-xs">
                          <div className="font-medium">Primary</div>
                          <div className="text-muted-foreground">Brand</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded border p-2">
                        <div className="size-8 rounded bg-accent" />
                        <div className="text-xs">
                          <div className="font-medium">Accent</div>
                          <div className="text-muted-foreground">Highlight</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-semibold">Typography</div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Font: Geist Sans, Geist Mono</div>
                      <div>Base: 1rem / 1.75</div>
                      <div>Hero: 3.5rem / 1.1</div>
                    </div>
                  </div>
                  <div className="rounded bg-muted p-3 text-xs">
                    <div className="font-medium">Edit tokens:</div>
                    <code className="text-xs">src/lib/design-tokens.ts</code>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Audit Shortcuts */}
            <div className="border-t pt-2">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                AUDITS
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => {
                  console.log('[Authoring] Run audits');
                  alert(
                    'Run in terminal:\n\npnpm audit:all\n\nThis will run all quality gates (typecheck, lint, tests, E2E, tw4, axe, lighthouse).'
                  );
                }}
              >
                <PlayCircle className="size-3" />
                <span className="ms-2">Run All Audits</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button (when collapsed) */}
      {!isOpen && (
        <Button
          size="sm"
          className="shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <ChevronUp className="size-4" />
          <span className="ms-1 text-xs">AI Authoring</span>
        </Button>
      )}
    </div>
  );
}
