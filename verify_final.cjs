const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Checking 404 page...');
  await page.goto('http://localhost:8080/non-existent-page');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '404_page.png' });
  const title404 = await page.textContent('h1');
  console.log('404 Page H1:', title404);

  console.log('Checking FAQs on homepage...');
  await page.goto('http://localhost:8080/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'homepage_faqs.png', fullPage: true });

  console.log('Checking Blog page...');
  await page.goto('http://localhost:8080/blog');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'blog_page.png' });

  console.log('Checking Contact page...');
  await page.goto('http://localhost:8080/contact');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'contact_page.png' });

  await browser.close();
})();
