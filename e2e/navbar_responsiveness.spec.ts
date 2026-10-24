import { test, expect } from '@playwright/test';

test.describe('Navbar Strict Responsiveness & Language Dropdown Stability', () => {
  test('Zero Horizontal Overflow on Laptop (1366x768) in Hindi, Gujarati, English', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    for (const lang of ['hi', 'gu', 'en']) {
      await page.locator('[data-testid="language-select"]').selectOption(lang);
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });

      console.log(`Viewport 1366px [${lang}]: scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}`);
      expect(overflow.hasOverflow).toBe(false);

      // Verify all essential controls are visible and within bounds
      await expect(page.locator('[data-testid="language-select"]')).toBeVisible();
      await expect(page.locator('[data-testid="voice-explain-hero"]')).toBeVisible();
      await expect(page.locator('[data-testid="real-ai-mode-btn"]')).toBeVisible();
      await expect(page.locator('[data-testid="five-new-tools-nav-btn"]')).toBeVisible();
      await expect(page.locator('[data-testid="aadhaar-vault-nav-btn"]')).toBeVisible();
    }
  });

  test('Zero Horizontal Overflow on Mobile (375x667) in Hindi, Gujarati, English', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');

    for (const lang of ['hi', 'gu', 'en']) {
      await page.locator('[data-testid="language-select"]').selectOption(lang);
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        };
      });

      console.log(`Viewport 375px [${lang}]: scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}`);
      expect(overflow.hasOverflow).toBe(false);

      // Verify core elements visible
      await expect(page.locator('[data-testid="language-select"]')).toBeVisible();
      await expect(page.locator('[data-testid="voice-explain-hero"]')).toBeVisible();
    }
  });
});
