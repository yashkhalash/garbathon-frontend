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
    const vaultBtn = page.locator('button:has-text("Aadhaar Vault")');
    await expect(vaultBtn).toBeVisible();
    await expect(vaultBtn.locator('text=NEW')).toBeVisible();

    // 3. Click to open unique Aadhaar Vault modal
    await vaultBtn.click();
    await expect(page.locator('h3:has-text("Aadhaar Biometric Freeze Vault")').first()).toBeVisible();
    await expect(page.locator('text=UIDAI Biometric Status')).toBeVisible();
    await page.locator('button:has-text("Close Vault")').click();

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
    await page.locator('button[title="Runs benchmark simulation mode"]').click();

    // Select Gujarati
    await page.locator('select[title="Select preferred intervention language"]').selectOption('gu');

    // Select Tier 1 Definite Spam
    await page.locator('text=1. Definite Spam').click();

    // Start Analysis
    await page.locator('button:has-text("Start Real-Time Scam Analysis")').click();

    // Warning and Red Flags should appear
    await expect(page.locator('text=સાવધાન!').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Definite Spam (Scam Call)').first()).toBeVisible({ timeout: 10000 });
  });

  test('Demo Mode: Hindi Digital Arrest Scam with Hindi warning', async ({ page }) => {
    // Select Demo Mode
    await page.locator('button[title="Runs benchmark simulation mode"]').click();

    // Select Hindi
    await page.locator('select[title="Select preferred intervention language"]').selectOption('hi');

    // Click Tier 1
    await page.locator('text=1. Definite Spam').click();
    await page.locator('button:has-text("Start Real-Time Scam Analysis")').click();

    // Hindi warning check
    await expect(page.locator('text=सावधान!').first()).toBeVisible({ timeout: 10000 });
  });

  test('Demo Mode: English Language and Swiggy Genuine Call stays safe (No Spam)', async ({ page }) => {
    // Select Demo Mode
    await page.locator('button[title="Runs benchmark simulation mode"]').click();

    // Select English
    await page.locator('select[title="Select preferred intervention language"]').selectOption('en');

    // Select Tier 3 No Spam
    await page.locator('text=3. No Spam').click();
    await page.locator('button:has-text("Start Real-Time Scam Analysis")').click();

    // Safe badge and no crying wolf
    await expect(page.locator('text=No Spam (Verified Genuine)').first()).toBeVisible({ timeout: 10000 });
  });

  test('Real AI Mode with Live Gemini 2.5 Flash API execution', async ({ page }) => {
    // Switch to Real AI mode
    await page.locator('button[title="Uses live Gemini Native Audio API"]').click();
    await expect(page.locator('text=REAL AI MODE ACTIVE')).toBeVisible();

    // Select Gujarati Tier 1 Call
    await page.locator('text=1. Definite Spam').click();

    // Start Real AI Analysis
    await page.locator('button:has-text("Start Real-Time Scam Analysis")').click();

    // Verify Gemini Native Audio responds with structured JSON assessment
    await expect(page.locator('text=Red Flags Heard in Call').first()).toBeVisible({ timeout: 25000 });
    await expect(page.locator('text=Emergency Isolation Breaker').first()).toBeVisible({ timeout: 25000 });
  });
});
