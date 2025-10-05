import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { curriculum } from '@/lessons';
import { LessonLayout } from '@/components/lesson/LessonLayout';

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return curriculum.lessons.map((lesson) => ({
    slug: lesson.meta.slug,
  }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = curriculum.lessonMap.get(slug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: lesson.meta.title,
    description: lesson.meta.description,
    keywords: [
      ...lesson.meta.objectives,
      lesson.meta.section,
      'tutorial',
      'lesson',
    ],
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lessonData = curriculum.lessonMap.get(slug);

  if (!lessonData) {
    notFound();
  }

  const LessonContent = lessonData.Component;

  // Create a serializable lesson object without the Component
  const lesson = {
    meta: lessonData.meta,
    prev: lessonData.prev ? { meta: lessonData.prev.meta } : null,
    next: lessonData.next ? { meta: lessonData.next.meta } : null,
  };

  return (
    <LessonLayout lesson={lesson}>
      <LessonContent />
    </LessonLayout>
  );
}
