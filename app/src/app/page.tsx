import type { Metadata } from 'next';
import { NewHero } from '@/components/home/NewHero';
import { FeaturedLessons } from '@/components/home/FeaturedLessons';
import { HowItWorks } from '@/components/home/HowItWorks';
import { LearningFeatures } from '@/components/home/LearningFeatures';
import { CourseTopics } from '@/components/home/CourseTopics';
import { ContinueCard } from '@/components/home/ContinueCard';
import { StatsStrip } from '@/components/home/StatsStrip';

export const metadata: Metadata = {
  title: 'Neosis - İnteraktif Öğrenme Platformu',
  description:
    'AI destekli akıllı öğrenme platformu. İnteraktif dersler, 3D görselleştirmeler ve kişiselleştirilmiş geri bildirimlerle öğrenme deneyiminizi dönüştürün. Temel seviyeden ileri seviyeye kadar kapsamlı müfredat.',
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero Section with 3D Background & Typewriter Effect */}
      <NewHero />

      {/* Featured Lessons Showcase */}
      <FeaturedLessons />

      {/* How It Works - 3 Step Process */}
      <HowItWorks />

      {/* Learning Features - Platform Capabilities */}
      <LearningFeatures />

      {/* Course Topics - Curriculum Sections */}
      <CourseTopics />

      {/* Continue Learning Card (Conditional - Shows if user has progress) */}
      <ContinueCard />

      {/* Stats Dashboard - User Progress */}
      <StatsStrip />
    </main>
  );
}
