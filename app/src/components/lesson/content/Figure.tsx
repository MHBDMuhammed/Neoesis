'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FigureProps {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional caption text
   */
  caption?: string;
  /**
   * Image width (for static images)
   */
  width?: number;
  /**
   * Image height (for static images)
   */
  height?: number;
  /**
   * Use fill mode for responsive images
   * @default false
   */
  fill?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Figure component for displaying images with optional captions
 *
 * @example
 * ```tsx
 * <Figure
 *   src="/images/react-component-tree.png"
 *   alt="React component tree diagram"
 *   caption="Figure 1: React component hierarchy showing parent-child relationships"
 *   width={800}
 *   height={600}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Figure
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   fill
 *   className="aspect-video"
 * />
 * ```
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  fill = false,
  className,
}: FigureProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'not-prose my-8',
        'overflow-hidden rounded-lg border bg-muted/30',
        className
      )}
    >
      <div className={cn('relative', fill ? 'w-full' : '')}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="size-full object-contain"
          />
        )}
      </div>

      {caption && (
        <figcaption className="border-t bg-muted px-4 py-3 text-center text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
