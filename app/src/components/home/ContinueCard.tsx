'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        data-testid="continue-card"
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="group relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent shadow-xl backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-2xl">
            {/* Animated gradient background */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.55 0.15 265 / 0.08), transparent 40%)',
              }}
            />
            <CardHeader className="relative pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <PlayCircle className="size-6 text-primary" />
                  </motion.div>
                  <span style={{
                    background: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.65 0.18 280) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Kaldığınız Yerden Devam Edin
                  </span>
                </CardTitle>
                <Badge
                  variant={
                    lessonData.status === 'completed' ? 'default' : 'secondary'
                  }
                  className="gap-1.5 px-3 py-1.5 text-xs font-medium"
                >
                  {lessonData.status === 'completed' ? (
                    <>
                      <CheckCircle2 className="size-3.5" />
                      Tamamlandı
                    </>
                  ) : (
                    <>
                      <Clock className="size-3.5" />
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

            <div className="relative space-y-3">
              {/* Premium progress bar with gradient */}
              <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, oklch(0.55 0.15 265) 0%, oklch(0.65 0.18 280) 50%, oklch(0.70 0.16 15) 100%)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lessonData.scrollProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {lessonData.scrollProgress < 100
                    ? `%${100 - lessonData.scrollProgress} kaldı`
                    : '✨ İstediğiniz zaman gözden geçirin'}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleResume}
                    className="relative overflow-hidden gap-2 px-6 py-2 font-semibold shadow-lg hover:shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.60 0.18 280) 100%)',
                    }}
                    aria-label={`Derse devam et: ${lessonData.title}`}
                  >
                    <PlayCircle className="size-4" />
                    <span className="text-white">Devam Et</span>
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                      }}
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 1,
                      }}
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
