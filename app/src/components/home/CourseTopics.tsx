'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { curriculum } from '@/lessons';

/**
 * CourseTopics - Display course sections with lesson counts
 *
 * Features:
 * - Section statistics (lesson count, duration)
 * - Clickable cards navigating to TOC
 * - Gradient backgrounds per section
 * - Animated entrance
 * - Responsive grid layout
 */
export function CourseTopics() {
  const router = useRouter();

  // Calculate section statistics
  const sections = [
    {
      id: 'fundamentals',
      title: 'Temel Kavramlar',
      description:
        'Programlamaya yeni başlayanlar için temel konular ve prensipler.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      textGradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'advanced',
      title: 'İleri Seviye',
      description:
        'Daha karmaşık konular, tasarım desenleri ve optimizasyon teknikleri.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      textGradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'best-practices',
      title: 'En İyi Pratikler',
      description:
        'Profesyonel geliştirme için kod kalitesi, test ve dokümantasyon.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      textGradient: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/30',
    },
  ];

  const sectionsWithStats = sections.map((section) => {
    const lessons = curriculum.lessons.filter(
      (lesson) => lesson.meta.section === section.id
    );
    const totalMinutes = lessons.reduce(
      (sum, lesson) => sum + lesson.meta.estimatedMinutes,
      0
    );

    return {
      ...section,
      lessonCount: lessons.length,
      totalHours: Math.ceil(totalMinutes / 60),
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -end-40 size-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -start-40 size-[500px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            Ders Kategorileri
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Seviyene Uygun İçerik
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temel seviyeden ileri seviyeye kadar kapsamlı bir müfredat.
            Kendi hızında ilerle, istediğin yerden başla.
          </p>
        </motion.div>

        {/* Topic Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-3 mb-12"
        >
          {sectionsWithStats.map((section) => (
            <motion.div
              key={section.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group cursor-pointer"
              onClick={() => router.push('/toc')}
            >
              <div
                className={`relative h-full bg-gradient-to-br ${section.gradient} rounded-2xl p-8 border ${section.borderColor} transition-all hover:shadow-2xl overflow-hidden`}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative">
                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold mb-3 bg-gradient-to-r ${section.textGradient} bg-clip-text text-transparent`}
                  >
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-6 text-sm">
                    <div>
                      <div className="font-semibold text-foreground">
                        {section.lessonCount} Ders
                      </div>
                      <div className="text-muted-foreground">İçerik</div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div>
                      <div className="font-semibold text-foreground">
                        ~{section.totalHours} Saat
                      </div>
                      <div className="text-muted-foreground">Süre</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Dersleri Keşfet
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => router.push('/toc')}
            className="group"
          >
            Tüm Müfredatı Görüntüle
            <ArrowRight className="ms-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
