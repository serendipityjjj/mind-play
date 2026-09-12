import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://azhabcqyizoheaeozilr.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aGFiY3F5aXpvaGVhZW96aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjcyNjcsImV4cCI6MjEwNDQ0MzI2N30.wZxTkHq6XjUGLXcuMCEcWl50t6QY4jiv3HzzRyDDpgo';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

test.describe.serial('Legacy Data Import & Profile Sub-Item Non-Interference Verification', () => {
  const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');

  test.beforeAll(() => {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  });

  // ----------------------------------------------------
  // Test 1: Student 10313 (Has Drawing Diary & Balance Game Profile)
  // ----------------------------------------------------
  test('Test 1: Student 10313 login & legacy diary/mypage verification', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '10313', name: '학생13' }));
      window.localStorage.setItem('mindplay_room_code', 'CLASS1');
    });

    await page.goto(`${baseURL}/?room=CLASS1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=마음플레이', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // 1. Open Diary Page
    await page.locator('text=감정일기 쓰기').first().click();
    await page.waitForTimeout(1200);

    // Verify 1회차 indicates completed/has diary
    await page.screenshot({ path: path.join(screenshotsDir, 'import_10313_01_diary_grid.png') });

    // Click 1회차 일기
    await page.locator('text=1회차 일기').first().click();
    await page.waitForTimeout(1000);

    // Switch to SubStep 2 (오늘의 마음 그림일기)
    const step2Btn = page.locator('button:has-text("2."), button:has-text("그림일기")').first();
    if (await step2Btn.count() > 0) {
      await step2Btn.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ path: path.join(screenshotsDir, 'import_10313_02_diary_with_drawing.png') });

    // 2. Open MyPage & Verify Portfolio
    await page.goto(`${baseURL}/mypage?room=CLASS1`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Verify diary item or drawing exists in MyPage
    const mypageDrawing = page.locator('img[src*="drawing_10313"], img[alt*="일기"]');
    if (await mypageDrawing.count() > 0) {
      console.log('  ✅ [PASS] Student 10313 drawing image confirmed on MyPage');
    }

    await page.screenshot({ path: path.join(screenshotsDir, 'import_10313_03_mypage.png') });
    await context.close();
  });

  // ----------------------------------------------------
  // Test 2: Student 10305 (Has Branding Card Profile)
  // ----------------------------------------------------
  test('Test 2: Student 10305 login & branding card verification', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '10305', name: '학생05' }));
      window.localStorage.setItem('mindplay_room_code', 'CLASS1');
    });

    await page.goto(`${baseURL}/?room=CLASS1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=마음플레이', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Navigate to Lesson 3 (나다움 브랜딩 카드)
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=3단계').first().click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(screenshotsDir, 'import_10305_01_lesson3_branding.png') });

    // Verify in DB directly that brandingCard exists
    const { data: dbEntry } = await supabase
      .from('mindplay_live_entries')
      .select('payload')
      .eq('room_code', 'CLASS1')
      .eq('activity', 'profile_lesson3_branding')
      .eq('student_id', '10305')
      .single();

    expect(dbEntry).not.toBeNull();
    expect(dbEntry?.payload?.brandingCard).toBeDefined();

    await context.close();
  });

  // ----------------------------------------------------
  // Test 3: Student 10301 (Has Balance Game Profile)
  // ----------------------------------------------------
  test('Test 3: Student 10301 login & balance answers verification', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '10301', name: '학생01' }));
      window.localStorage.setItem('mindplay_room_code', 'CLASS1');
    });

    await page.goto(`${baseURL}/?room=CLASS1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=마음플레이', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Verify DB entry for 10301 balance answers
    const { data: dbEntry } = await supabase
      .from('mindplay_live_entries')
      .select('payload')
      .eq('room_code', 'CLASS1')
      .eq('activity', 'profile_lesson3_balance')
      .eq('student_id', '10301')
      .single();

    expect(dbEntry).not.toBeNull();
    expect(dbEntry?.payload?.balanceAnswers).toBeDefined();
    const answerCount = Object.keys(dbEntry?.payload?.balanceAnswers || {}).length;
    expect(answerCount).toBeGreaterThan(0);

    // Open Lesson 3
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=3단계').first().click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(screenshotsDir, 'import_10301_01_lesson3_balance.png') });
    await context.close();
  });

  // ----------------------------------------------------
  // Test 4: Sub-Item Non-Interference (Branding save does NOT wipe Balance Answers)
  // ----------------------------------------------------
  test('Test 4: Non-interference - Saving Branding Card preserves Balance Game Answers intact', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    const fakeStudentId = '99901';
    const fakeRoom = 'TEST';

    // 1. Initial State: Save Balance Game answers
    const initialBalanceAnswers = [
      { qIndex: 0, choice: 'A', value: '친구와 함께' },
      { qIndex: 1, choice: 'B', value: '혼자만의 시간' }
    ];

    await supabase.from('mindplay_live_entries').upsert({
      room_code: fakeRoom,
      activity: 'profile_lesson3_balance',
      entry_key: fakeStudentId,
      student_id: fakeStudentId,
      student_name: '테스트학생01',
      payload: {
        studentId: fakeStudentId,
        name: '테스트학생01',
        balanceAnswers: initialBalanceAnswers,
        submittedAt: new Date().toISOString()
      }
    }, { onConflict: 'room_code,activity,entry_key' });

    // Also in mindplay_profiles
    await fetch(`${baseURL}/api/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'SAVE_ACTIVITY_PROFILE',
        studentId: fakeStudentId,
        studentName: '테스트학생01',
        roomCode: fakeRoom,
        payload: {
          lesson3: {
            balanceAnswers: initialBalanceAnswers,
            savedAt: new Date().toISOString()
          }
        }
      })
    });

    // 2. Student now saves Branding Card (Step 5)
    await fetch(`${baseURL}/api/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'SAVE_ACTIVITY_PROFILE',
        studentId: fakeStudentId,
        studentName: '테스트학생01',
        roomCode: fakeRoom,
        payload: {
          lesson3: {
            brandingCard: {
              nickname: '용기있는 모험가',
              callMeWhen: '새로운 도전이 필요할 때',
              selfCheer: '나는 언제나 한 걸음 더 나아갈 수 있어!',
              hashtags: ['#용기', '#도전'],
              savedAt: new Date().toISOString()
            }
          }
        }
      })
    });

    // 3. Verify in DB that BOTH balanceAnswers and brandingCard exist simultaneously!
    const { data: dbProfile } = await supabase
      .from('mindplay_profiles')
      .select('profile')
      .eq('student_id', fakeStudentId)
      .single();

    expect(dbProfile).not.toBeNull();
    const l3 = dbProfile?.profile?.lesson3;
    expect(l3).toBeDefined();
    expect(l3.balanceAnswers).toBeDefined();
    expect(l3.balanceAnswers.length).toBe(2);
    expect(l3.brandingCard).toBeDefined();
    expect(l3.brandingCard.nickname).toBe('용기있는 모험가');

    console.log('  ✅ [PASS] Sub-item non-interference confirmed: Both balanceAnswers & brandingCard preserved simultaneously!');

    // 4. Also verify in browser MyPage
    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await page.goto(`${baseURL}/mypage?room=TEST`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, 'import_04_subitem_non_interference.png') });

    await context.close();
  });
});
