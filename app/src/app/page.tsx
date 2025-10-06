import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ContinueCard } from '@/components/home/ContinueCard';
import { StatsStrip } from '@/components/home/StatsStrip';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description:
    'İnteraktif dersler, quizler ve uygulamalı pratiklerle yeni beceriler edinin. İlerlemenizi takip edin ve gerçek uzmanlık kazanın.',
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Hero />
      <ContinueCard />
      <StatsStrip />
    </main>
  );
}
