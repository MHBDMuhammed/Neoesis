'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to track scroll progress through lesson content
 * Uses IntersectionObserver on the last paragraph to detect when user reaches end
 *
 * @param lastParagraphRef - Ref to the last paragraph element in the lesson
 * @returns scrollProgress (0-100) representing percentage of content scrolled
 */
export function useScrollProgress(
  lastParagraphRef: React.RefObject<HTMLElement | null>
): number {
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const lastElement = lastParagraphRef.current;

    if (!lastElement) {
      return;
    }

    // Calculate scroll progress based on viewport position
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate percentage (0-100)
      const totalScroll = documentHeight - windowHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;

      // Clamp between 0 and 100
      const clampedProgress = Math.min(Math.max(Math.round(currentProgress), 0), 100);

      setScrollProgress(clampedProgress);
    };

    // Initial calculation
    calculateScrollProgress();

    // Update on scroll
    const handleScroll = () => {
      calculateScrollProgress();
    };

    // Update on resize (content height might change)
    const handleResize = () => {
      calculateScrollProgress();
    };

    // Intersection observer to detect when last paragraph is visible
    // Triggers at 95% threshold to mark lesson as ready for completion
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User has reached the last paragraph
            // Set to at least 95% to trigger completion logic
            setScrollProgress((prev) => Math.max(prev, 95));
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of last paragraph is visible
        rootMargin: '0px',
      }
    );

    observerRef.current.observe(lastElement);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (observerRef.current && lastElement) {
        observerRef.current.unobserve(lastElement);
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastParagraphRef]);

  return scrollProgress;
}
