import { chromium } from '@playwright/test';

async function checkHTML() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://liorcohencell-alt.github.io/anatomy/', { waitUntil: 'networkidle' });
  
  // Get the full HTML
  const html = await page.content();
  console.log('=== FULL PAGE HTML ===');
  console.log(html);
  
  await browser.close();
}

checkHTML().catch(console.error);
