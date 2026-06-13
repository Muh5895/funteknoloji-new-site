import { test, expect } from '@playwright/test';

test('Verify localization and sitemap', async ({ page }) => {
  await page.goto('http://localhost:8086/');
  await page.waitForTimeout(2000);

  // Screenshot home in TR
  await page.screenshot({ path: 'final_home_tr.png', fullPage: true });

  // Switch to EN
  await page.click('button[aria-label="Choose language"]');
  await page.click('text=English');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_home_en.png', fullPage: true });

  // Check Footer localization
  const footerDesc = await page.textContent('footer p');
  console.log('Footer Description (EN):', footerDesc);

  // Check Sitemap
  await page.goto('http://localhost:8086/sitemap');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_sitemap.png', fullPage: true });

  // Check Team Page
  await page.goto('http://localhost:8086/team');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'final_team.png', fullPage: true });
});
