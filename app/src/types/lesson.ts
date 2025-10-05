import type { LessonMeta, QuizData } from '@/contracts/lesson-meta.schema';

export type { LessonMeta, QuizData };

export interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface LessonWithMeta {
  meta: LessonMeta;
  Component: React.ComponentType;
  prev: LessonWithMeta | null;
  next: LessonWithMeta | null;
}

export interface SectionWithLessons {
  section: Section;
  lessons: LessonWithMeta[];
  totalMinutes: number;
}

export interface CurriculumRegistry {
  lessons: LessonWithMeta[];
  lessonMap: Map<string, LessonWithMeta>;
  sections: SectionWithLessons[];
}
