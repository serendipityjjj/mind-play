import { test } from '@playwright/test';

test('Diagnose Vercel requests and errors', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('[BROWSER CONSOLE]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[PAGE ERROR]', err.message));
  page.on('request', req => {
    if (req.url().includes('supabase') || req.url().includes('api')) {
      console.log('[REQ]', req.method(), req.url());
    }
  });
  page.on('response', res => {
    if (res.url().includes('supabase') || res.url().includes('api') || res.status() >= 400) {
      console.log('[RES]', res.status(), res.url());
    }
  });

  await page.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  console.log('Navigating to Vercel site...');
  await page.goto('https://mind-play-tan.vercel.app/?room=TEST', { waitUntil: 'networkidle' });

  // Navigate to Lesson 1
  await page.locator('text=1~15단계 마음활동').first().click();
  await page.waitForTimeout(1000);
  await page.locator('text=1단계').first().click();
  await page.waitForTimeout(1000);

  // Input and submit
  const storyInput = page.locator('input[placeholder*="고민되는 이야기"], textarea[placeholder*="고민"]').first();
  await storyInput.fill('진단_사연');

  page.on('dialog', async d => {
    console.log('[DIALOG DETECTED]', d.message());
    await d.accept();
  });

  console.log('Clicking 사연 등록하기...');
  await page.locator('button:has-text("사연 등록하기")').first().click();
  await page.waitForTimeout(5000);

  await context.close();
});
