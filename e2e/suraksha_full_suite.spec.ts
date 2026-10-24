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
    test.setTimeout(50000);
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
    await expect(page.locator('text=Red Flags Heard in Call').first()).toBeVisible({ timeout: 35000 });
  });

  test('Government Cybercrime Analytics (I4C/NCRB) & Demographics (GenZ, Women, Men, Seniors)', async ({ page }) => {
    // Select English for clear matching
    await page.locator('[data-testid="language-select"]').selectOption('en');

    // Verify Government Data section presence
    await expect(page.locator('text=Mobile Scam Epidemic in India: Who Is Getting Targeted?').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=₹10,319+ Cr').first()).toBeVisible();
    await expect(page.locator('text=₹1,750+ Cr').first()).toBeVisible();

    // Verify Demographics: Seniors, Gen Z, Men, Women
    await expect(page.locator('text=Older Persons / Senior Citizens').first()).toBeVisible();
    await expect(page.locator('text=Students, Children & Gen Z').first()).toBeVisible();
    await expect(page.locator('text=Working Men').first()).toBeVisible();
    await expect(page.locator('text=Women & Homemakers').first()).toBeVisible();

    // Verify Interactive 4-step user walkthrough
    await expect(page.locator('text=How to Use Suraksha AI in 4 Simple Steps').first()).toBeVisible();
    await page.locator('button:has-text("02")').first().click();
    await expect(page.locator('text=Gemini 2.5 Flash Native Processing').first()).toBeVisible();
  });

  test('Senior Citizen Accessible Mode and Responsive Layout', async ({ page }) => {
    // Activate Senior Citizen Accessible Theme
    const seniorBtn = page.locator('button[title="Senior Citizen Accessible Theme"]');
    await seniorBtn.click();
    await expect(page.locator('html')).toHaveClass(/senior-theme/);

    // Verify Senior theme branding badge
    await expect(page.locator('text=વરિષ્ઠ મોડ').first()).toBeVisible();

    // Verify Navigation works across tabs
    await page.locator('nav button:has-text("લાઈવ"), nav button:has-text("Live")').first().click();
    await expect(page.locator('text=લાઈવ માઈક્રોફોન').first()).toBeVisible({ timeout: 10000 });
  });

  test('5 Unique New Features for GenZ & Older Persons with animated NEW badges', async ({ page }) => {
    // 1. Check Navbar 5 New Tools button with NEW badge
    const fiveToolsBtn = page.locator('[data-testid="five-new-tools-nav-btn"]');
    await expect(fiveToolsBtn).toBeVisible();
    await expect(fiveToolsBtn.locator('text="NEW"')).toBeVisible();

    // 2. Feature 1: UPI Reverse QR & Payment Scam Shield (GenZ)
    const upiCardBtn = page.locator('[data-testid="open-feature-upi-btn"]');
    await expect(upiCardBtn).toBeVisible();
    await upiCardBtn.click();
    await expect(page.locator('[data-testid="upi-shield-modal"]')).toBeVisible();
    await page.locator('[data-testid="inspect-upi-request-btn"]').click();
    await page.locator('[data-testid="close-upi-modal-btn"]').click({ force: true });
    await expect(page.locator('[data-testid="upi-shield-modal"]')).not.toBeVisible();

    // 3. Feature 2: Fake Online Shopping & Malicious APK Scanner (GenZ)
    const shoppingCardBtn = page.locator('[data-testid="open-feature-shopping-btn"]');
    await shoppingCardBtn.click();
    await expect(page.locator('[data-testid="shopping-scanner-modal"]')).toBeVisible();
    await page.locator('[data-testid="close-shopping-modal-btn"]').click({ force: true });

    // 4. Feature 3: Senior Pension & High-Yield Investment Shield (Older Persons)
    const investCardBtn = page.locator('[data-testid="open-feature-investment-btn"]');
    await investCardBtn.click();
    await expect(page.locator('[data-testid="senior-investment-modal"]')).toBeVisible();
    await page.locator('[data-testid="close-investment-modal-btn"]').click({ force: true });

    // 5. Feature 4: Jeevan Pramaan Life Certificate Scam Guard (Older Persons)
    const pensionCardBtn = page.locator('[data-testid="open-feature-pension-btn"]');
    await pensionCardBtn.click();
    await expect(page.locator('[data-testid="pension-guard-modal"]')).toBeVisible();
    await page.locator('[data-testid="close-pension-modal-btn"]').click({ force: true });

    // 6. Feature 5: Golden Hour Family Killswitch & Financial Freeze
    const killswitchCardBtn = page.locator('[data-testid="open-feature-killswitch-btn"]');
    await killswitchCardBtn.click();
    await expect(page.locator('[data-testid="family-killswitch-modal"]')).toBeVisible();
    await page.locator('button:has-text("HDFC")').click();
    await page.locator('[data-testid="close-killswitch-modal-btn"]').click({ force: true });
    await expect(page.locator('[data-testid="family-killswitch-modal"]')).not.toBeVisible();
  });

  test('Copy-Paste Scam Test Studio: Tests Definite Scam and Safe Clean Datasets + Senior Theme Light Styling', async ({ page }) => {
    // 1. Check Copy & Paste Test Studio presence
    const studio = page.locator('[data-testid="scam-text-analyzer"]');
    await expect(studio).toBeVisible();

    // 2. Click "Copy & Load" for Scam sample
    const copyScamBtn = page.locator('[data-testid="copy-sample-scam-btn"]');
    await copyScamBtn.click();
    await expect(page.locator('text=Copied & Loaded!')).toBeVisible();

    // 3. Analyze text
    const analyzeBtn = page.locator('[data-testid="analyze-text-btn"]');
    await analyzeBtn.click();

    // 4. Verify Critical Risk Result scoped inside resultBox
    const resultBox = page.locator('[data-testid="text-analysis-result"]');
    await expect(resultBox).toBeVisible({ timeout: 12000 });
    await expect(resultBox.locator('h3')).toContainText('DEFINITE SCAM');

    // 5. Test Safe Sample
    const copySafeBtn = page.locator('[data-testid="copy-sample-safe-btn"]');
    await copySafeBtn.click();
    await analyzeBtn.click();
    await expect(resultBox.locator('h3')).toContainText('SAFE & CLEAN');

    // 6. Senior Mode Light Theme Validation
    const seniorBtn = page.locator('button[title="Senior Citizen Accessible Theme"]');
    await seniorBtn.click();
    await expect(page.locator('html')).toHaveClass(/senior-theme/);

    // Navbar should have light theme background (#fffdf8)
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/bg-\[#fffdf8\]/);
  });

  test('Settings Page: Gemini Model Selection with Recommended flag, API Key management and live limit testing', async ({ page }) => {
    // 1. Navigate to Settings tab
    await page.locator('nav button:has-text("સેટિંગ્સ"), nav button:has-text("Settings")').first().click();
    await expect(page.locator('[data-testid="gemini-settings-section"]')).toBeVisible({ timeout: 10000 });

    // 2. Verify Recommended Gemini 2.5 Flash option
    const recommendedBadge = page.locator('text=(Recommended)');
    await expect(recommendedBadge).toBeVisible();

    // 3. Switch Model to Gemini 2.0 Flash
    const model20Btn = page.locator('[data-testid="model-option-gemini-2.0-flash"]');
    await model20Btn.click();
    await expect(page.locator('text=Active model switched to gemini-2.0-flash')).toBeVisible();

    // Switch back to Recommended 2.5 Flash
    const model25Btn = page.locator('[data-testid="model-option-gemini-2.5-flash"]');
    await model25Btn.click();

    // 4. Test API Key Limits Button
    const testBtn = page.locator('[data-testid="test-gemini-key-btn"]');
    await expect(testBtn).toBeVisible();
    await testBtn.click();

    // Result callout should appear (either connection succeeded or rate limit detected)
    await expect(page.locator('[data-testid="gemini-test-result"]')).toBeVisible({ timeout: 15000 });

    // 5. Verify Add / Update Input Field
    const apiKeyInput = page.locator('[data-testid="gemini-api-key-input"]');
    await expect(apiKeyInput).toBeVisible();
  });

  test('Responsive Multilingual UI (Gujarati, Hindi, English) & Natural Female Voice Explainer Buttons', async ({ page }) => {
    // 1. Verify Gujarati Content
    await page.locator('[data-testid="language-select"]').selectOption('gu');
    await expect(page.locator('text=સરળ ઉપયોગ પદ્ધતિ (૪ સ્ટેપ)').first()).toBeVisible();
    await expect(page.locator('text=૫ અજોડ AI સુરક્ષા ટૂલ્સ').first()).toBeVisible();
    await expect(page.locator('text=ભારતમાં મોબાઈલ સ્કેમ્સ: કોણ સૌથી વધુ ભોગ બને છે?').first()).toBeVisible();

    // 2. Click Voice Explainer Button for Aadhaar Vault in Gujarati
    const vaultVoiceBtn = page.locator('[data-testid="voice-explain-aadhaar-vault"]');
    await expect(vaultVoiceBtn).toBeVisible();
    await vaultVoiceBtn.click();
    await expect(page.locator('text=અવાજ રોકો').first()).toBeVisible();
    // Stop voice
    await page.locator('text=અવાજ રોકો').first().click();

    // 3. Switch to Hindi and verify whole page changes
    await page.locator('[data-testid="language-select"]').selectOption('hi');
    await expect(page.locator('text=सरल 4-चरणीय सुरक्षा गाइड').first()).toBeVisible();
    await expect(page.locator('text=5 अनूठे AI सुरक्षा टूल्स').first()).toBeVisible();
    await expect(page.locator('text=महिला स्वर में समझें').first()).toBeVisible();

    // 4. Switch to English and verify whole page changes
    await page.locator('[data-testid="language-select"]').selectOption('en');
    await expect(page.locator('text=How Suraksha AI Works (4 Simple Steps)').first()).toBeVisible();
    await expect(page.locator('text=Explain with Voice').first()).toBeVisible();

    // 5. Test Mobile Responsiveness (Viewport 375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('text=Suraksha AI').first()).toBeVisible();
    const mobileVoiceBtn = page.locator('[data-testid="voice-explain-hero"]');
    await expect(mobileVoiceBtn).toBeVisible();

    // Reset back to desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
  });
});
