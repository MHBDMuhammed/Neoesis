'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  /**
   * Rating value (0-5)
   */
  value: number;
  /**
   * Total number of reviews
   */
  count?: number;
  /**
   * Show animated entrance
   * @default true
   */
  animated?: boolean;
  /**
   * Size of stars
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

/**
 * StarRating - Animated star rating display with review count
 *
 * Features:
 * - Partial star support (half stars)
 * - Animated entrance
 * - Review count display
 * - Multiple sizes
 * - Accessibility optimized
 *
 * @example
 * <StarRating value={4.9} count={1234} animated />
 */
export function StarRating({
  value,
  count,
  animated = true,
  size = 'md',
  className = '',
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.min(Math.max((value - i) * 100, 0), 100);

    return {
      id: i,
      filled: fillPercentage >= 100,
      partial: fillPercentage > 0 && fillPercentage < 100,
      fillPercentage,
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    show: { scale: 1, rotate: 0 },
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="img"
      aria-label={`${value} out of 5 stars${count ? ` based on ${count.toLocaleString()} reviews` : ''}`}
    >
      {/* Stars */}
      <motion.div
        variants={animated ? containerVariants : undefined}
        initial={animated ? 'hidden' : undefined}
        whileInView={animated ? 'show' : undefined}
        viewport={{ once: true }}
        className="flex gap-0.5"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            variants={animated ? starVariants : undefined}
            className="relative"
          >
            {/* Background star (empty) */}
            <Star
              className={`${sizeClasses[size]} text-muted-foreground/30`}
              fill="currentColor"
            />

            {/* Foreground star (filled) */}
            {star.fillPercentage > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: `${star.fillPercentage}%`,
                }}
              >
                <Star
                  className={`${sizeClasses[size]} text-yellow-500`}
                  fill="currentColor"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Rating value & count */}
      <div className="flex items-baseline gap-1.5 text-sm">
        <span className="font-bold text-foreground">{value.toFixed(1)}</span>
        {count && (
          <span className="text-muted-foreground">
            ({count.toLocaleString()} değerlendirme)
          </span>
        )}
      </div>
    </div>
  );
}
