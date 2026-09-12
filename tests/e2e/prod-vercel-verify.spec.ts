import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

test('Production Vercel (mind-play-tan.vercel.app) multi-computer E2E verification', async ({ browser }) => {
  test.setTimeout(120000);
  const targetUrl = 'https://mind-play-tan.vercel.app';
  const roomCode = 'TEST';
  const testStoryText = `실서버검증사연_${Date.now()}`;

  console.log('🧹 [1/5] Cleaning TEST stories in Supabase...');
  await supabase
    .from('mindplay_live_entries')
    .delete()
    .eq('room_code', roomCode)
    .eq('activity', 'radio_stories');

  // Context A (Computer A - Student 99901)
  const contextA = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageA = await contextA.newPage();

  // Context B (Computer B - Student 99902, completely fresh isolated storage)
  const contextB = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageB = await contextB.newPage();

  pageA.on('dialog', async dialog => {
    console.log('[Computer A Dialog]:', dialog.message());
    await dialog.accept();
  });
  pageB.on('dialog', async dialog => {
    console.log('[Computer B Dialog]:', dialog.message());
    await dialog.accept();
  });

  await pageA.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  await pageB.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99902', name: '테스트학생02', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  console.log(`🌐 [2/5] Opening production Vercel site (${targetUrl}) on Computer A & B...`);
  await pageA.goto(`${targetUrl}/?room=TEST`, { waitUntil: 'networkidle' });
  await pageB.goto(`${targetUrl}/?room=TEST`, { waitUntil: 'networkidle' });

  await pageA.waitForSelector('text=마음플레이', { timeout: 15000 });
  await pageB.waitForSelector('text=마음플레이', { timeout: 15000 });

  // Navigate both to Lesson 1 Activity
  console.log('📱 [3/5] Navigating to Lesson 1...');
  await pageA.locator('text=1~15단계 마음활동').first().click();
  await pageA.waitForTimeout(1000);
  await pageA.locator('text=1단계').first().click();
  await pageA.waitForTimeout(1500);

  await pageB.locator('text=1~15단계 마음활동').first().click();
  await pageB.waitForTimeout(1000);
  await pageB.locator('text=1단계').first().click();
  await pageB.waitForTimeout(1500);

  // Student A inputs story
  const storyInput = pageA.locator('input[placeholder*="고민되는 이야기"], textarea[placeholder*="고민"]').first();
  await expect(storyInput).toBeVisible({ timeout: 10000 });
  await storyInput.fill(testStoryText);

  // Student A clicks "사연 등록하기"
  console.log('✍️ [4/5] Student A registering story on production server...');
  const submitBtn = pageA.locator('button:has-text("사연 등록하기")').first();
  await submitBtn.click();
  await pageA.waitForTimeout(3000);

  // 1. Direct Supabase Query Verification
  console.log(`🔍 Querying production Supabase DB for room ${roomCode}...`);
  const { data: dbRows, error: dbError } = await supabase
    .from('mindplay_live_entries')
    .select('*')
    .eq('room_code', roomCode)
    .eq('activity', 'radio_stories');

  console.log('DB error status:', dbError);
  console.log('DB rows count:', dbRows ? dbRows.length : 0);

  expect(dbError).toBeNull();
  expect(dbRows).toBeDefined();
  expect(dbRows?.length).toBeGreaterThan(0);
  const foundEntry = dbRows?.find((r: any) => r.payload?.content === testStoryText || r.payload?.text === testStoryText);
  expect(foundEntry).toBeDefined();
  console.log('>>> [PRODUCTION DB RECORD CONFIRMED]:', JSON.stringify(foundEntry, null, 2));

  // 2. Student A sees own story on production screen
  await expect(pageA.locator(`text=${testStoryText}`).first()).toBeVisible({ timeout: 10000 });
  await pageA.screenshot({ path: 'test-results/prod-verify-student-a.png' });

  // 3. Student B (different computer) sees story in realtime
  console.log('📡 [5/5] Checking if Computer B received story in realtime from Vercel...');
  await expect(pageB.locator(`text=${testStoryText}`).first()).toBeVisible({ timeout: 20000 });
  await pageB.screenshot({ path: 'test-results/prod-verify-student-b.png' });

  console.log('🎉 [SUCCESS] PRODUCTION VERCEL MULTI-COMPUTER TEST PASSED 100%!');

  await contextA.close();
  await contextB.close();
});
