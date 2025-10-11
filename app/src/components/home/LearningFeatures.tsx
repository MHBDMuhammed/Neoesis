'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Boxes,
  Brain,
  Code2,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

/**
 * LearningFeatures - Showcase of platform learning features
 *
 * Features:
 * - 6 key platform features
 * - Grid layout with hover effects
 * - Icon-based visual design
 * - Animated entrance
 * - Responsive layout
 */
export function LearningFeatures() {
  const features = [
    {
      icon: Boxes,
      title: '3D Görselleştirmeler',
      description:
        'Karmaşık kavramları 3D animasyonlar ve interaktif modeller ile görselleştirin.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI Destekli Öğrenme',
      description:
        'Yapay zeka ile kişiselleştirilmiş geri bildirimler ve öğrenme yolu önerileri alın.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code2,
      title: 'Canlı Kod Örnekleri',
      description:
        'Syntax highlighting ve kopyalanabilir kod örnekleri ile pratik yapın.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Target,
      title: 'İnteraktif Quiz',
      description:
        'Her ders sonunda quiz soruları ile öğrendiklerinizi test edin ve pekiştirin.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Adım Adım Rehber',
      description:
        'Karmaşık konuları küçük, anlaşılır adımlara bölerek öğrenin.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Zap,
      title: 'İlerleme Takibi',
      description:
        'Öğrenme yolculuğunuzu takip edin, başarılarınızı görün ve motive olun.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
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
            Platform Özellikleri
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Modern Öğrenme Deneyimi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Teknoloji destekli öğrenme araçları ile daha etkili ve keyifli
            bir öğrenme süreci yaşayın.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={featureVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-background rounded-2xl p-8 border border-border/50 transition-all hover:border-primary/30 hover:shadow-xl">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}
                  >
                    <div className="flex items-center justify-center size-full rounded-xl bg-background">
                      <feature.icon className="size-6 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
