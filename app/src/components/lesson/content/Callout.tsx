'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

/**
 * Callout configuration with cosmic theme colors (OKLCH)
 * Each variant has specific colors, gradients, and neon glow effects
 */
const calloutConfig = {
  info: {
    icon: Info,
    // Cosmic blue gradient border + background
    className:
      'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-950 dark:text-blue-200 dark:border-blue-400/40 dark:from-blue-400/10',
    iconClassName: 'text-blue-600 dark:text-blue-400',
    glowClass: 'hover:shadow-blue-500/20',
  },
  warning: {
    icon: AlertTriangle,
    // Cosmic yellow gradient border + background
    className:
      'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 text-yellow-950 dark:text-yellow-200 dark:border-yellow-400/40 dark:from-yellow-400/10',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    glowClass: 'hover:shadow-yellow-500/20',
  },
  success: {
    icon: CheckCircle2,
    // Cosmic green gradient border + background
    className:
      'border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/5 text-green-950 dark:text-green-200 dark:border-green-400/40 dark:from-green-400/10',
    iconClassName: 'text-green-600 dark:text-green-400',
    glowClass: 'hover:shadow-green-500/20',
  },
  error: {
    icon: XCircle,
    // Cosmic red gradient border + background
    className:
      'border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5 text-red-950 dark:text-red-200 dark:border-red-400/40 dark:from-red-400/10',
    iconClassName: 'text-red-600 dark:text-red-400',
    glowClass: 'hover:shadow-red-500/20',
  },
  tip: {
    icon: Lightbulb,
    // Cosmic purple gradient border + background
    className:
      'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/5 text-purple-950 dark:text-purple-200 dark:border-purple-400/40 dark:from-purple-400/10',
    iconClassName: 'text-purple-600 dark:text-purple-400',
    glowClass: 'hover:shadow-purple-500/20',
  },
} as const;

/**
 * Props for the Callout component
 */
export interface CalloutProps {
  /**
   * The variant of the callout
   * @default 'info'
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
   * Use any Lucide React icon component
   */
  icon?: LucideIcon;
  /**
   * Additional CSS classes to merge
   */
  className?: string;
}

/**
 * Callout component for highlighting important information in lessons
 *
 * Features:
 * - 5 semantic variants (info, warning, success, error, tip)
 * - Cosmic theme with OKLCH gradient borders and backgrounds
 * - Neon glow effect on hover (dark mode enhanced)
 * - Custom icon slot composition
 * - Smooth entrance animation
 * - Accessible with proper ARIA labels
 * - Responsive and mobile-friendly
 *
 * @example Basic info callout
 * ```tsx
 * <Callout type="info" title="Bilgi">
 *   React, sanal DOM kullanarak verimli güncellemeler yapar.
 * </Callout>
 * ```
 *
 * @example Warning without title
 * ```tsx
 * <Callout type="warning">
 *   Bu yaklaşımı production'da kullanırken dikkatli olun.
 * </Callout>
 * ```
 *
 * @example Success with custom icon
 * ```tsx
 * import { Rocket } from 'lucide-react';
 *
 * <Callout type="success" title="Başarılı!" icon={Rocket}>
 *   Projeniz başarıyla oluşturuldu!
 * </Callout>
 * ```
 *
 * @example Tip with complex content
 * ```tsx
 * <Callout type="tip" title="Pro İpucu">
 *   <p>useState hook'u ile component state'i yönetebilirsiniz:</p>
 *   <CodeBlock language="tsx">
 *     {`const [count, setCount] = useState(0);`}
 *   </CodeBlock>
 * </Callout>
 * ```
 *
 * @param props - The component props
 * @returns A styled callout component with cosmic theme
 */
export const Callout = React.memo<CalloutProps>(function Callout({
  type,
  title,
  children,
  icon,
  className,
}) {
  // Get configuration for the specified type
  const config = React.useMemo(() => calloutConfig[type], [type]);

  // Use custom icon or default from config
  const Icon = icon ?? config.icon;

  // ARIA label mapping (Turkish)
  const ariaLabelMap: Record<typeof type, string> = React.useMemo(
    () => ({
      info: 'bilgi notu',
      warning: 'uyarı notu',
      success: 'başarı notu',
      error: 'hata notu',
      tip: 'ipucu notu',
    }),
    []
  );

  return (
    <div
      className={cn(
        // Base styles
        'not-prose my-6 rounded-lg border-2 p-4',
        'flex gap-3',
        // Cosmic theme transition
        'transition-all duration-200 ease-out',
        // Type-specific cosmic styles
        config.className,
        config.glowClass,
        // Custom overrides
        className
      )}
      role="note"
      aria-label={ariaLabelMap[type]}
    >
      {/* Icon slot - composition pattern */}
      <div className="flex-shrink-0 pt-0.5">
        <Icon
          className={cn('size-5', config.iconClassName)}
          aria-hidden="true"
        />
      </div>

      {/* Content slot */}
      <div className="flex-1 space-y-2">
        {title && (
          <div className="text-base font-semibold leading-tight">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
});

Callout.displayName = 'Callout';
