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
};

export default animations;
