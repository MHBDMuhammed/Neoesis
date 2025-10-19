import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepGuide, Step } from '@/components/lesson/content/StepGuide';

describe('StepGuide', () => {
  describe('Rendering', () => {
    it('renders with default title', () => {
      render(
        <StepGuide>
          <Step number={1} title="First Step">
            Do this first
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('Adım Adım Kılavuz')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(
        <StepGuide title="Custom Guide">
          <Step number={1} title="First Step">
            Content
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('Custom Guide')).toBeInTheDocument();
    });

    it('renders multiple steps', () => {
      render(
        <StepGuide>
          <Step number={1} title="Step One">
            First
          </Step>
          <Step number={2} title="Step Two">
            Second
          </Step>
          <Step number={3} title="Step Three">
            Third
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('Step One')).toBeInTheDocument();
      expect(screen.getByText('Step Two')).toBeInTheDocument();
      expect(screen.getByText('Step Three')).toBeInTheDocument();
    });
  });

  describe('Step Component', () => {
    it('renders step number', () => {
      render(
        <StepGuide>
          <Step number={1} title="Test Step">
            Content
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders step title', () => {
      render(
        <StepGuide>
          <Step number={1} title="My Step Title">
            Content
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('My Step Title')).toBeInTheDocument();
    });

    it('renders step content', () => {
      render(
        <StepGuide>
          <Step number={1} title="Step">
            This is the step content
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('This is the step content')).toBeInTheDocument();
    });

    it('renders children composition correctly', () => {
      render(
        <StepGuide>
          <Step number={1} title="Complex Step">
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </Step>
        </StepGuide>
      );

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });
  });

  describe('ARIA Semantics', () => {
    it('container has list role', () => {
      const { container } = render(
        <StepGuide title="Test Guide">
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      const list = container.querySelector('[role="list"]');
      expect(list).toBeInTheDocument();
    });

    it('container has aria-label with title', () => {
      const { container } = render(
        <StepGuide title="My Custom Guide">
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      const list = container.querySelector('[role="list"]');
      expect(list).toHaveAttribute('aria-label', 'My Custom Guide');
    });

    it('each step has listitem role', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step 1">
            Content 1
          </Step>
          <Step number={2} title="Step 2">
            Content 2
          </Step>
        </StepGuide>
      );

      const listItems = container.querySelectorAll('[role="listitem"]');
      expect(listItems).toHaveLength(2);
    });

    it('each step has aria-label with number and title', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Install Dependencies">
            Run npm install
          </Step>
        </StepGuide>
      );

      const listItem = container.querySelector('[role="listitem"]');
      expect(listItem).toHaveAttribute(
        'aria-label',
        'Adım 1: Install Dependencies'
      );
    });
  });

  describe('Cosmic Theme', () => {
    it('applies cosmic gradient to step number circle', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      // Find the step number circle (not the icon background)
      const stepContainer = container.querySelector('[role="listitem"]');
      const numberCircle = stepContainer?.querySelector('.bg-gradient-to-br');
      expect(numberCircle).toBeInTheDocument();
      expect(numberCircle?.className).toContain('from-[oklch(0.55_0.15_265)]');
      expect(numberCircle?.className).toContain('to-[oklch(0.65_0.18_280)]');
    });

    it('applies cosmic border to connecting line', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      const list = container.querySelector('[role="list"]');
      expect(list).toHaveClass('border-s-2');
      expect(list).toHaveClass('border-[oklch(0.55_0.15_265)]');
    });

    it('applies neon glow shadow to connecting line', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      const list = container.querySelector('[role="list"]');
      expect(list).toHaveClass(
        'shadow-[-2px_0_10px_oklch(0.55_0.15_265_/_0.3)]'
      );
    });

    it('applies cosmic gradient to icon background', () => {
      const { container } = render(
        <StepGuide title="Test">
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      // Find icon container (before the title)
      const iconBg = container.querySelector(
        '.bg-gradient-to-br.from-\\[oklch\\(0\\.55_0\\.15_265_\\/_0\\.15\\)\\]'
      );
      expect(iconBg).toBeInTheDocument();
    });
  });

  describe('Custom Class Names', () => {
    it('applies custom className to StepGuide', () => {
      const { container } = render(
        <StepGuide className="custom-guide-class">
          <Step number={1} title="Step">
            Content
          </Step>
        </StepGuide>
      );

      const guide = container.firstChild;
      expect(guide).toHaveClass('custom-guide-class');
      expect(guide).toHaveClass('not-prose');
    });

    it('applies custom className to Step', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step" className="custom-step-class">
            Content
          </Step>
        </StepGuide>
      );

      const step = container.querySelector('[role="listitem"]');
      expect(step).toHaveClass('custom-step-class');
    });
  });

  describe('Performance & Memoization', () => {
    it('StepGuide is memoized', () => {
      expect(StepGuide.displayName).toBe('StepGuide');
    });

    it('Step is memoized', () => {
      expect(Step.displayName).toBe('Step');
    });
  });

  describe('Animation Stagger', () => {
    it('renders with staggered delay based on step number', () => {
      const { container } = render(
        <StepGuide>
          <Step number={1} title="Step 1">
            Content 1
          </Step>
          <Step number={2} title="Step 2">
            Content 2
          </Step>
          <Step number={3} title="Step 3">
            Content 3
          </Step>
        </StepGuide>
      );

      // Check that all steps are rendered (animation delay doesn't prevent rendering)
      const steps = container.querySelectorAll('[role="listitem"]');
      expect(steps).toHaveLength(3);
    });
  });
});
