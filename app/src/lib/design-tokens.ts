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

  // Extended semantic colors
  success: {
    light: 'oklch(0.65 0.18 145)',
    dark: 'oklch(0.75 0.18 145)',
  },
  warning: {
    light: 'oklch(0.75 0.15 85)',
    dark: 'oklch(0.80 0.15 85)',
  },
  info: {
    light: 'oklch(0.60 0.18 230)',
    dark: 'oklch(0.70 0.18 230)',
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

  // Fluid font sizes (responsive with clamp)
  fluid: {
    xs: 'clamp(0.70rem, 0.65rem + 0.25vw, 0.75rem)',
    sm: 'clamp(0.81rem, 0.76rem + 0.25vw, 0.875rem)',
    base: 'clamp(0.94rem, 0.88rem + 0.3vw, 1rem)',
    lg: 'clamp(1.09rem, 1.01rem + 0.4vw, 1.25rem)',
    xl: 'clamp(1.27rem, 1.17rem + 0.5vw, 1.5rem)',
    '2xl': 'clamp(1.48rem, 1.35rem + 0.65vw, 1.875rem)',
    '3xl': 'clamp(1.72rem, 1.56rem + 0.8vw, 2.25rem)',
    '4xl': 'clamp(2rem, 1.8rem + 1vw, 3rem)',
    '5xl': 'clamp(2.33rem, 2.08rem + 1.25vw, 3.75rem)',
    '6xl': 'clamp(2.71rem, 2.4rem + 1.55vw, 4.5rem)',
    '7xl': 'clamp(3.16rem, 2.78rem + 1.9vw, 6rem)',
  },

  // Fixed font sizes (rem) - for precise control
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

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Special use cases
  hero: {
    size: 'clamp(2.5rem, 2rem + 2.5vw, 5rem)',
    weight: '700',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
  },
  body: {
    size: 'clamp(0.94rem, 0.88rem + 0.3vw, 1rem)',
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
  // Standard elevation shadows
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Neumorphic shadows (light + dark side)
  neumorphic: {
    sm: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.7)',
    md: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.7)',
    lg: '10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.7)',
  },

  // Colored shadows (for primary elements)
  colored: {
    primary: '0 8px 16px -4px oklch(0.55 0.15 265 / 0.3)',
    accent: '0 8px 16px -4px oklch(0.70 0.16 15 / 0.3)',
    success: '0 8px 16px -4px oklch(0.65 0.18 145 / 0.3)',
    warning: '0 8px 16px -4px oklch(0.75 0.15 85 / 0.3)',
    error: '0 8px 16px -4px oklch(0.577 0.245 27.325 / 0.3)',
  },

  // Glow effects
  glow: {
    sm: '0 0 8px oklch(0.55 0.15 265 / 0.3)',
    md: '0 0 16px oklch(0.55 0.15 265 / 0.4)',
    lg: '0 0 24px oklch(0.55 0.15 265 / 0.5)',
  },

  // Inner shadows
  inner: {
    sm: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    md: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
  },
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

// AI:SAFE-EDIT START - Gradient tokens
export const gradients = {
  // Brand gradients
  primary: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.60 0.18 280) 100%)',
  accent: 'linear-gradient(135deg, oklch(0.70 0.16 15) 0%, oklch(0.75 0.18 30) 100%)',

  // Radial gradients
  radial: {
    primary: 'radial-gradient(circle at top, oklch(0.55 0.15 265 / 0.2) 0%, transparent 70%)',
    accent: 'radial-gradient(circle at center, oklch(0.70 0.16 15 / 0.3) 0%, transparent 60%)',
  },

  // Mesh gradients (complex multi-color)
  mesh: {
    hero: 'radial-gradient(at 27% 37%, oklch(0.55 0.15 265 / 0.12) 0px, transparent 50%), radial-gradient(at 97% 21%, oklch(0.70 0.16 15 / 0.1) 0px, transparent 50%), radial-gradient(at 52% 99%, oklch(0.60 0.18 230 / 0.09) 0px, transparent 50%), radial-gradient(at 10% 29%, oklch(0.65 0.18 145 / 0.07) 0px, transparent 50%)',
    subtle: 'radial-gradient(at 40% 20%, oklch(0.55 0.15 265 / 0.05) 0px, transparent 50%), radial-gradient(at 80% 0%, oklch(0.70 0.16 15 / 0.04) 0px, transparent 50%), radial-gradient(at 0% 50%, oklch(0.60 0.18 230 / 0.03) 0px, transparent 50%)',
  },

  // Conic gradients
  conic: {
    rainbow: 'conic-gradient(from 0deg, oklch(0.55 0.15 265), oklch(0.60 0.18 230), oklch(0.65 0.18 145), oklch(0.75 0.15 85), oklch(0.70 0.16 15), oklch(0.55 0.15 265))',
  },

  // Text gradients
  text: {
    primary: 'linear-gradient(135deg, oklch(0.55 0.15 265) 0%, oklch(0.65 0.18 280) 100%)',
    accent: 'linear-gradient(135deg, oklch(0.70 0.16 15) 0%, oklch(0.80 0.20 30) 100%)',
    multicolor: 'linear-gradient(90deg, oklch(0.55 0.15 265) 0%, oklch(0.60 0.18 230) 50%, oklch(0.70 0.16 15) 100%)',
  },

  // Utility gradients
  overlay: {
    dark: 'linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 0.6) 100%)',
    light: 'linear-gradient(180deg, transparent 0%, rgb(255 255 255 / 0.6) 100%)',
  },
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Glassmorphism tokens
export const glass = {
  sm: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  md: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  lg: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  // Dark mode variants
  dark: {
    sm: {
      background: 'rgba(20, 20, 30, 0.7)',
      backdropFilter: 'blur(8px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    md: {
      background: 'rgba(20, 20, 30, 0.6)',
      backdropFilter: 'blur(12px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    lg: {
      background: 'rgba(20, 20, 30, 0.5)',
      backdropFilter: 'blur(16px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    },
  },
};
// AI:SAFE-EDIT END

// AI:SAFE-EDIT START - Animation/Easing curves
export const easings = {
  // Standard easing
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Custom premium easings
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  snappy: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  // Specific use cases
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
  dialog: 'cubic-bezier(0.16, 1, 0.3, 1)',
  tooltip: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const durations = {
  instant: '100ms',
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
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
  gradients,
  glass,
  easings,
  durations,
};

export default tokens;
