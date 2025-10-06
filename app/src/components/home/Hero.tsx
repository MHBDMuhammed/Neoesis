// AI:PROTECTED - Animation and routing logic
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { curriculum } from '@/lessons';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
// End AI:PROTECTED

export function Hero() {
  const router = useRouter();

  const handleStartLearning = React.useCallback(() => {
    // Navigate to first lesson in curriculum
    const firstLesson = curriculum.lessons[0];
    if (firstLesson) {
      router.push(`/lesson/${firstLesson.meta.slug}`);
    }
  }, [router]);

  const handleViewCurriculum = React.useCallback(() => {
    router.push('/toc');
  }, [router]);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
    >
      {/* Decorative background gradient */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -start-1/2 top-0 h-[600px] w-[200%] bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* AI:SAFE-EDIT START - Hero content (badge, title, description) */}
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground"
      >
        <BookOpen className="size-4" />
        <span>Öğrenmenin Yeni Zihni</span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Anlayarak
        <br />
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text">
          Öğren
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl"
      >
        Neoesis, size uyum sağlayan akıllı bir öğrenme platformudur. Sadece öğretmez — nasıl öğrendiğinizi anlar, bilgiyi kalıcı içgörüye dönüştüren interaktif derslerle sizi yönlendirir.
      </motion.p>
      {/* AI:SAFE-EDIT END */}

      <motion.div
        variants={item}
        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        <Button
          size="lg"
          onClick={handleStartLearning}
          className="group relative overflow-hidden px-8 py-6 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            Öğrenmeye Başla
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={handleViewCurriculum}
          className="px-8 py-6 text-base font-semibold shadow-sm transition-all hover:shadow-md"
        >
          Müfredata Göz At
        </Button>
      </motion.div>

      {/* AI:SAFE-EDIT START - Trust indicators/features */}
      {/* Trust indicators */}
      <motion.div
        variants={item}
        className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12"
      >
        {[
          { label: 'İnteraktif', value: 'Dersler' },
          { label: 'Kendi Hızında', value: 'Öğrenme' },
          { label: 'İlerleme', value: 'Takibi' },
          { label: 'Anında', value: 'Geri Bildirim' },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 text-center"
          >
            <div className="text-2xl font-bold text-foreground sm:text-3xl">
              {feature.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {feature.label}
            </div>
          </div>
        ))}
      </motion.div>
      {/* AI:SAFE-EDIT END */}
    </motion.section>
  );
}
