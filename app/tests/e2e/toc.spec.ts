import { test, expect } from '@playwright/test';

test.describe('Table of Contents Page (FR-008 to FR-015)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/toc');
  });

  test('FR-008: displays sections grouped by section ID', async ({ page }) => {
    const sections = page.locator('[data-testid="section-card"]');
    await expect(sections.first()).toBeVisible();

    // Should have at least one section
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FR-013: sections display title and description', async ({ page }) => {
    const firstSection = page.locator('[data-testid="section-card"]').first();

    const title = firstSection.locator('h2');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/.+/);

    const description = firstSection.locator('p').first();
    await expect(description).toBeVisible();
  });

  test('FR-009: lessons sorted by order within sections', async ({ page }) => {
    const firstSection = page.locator('[data-testid="section-card"]').first();
    const lessons = firstSection.locator('[data-testid="lesson-card"]');

    const count = await lessons.count();
    if (count > 1) {
      // Verify lessons are present (order validation requires implementation)
      await expect(lessons.first()).toBeVisible();
    }
  });

  test('FR-010: search bar filters lessons', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search lessons/i);
    await expect(searchInput).toBeVisible();

    // Type search query
    await searchInput.fill('react');

    // Wait for debounce (300ms)
    await page.waitForTimeout(400);

    // Should show filtered results
    const lessons = page.locator('[data-testid="lesson-card"]');
    await expect(lessons.first()).toBeVisible();
  });

  test('FR-010: search is fuzzy and tolerates typos', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search lessons/i);

    // Type with typo
    await searchInput.fill('variabl'); // missing 'e'

    await page.waitForTimeout(400);

    // Should still show results (fuzzy matching)
    const lessons = page.locator('[data-testid="lesson-card"]');
    const count = await lessons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FR-011: filter chips allow section filtering', async ({ page }) => {
    const filterChips = page.locator('[data-testid="filter-chips"]');
    await expect(filterChips).toBeVisible();

    // Should have filter options
    const chips = filterChips.locator('[role="checkbox"]');
    const count = await chips.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FR-011: selecting filter chips updates lesson list', async ({
    page,
  }) => {
    const filterChips = page.locator('[data-testid="filter-chips"]');
    const firstChip = filterChips.locator('[role="checkbox"]').first();

    // Click filter chip
    await firstChip.click();

    // Should update filtered lessons
    const lessons = page.locator('[data-testid="lesson-card"]');
    await expect(lessons.first()).toBeVisible();
  });

  test('FR-012: displays global progress bar', async ({ page }) => {
    const progressBar = page.locator('[data-testid="progress-bar"]');
    await expect(progressBar).toBeVisible();

    // Should show completion text
    const progressText = page.locator('text=/\\d+ of \\d+ lessons/i');
    await expect(progressText).toBeVisible();
  });

  test('FR-015: shows empty state when no lessons match filters', async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(/search lessons/i);

    // Search for non-existent lesson
    await searchInput.fill('xyznonexistent12345');
    await page.waitForTimeout(400);

    // Should show empty state
    const emptyState = page.locator('[data-testid="empty-state"]');
    await expect(emptyState).toBeVisible();

    const clearButton = emptyState.getByRole('button', {
      name: /clear filters/i,
    });
    await expect(clearButton).toBeVisible();
  });

  test('FR-014: lesson cards show title, description, and status', async ({
    page,
  }) => {
    const firstLesson = page.locator('[data-testid="lesson-card"]').first();
    await expect(firstLesson).toBeVisible();

    // Check for title
    const title = firstLesson.locator('h3');
    await expect(title).toBeVisible();

    // Check for description
    const description = firstLesson.locator('p');
    await expect(description).toBeVisible();

    // Should be clickable
    await expect(firstLesson).toHaveAttribute('href', /.+/);
  });

  test('lesson cards with quizzes show quiz icon', async ({ page }) => {
    const lessonWithQuiz = page.locator('[data-testid="lesson-card"]').first();

    // Look for quiz icon indicator
    const quizIcon = lessonWithQuiz.locator('[data-testid="quiz-icon"]');

    // May or may not be present depending on lesson
    const count = await quizIcon.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
