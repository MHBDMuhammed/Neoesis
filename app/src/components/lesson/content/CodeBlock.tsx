'use client';

import * as React from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
 * Enhanced code block with syntax highlighting, copy button, and line numbers
 *
 * @example
 * ```tsx
 * <CodeBlock language="tsx" filename="App.tsx" highlightLines={[3, 5]}>
 *   {`function App() {
 *     return <div>Hello</div>
 *   }`}
 * </CodeBlock>
 * ```
 *
 * @example
 * ```tsx
 * <CodeBlock language="bash">
 *   npm install react
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  language = 'typescript',
  filename,
  highlightLines = [],
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="font-mono text-sm text-muted-foreground">
              {filename}
            </span>
          )}
          {!filename && (
            <span className="font-mono text-xs uppercase text-muted-foreground">
              {language}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-4" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Code */}
      <Highlight
        theme={themes.nightOwl}
        code={children.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              highlightClassName,
              'overflow-x-auto p-4 text-sm'
            )}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={cn(
                    '-mx-2 px-2',
                    isHighlighted && 'bg-blue-500/20 border-s-4 border-blue-500'
                  )}
                >
                  {showLineNumbers && (
                    <span className="me-4 inline-block w-8 select-none text-end text-gray-500">
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
}
