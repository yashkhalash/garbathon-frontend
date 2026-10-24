import { test, expect } from '@playwright/test';

test.describe('Suraksha AI — Comprehensive E2E Playwright Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('Navbar renders branding, unique Aadhaar Vault button, theme switcher & language options', async ({ page }) => {
    // 1. Branding
    await expect(page.locator('text=Suraksha AI').first()).toBeVisible();
    await expect(page.locator('text=સુરક્ષા').first()).toBeVisible();

    // 2. Unique Aadhaar Vault with animated NEW flag
    const vaultBtn = page.locator('[data-testid="aadhaar-vault-nav-btn"]');
    await expect(vaultBtn).toBeVisible();
    await expect(vaultBtn.locator('text=NEW')).toBeVisible();

    // 3. Click to open unique Aadhaar Vault modal
    await vaultBtn.click();
    await expect(page.locator('[data-testid="aadhaar-vault-modal"]')).toBeVisible();
    await page.locator('[data-testid="close-vault-btn"]').click();
    await expect(page.locator('[data-testid="aadhaar-vault-modal"]')).not.toBeVisible();

    // 4. Test Theme Switcher
    const darkBtn = page.locator('button[title="Dark Theme"]');
    await darkBtn.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    const seniorBtn = page.locator('button[title="Senior Citizen Accessible Theme"]');
    await seniorBtn.click();
    await expect(page.locator('html')).toHaveClass(/senior-theme/);

    const lightBtn = page.locator('button[title="Light Theme"]');
    await lightBtn.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('Demo Mode: Gujarati Digital Arrest Scam (Tier 1) triggers mid-call critical alert', async ({ page }) => {
    // Select Demo Mode
    await page.locator('[data-testid="demo-mode-btn"]').click();

    // Select Gujarati
    await page.locator('[data-testid="language-select"]').selectOption('gu');

    // Select Tier 1 Definite Spam
    await page.locator('[data-testid="preset-tier1_definite_spam_digital_arrest"]').click();

    // Start Analysis
    await page.locator('[data-testid="start-analysis-btn"]').click();

    // Warning and Red Flags should appear
    await expect(page.locator('text=સાવધાન!').first()).toBeVisible({ timeout: 12000 });
  });

  test('Demo Mode: Hindi Digital Arrest Scam with Hindi warning', async ({ page }) => {
    // Select Demo Mode
    await page.locator('[data-testid="demo-mode-btn"]').click();

    // Select Hindi
    await page.locator('[data-testid="language-select"]').selectOption('hi');

    // Click Tier 1
    await page.locator('[data-testid="preset-tier1_definite_spam_digital_arrest"]').click();
    await page.locator('[data-testid="start-analysis-btn"]').click();

    // Hindi warning check
    await expect(page.locator('text=सावधान!').first()).toBeVisible({ timeout: 12000 });
  });

  test('Demo Mode: English Language and Swiggy Genuine Call stays safe (No Spam)', async ({ page }) => {
    // Select Demo Mode
    await page.locator('[data-testid="demo-mode-btn"]').click();

    // Select English
    await page.locator('[data-testid="language-select"]').selectOption('en');

    // Select Tier 3 No Spam
    await page.locator('[data-testid="preset-tier3_no_spam_swiggy_delivery"]').click();
    await page.locator('[data-testid="start-analysis-btn"]').click();

    // Safe badge and no crying wolf
    await expect(page.locator('text=No Spam').first()).toBeVisible({ timeout: 12000 });
  });

  test('Real AI Mode with Live Gemini 2.5 Flash API execution', async ({ page }) => {
    // Switch to Real AI mode
    await page.locator('[data-testid="real-ai-mode-btn"]').click();
    await expect(page.locator('text=REAL AI MODE ACTIVE')).toBeVisible();

    // Set to English for clarity
    await page.locator('[data-testid="language-select"]').selectOption('en');

    // Select Tier 1 Call
    await page.locator('[data-testid="preset-tier1_definite_spam_digital_arrest"]').click();

    // Start Real AI Analysis
    await page.locator('[data-testid="start-analysis-btn"]').click();

    // Verify Gemini Native Audio responds with structured JSON assessment
    await expect(page.locator('text=Red Flags Heard in Call').first()).toBeVisible({ timeout: 25000 });
    await expect(page.locator('text=Emergency Isolation Breaker').first()).toBeVisible({ timeout: 25000 });
  });
});
