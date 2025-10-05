'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, HelpCircle, Trophy } from 'lucide-react';
import { curriculum } from '@/lessons';
import { useGlobalProgress } from '@/hooks/use-progress';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  index: number;
}

function StatCard({ icon, label, value, description, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      role="group"
      aria-label={`${label}: ${value}`}
      className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
          {icon}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function StatsStrip() {
  const globalProgress = useGlobalProgress();

  const stats = React.useMemo(() => {
    const totalLessons = curriculum.lessons.length;
    const totalMinutes = curriculum.sections.reduce(
      (sum, section) => sum + section.totalMinutes,
      0
    );
    const quizCount = curriculum.lessons.filter(
      (lesson) => lesson.meta.quiz
    ).length;
    const completionPercent = totalLessons > 0
      ? Math.round((globalProgress.completedCount / totalLessons) * 100)
      : 0;

    return [
      {
        icon: <BookOpen className="size-5" />,
        label: 'Total Lessons',
        value: totalLessons,
        description: 'Interactive lessons available',
      },
      {
        icon: <Clock className="size-5" />,
        label: 'Total Time',
        value: `${Math.ceil(totalMinutes / 60)}h`,
        description: `${totalMinutes} minutes of content`,
      },
      {
        icon: <HelpCircle className="size-5" />,
        label: 'Quizzes',
        value: quizCount,
        description: 'Practice assessments',
      },
      {
        icon: <Trophy className="size-5" />,
        label: 'Completed',
        value: `${completionPercent}%`,
        description: `${globalProgress.completedCount} of ${totalLessons} lessons`,
      },
    ];
  }, [globalProgress]);

  return (
    <section
      data-testid="stats-strip"
      aria-label="Learning statistics"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
