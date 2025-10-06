'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

const calloutConfig = {
  info: {
    icon: Info,
    className:
      'border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-100',
    iconClassName: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    className:
      'border-yellow-500/50 bg-yellow-500/10 text-yellow-900 dark:text-yellow-100',
    iconClassName: 'text-yellow-500',
  },
  success: {
    icon: CheckCircle2,
    className:
      'border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-100',
    iconClassName: 'text-green-500',
  },
  error: {
    icon: XCircle,
    className:
      'border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-100',
    iconClassName: 'text-red-500',
  },
  tip: {
    icon: Lightbulb,
    className:
      'border-purple-500/50 bg-purple-500/10 text-purple-900 dark:text-purple-100',
    iconClassName: 'text-purple-500',
  },
} as const;

export interface CalloutProps {
  /**
   * The variant of the callout (info, warning, success, error, tip)
   */
  type: keyof typeof calloutConfig;
  /**
   * Optional title for the callout
   */
  title?: string;
  /**
   * Content to display inside the callout
   */
  children: React.ReactNode;
  /**
   * Optional custom icon to override the default
   */
  icon?: LucideIcon;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Callout component for highlighting important information in lessons
 *
 * @example
 * ```tsx
 * <Callout type="info" title="Did you know?">
 *   React uses a virtual DOM for efficient updates.
 * </Callout>
 * ```
 *
 * @example
 * ```tsx
 * <Callout type="warning">
 *   Be careful when using this approach in production.
 * </Callout>
 * ```
 */
export function Callout({
  type,
  title,
  children,
  icon,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = icon ?? config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'not-prose my-6 rounded-lg border-2 p-4',
        'flex gap-3',
        config.className,
        className
      )}
      role="note"
      aria-label={`${type} callout`}
    >
      <div className="flex-shrink-0">
        <Icon
          className={cn('size-5', config.iconClassName)}
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 space-y-2">
        {title && <div className="text-base font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
