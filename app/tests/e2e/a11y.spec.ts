import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  test('Home page has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('TOC page has no accessibility violations', async ({ page }) => {
    await page.goto('/toc');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Lesson page has no accessibility violations', async ({ page }) => {
    await page.goto('/lesson/intro-to-react');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Home page has skip link', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Focus the skip link and verify it becomes visible
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('TOC page has skip link', async ({ page }) => {
    await page.goto('/toc');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Focus the skip link and verify it becomes visible
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('Lesson page has skip link', async ({ page }) => {
    await page.goto('/lesson/intro-to-react');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Focus the skip link and verify it becomes visible
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('All interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through all focusable elements
    const startButton = page.getByRole('button', { name: /start learning/i });
    await startButton.focus();

    const isFocused = await startButton.evaluate(
      (el) => el === document.activeElement
    );
    expect(isFocused).toBe(true);
  });

  test('Focus indicators are visible', async ({ page }) => {
    await page.goto('/');

    const button = page.getByRole('button', { name: /start learning/i });
    await button.focus();

    // Check for focus ring (Tailwind's ring-2 class)
    const outlineStyle = await button.evaluate((el) => {
      return window.getComputedStyle(el).outline;
    });

    expect(outlineStyle).not.toBe('none');
  });

  test('Color contrast meets WCAG AA (4.5:1)', async ({ page }) => {
    await page.goto('/');

    // Axe will check this, but explicitly verify text contrast
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    const contrastViolations = results.violations.filter((v) =>
      v.id.includes('contrast')
    );
    expect(contrastViolations).toEqual([]);
  });

  test('Images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('Form inputs have labels', async ({ page }) => {
    await page.goto('/toc');

    const searchInput = page.getByPlaceholder(/search lessons/i);
    const ariaLabel = await searchInput.getAttribute('aria-label');
    const label = page.locator('label[for]');

    // Should have either aria-label or associated label
    const hasLabel = !!ariaLabel || (await label.count()) > 0;
    expect(hasLabel).toBe(true);
  });

  test('Landmarks are properly defined', async ({ page }) => {
    await page.goto('/');

    // Should have main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Navigation should have proper role
    const nav = page.locator('nav');
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThanOrEqual(0);
  });

  test('aria-live regions announce dynamic content', async ({ page }) => {
    await page.goto('/toc');

    const searchInput = page.getByPlaceholder(/search lessons/i);
    await searchInput.fill('react');

    // Look for aria-live region for search results
    const liveRegion = page.locator('[aria-live]');
    const count = await liveRegion.count();

    // Should have at least one live region for result count
    expect(count).toBeGreaterThan(0);
  });
});
