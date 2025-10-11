'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Target } from 'lucide-react';

interface TOCHeroProps {
  totalLessons: number;
  totalHours: number;
  completedLessons: number;
}

/**
 * TOCHero - Premium header section for TOC page
 *
 * Features:
 * - Stats overview (total lessons, hours, completion)
 * - Gradient background
 * - Animated entrance
 * - Icon-based design
 */
export function TOCHero({
  totalLessons,
  totalHours,
  completedLessons,
}: TOCHeroProps) {
  const completionPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  const stats = [
    {
      icon: BookOpen,
      label: 'Toplam Ders',
      value: totalLessons,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: GraduationCap,
      label: 'Toplam Süre',
      value: `${totalHours}+ Saat`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Target,
      label: 'Tamamlanma',
      value: `%${completionPercentage}`,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-8 shadow-lg">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -end-24 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -start-24 size-48 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-3">
            Müfredat
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
            Tüm Dersler
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Temel seviyeden ileri seviyeye kadar kapsamlı öğrenme yolculuğunuz.
            İstediğiniz yerden başlayın, kendi hızınızda ilerleyin.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 rounded-xl border bg-background/50 p-4 backdrop-blur-sm"
            >
              <div className={`flex size-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
