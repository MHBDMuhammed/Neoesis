// AI:PROTECTED - Animation and routing logic
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { curriculum } from '@/lessons';
import { TypewriterTitle } from './Hero/TypewriterTitle';
import { ScrollIndicator } from './Hero/ScrollIndicator';

// Lazy load 3D background (performance + SSR safe)
const HeroBackground3D = dynamic(
  () => import('./Hero/HeroBackground3D').then((mod) => ({ default: mod.HeroBackground3D })),
  { ssr: false, loading: () => null }
);

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
// End AI:PROTECTED

/**
 * HeroSection - Premium hero section with 3D background and typewriter effect
 *
 * Features:
 * - 3D animated background (Three.js)
 * - Typewriter effect with rotating words
 * - Premium animations
 * - Trust indicators
 * - Scroll indicator
 * - Glassmorphism effects
 *
 * @accessibility
 * - ARIA labels
 * - Keyboard navigation
 * - Screen reader friendly
 * - WCAG 2.1 AA compliant
 */
export function HeroSection() {
  const router = useRouter();

  const handleStartLearning = React.useCallback(() => {
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
      data-hero
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      {/* Premium 3D Background */}
      <HeroBackground3D />

      {/* Additional mesh gradient overlay */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Mesh gradient */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-30"
          style={{
            background:
              'radial-gradient(at 27% 37%, oklch(0.55 0.15 265 / 0.12) 0px, transparent 50%), radial-gradient(at 97% 21%, oklch(0.70 0.16 15 / 0.1) 0px, transparent 50%), radial-gradient(at 52% 99%, oklch(0.60 0.18 230 / 0.09) 0px, transparent 50%), radial-gradient(at 10% 29%, oklch(0.65 0.18 145 / 0.07) 0px, transparent 50%)',
          }}
        />
        {/* Radial glow */}
        <div className="absolute -start-1/2 top-0 h-[600px] w-[200%] bg-gradient-to-b from-primary/8 via-transparent to-transparent blur-3xl" />
      </div>

      {/* AI:SAFE-EDIT START - Hero content */}
      {/* Typewriter Title */}
      <TypewriterTitle
        staticText="Anlayarak"
        rotatingWords={['Öğren', 'Keşfet', 'Başar']}
        interval={3000}
        typingSpeed={100}
        className="mb-8"
      />

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mb-12 max-w-3xl leading-relaxed text-muted-foreground"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.375rem)' }}
      >
        İnteraktif dersler, 3D görselleştirmeler ve uygulamalı pratiklerle
        öğrenme yolculuğunuza başlayın. Her ders, konuyu derinlemesine
        anlamanız için tasarlandı.
      </motion.p>
      {/* AI:SAFE-EDIT END */}

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        {/* Primary CTA */}
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
              background:
                'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.60 0.18 280) 100%)',
              boxShadow:
                '0 8px 24px -4px oklch(0.55 0.15 265 / 0.4), 0 0 0 0 oklch(0.55 0.15 265 / 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 12px 32px -4px oklch(0.55 0.15 265 / 0.5), 0 0 24px 0 oklch(0.55 0.15 265 / 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 8px 24px -4px oklch(0.55 0.15 265 / 0.4), 0 0 0 0 oklch(0.55 0.15 265 / 0.4)';
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
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
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

        {/* Secondary CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            variant="outline"
            onClick={handleViewCurriculum}
            className="group border-2 border-primary/20 bg-background/50 px-10 py-7 text-base font-semibold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="size-5" />
              Tüm Dersleri Gör
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator text="Keşfetmeye devam et" />
    </motion.section>
  );
}
