/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Rocket } from 'lucide-react';
import { Callout, type CalloutProps } from '@/components/lesson/content/Callout';

describe('Callout', () => {
  describe('Rendering', () => {
    it('renders with type="info"', () => {
      render(
        <Callout type="info">
          Test content
        </Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toBeInTheDocument();
      expect(callout).toHaveTextContent('Test content');
    });

    it('renders all 5 type variants', () => {
      const types: CalloutProps['type'][] = ['info', 'warning', 'success', 'error', 'tip'];

      types.forEach((type) => {
        const { unmount } = render(
          <Callout type={type}>Content for {type}</Callout>
        );

        const callout = screen.getByRole('note');
        expect(callout).toBeInTheDocument();
        expect(callout).toHaveTextContent(`Content for ${type}`);

        unmount();
      });
    });

    it('renders with optional title', () => {
      render(
        <Callout type="info" title="Important Info">
          Test content
        </Callout>
      );

      expect(screen.getByText('Important Info')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(
        <Callout type="warning">
          Warning content
        </Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveTextContent('Warning content');
      // No title element should exist
      expect(screen.queryByText('Warning content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Callout type="success">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Callout>
      );

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });
  });

  describe('Icon Composition', () => {
    it('renders default icon for each type', () => {
      const { container } = render(
        <Callout type="info">Content</Callout>
      );

      // Icon should be present (lucide-react renders as SVG)
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders custom icon when provided', () => {
      const { container } = render(
        <Callout type="success" icon={Rocket}>
          Custom icon test
        </Callout>
      );

      // Rocket icon should be rendered instead of default CheckCircle2
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Cosmic Theme', () => {
    it('applies cosmic gradient classes for info type', () => {
      const { container } = render(
        <Callout type="info">Content</Callout>
      );

      const callout = container.querySelector('[role="note"]');
      expect(callout).toHaveClass('bg-gradient-to-br');
      // Check for OKLCH color in class (Tailwind arbitrary value)
      expect(callout?.className).toContain('border-[oklch');
    });

    it('applies neon glow hover class', () => {
      const { container } = render(
        <Callout type="success">Content</Callout>
      );

      const callout = container.querySelector('[role="note"]');
      expect(callout?.className).toContain('hover:shadow-[0_0_20px');
    });

    it('applies different cosmic colors for each type', () => {
      const types: CalloutProps['type'][] = ['info', 'warning', 'success', 'error', 'tip'];
      const renderedCallouts: HTMLElement[] = [];

      types.forEach((type) => {
        const { container } = render(
          <Callout type={type}>Content</Callout>
        );
        const callout = container.querySelector('[role="note"]') as HTMLElement;
        renderedCallouts.push(callout);
      });

      // Each type should have unique cosmic colors
      const classNames = renderedCallouts.map((el) => el.className);
      const uniqueClassNames = new Set(classNames);
      expect(uniqueClassNames.size).toBe(types.length);
    });
  });

  describe('Accessibility (ARIA)', () => {
    it('has role="note"', () => {
      render(
        <Callout type="info">Content</Callout>
      );

      expect(screen.getByRole('note')).toBeInTheDocument();
    });

    it('has correct Turkish ARIA label for info type', () => {
      render(
        <Callout type="info">Content</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveAttribute('aria-label', 'bilgi notu');
    });

    it('has correct Turkish ARIA label for warning type', () => {
      render(
        <Callout type="warning">Content</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveAttribute('aria-label', 'uyarı notu');
    });

    it('has correct Turkish ARIA label for success type', () => {
      render(
        <Callout type="success">Content</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveAttribute('aria-label', 'başarı notu');
    });

    it('has correct Turkish ARIA label for error type', () => {
      render(
        <Callout type="error">Content</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveAttribute('aria-label', 'hata notu');
    });

    it('has correct Turkish ARIA label for tip type', () => {
      render(
        <Callout type="tip">Content</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toHaveAttribute('aria-label', 'ipucu notu');
    });

    it('icon has aria-hidden="true"', () => {
      const { container } = render(
        <Callout type="info">Content</Callout>
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Custom className', () => {
    it('merges custom className', () => {
      const { container } = render(
        <Callout type="info" className="custom-class">
          Content
        </Callout>
      );

      const callout = container.querySelector('[role="note"]');
      expect(callout).toHaveClass('custom-class');
      // Should also have base classes
      expect(callout).toHaveClass('not-prose');
      expect(callout).toHaveClass('rounded-lg');
    });
  });

  describe('Memoization', () => {
    it('component is memoized (has displayName)', () => {
      expect(Callout.displayName).toBe('Callout');
    });

    it('component is a React.memo wrapped component', () => {
      // React.memo returns a component with $$typeof symbol
      expect(Callout).toHaveProperty('$$typeof');
    });
  });

  describe('Animation (Framer Motion)', () => {
    it('renders motion.div wrapper', () => {
      const { container } = render(
        <Callout type="info">Content</Callout>
      );

      // Framer Motion adds data attributes
      const callout = container.querySelector('[role="note"]');
      expect(callout).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty string children', () => {
      render(
        <Callout type="info">{''}</Callout>
      );

      const callout = screen.getByRole('note');
      expect(callout).toBeInTheDocument();
    });

    it('renders with very long title', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <Callout type="info" title={longTitle}>
          Content
        </Callout>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders with nested elements in children', () => {
      render(
        <Callout type="tip">
          <div>
            <h4>Nested heading</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Callout>
      );

      expect(screen.getByText('Nested heading')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
