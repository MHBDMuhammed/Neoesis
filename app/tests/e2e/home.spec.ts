import { test, expect } from '@playwright/test';

test.describe('Home Page (FR-001 to FR-007)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('FR-001: displays hero section with h1', async ({ page }) => {
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();

    const h1 = hero.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/.+/); // Has content
  });

  test('FR-005: displays "Start Learning" CTA button', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /start learning/i });
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });

  test('FR-006: displays "View Curriculum" secondary CTA', async ({ page }) => {
    const curriculumButton = page.getByRole('button', {
      name: /view curriculum/i,
    });
    await expect(curriculumButton).toBeVisible();
    await expect(curriculumButton).toBeEnabled();
  });

  test('FR-004: displays stats strip with 4 stats', async ({ page }) => {
    // Look for stats section
    const stats = page.locator('[data-testid="stats-strip"]');
    await expect(stats).toBeVisible();

    // Check for 4 stat cards
    const statCards = stats.locator('[role="group"]');
    await expect(statCards).toHaveCount(4);
  });

  test('FR-002: hides Continue card when no progress', async ({ page }) => {
    // Clear localStorage to simulate first visit
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const continueCard = page.locator('[data-testid="continue-card"]');
    await expect(continueCard).not.toBeVisible();
  });

  test('FR-003: shows Continue card when progress exists', async ({ page }) => {
    // Set localStorage with mock progress
    await page.evaluate(() => {
      const mockProgress = {
        lessons: {
          'intro-to-react': {
            status: 'in_progress',
            lastVisited: new Date().toISOString(),
            scrollProgress: 45,
            quizScores: {},
          },
        },
        globalProgress: {
          completedCount: 0,
          totalCount: 3,
        },
      };
      localStorage.setItem('limbo-progress', JSON.stringify(mockProgress));
    });

    await page.reload();

    // Wait for hydration and component to appear
    const continueCard = page.locator('[data-testid="continue-card"]');
    await expect(continueCard).toBeVisible({ timeout: 10000 });
  });

  test('FR-007: Continue card Resume button navigates to lesson', async ({
    page,
  }) => {
    // Set localStorage with mock progress
    await page.evaluate(() => {
      const mockProgress = {
        lessons: {
          'intro-to-react': {
            status: 'in_progress',
            lastVisited: new Date().toISOString(),
            scrollProgress: 45,
            quizScores: {},
          },
        },
        globalProgress: {
          completedCount: 0,
          totalCount: 3,
        },
      };
      localStorage.setItem('limbo-progress', JSON.stringify(mockProgress));
    });

    await page.reload();

    // Wait for hydration and component to appear
    const resumeButton = page.getByRole('button', { name: /resume/i });
    await expect(resumeButton).toBeVisible({ timeout: 10000 });
    await resumeButton.click();

    // Should navigate to lesson page
    await expect(page).toHaveURL(/\/lesson\/.+/);
  });

  test('Start Learning button navigates to first lesson', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /start learning/i });
    await startButton.click();

    // Should navigate to lesson page
    await expect(page).toHaveURL(/\/lesson\/.+/);
  });

  test('View Curriculum button navigates to TOC', async ({ page }) => {
    const curriculumButton = page.getByRole('button', {
      name: /view curriculum/i,
    });
    await curriculumButton.click();

    await expect(page).toHaveURL('/toc');
  });
});
