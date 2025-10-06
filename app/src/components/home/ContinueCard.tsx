'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useHasStarted, useLastLesson } from '@/hooks/use-progress';
import { curriculum } from '@/lessons';

export function ContinueCard() {
  const router = useRouter();
  const hasStarted = useHasStarted();
  const lastLesson = useLastLesson();
  const [hydrated, setHydrated] = React.useState(false);

  // Handle hydration
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  const lessonData = React.useMemo(() => {
    if (!lastLesson) return null;

    const [slug, progress] = lastLesson;
    const lesson = curriculum.lessonMap.get(slug);
    if (!lesson) return null;

    return {
      slug,
      title: lesson.meta.title,
      section: lesson.meta.section,
      estimatedMinutes: lesson.meta.estimatedMinutes,
      scrollProgress: progress.scrollProgress,
      status: progress.status,
    };
  }, [lastLesson]);

  const handleResume = React.useCallback(() => {
    if (lessonData) {
      router.push(`/lesson/${lessonData.slug}`);
    }
  }, [router, lessonData]);

  // Don't render until hydrated (prevents SSR mismatch)
  if (!hydrated || !hasStarted || !lessonData) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        data-testid="continue-card"
      >
        <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <PlayCircle className="size-5 text-primary" />
                Kaldığınız Yerden Devam Edin
              </CardTitle>
              <Badge
                variant={
                  lessonData.status === 'completed' ? 'default' : 'secondary'
                }
                className="gap-1"
              >
                {lessonData.status === 'completed' ? (
                  <>
                    <CheckCircle2 className="size-3" />
                    Tamamlandı
                  </>
                ) : (
                  <>
                    <Clock className="size-3" />
                    Devam Ediyor
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-foreground">
                  {lessonData.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {lessonData.estimatedMinutes} dk
                </span>
              </div>
              <p className="text-sm capitalize text-muted-foreground">
                {lessonData.section.replace(/-/g, ' ')} •{' '}
                %{lessonData.scrollProgress} tamamlandı
              </p>
            </div>

            <div className="space-y-2">
              <Progress
                value={lessonData.scrollProgress}
                className="h-2"
                aria-label={`%${lessonData.scrollProgress} tamamlandı`}
              />
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  {lessonData.scrollProgress < 100
                    ? `%${100 - lessonData.scrollProgress} kaldı`
                    : 'İstediğiniz zaman gözden geçirin'}
                </p>
                <Button
                  onClick={handleResume}
                  className="gap-2 shadow-sm"
                  aria-label={`Derse devam et: ${lessonData.title}`}
                >
                  <PlayCircle className="size-4" />
                  Devam Et
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
