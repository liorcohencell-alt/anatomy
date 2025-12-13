import { chromium } from '@playwright/test';

async function checkSite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🌐 Navigating to https://liorcohencell-alt.github.io/anatomy/');
  await page.goto('https://liorcohencell-alt.github.io/anatomy/', { waitUntil: 'networkidle' });
  
  // Check page title
  const title = await page.title();
  console.log(`📄 Page Title: ${title}`);
  
  // Get page content
  const bodyText = await page.locator('body').textContent();
  console.log(`\n📝 Page has visible content: ${bodyText && bodyText.trim().length > 0 ? '✅ YES' : '❌ NO'}`);
  
  // Check for React root
  const rootDiv = await page.locator('#root').innerHTML();
  console.log(`\n⚛️  React root populated: ${rootDiv && rootDiv.trim().length > 0 ? '✅ YES' : '❌ NO (root is empty)'}`);
  
  // Check console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Check for network errors
  const failedRequests: string[] = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.method()} ${request.url()}`);
  });
  
  // Wait a bit for any deferred errors
  await page.waitForTimeout(2000);
  
  console.log(`\n⚠️  Console Errors: ${consoleErrors.length > 0 ? consoleErrors.join('\n  ') : '✅ None'}`);
  console.log(`\n🔗 Failed Requests: ${failedRequests.length > 0 ? failedRequests.join('\n  ') : '✅ None'}`);
  
  // Check specific assets
  const cssLoaded = await page.evaluate(() => {
    return document.styleSheets.length > 0;
  });
  console.log(`\n🎨 CSS Assets Loaded: ${cssLoaded ? '✅ YES' : '❌ NO'}`);
  
  // Get all scripts
  const scripts = await page.locator('script').count();
  console.log(`📦 Script Tags: ${scripts}`);
  
  // Take screenshot
  await page.screenshot({ path: 'c:\\Users\\back\\Anatomy\\site-screenshot.png', fullPage: true });
  console.log(`\n📸 Screenshot saved to site-screenshot.png`);
  
  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  console.log(rootDiv && rootDiv.trim().length > 0 ? '✅ SITE IS WORKING' : '❌ SITE HAS ISSUES');
  console.log('='.repeat(50));
}

checkSite().catch(console.error);
