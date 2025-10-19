'use client';

import * as React from 'react';
import { m as motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Props for individual KeyConcept component
 */
export interface KeyConceptProps {
  /**
   * The term or concept name
   */
  term: string;
  /**
   * Definition or explanation of the term
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Individual key concept card with cosmic theme
 *
 * Features:
 * - Cosmic gradient text for term
 * - Neon glow border on hover
 * - Smooth scale animation
 * - Performance optimized with React.memo
 *
 * @example Basic concept
 * ```tsx
 * <KeyConcept term="Component">
 *   A reusable piece of UI that can accept props and manage state
 * </KeyConcept>
 * ```
 *
 * @example Complex definition
 * ```tsx
 * <KeyConcept term="Hook">
 *   <p>Functions that let you "hook into" React features:</p>
 *   <ul>
 *     <li>useState - State management</li>
 *     <li>useEffect - Side effects</li>
 *   </ul>
 * </KeyConcept>
 * ```
 *
 * @param props - The concept props
 * @returns A styled concept card with cosmic theme
 */
export const KeyConcept = React.memo<KeyConceptProps>(function KeyConcept({
  term,
  children,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <Card
        className={cn(
          'border-primary/20 bg-muted/30',
          'transition-all duration-200',
          // Cosmic neon border on hover
          'hover:border-[oklch(0.55_0.15_265)] hover:shadow-[0_0_20px_oklch(0.55_0.15_265_/_0.4)]',
          className
        )}
      >
        <CardContent className="p-4">
          <dt
            className={cn(
              'mb-2 text-base font-semibold',
              // Cosmic gradient text
              'bg-gradient-to-r from-[oklch(0.55_0.15_265)] to-[oklch(0.7_0.16_15)]',
              'bg-clip-text text-transparent'
            )}
          >
            {term}
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">
            {children}
          </dd>
        </CardContent>
      </Card>
    </motion.div>
  );
});

KeyConcept.displayName = 'KeyConcept';

/**
 * Props for KeyConcepts container component
 */
export interface KeyConceptsProps {
  /**
   * Title for the key concepts section
   * @default 'Anahtar Kavramlar'
   */
  title?: string;
  /**
   * KeyConcept components
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Container for key concept definitions with cosmic theme
 *
 * Features:
 * - Responsive 3-column grid (desktop), 2-col (tablet), 1-col (mobile)
 * - Cosmic gradient icon background
 * - Smooth entrance animation
 * - Performance optimized with React.memo
 *
 * @example Core concepts
 * ```tsx
 * <KeyConcepts title="Core React Concepts">
 *   <KeyConcept term="Component">
 *     Reusable UI building blocks
 *   </KeyConcept>
 *   <KeyConcept term="Props">
 *     Data passed from parent to child
 *   </KeyConcept>
 *   <KeyConcept term="State">
 *     Internal component data that can change
 *   </KeyConcept>
 * </KeyConcepts>
 * ```
 *
 * @example Many concepts (grid wraps nicely)
 * ```tsx
 * <KeyConcepts>
 *   <KeyConcept term="JSX">Template syntax</KeyConcept>
 *   <KeyConcept term="Virtual DOM">Efficient updates</KeyConcept>
 *   <KeyConcept term="Hooks">Function component features</KeyConcept>
 *   <KeyConcept term="Context">Global state</KeyConcept>
 *   <KeyConcept term="Refs">DOM access</KeyConcept>
 *   <KeyConcept term="Lifecycle">Component phases</KeyConcept>
 * </KeyConcepts>
 * ```
 *
 * @param props - The component props
 * @returns A styled key concepts grid with cosmic theme
 */
export const KeyConcepts = React.memo<KeyConceptsProps>(function KeyConcepts({
  title = 'Anahtar Kavramlar',
  children,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn('not-prose my-8', className)}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-lg',
            // Cosmic gradient background
            'bg-gradient-to-br from-[oklch(0.55_0.15_265_/_0.15)] to-[oklch(0.65_0.18_280_/_0.1)]'
          )}
        >
          <BookOpen
            className="size-5 text-[oklch(0.55_0.15_265)]"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>

      {/* Responsive grid: 3-col desktop, 2-col tablet, 1-col mobile */}
      <dl className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </dl>
    </motion.div>
  );
});

KeyConcepts.displayName = 'KeyConcepts';
