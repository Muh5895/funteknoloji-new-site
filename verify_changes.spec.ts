import { test, expect } from '@playwright/test';

test('verify nexy assistant and pages', async ({ page }) => {
  await page.goto('http://localhost:8083/');

  // Wait for intro splash or skip if possible
  await page.waitForTimeout(3000);

  // Verify Nexy Popup
  const nexyPopup = page.locator('div:has-text("Nexy")').first();
  await page.screenshot({ path: 'verification/nexy_popup.png' });

  // Open Nexy Chat
  await page.click('button:has-text("Nexy\'ye Sor")'); // Adjust selector based on actual text
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/nexy_chat_open.png' });

  // Test Chat Input
  await page.fill('textarea[placeholder*="Mesajınızı yazın"]', 'Merhaba Nexy, bir tablo oluştur.');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000); // Wait for response
  await page.screenshot({ path: 'verification/nexy_chat_response.png' });

  // Navigate to Nexy Page
  await page.goto('http://localhost:8083/nexy');
  await page.screenshot({ path: 'verification/nexy_page.png' });

  // Navigate to QuakeSafe Page
  await page.goto('http://localhost:8083/quakesafe');
  await page.screenshot({ path: 'verification/quakesafe_page.png' });

  // Navigate to Changelog Page
  await page.goto('http://localhost:8083/changelog');
  await page.screenshot({ path: 'verification/changelog_page.png' });
});
