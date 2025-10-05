/**
 * Grid Presets - Tailwind class strings for common layouts
 *
 * AI:SAFE-EDIT - Add or customize grid layouts
 *
 * Usage in lessons:
 * ```tsx
 * import { grids } from '@/lib/grid-presets';
 *
 * <article className={grids.twoColumn}>
 *   <div>Left column</div>
 *   <div>Right column</div>
 * </article>
 * ```
 */

// AI:SAFE-EDIT START - Grid layout presets

/**
 * Default - Single column with vertical spacing
 * Best for: Traditional article layout
 */
export const defaultGrid = 'space-y-8';

/**
 * Two Column - Equal width columns
 * Best for: Feature comparisons, side-by-side content
 */
export const twoColumn = 'grid grid-cols-1 lg:grid-cols-2 gap-8';

/**
 * Three Column - Equal width columns
 * Best for: Feature grids, card layouts
 */
export const threeColumn = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

/**
 * Four Column - Equal width columns
 * Best for: Icon grids, small cards
 */
export const fourColumn = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

/**
 * Hero Split - Asymmetric 2:1 split
 * Best for: Hero sections with image + text
 */
export const heroSplit = 'grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12';

/**
 * Asymmetric - Asymmetric 1:2 split
 * Best for: Sidebar + main content
 */
export const asymmetric = 'grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10';

/**
 * Sidebar Layout - Fixed sidebar + fluid content
 * Best for: Documentation, dashboard
 */
export const sidebarLayout = 'grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8';

/**
 * Card Grid - Responsive card grid
 * Best for: Product grids, blog posts
 */
export const cardGrid = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

/**
 * Masonry Hint - Grid with auto-fill
 * Best for: Image galleries, Pinterest-style
 * Note: Not true masonry, use additional CSS for that
 */
export const masonryHint = 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4';

/**
 * Auto Fit - Auto-fitting columns
 * Best for: Dynamic content, unknown item count
 */
export const autoFit = 'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6';

/**
 * List Layout - Narrow column for readability
 * Best for: Long-form text, articles
 */
export const listLayout = 'mx-auto max-w-2xl space-y-6';

/**
 * Wide Content - Full-width content
 * Best for: Wide images, data visualizations
 */
export const wideContent = 'mx-auto max-w-7xl space-y-8';

/**
 * Centered Narrow - Narrow centered content
 * Best for: Focus content, modals
 */
export const centeredNarrow = 'mx-auto max-w-md space-y-4';

// AI:SAFE-EDIT END

/**
 * Grid Presets Export
 *
 * Use this object for programmatic access
 */
export const grids = {
  default: defaultGrid,
  twoColumn,
  threeColumn,
  fourColumn,
  heroSplit,
  asymmetric,
  sidebarLayout,
  cardGrid,
  masonryHint,
  autoFit,
  listLayout,
  wideContent,
  centeredNarrow,
};

/**
 * Helper: Combine grid with gap
 */
export function withGap(gridClass: string, gap: string) {
  return `${gridClass.replace(/gap-\d+/, '')} gap-${gap}`;
}

/**
 * Helper: Combine grid with custom breakpoints
 */
export function withBreakpoint(gridClass: string, breakpoint: 'sm' | 'md' | 'lg' | 'xl', cols: number) {
  return `${gridClass} ${breakpoint}:grid-cols-${cols}`;
}

export default grids;
