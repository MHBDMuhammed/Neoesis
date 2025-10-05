import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ContinueCard } from '@/components/home/ContinueCard';
import { StatsStrip } from '@/components/home/StatsStrip';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Master new skills through interactive lessons, quizzes, and hands-on practice. Track your progress and build real expertise.',
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
