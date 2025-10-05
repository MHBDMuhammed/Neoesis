/**
 * Design Tokens - Centralized theme configuration
 *
 * AI:SAFE-EDIT - These tokens can be customized to rebrand the platform
 *
 * Uses OKLCH color space for better perceptual uniformity
 * Structure: { light, dark } for theme-aware colors
 */

// AI:SAFE-EDIT START - Color tokens
export const colors = {
  // Brand colors - Neoesis modern professional palette
  brand: {
    light: 'oklch(0.55 0.15 265)',  // Deep indigo - sophisticated, intellectual
    dark: 'oklch(0.65 0.15 265)',   // Lighter indigo for dark mode
  },
  accent: {
    light: 'oklch(0.70 0.16 15)',   // Warm coral/rose - approachable, energetic
    dark: 'oklch(0.75 0.16 15)',    // Lighter coral for dark mode
  },

  // Semantic colors (derived from shadcn/ui base)
  primary: {
    light: 'oklch(0.208 0.042 265.755)',
    dark: 'oklch(0.929 0.013 255.508)',
  },
  primaryForeground: {
    light: 'oklch(0.984 0.003 247.858)',
    dark: 'oklch(0.208 0.042 265.755)',
  },
  background: {
    light: 'oklch(1 0 0)',
    dark: 'oklch(0.129 0.042 264.695)',
  },
  foreground: {
    light: 'oklch(0.129 0.042 264.695)',
    dark: 'oklch(0.984 0.003 247.858)',
  },
  muted: {
    light: 'oklch(0.968 0.007 247.896)',
    dark: 'oklch(0.279 0.041 260.031)',
  },
  mutedForeground: {
    light: 'oklch(0.554 0.046 257.417)',
    dark: 'oklch(0.704 0.04 256.788)',
  },
  border: {
    light: 'oklch(0.929 0.013 255.508)',
    dark: 'oklch(1 0 0 / 10%)',
  },
  destructive: {
    light: 'oklch(0.577 0.245 27.325)',
    dark: 'oklch(0.704 0.191 22.216)',
  },
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Typography tokens
export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },

  // Font sizes (rem)
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: '1.1',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  // Special use cases
  hero: {
    size: '3.5rem',
    weight: '700',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
  },
  body: {
    size: '1rem',
    weight: '500',
    lineHeight: '1.75',
  },
  code: {
    size: '0.875rem',
    weight: '400',
    lineHeight: '1.7',
    fontFamily: 'var(--font-geist-mono)',
  },
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Spacing tokens
export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Border radius tokens
export const radius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
};

// Default radius value (0.625rem = 10px)
export const defaultRadius = '0.625rem';
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Shadow tokens
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Breakpoints (for reference)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
// AI:SAFE-EDIT END

/**
 * Token Export - Unified token object
 *
 * Use this for programmatic access to design tokens
 */
export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
};

export default tokens;
