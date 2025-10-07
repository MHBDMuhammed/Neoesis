'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
 * Individual key concept card
 *
 * @example
 * ```tsx
 * <KeyConcept term="Component">
 *   A reusable piece of UI that can accept props and manage state
 * </KeyConcept>
 * ```
 */
export function KeyConcept({ term, children, className }: KeyConceptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('border-primary/20 bg-muted/30', className)}>
        <CardContent className="p-4">
          <dt className="mb-2 text-base font-semibold text-primary">{term}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">
            {children}
          </dd>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
 * Container for key concept definitions with card-based layout
 *
 * @example
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
 */
export function KeyConcepts({
  title = 'Anahtar Kavramlar',
  children,
  className,
}: KeyConceptsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('not-prose my-8', className)}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>

      {/* Grid of key concepts */}
      <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {children}
      </dl>
    </motion.div>
  );
}
