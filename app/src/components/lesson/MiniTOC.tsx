'use client';

import * as React from 'react';
import Link from 'next/link';
import { curriculum } from '@/lessons';
import { useLessonStatus } from '@/hooks/use-progress';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MiniTOCProps {
  currentSlug: string;
}

function LessonLink({ slug, title, isCurrent }: { slug: string; title: string; isCurrent: boolean }) {
  const status = useLessonStatus(slug);

  const StatusIcon =
    status === 'completed'
      ? CheckCircle2
      : status === 'in_progress'
        ? PlayCircle
        : Circle;

  return (
    <Link
      href={`/lesson/${slug}`}
      aria-current={isCurrent ? 'page' : undefined}
      className={`group flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        isCurrent
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <StatusIcon
        className={`mt-0.5 size-4 shrink-0 ${
          isCurrent
            ? 'text-primary-foreground'
            : status === 'completed'
              ? 'text-primary'
              : status === 'in_progress'
                ? 'text-primary/70'
                : 'text-muted-foreground/50'
        }`}
      />
      <span className="flex-1 leading-tight">{title}</span>
    </Link>
  );
}

export function MiniTOC({ currentSlug }: MiniTOCProps) {
  return (
    <nav
      data-testid="mini-toc"
      aria-label="Table of Contents"
      className="space-y-6"
    >
      {curriculum.sections.map((section) => (
        <div key={section.section.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.section.title}
            </h3>
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {section.lessons.length}
            </Badge>
          </div>
          <div className="space-y-1">
            {section.lessons.map((lesson) => (
              <LessonLink
                key={lesson.meta.slug}
                slug={lesson.meta.slug}
                title={lesson.meta.title}
                isCurrent={lesson.meta.slug === currentSlug}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
