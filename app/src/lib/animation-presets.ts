/**
 * Animation Presets - Framer Motion variants for common animations
 *
 * AI:SAFE-EDIT - Add or customize animation variants
 *
 * Usage in lessons:
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { animations } from '@/lib/animation-presets';
 *
 * <motion.div {...animations.fadeIn}>Content</motion.div>
 * ```
 */

import type { Variant } from 'framer-motion';

// AI:SAFE-EDIT START - Animation variants

/**
 * Fade In - Simple opacity fade
 * Best for: Text, images, cards
 */
export const fadeIn = {
  initial: { opacity: 0 } as Variant,
  animate: { opacity: 1 } as Variant,
  exit: { opacity: 0 } as Variant,
  transition: { duration: 0.4, ease: 'easeOut' },
};

/**
 * Slide Up - Slide up with fade
 * Best for: Cards, modals, sections
 */
export const slideUp = {
  initial: { opacity: 0, y: 20 } as Variant,
  animate: { opacity: 1, y: 0 } as Variant,
  exit: { opacity: 0, y: -20 } as Variant,
  transition: { duration: 0.5, ease: 'easeOut' },
};

/**
 * Slide Down - Slide down with fade
 * Best for: Dropdowns, alerts
 */
export const slideDown = {
  initial: { opacity: 0, y: -20 } as Variant,
  animate: { opacity: 1, y: 0 } as Variant,
  exit: { opacity: 0, y: 20 } as Variant,
  transition: { duration: 0.4, ease: 'easeOut' },
};

/**
 * Slide Right - Slide from left with fade
 * Best for: Sidebars, navigation
 */
export const slideRight = {
  initial: { opacity: 0, x: -20 } as Variant,
  animate: { opacity: 1, x: 0 } as Variant,
  exit: { opacity: 0, x: 20 } as Variant,
  transition: { duration: 0.4, ease: 'easeOut' },
};

/**
 * Scale In - Scale up with fade
 * Best for: Buttons, badges, icons
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 } as Variant,
  animate: { opacity: 1, scale: 1 } as Variant,
  exit: { opacity: 0, scale: 0.9 } as Variant,
  transition: { duration: 0.3, ease: 'easeOut' },
};

/**
 * Stagger Grid - Grid items appear in sequence
 * Best for: Grids, lists, galleries
 *
 * Usage:
 * <motion.div variants={staggerGrid.container} initial="hidden" animate="show">
 *   <motion.div variants={staggerGrid.item}>Item 1</motion.div>
 *   <motion.div variants={staggerGrid.item}>Item 2</motion.div>
 * </motion.div>
 */
export const staggerGrid = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
};

/**
 * Parallax Hero - Spring-based hero animation
 * Best for: Hero sections, featured content
 */
export const parallaxHero = {
  initial: { opacity: 0, y: 50 } as Variant,
  animate: { opacity: 1, y: 0 } as Variant,
  exit: { opacity: 0, y: -50 } as Variant,
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
};

/**
 * Bounce In - Bouncy entrance
 * Best for: Notifications, success states
 */
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 } as Variant,
  animate: { opacity: 1, scale: 1 } as Variant,
  exit: { opacity: 0, scale: 0.3 } as Variant,
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
};

/**
 * Rotate In - Rotate and scale
 * Best for: Icons, loading states
 */
export const rotateIn = {
  initial: { opacity: 0, scale: 0.5, rotate: -180 } as Variant,
  animate: { opacity: 1, scale: 1, rotate: 0 } as Variant,
  exit: { opacity: 0, scale: 0.5, rotate: 180 } as Variant,
  transition: { duration: 0.6, ease: 'easeOut' },
};

/**
 * Blur In - Opacity and blur
 * Best for: Backgrounds, overlays
 */
export const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)' } as Variant,
  animate: { opacity: 1, filter: 'blur(0px)' } as Variant,
  exit: { opacity: 0, filter: 'blur(10px)' } as Variant,
  transition: { duration: 0.5 },
};

/**
 * Smooth Reveal - Progressive content reveal
 * Best for: Hero text, headings
 */
export const smoothReveal = {
  initial: { opacity: 0, y: 30, filter: 'blur(4px)' } as Variant,
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  } as Variant,
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // Custom easing
  },
};

/**
 * Card Hover - Premium card interaction
 * Best for: Interactive cards, buttons
 */
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { scale: 0.98 },
};

/**
 * Tilt 3D - Subtle 3D tilt effect
 * Best for: Cards, images on hover
 */
export const tilt3D = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

/**
 * Magnetic Button - Button attracted to cursor
 * Best for: CTA buttons, interactive elements
 * Note: Requires custom hook for cursor tracking
 */
export const magneticButton = {
  rest: { x: 0, y: 0, scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
};

/**
 * Float Animation - Continuous floating
 * Best for: Decorative elements, badges
 */
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse Glow - Pulsing glow effect
 * Best for: Active states, notifications
 */
export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 0 0 oklch(0.55 0.15 265 / 0.4)',
      '0 0 0 10px oklch(0.55 0.15 265 / 0)',
      '0 0 0 0 oklch(0.55 0.15 265 / 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer - Shimmer effect for loading states
 * Best for: Skeleton loaders
 */
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Stagger List - List items with stagger
 * Best for: Navigation menus, feature lists
 */
export const staggerList = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  },
};

/**
 * Page Transition - Smooth page transitions
 * Best for: Route changes
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// AI:SAFE-EDIT END

/**
 * Animation Presets Export
 *
 * Use this object for programmatic access
 */
export const animations = {
  fadeIn,
  slideUp,
  slideDown,
  slideRight,
  scaleIn,
  staggerGrid,
  parallaxHero,
  bounceIn,
  rotateIn,
  blurIn,
  smoothReveal,
  cardHover,
  tilt3D,
  magneticButton,
  float,
  pulseGlow,
  shimmer,
  staggerList,
  pageTransition,
};

export default animations;
