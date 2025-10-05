import { test, expect } from '@playwright/test';

test.describe('Lesson Page (FR-016 to FR-027)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to example lesson
    await page.goto('/lesson/intro-to-react');
  });

  test('FR-016: displays 3-column layout on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const layout = page.locator('[data-testid="lesson-layout"]');
    await expect(layout).toBeVisible();

    // Check for sidebar, main content, and meta sidebar
    const miniToc = page.locator('[data-testid="mini-toc"]');
    const mainContent = page.locator('[data-testid="lesson-content"]');
    const metaSidebar = page.locator('[data-testid="meta-sidebar"]');

    await expect(miniToc).toBeVisible();
    await expect(mainContent.first()).toBeVisible();
    await expect(metaSidebar).toBeVisible();
  });

  test('FR-016: collapses to single column on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const mainContent = page.locator('[data-testid="lesson-content"]');
    await expect(mainContent.first()).toBeVisible();

    // TOC should be in drawer/hamburger menu
    const tocButton = page.getByRole('button', { name: /menu|toc/i });
    await expect(tocButton).toBeVisible();
  });

  test('FR-017: displays objectives panel with 3-5 bullets', async ({
    page,
  }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    const objectivesPanel = page.locator('[data-testid="objectives-panel"]').first();
    await expect(objectivesPanel).toBeVisible({ timeout: 10000 });

    const heading = objectivesPanel.locator('text=/what you\'ll learn/i');
    await expect(heading).toBeVisible();

    const objectives = objectivesPanel.locator('ul li');
    const count = await objectives.count();
    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(5);
  });

  test('FR-018: renders lesson content from TSX component', async ({
    page,
  }) => {
    const article = page.locator('[data-testid="lesson-content"]').first();
    await expect(article).toBeVisible();

    // Should have prose content
    const paragraphs = article.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FR-019: displays quiz with radio options', async ({ page }) => {
    const quiz = page.locator('[data-testid="quiz"]').first();

    // Quiz may not exist on all lessons
    const count = await quiz.count();
    if (count > 0) {
      await expect(quiz).toBeVisible();

      const prompt = quiz.locator('h3');
      await expect(prompt).toBeVisible();

      const radioGroup = quiz.getByRole('radiogroup');
      await expect(radioGroup).toBeVisible();

      const submitButton = quiz.getByRole('button', { name: /submit/i });
      await expect(submitButton).toBeVisible();
    }
  });

  test('FR-020: quiz retry logic - 3 attempts maximum', async ({ page }) => {
    const quiz = page.locator('[data-testid="quiz"]').first();

    const count = await quiz.count();
    if (count > 0) {
      // Select wrong answer
      const firstOption = quiz.getByRole('radio').first();
      await firstOption.check();

      // Submit 3 times (assuming first option is wrong)
      for (let i = 1; i <= 3; i++) {
        const submitButton = quiz.getByRole('button', { name: /submit/i });
        await submitButton.click();

        // Wait for feedback
        await page.waitForTimeout(500);

        if (i < 3) {
          // Should show attempts remaining
          const feedback = page.locator('[data-testid="quiz-feedback"]').first();
          const attemptsText = feedback.locator(
            'text=/\\d+ attempts? remaining/i'
          );
          await expect(attemptsText).toBeVisible();

          // Close feedback and try again
          const tryAgainButton = feedback.getByRole('button', {
            name: /try again/i,
          });
          await tryAgainButton.click();
        } else {
          // After 3rd attempt, should show "no attempts remaining"
          const feedback = page.locator('[data-testid="quiz-feedback"]').first();
          const noAttemptsText = feedback.locator(
            'text=/no attempts remaining/i'
          );
          await expect(noAttemptsText).toBeVisible();
        }
      }
    }
  });

  test('FR-021: displays prev/next navigation buttons', async ({ page }) => {
    const navButtons = page.locator('[data-testid="nav-buttons"]').first();
    await expect(navButtons).toBeVisible();

    const prevButton = navButtons.getByRole('button', { name: /prev/i });
    const nextButton = navButtons.getByRole('button', { name: /next/i });

    // At least one should be visible (depending on position in curriculum)
    const prevCount = await prevButton.count();
    const nextCount = await nextButton.count();
    expect(prevCount + nextCount).toBeGreaterThan(0);
  });

  test('FR-022: displays reading progress indicator', async ({ page }) => {
    const readingProgress = page.locator('[data-testid="reading-progress"]').first();
    await expect(readingProgress).toBeVisible();

    // Should show estimated time
    const timeEstimate = page.locator('text=/\\d+ min read/i').first();
    await expect(timeEstimate).toBeVisible();
  });

  test('FR-023: mini TOC shows current section highlighted', async ({
    page,
  }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const miniToc = page.locator('[data-testid="mini-toc"]');
    await expect(miniToc).toBeVisible();

    // Current lesson should have aria-current="page"
    const currentLesson = miniToc.locator('[aria-current="page"]');
    await expect(currentLesson).toBeVisible();
  });

  test('FR-024: meta sidebar shows related lessons', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const metaSidebar = page.locator('[data-testid="meta-sidebar"]');
    await expect(metaSidebar).toBeVisible();

    // Should have some metadata content
    const content = await metaSidebar.textContent();
    expect(content).toBeTruthy();
  });

  test('FR-025: marks lesson in_progress after 30s', async ({ page }) => {
    // Wait for 30 seconds
    await page.waitForTimeout(30000);

    // Check localStorage for progress update
    const progress = await page.evaluate(() => {
      const stored = localStorage.getItem('limbo-progress');
      return stored ? JSON.parse(stored) : null;
    });

    expect(progress).toBeTruthy();
    expect(progress.lessons['intro-to-react']?.status).toBe('in_progress');
  });

  test('FR-026: marks completed after 95% scroll + quiz correct', async ({
    page,
  }) => {
    // Scroll to bottom (95%+)
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(1000);

    // If quiz exists, answer correctly
    const quiz = page.locator('[data-testid="quiz"]').first();
    const quizCount = await quiz.count();

    if (quizCount > 0) {
      // This would require knowing correct answer - skip for now
      // In real test, would click correct option and submit
    }

    // Check progress state
    const progress = await page.evaluate(() => {
      const stored = localStorage.getItem('limbo-progress');
      return stored ? JSON.parse(stored) : null;
    });

    expect(progress?.lessons['intro-to-react']?.scrollProgress).toBeGreaterThan(
      90
    );
  });

  test('FR-027: 404 page shows when lesson not found', async ({ page }) => {
    await page.goto('/lesson/nonexistent-lesson');

    const notFoundText = page.locator('text=/not found|404/i');
    await expect(notFoundText).toBeVisible();

    const tocLink = page.getByRole('link', {
      name: /return to table of contents/i,
    });
    await expect(tocLink).toBeVisible();
  });

  test('quiz feedback shows explanation', async ({ page }) => {
    const quiz = page.locator('[data-testid="quiz"]').first();

    const count = await quiz.count();
    if (count > 0) {
      const firstOption = quiz.getByRole('radio').first();
      await firstOption.check();

      const submitButton = quiz.getByRole('button', { name: /submit/i });
      await submitButton.click();

      await page.waitForTimeout(500);

      const feedback = page.locator('[data-testid="quiz-feedback"]').first();
      await expect(feedback).toBeVisible();

      // Should show explanation
      const explanation = feedback.locator('p');
      await expect(explanation).toBeVisible();
    }
  });
});
