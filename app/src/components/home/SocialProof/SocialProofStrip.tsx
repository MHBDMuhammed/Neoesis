'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { StarRating } from './StarRating';

/**
 * SocialProofStrip - Trust indicators with animated counters and ratings
 *
 * Features:
 * - Animated counters
 * - Star ratings
 * - Staggered animations
 * - Responsive layout
 * - Accessibility optimized
 *
 * @example
 * <SocialProofStrip />
 */
export function SocialProofStrip() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="border-y border-border/50 bg-muted/30 py-8 backdrop-blur-sm"
      aria-label="Social proof and trust indicators"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 lg:px-8"
      >
        {/* Active Learners */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-primary/10 p-3">
            <Users className="size-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter from={0} to={10000} suffix="+" duration={2.5} />
            </div>
            <div className="text-sm text-muted-foreground">
              Aktif Öğrenci
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="hidden h-12 w-px bg-border sm:block"
          aria-hidden="true"
        />

        {/* Rating */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-yellow-500/10 p-3">
            <Award className="size-6 text-yellow-500" />
          </div>
          <div className="flex flex-col gap-1">
            <StarRating value={4.9} count={1234} size="sm" animated={false} />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="hidden h-12 w-px bg-border sm:block"
          aria-hidden="true"
        />

        {/* Completion Rate */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-green-500/10 p-3">
            <TrendingUp className="size-6 text-green-500" />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter from={0} to={95} suffix="%" duration={2} />
            </div>
            <div className="text-sm text-muted-foreground">
              Tamamlanma Oranı
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
