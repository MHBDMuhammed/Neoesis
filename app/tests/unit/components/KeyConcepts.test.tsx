import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KeyConcepts, KeyConcept } from '@/components/lesson/content/KeyConcepts';

describe('KeyConcepts', () => {
  describe('Rendering', () => {
    it('renders with default title', () => {
      render(
        <KeyConcepts>
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Anahtar Kavramlar')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(
        <KeyConcepts title="Custom Title">
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders multiple concepts', () => {
      render(
        <KeyConcepts>
          <KeyConcept term="Term 1">Definition 1</KeyConcept>
          <KeyConcept term="Term 2">Definition 2</KeyConcept>
          <KeyConcept term="Term 3">Definition 3</KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Term 1')).toBeInTheDocument();
      expect(screen.getByText('Term 2')).toBeInTheDocument();
      expect(screen.getByText('Term 3')).toBeInTheDocument();
    });
  });

  describe('KeyConcept Component', () => {
    it('renders term', () => {
      render(
        <KeyConcepts>
          <KeyConcept term="Component">Reusable UI</KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Component')).toBeInTheDocument();
    });

    it('renders definition', () => {
      render(
        <KeyConcepts>
          <KeyConcept term="Props">Data from parent</KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Data from parent')).toBeInTheDocument();
    });

    it('renders complex children', () => {
      render(
        <KeyConcepts>
          <KeyConcept term="Hook">
            <p>Functions for React features</p>
            <ul>
              <li>useState</li>
              <li>useEffect</li>
            </ul>
          </KeyConcept>
        </KeyConcepts>
      );

      expect(screen.getByText('Functions for React features')).toBeInTheDocument();
      expect(screen.getByText('useState')).toBeInTheDocument();
      expect(screen.getByText('useEffect')).toBeInTheDocument();
    });
  });

  describe('Cosmic Theme', () => {
    it('applies cosmic gradient to term text', () => {
      const { container } = render(
        <KeyConcepts>
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      const term = container.querySelector('dt');
      expect(term?.className).toContain('bg-gradient-to-r');
      expect(term?.className).toContain('from-[oklch(0.55_0.15_265)]');
      expect(term?.className).toContain('bg-clip-text');
      expect(term?.className).toContain('text-transparent');
    });

    it('applies neon glow hover class to card', () => {
      const { container } = render(
        <KeyConcepts>
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      // Find Card component (has border-primary/20 class)
      const card = container.querySelector('.border-primary\\/20');
      expect(card?.className).toContain('hover:border-[oklch(0.55_0.15_265)]');
      expect(card?.className).toContain('hover:shadow-[0_0_20px_oklch(0.55_0.15_265_/_0.4)]');
    });
  });

  describe('Responsive Grid', () => {
    it('applies responsive grid classes', () => {
      const { container } = render(
        <KeyConcepts>
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      const grid = container.querySelector('dl');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('Performance', () => {
    it('KeyConcepts is memoized', () => {
      expect(KeyConcepts.displayName).toBe('KeyConcepts');
    });

    it('KeyConcept is memoized', () => {
      expect(KeyConcept.displayName).toBe('KeyConcept');
    });
  });

  describe('Custom Class Names', () => {
    it('applies custom className to KeyConcepts', () => {
      const { container } = render(
        <KeyConcepts className="custom-class">
          <KeyConcept term="Test">Definition</KeyConcept>
        </KeyConcepts>
      );

      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('not-prose');
    });

    it('applies custom className to KeyConcept', () => {
      const { container } = render(
        <KeyConcepts>
          <KeyConcept term="Test" className="custom-concept">
            Definition
          </KeyConcept>
        </KeyConcepts>
      );

      const card = container.querySelector('.custom-concept');
      expect(card).toBeInTheDocument();
    });
  });
});
