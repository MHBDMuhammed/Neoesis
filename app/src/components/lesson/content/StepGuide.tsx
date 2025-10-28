'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ListOrdered } from 'lucide-react';

/**
 * Props for individual Step component
 */
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
 * Individual step in a step-by-step guide with cosmic theme
 *
 * Features:
 * - Cosmic gradient number circle
 * - Staggered animation entrance
 * - Hover animation (scale + translate)
 * - ARIA semantics for accessibility
 * - Performance optimized with React.memo
 *
 * @example Basic step
 * ```tsx
 * <Step number={1} title="Install React">
 *   Run npm install react to add React to your project
 * </Step>
 * ```
 *
 * @example Step with code block
 * ```tsx
 * <Step number={2} title="Create Component">
 *   <CodeBlock language="tsx">
 *     {`function MyComponent() { return <div>Hello</div>; }`}
 *   </CodeBlock>
 * </Step>
 * ```
 *
 * @param props - The step props
 * @returns A styled step component with cosmic theme
 */
export const Step = React.memo<StepProps>(function Step({
  number,
  title,
  children,
  className,
}) {
  return (
    <div
      className={cn('flex gap-4', className)}
      role="listitem"
      aria-label={`Adım ${number}: ${title}`}
    >
      {/* Step number circle with cosmic gradient */}
      <div className="flex-shrink-0">
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-full',
            'text-lg font-bold text-white shadow-md',
            // Cosmic gradient background
            'bg-gradient-to-br from-primary/10 to-primary/5'
          )}
        >
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
    </div>
  );
});

Step.displayName = 'Step';

/**
 * Props for StepGuide container component
 */
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
 * Container for step-by-step instructions with cosmic theme
 *
 * Features:
 * - Neon glow connecting line between steps
 * - Cosmic gradient icon background
 * - ARIA list semantics for accessibility
 * - Smooth entrance animation
 * - Responsive layout
 *
 * @example React installation guide
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
 *
 * @example Custom title
 * ```tsx
 * <StepGuide title="Deployment Steps">
 *   <Step number={1} title="Build">Build the project</Step>
 *   <Step number={2} title="Test">Run tests</Step>
 *   <Step number={3} title="Deploy">Deploy to production</Step>
 * </StepGuide>
 * ```
 *
 * @param props - The component props
 * @returns A styled step-by-step guide with cosmic theme
 */
export const StepGuide = React.memo<StepGuideProps>(function StepGuide({
  title = 'Adım Adım Kılavuz',
  children,
  className,
}) {
  return (
    <div
      className={cn('not-prose my-8', className)}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-lg',
            // Cosmic gradient background
            'bg-gradient-to-br from-primary/10 to-primary/5'
          )}
        >
          <ListOrdered
            className="size-5 text-primary"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>

      {/* Steps container with neon glow connecting line */}
      <div
        className={cn(
          'relative space-y-0 ps-6',
          // Cosmic neon border with glow
          'border-s-2 border-primary/30',
          'shadow-lg shadow-primary/20'
        )}
        role="list"
        aria-label={title}
      >
        {children}
      </div>
    </div>
  );
});

StepGuide.displayName = 'StepGuide';
