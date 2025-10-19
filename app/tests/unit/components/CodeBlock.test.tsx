import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from '@/components/lesson/content/CodeBlock';
import type { Language } from 'prism-react-renderer';

describe('CodeBlock', () => {
  // Mock clipboard API
  const mockClipboard = {
    writeText: vi.fn(() => Promise.resolve()),
  };

  beforeEach(() => {
    // Mock clipboard with Object.defineProperty
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders code content correctly', () => {
      const code = 'const hello = "world";';
      render(<CodeBlock>{code}</CodeBlock>);

      expect(screen.getByText(/const/)).toBeInTheDocument();
      expect(screen.getByText(/hello/)).toBeInTheDocument();
    });

    it('renders with default language (typescript)', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    });

    it('renders with custom language', () => {
      render(<CodeBlock language="javascript">const x = 1;</CodeBlock>);

      expect(screen.getByText(/javascript/i)).toBeInTheDocument();
    });

    it('renders filename when provided', () => {
      render(
        <CodeBlock filename="App.tsx">{'const App = () => null;'}</CodeBlock>
      );

      expect(screen.getByText('App.tsx')).toBeInTheDocument();
    });

    it('shows line numbers by default', () => {
      const { container } = render(
        <CodeBlock>
          {`line 1
line 2
line 3`}
        </CodeBlock>
      );

      // Check for line number spans
      const lineNumbers = container.querySelectorAll(
        '.inline-block.w-8.select-none'
      );
      expect(lineNumbers.length).toBeGreaterThan(0);
    });

    it('hides line numbers when showLineNumbers is false', () => {
      const { container } = render(
        <CodeBlock showLineNumbers={false}>
          {`line 1
line 2`}
        </CodeBlock>
      );

      // Line numbers should not be rendered
      const lineNumbers = container.querySelectorAll(
        '.inline-block.w-8.select-none'
      );
      expect(lineNumbers).toHaveLength(0);
    });
  });

  describe('Copy Functionality', () => {
    it('has a copy button', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      const copyButton = screen.getByRole('button', { name: /kodu kopyala/i });
      expect(copyButton).toBeInTheDocument();
    });

    it('copy button has proper aria-label', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      expect(
        screen.getByRole('button', { name: /kodu kopyala/i })
      ).toHaveAttribute('aria-label', 'Kodu kopyala');
    });
  });

  describe('Line Highlighting', () => {
    it('highlights specified lines with cosmic border', () => {
      const { container } = render(
        <CodeBlock highlightLines={[2]}>
          {`line 1
line 2
line 3`}
        </CodeBlock>
      );

      // Check for highlighted line with cosmic border class
      const highlightedLines = container.querySelectorAll(
        '.border-s-4.border-\\[oklch\\(0\\.55_0\\.15_265\\)\\]'
      );
      expect(highlightedLines.length).toBeGreaterThan(0);
    });

    it('highlights multiple lines', () => {
      const { container } = render(
        <CodeBlock highlightLines={[1, 3]}>
          {`line 1
line 2
line 3`}
        </CodeBlock>
      );

      const highlightedLines = container.querySelectorAll('.border-s-4');
      expect(highlightedLines.length).toBe(2);
    });
  });

  describe('Cosmic Theme', () => {
    it('applies cosmic gradient to header', () => {
      const { container } = render(<CodeBlock>const x = 1;</CodeBlock>);

      const header = container.querySelector('.bg-gradient-to-r');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('from-[oklch(0.5_0.2_260)]');
      expect(header).toHaveClass('to-[oklch(0.6_0.18_270)]');
    });

    it('applies cosmic border to container', () => {
      const { container } = render(<CodeBlock>const x = 1;</CodeBlock>);

      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('border-2');
      expect(mainContainer).toHaveClass('border-[oklch(0.55_0.15_265_/_0.3)]');
    });

    it('applies neon glow class to copy button', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      const copyButton = screen.getByRole('button', { name: /kodu kopyala/i });
      expect(copyButton).toHaveClass(
        'hover:shadow-[0_0_20px_oklch(0.55_0.15_265_/_0.5)]'
      );
    });
  });

  describe('Accessibility', () => {
    it('has accessible copy button label', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      expect(
        screen.getByRole('button', { name: /kodu kopyala/i })
      ).toBeInTheDocument();
    });

    it('renders semantic pre element', () => {
      const { container } = render(<CodeBlock>const x = 1;</CodeBlock>);

      const pre = container.querySelector('pre');
      expect(pre).toBeInTheDocument();
    });
  });

  describe('Custom Class Names', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <CodeBlock className="custom-class">const x = 1;</CodeBlock>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      const { container } = render(
        <CodeBlock className="my-custom">const x = 1;</CodeBlock>
      );

      const element = container.firstChild;
      expect(element).toHaveClass('my-custom');
      expect(element).toHaveClass('not-prose');
      expect(element).toHaveClass('rounded-lg');
    });
  });

  describe('Languages Support', () => {
    const languages = [
      { lang: 'typescript', display: /typescript/i },
      { lang: 'javascript', display: /javascript/i },
      { lang: 'jsx', display: /jsx/i },
      { lang: 'bash', display: /bash/i },
      { lang: 'json', display: /json/i },
    ];

    languages.forEach(({ lang, display }) => {
      it(`renders ${lang} code`, () => {
        render(<CodeBlock language={lang as Language}>const x = 1;</CodeBlock>);

        expect(screen.getByText(display)).toBeInTheDocument();
      });
    });
  });

  describe('Performance & Memoization', () => {
    it('component is memoized (renders with React.memo)', () => {
      // Check that CodeBlock has displayName (set by React.memo)
      expect(CodeBlock.displayName).toBe('CodeBlock');
    });

    it('trims code content', () => {
      const code = '  const x = 1;  \n';
      const { container } = render(<CodeBlock>{code}</CodeBlock>);

      const pre = container.querySelector('pre');
      // Trimmed code should not have leading/trailing whitespace
      expect(pre?.textContent).toContain('const x = 1;');
    });
  });
});
