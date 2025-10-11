'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /**
   * Target number to count up to
   */
  from?: number;
  /**
   * Starting number
   */
  to: number;
  /**
   * Animation duration in seconds
   * @default 2
   */
  duration?: number;
  /**
   * Prefix text (e.g., "$", "+")
   */
  prefix?: string;
  /**
   * Suffix text (e.g., "K", "M", "+")
   */
  suffix?: string;
  /**
   * Number of decimal places
   * @default 0
   */
  decimals?: number;
  /**
   * Use thousand separators
   * @default true
   */
  useGrouping?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AnimatedCounter - Smooth counting animation with IntersectionObserver
 *
 * Features:
 * - Smooth easing
 * - Triggers on scroll into view
 * - Supports prefixes/suffixes
 * - Number formatting
 * - Accessibility optimized
 *
 * @example
 * <AnimatedCounter from={0} to={10000} suffix="+" duration={2} />
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  useGrouping = true,
  className = '',
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals);
  });

  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
      });

      setHasAnimated(true);

      return controls.stop;
    }
  }, [isInView, hasAnimated, count, to, duration]);

  // Format number with thousand separators
  const formattedValue = React.useMemo(() => {
    const value = parseFloat(rounded.get());
    if (useGrouping) {
      return value.toLocaleString('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return value.toFixed(decimals);
  }, [rounded, decimals, useGrouping]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      aria-label={`${prefix}${to.toLocaleString()}${suffix}`}
    >
      {prefix}
      <motion.span>{formattedValue}</motion.span>
      {suffix}
    </span>
  );
}
