'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface StickyTOCProps {
  contentRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * StickyTOC - Yapışkan İçindekiler Tablosu
 *
 * Özellikleri:
 * - h2 ve h3 başlıklarından otomatik üretir
 * - Aktif bölümü vurgular (Intersection Observer)
 * - Tıklanınca smooth scroll yapar
 * - İlerleme göstergesi (% kaydırma)
 * - Hiyerarşik görünüm (h3'ler girintili)
 * - Sticky pozisyonlama
 */
export function StickyTOC({ contentRef, className }: StickyTOCProps) {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string>('');
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Extract headings from content
  React.useEffect(() => {
    if (!contentRef?.current) return;

    const article = contentRef.current;
    const h2s = Array.from(article.querySelectorAll('h2'));
    const h3s = Array.from(article.querySelectorAll('h3'));
    const allHeadings = [...h2s, ...h3s].sort((a, b) => {
      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    const extractedHeadings: Heading[] = allHeadings.map((heading) => {
      // Generate ID if not exists
      if (!heading.id) {
        const id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-zğüşıöç0-9\s]/gi, '')
          .replace(/\s+/g, '-')
          .substring(0, 50) || '';
        heading.id = id || `heading-${Math.random().toString(36).substring(7)}`;
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      };
    });

    setHeadings(extractedHeadings);
  }, [contentRef]);

  // Intersection Observer for active heading
  React.useEffect(() => {
    if (!contentRef?.current || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, contentRef]);

  // Track scroll progress
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      const progress = (scrollTop / scrollable) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to heading
  const scrollToHeading = React.useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className={cn('space-y-4', className)}
      aria-label="İçindekiler"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <FileText className="size-4" />
        <span>İçindekiler</span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress Text */}
      <div className="text-xs text-muted-foreground">
        {scrollProgress.toFixed(0)}% tamamlandı
      </div>

      {/* Headings List */}
      <ul className="space-y-1 text-sm">
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;
          const isH3 = heading.level === 3;

          return (
            <motion.li
              key={heading.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(isH3 && 'ps-4')}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'group flex w-full items-start gap-2 rounded-md px-3 py-2 text-start transition-all',
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {/* Active indicator */}
                <span
                  className={cn(
                    'mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all',
                    isActive ? 'bg-primary' : 'bg-border group-hover:bg-primary/50'
                  )}
                />

                {/* Heading text */}
                <span className="flex-1 line-clamp-2">{heading.text}</span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Summary */}
      <div className="border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Toplam bölüm:</span>
          <span className="font-medium">{headings.length}</span>
        </div>
      </div>
    </motion.nav>
  );
}
