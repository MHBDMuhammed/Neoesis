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
      {/* Premium mesh gradient background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Mesh gradient */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-30"
          style={{
            background: 'radial-gradient(at 27% 37%, oklch(0.55 0.15 265 / 0.12) 0px, transparent 50%), radial-gradient(at 97% 21%, oklch(0.70 0.16 15 / 0.1) 0px, transparent 50%), radial-gradient(at 52% 99%, oklch(0.60 0.18 230 / 0.09) 0px, transparent 50%), radial-gradient(at 10% 29%, oklch(0.65 0.18 145 / 0.07) 0px, transparent 50%), radial-gradient(at 97% 96%, oklch(0.75 0.15 85 / 0.07) 0px, transparent 50%)',
          }}
        />
        {/* Radial glow */}
        <div className="absolute -start-1/2 top-0 h-[600px] w-[200%] bg-gradient-to-b from-primary/8 via-transparent to-transparent blur-3xl" />
        {/* Animated orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute end-1/4 top-1/4 size-96 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      {/* AI:SAFE-EDIT START - Hero content (badge, title, description) */}
      <motion.div
        variants={item}
        className="group relative mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/10"
      >
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              'linear-gradient(90deg, oklch(0.55 0.15 265 / 0.05) 0%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, oklch(0.55 0.15 265 / 0.05) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 0%, oklch(0.55 0.15 265 / 0.05) 100%)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <BookOpen className="size-4 text-primary" />
        <span>Öğrenmenin Yeni Zihni</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mb-8"
        style={{ fontSize: 'clamp(2.5rem, 2rem + 3vw, 5.5rem)' }}
      >
        <span className="block font-bold tracking-tight text-foreground">
          Anlayarak
        </span>
        <span
          className="relative block font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.65 0.18 280) 50%, oklch(0.70 0.16 15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Öğren
          {/* Animated underline */}
          <motion.span
            className="absolute -bottom-2 left-0 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, oklch(0.55 0.15 265) 0%, oklch(0.70 0.16 15) 100%)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mx-auto mb-12 max-w-3xl leading-relaxed text-muted-foreground"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.375rem)' }}
      >
        Neoesis, size uyum sağlayan akıllı bir öğrenme platformudur. Sadece öğretmez — nasıl öğrendiğinizi anlar, bilgiyi kalıcı içgörüye dönüştüren interaktif derslerle sizi yönlendirir.
      </motion.p>
      {/* AI:SAFE-EDIT END */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Button
            size="lg"
            onClick={handleStartLearning}
            className="group relative overflow-hidden px-10 py-7 text-base font-semibold shadow-xl transition-all hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.60 0.18 280) 100%)',
              boxShadow: '0 8px 24px -4px oklch(0.55 0.15 265 / 0.4), 0 0 0 0 oklch(0.55 0.15 265 / 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 32px -4px oklch(0.55 0.15 265 / 0.5), 0 0 24px 0 oklch(0.55 0.15 265 / 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px -4px oklch(0.55 0.15 265 / 0.4), 0 0 0 0 oklch(0.55 0.15 265 / 0.4)';
            }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              Öğrenmeye Başla
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 -z-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 2,
              }}
            />
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            variant="outline"
            onClick={handleViewCurriculum}
            className="group border-2 border-primary/20 bg-background/50 px-10 py-7 text-base font-semibold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              Müfredata Göz At
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* AI:SAFE-EDIT START - Trust indicators/features */}
      {/* Simplified trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-20 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
      >
        {[
          { icon: '✨', text: 'İnteraktif Dersler' },
          { icon: '⚡', text: 'Anında Geri Bildirim' },
          { icon: '📊', text: 'İlerleme Takibi' },
          { icon: '🎯', text: 'Kendi Hızında' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 1.3 + index * 0.1,
            }}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span className="text-lg">{feature.icon}</span>
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
      {/* AI:SAFE-EDIT END */}
    </motion.section>
  );
}
