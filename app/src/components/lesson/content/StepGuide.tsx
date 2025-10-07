'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ListOrdered } from 'lucide-react';

export interface StepProps {
  /**
   * Step number (will be displayed in circle)
   */
  number: number;
  /**
   * Title of the step
   */
  title: string;
  /**
   * Description or content of the step
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Individual step in a step-by-step guide
 *
 * @example
 * ```tsx
 * <Step number={1} title="Install React">
 *   Run npm install react to add React to your project
 * </Step>
 * ```
 */
export function Step({ number, title, children, className }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: number * 0.1 }}
      className={cn('flex gap-4', className)}
    >
      {/* Step number circle */}
      <div className="flex-shrink-0">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md">
          {number}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 space-y-2 pb-8">
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        <div className="text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export interface StepGuideProps {
  /**
   * Title for the step guide
   * @default 'Adım Adım Kılavuz'
   */
  title?: string;
  /**
   * Step components
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Container for step-by-step instructions with numbered steps
 *
 * @example
 * ```tsx
 * <StepGuide title="Getting Started with React">
 *   <Step number={1} title="Create Project">
 *     <CodeBlock language="bash">
 *       npx create-react-app my-app
 *     </CodeBlock>
 *   </Step>
 *   <Step number={2} title="Start Dev Server">
 *     <CodeBlock language="bash">
 *       cd my-app && npm start
 *     </CodeBlock>
 *   </Step>
 *   <Step number={3} title="Open Browser">
 *     Navigate to http://localhost:3000
 *   </Step>
 * </StepGuide>
 * ```
 */
export function StepGuide({
  title = 'Adım Adım Kılavuz',
  children,
  className,
}: StepGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('not-prose my-8', className)}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <ListOrdered className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>

      {/* Steps container with connecting line */}
      <div className="relative space-y-0 border-s-2 border-muted ps-6">
        {children}
      </div>
    </motion.div>
  );
}
