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

test('Radio worry registration, DB persistence, and 2-browser realtime sync', async ({ browser }) => {
  test.setTimeout(90000);
  const roomCode = 'TEST';
  const testStoryText = `검증사연_${Date.now()}`;

  console.log('🧹 Cleaning TEST stories before test...');
  await supabase
    .from('mindplay_live_entries')
    .delete()
    .eq('room_code', roomCode)
    .eq('activity', 'radio_stories');

  // Context A (Student 99901)
  const contextA = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageA = await contextA.newPage();

  // Context B (Student 99902)
  const contextB = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageB = await contextB.newPage();

  // Auto accept alerts
  pageA.on('dialog', async dialog => {
    console.log('[Page A Dialog]:', dialog.message());
    await dialog.accept();
  });
  pageB.on('dialog', async dialog => {
    console.log('[Page B Dialog]:', dialog.message());
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

  console.log('Opening pages...');
  await pageA.goto('http://localhost:3000/?room=TEST', { waitUntil: 'domcontentloaded' });
  await pageB.goto('http://localhost:3000/?room=TEST', { waitUntil: 'domcontentloaded' });

  await pageA.waitForSelector('text=마음플레이', { timeout: 10000 });
  await pageB.waitForSelector('text=마음플레이', { timeout: 10000 });

  // Navigate to Lesson 1
  await pageA.locator('text=1~15단계 마음활동').first().click();
  await pageA.waitForTimeout(800);
  await pageA.locator('text=1단계').first().click();
  await pageA.waitForTimeout(1000);

  await pageB.locator('text=1~15단계 마음활동').first().click();
  await pageB.waitForTimeout(800);
  await pageB.locator('text=1단계').first().click();
  await pageB.waitForTimeout(1000);

  // Student A inputs story
  const storyInput = pageA.locator('input[placeholder*="고민되는 이야기"], textarea[placeholder*="고민"]').first();
  await expect(storyInput).toBeVisible({ timeout: 5000 });
  await storyInput.fill(testStoryText);

  // Student A clicks "사연 등록하기"
  const submitBtn = pageA.locator('button:has-text("사연 등록하기")').first();
  await submitBtn.click();
  await pageA.waitForTimeout(3000);

  // 1. Direct Supabase Query Verification
  console.log(`Querying Supabase mindplay_live_entries for room ${roomCode} and activity radio_stories...`);
  const { data: dbRows, error: dbError } = await supabase
    .from('mindplay_live_entries')
    .select('*')
    .eq('room_code', roomCode)
    .eq('activity', 'radio_stories');

  expect(dbError).toBeNull();
  console.log('Supabase Query Result count:', dbRows ? dbRows.length : 0);

  expect(dbRows).toBeDefined();
  expect(dbRows?.length).toBeGreaterThan(0);
  const foundEntry = dbRows?.find((r: any) => r.payload?.content === testStoryText || r.payload?.text === testStoryText);
  expect(foundEntry).toBeDefined();
  console.log('>>> [DB PROOF] Inserted row found in Supabase:');
  console.log(JSON.stringify(foundEntry, null, 2));

  // 2. Student A sees own story on screen
  await expect(pageA.locator(`text=${testStoryText}`).first()).toBeVisible({ timeout: 10000 });
  await pageA.screenshot({ path: 'test-results/verify-student-a-story.png' });

  // 3. Student B sees story in realtime
  console.log('Verifying Student B receives story in realtime...');
  await expect(pageB.locator(`text=${testStoryText}`).first()).toBeVisible({ timeout: 15000 });
  await pageB.screenshot({ path: 'test-results/verify-student-b-story.png' });

  console.log('🎉 ALL VERIFICATIONS (DB INSERTION + 2-BROWSER REALTIME) PASSED 100%!');

  await contextA.close();
  await contextB.close();
});
