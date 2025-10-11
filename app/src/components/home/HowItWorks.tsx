'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, Trophy } from 'lucide-react';

/**
 * HowItWorks - Step-by-step guide showing how the platform works
 *
 * Features:
 * - 3-step process visualization
 * - Animated number badges
 * - Icon-based visual hierarchy
 * - Responsive layout
 * - Staggered entrance animations
 */
export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: BookOpen,
      title: 'Dersi Seç ve İncele',
      description:
        'İlgilendiğin konuyu seç. Her ders, kavramları detaylı açıklamalar ve interaktif örneklerle sunar.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      number: 2,
      icon: Lightbulb,
      title: 'Pratik Yap ve Keşfet',
      description:
        'Code örnekleriyle pratik yap, 3D görselleştirmelerle kavramları keşfet. AI destekli geri bildirimlerle öğren.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      number: 3,
      icon: Trophy,
      title: 'Bilgini Test Et',
      description:
        'Quiz sorularıyla öğrendiklerini pekiştir. İlerleme takip sistemiyle başarını gör ve bir sonraki derse geç.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
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
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
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
            Nasıl Çalışır?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Üç Basit Adımda Öğren
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Neosis ile öğrenme süreci basit ve etkilidir. İster yeni başlayan
            ister deneyimli olun, kendi hızınızda ilerleyin.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 start-[calc(100%-2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-border to-transparent"
                  aria-hidden="true"
                />
              )}

              {/* Card */}
              <div className="relative bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                {/* Number Badge */}
                <div
                  className={`absolute -top-4 -start-4 flex items-center justify-center size-12 rounded-full ${step.bgColor} border-4 border-background font-bold text-lg ${step.color}`}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center size-16 rounded-2xl ${step.bgColor} mb-6`}
                >
                  <step.icon className={`size-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
