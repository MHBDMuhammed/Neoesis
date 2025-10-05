'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock } from 'lucide-react';
import { LessonCard } from './LessonCard';
import type { SectionWithLessons } from '@/types/lesson';

interface SectionCardProps {
  section: SectionWithLessons;
}

export function SectionCard({ section }: SectionCardProps) {
  const lessonCount = section.lessons.length;
  const hours = Math.floor(section.totalMinutes / 60);
  const minutes = section.totalMinutes % 60;
  const timeDisplay =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;

  return (
    <Card
      data-testid="section-card"
      className="overflow-hidden border-2 shadow-sm transition-all hover:shadow-md"
    >
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent pb-4">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </div>
            {section.section.title}
          </CardTitle>

          {section.section.description && (
            <p className="text-sm text-muted-foreground ps-12">
              {section.section.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 ps-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="size-4" />
              <span>
                {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{timeDisplay}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        {section.lessons.length > 0 ? (
          section.lessons.map((lesson) => (
            <LessonCard key={lesson.meta.slug} lesson={lesson} />
          ))
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No lessons in this section yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
