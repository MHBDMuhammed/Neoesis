'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  /**
   * Text to display above the indicator
   * @default "Keşfetmeye devam et"
   */
  text?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ScrollIndicator - Animated scroll hint with bouncing arrow
 *
 * Features:
 * - Bouncing animation
 * - Fade out on scroll
 * - Smooth click-to-scroll
 * - Accessibility optimized
 *
 * @example
 * <ScrollIndicator text="Aşağı kaydır" />
 */
export function ScrollIndicator({
  text = 'Keşfetmeye devam et',
  className = '',
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  // Hide indicator when user scrolls
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to next section
  const handleClick = () => {
    const nextSection = document.querySelector('section:not([data-hero])');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.4 }}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${className}`}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <button
        onClick={handleClick}
        className="group flex flex-col items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Scroll to next section"
        type="button"
      >
        {/* Text */}
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.span>

        {/* Animated arrow container */}
        <div className="relative flex h-8 w-6 items-center justify-center">
          {/* First arrow (starts visible) */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute"
          >
            <ChevronDown className="size-6 text-primary" />
          </motion.div>

          {/* Second arrow (delayed) */}
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute"
          >
            <ChevronDown className="size-6 text-primary/60" />
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-primary/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
          style={{ width: '150%', height: '150%' }}
        />
      </button>
    </motion.div>
  );
}
