'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { curriculum } from '@/lessons';

/**
 * FeaturedLessons - Showcase of featured/popular lessons
 *
 * Features:
 * - Grid layout with lesson cards
 * - Staggered animation entrance
 * - Lesson metadata (duration, objectives)
 * - Direct navigation to lessons
 * - Responsive design
 */
export function FeaturedLessons() {
  const router = useRouter();

  // Get first 3 lessons from fundamentals section
  const featuredLessons = curriculum.lessons
    .filter((lesson) => lesson.meta.section === 'fundamentals')
    .slice(0, 3);

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
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            Öne Çıkan Dersler
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Öğrenme Yolculuğunuza Başlayın
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temel kavramlardan başlayarak adım adım ilerleyin. Her ders,
            interaktif örnekler ve quizlerle desteklenir.
          </p>
        </motion.div>

        {/* Lesson Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredLessons.map((lesson) => (
            <motion.div key={lesson.meta.slug} variants={cardVariants}>
              <Card className="group h-full transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">
                      {lesson.meta.section === 'fundamentals' && 'Temel'}
                      {lesson.meta.section === 'advanced' && 'İleri'}
                      {lesson.meta.section === 'best-practices' && 'En İyi Pratikler'}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      <span>{lesson.meta.estimatedMinutes} dk</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {lesson.meta.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {lesson.meta.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Objectives */}
                  <div className="mb-6 space-y-2">
                    {lesson.meta.objectives.slice(0, 2).map((objective, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground line-clamp-1">
                          {objective}
                        </span>
                      </div>
                    ))}
                    {lesson.meta.objectives.length > 2 && (
                      <span className="text-xs text-muted-foreground ps-6">
                        +{lesson.meta.objectives.length - 2} daha fazla
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full group/btn"
                    onClick={() => router.push(`/lesson/${lesson.meta.slug}`)}
                  >
                    Derse Başla
                    <ArrowRight className="ms-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/toc')}
            className="group"
          >
            Tüm Dersleri Görüntüle
            <ArrowRight className="ms-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
