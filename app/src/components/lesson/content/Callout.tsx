'use client';

import * as React from 'react';
import { m as motion } from 'framer-motion';
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
      'border-[oklch(0.6_0.18_230_/_0.5)] bg-gradient-to-br from-[oklch(0.6_0.18_230_/_0.08)] to-[oklch(0.7_0.15_240_/_0.05)] text-[oklch(0.3_0.1_230)] dark:text-[oklch(0.85_0.12_230)]',
    iconClassName: 'text-[oklch(0.6_0.18_230)]',
    glowClass: 'hover:shadow-[0_0_20px_oklch(0.6_0.18_230_/_0.3)]',
  },
  warning: {
    icon: AlertTriangle,
    // Cosmic yellow gradient border + background
    className:
      'border-[oklch(0.75_0.15_85_/_0.5)] bg-gradient-to-br from-[oklch(0.75_0.15_85_/_0.08)] to-[oklch(0.8_0.12_90_/_0.05)] text-[oklch(0.4_0.1_85)] dark:text-[oklch(0.85_0.12_85)]',
    iconClassName: 'text-[oklch(0.75_0.15_85)]',
    glowClass: 'hover:shadow-[0_0_20px_oklch(0.75_0.15_85_/_0.3)]',
  },
  success: {
    icon: CheckCircle2,
    // Cosmic green gradient border + background
    className:
      'border-[oklch(0.65_0.18_145_/_0.5)] bg-gradient-to-br from-[oklch(0.65_0.18_145_/_0.08)] to-[oklch(0.7_0.15_155_/_0.05)] text-[oklch(0.3_0.1_145)] dark:text-[oklch(0.85_0.12_145)]',
    iconClassName: 'text-[oklch(0.65_0.18_145)]',
    glowClass: 'hover:shadow-[0_0_20px_oklch(0.65_0.18_145_/_0.3)]',
  },
  error: {
    icon: XCircle,
    // Cosmic red gradient border + background
    className:
      'border-[oklch(0.6_0.2_20_/_0.5)] bg-gradient-to-br from-[oklch(0.6_0.2_20_/_0.08)] to-[oklch(0.65_0.18_30_/_0.05)] text-[oklch(0.3_0.12_20)] dark:text-[oklch(0.85_0.15_20)]',
    iconClassName: 'text-[oklch(0.6_0.2_20)]',
    glowClass: 'hover:shadow-[0_0_20px_oklch(0.6_0.2_20_/_0.3)]',
  },
  tip: {
    icon: Lightbulb,
    // Cosmic purple gradient border + background
    className:
      'border-[oklch(0.65_0.18_280_/_0.5)] bg-gradient-to-br from-[oklch(0.65_0.18_280_/_0.08)] to-[oklch(0.7_0.15_290_/_0.05)] text-[oklch(0.3_0.1_280)] dark:text-[oklch(0.85_0.12_280)]',
    iconClassName: 'text-[oklch(0.65_0.18_280)]',
    glowClass: 'hover:shadow-[0_0_20px_oklch(0.65_0.18_280_/_0.3)]',
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
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
    </motion.div>
  );
});

Callout.displayName = 'Callout';
