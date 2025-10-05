import { describe, it, expect, beforeEach } from 'vitest';
import Fuse from 'fuse.js';
import type { LessonMeta } from '@/contracts/lesson-meta.schema';

describe('Fuse.js Search Configuration', () => {
  let fuse: Fuse<LessonMeta>;
  const mockLessons: LessonMeta[] = [
    {
      slug: 'intro-to-react',
      title: 'Introduction to React',
      order: 1,
      section: 'fundamentals',
      description: 'Learn React basics: components, props, and state.',
      estimatedMinutes: 12,
      objectives: [
        'Understand React components',
        'Use props to pass data',
        'Manage component state with useState',
      ],
    },
    {
      slug: 'advanced-hooks',
      title: 'Advanced React Hooks',
      order: 2,
      section: 'advanced',
      description: 'Deep dive into useEffect, useCallback, and useMemo.',
      estimatedMinutes: 18,
      objectives: [
        'Master useEffect hook',
        'Optimize with useCallback',
        'Memoize values with useMemo',
      ],
    },
    {
      slug: 'variables-basics',
      title: 'JavaScript Variables',
      order: 1,
      section: 'fundamentals',
      description: 'Learn about var, let, and const in JavaScript.',
      estimatedMinutes: 10,
      objectives: [
        'Understand variable declarations',
        'Use let and const properly',
        'Avoid var pitfalls',
      ],
    },
  ];

  beforeEach(() => {
    // Initialize Fuse with config from research.md
    fuse = new Fuse(mockLessons, {
      keys: [
        { name: 'title', weight: 1 },
        { name: 'description', weight: 1 },
        { name: 'objectives', weight: 1 },
        { name: 'section', weight: 1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  });

  it('should match exact title', () => {
    const results = fuse.search('Introduction to React');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.slug).toBe('intro-to-react');
  });

  it('should fuzzy match with typo (threshold 0.3)', () => {
    // "variabl" should match "variables" (missing 'e')
    const results = fuse.search('variabl');
    expect(results.length).toBeGreaterThan(0);

    const titles = results.map((r) => r.item.title);
    expect(titles).toContain('JavaScript Variables');
  });

  it('should search across title field', () => {
    const results = fuse.search('hooks');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.slug).toBe('advanced-hooks');
  });

  it('should search across description field', () => {
    const results = fuse.search('useEffect');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.description).toContain('useEffect');
  });

  it('should search across objectives field', () => {
    const results = fuse.search('useState');
    expect(results.length).toBeGreaterThan(0);

    const found = results.some((r) =>
      r.item.objectives.some((obj) => obj.includes('useState'))
    );
    expect(found).toBe(true);
  });

  it('should search across section field', () => {
    const results = fuse.search('fundamentals');
    expect(results.length).toBeGreaterThanOrEqual(2); // 2 lessons in fundamentals
  });

  it('should handle case-insensitive search', () => {
    const lower = fuse.search('react');
    const upper = fuse.search('REACT');
    const mixed = fuse.search('ReAcT');

    expect(lower.length).toBeGreaterThan(0);
    expect(upper.length).toBeGreaterThan(0);
    expect(mixed.length).toBeGreaterThan(0);
  });

  it('should return empty array for non-matching query', () => {
    const results = fuse.search('xyznonexistent12345');
    expect(results).toEqual([]);
  });

  it('should respect minMatchCharLength (2 chars minimum)', () => {
    // Single char should not match (minMatchCharLength: 2)
    const results = fuse.search('R');
    expect(results.length).toBe(0);
  });

  it('should allow partial word matching', () => {
    // "intro" should match "Introduction"
    const results = fuse.search('intro');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.title).toContain('Introduction');
  });

  it('should rank exact matches higher', () => {
    const results = fuse.search('React');

    // "Introduction to React" should rank higher than "Advanced React Hooks"
    // because it's earlier in the title
    expect(results[0].item.slug).toBe('intro-to-react');
  });

  it('should handle special characters in search', () => {
    const results = fuse.search('use-effect');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should support multi-word queries', () => {
    const results = fuse.search('react hooks');
    expect(results.length).toBeGreaterThan(0);
  });
});
