'use client';

import * as React from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { m as motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for the CodeBlock component
 */
export interface CodeBlockProps {
  /**
   * The code string to display
   */
  children: string;
  /**
   * Programming language for syntax highlighting
   * @default 'typescript'
   */
  language?: Language;
  /**
   * Optional filename to display in header
   */
  filename?: string;
  /**
   * Line numbers to highlight (1-indexed)
   */
  highlightLines?: number[];
  /**
   * Show line numbers
   * @default true
   */
  showLineNumbers?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Enhanced code block component with syntax highlighting and cosmic theme
 *
 * Features:
 * - Syntax highlighting with Prism (30+ languages)
 * - Cosmic theme with gradient header and neon glow
 * - Copy to clipboard functionality
 * - Line numbers with customizable display
 * - Line highlighting for emphasis
 * - Smooth entrance animation
 * - Responsive and mobile-friendly
 * - Performance optimized with React.memo and useMemo
 *
 * @example Basic usage
 * ```tsx
 * <CodeBlock language="tsx">
 *   {`function App() {
 *     return <div>Hello World</div>;
 *   }`}
 * </CodeBlock>
 * ```
 *
 * @example With filename and line highlighting
 * ```tsx
 * <CodeBlock language="tsx" filename="App.tsx" highlightLines={[3, 5]}>
 *   {`function App() {
 *     const [count, setCount] = useState(0);
 *     // This line is highlighted
 *     const increment = () => setCount(count + 1);
 *     // This line is also highlighted
 *     return <button onClick={increment}>{count}</button>;
 *   }`}
 * </CodeBlock>
 * ```
 *
 * @example Bash command
 * ```tsx
 * <CodeBlock language="bash" showLineNumbers={false}>
 *   npm install react framer-motion
 * </CodeBlock>
 * ```
 *
 * @example JSON data
 * ```tsx
 * <CodeBlock language="json" filename="package.json">
 *   {`{
 *     "name": "my-app",
 *     "version": "1.0.0"
 *   }`}
 * </CodeBlock>
 * ```
 *
 * @param props - The component props
 * @returns A styled code block with cosmic theme and syntax highlighting
 */
export const CodeBlock = React.memo<CodeBlockProps>(function CodeBlock({
  children,
  language = 'typescript',
  filename,
  highlightLines = [],
  showLineNumbers = true,
  className,
}) {
  const [copied, setCopied] = React.useState(false);

  // Memoize theme selection for performance (dark mode could be added here)
  const selectedTheme = React.useMemo(() => themes.nightOwl, []);

  // Memoize trimmed code to avoid re-processing
  const trimmedCode = React.useMemo(() => children.trim(), [children]);

  // Copy to clipboard handler
  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  // Memoize highlight lines set for O(1) lookup
  const highlightSet = React.useMemo(
    () => new Set(highlightLines),
    [highlightLines]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg',
        // Cosmic border
        'border-2 border-[oklch(0.55_0.15_265_/_0.3)]',
        className
      )}
    >
      {/* Header with cosmic gradient */}
      <div
        className={cn(
          'flex items-center justify-between border-b px-4 py-2',
          // Cosmic gradient background
          'bg-gradient-to-r from-[oklch(0.5_0.2_260)] to-[oklch(0.6_0.18_270)]',
          'border-[oklch(0.55_0.15_265_/_0.3)]'
        )}
      >
        <div className="flex items-center gap-2">
          {filename && (
            <span className="font-mono text-sm font-medium text-white">
              {filename}
            </span>
          )}
          {!filename && (
            <span className="font-mono text-xs font-semibold uppercase tracking-wide text-white/90">
              {language}
            </span>
          )}
        </div>

        {/* Copy button with neon glow */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            'gap-2 text-white',
            'hover:bg-white/10',
            // Neon glow on hover
            'transition-shadow duration-200',
            'hover:shadow-[0_0_20px_oklch(0.55_0.15_265_/_0.5)]'
          )}
          aria-label="Kodu kopyala"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              <span className="text-xs font-medium">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span className="text-xs font-medium">Kopyala</span>
            </>
          )}
        </Button>
      </div>

      {/* Code with syntax highlighting */}
      <Highlight theme={selectedTheme} code={trimmedCode} language={language}>
        {({
          className: highlightClassName,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <pre
            className={cn(highlightClassName, 'overflow-x-auto p-4 text-sm')}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlightSet.has(lineNumber);

              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={cn(
                    '-mx-2 px-2 transition-colors duration-150',
                    // Cosmic highlight with neon border
                    isHighlighted &&
                      'border-s-4 border-[oklch(0.55_0.15_265)] bg-[oklch(0.55_0.15_265_/_0.15)]'
                  )}
                >
                  {showLineNumbers && (
                    <span className="me-4 inline-block w-8 select-none text-end text-muted-foreground/60">
                      {lineNumber}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </motion.div>
  );
});

CodeBlock.displayName = 'CodeBlock';
