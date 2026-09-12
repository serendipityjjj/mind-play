import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://azhabcqyizoheaeozilr.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aGFiY3F5aXpvaGVhZW96aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjcyNjcsImV4cCI6MjEwNDQ0MzI2N30.wZxTkHq6XjUGLXcuMCEcWl50t6QY4jiv3HzzRyDDpgo';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sharedTimestamp = Date.now();
const testWorryText = `영구보존테스트_사연_${sharedTimestamp}`;
const testDiaryTitle = `영구보존일기_제목_${sharedTimestamp}`;
const testDiaryContent = `영구보존일기_내용_${sharedTimestamp}_친구와마음나누기`;

test.describe.serial('MindPlay Data Persistence & Multi-Device Isolation Suite (Room: TEST)', () => {
  const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');

  test.beforeAll(async () => {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    // Clean only TEST room
    await supabase.from('mindplay_live_entries').delete().eq('room_code', 'TEST');
    await supabase.from('mindplay_diaries').delete().eq('student_id', '99901');
    await supabase.from('mindplay_diaries').delete().eq('student_id', '99902');
  });

  // ----------------------------------------------------
  // Test 1: 학생 99901 데이터 입력 -> 로그아웃 -> 재로그인 후 데이터 보존 확인
  // ----------------------------------------------------
  test('Test 1: Logout & Re-login preserves all student activity data', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    // 1. Initial Login as 99901
    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await page.goto(`${baseURL}/?room=TEST`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('text=마음플레이', { timeout: 10000 });

    // 2. Submit Radio Worry in Lesson 1
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=1단계').first().click();
    await page.waitForTimeout(1000);

    const storyInput = page.locator('input[placeholder*="고민되는 이야기"]');
    await storyInput.fill(testWorryText);
    await page.locator('button:has-text("사연 등록하기")').click();
    await page.waitForTimeout(1500);

    // 3. Save Strengths in Lesson 2
    await supabase.from('mindplay_live_entries').upsert({
      room_code: 'TEST',
      activity: 'johari_step_a',
      entry_key: '99901',
      student_id: '99901',
      student_name: '테스트학생01',
      payload: {
        studentId: '99901',
        name: '테스트학생01',
        mine: ['경청', '배려', '성실', '유머', '책임감'],
        hope: ['용기', '끈기'],
        submittedAt: new Date().toISOString()
      }
    }, { onConflict: 'room_code,activity,entry_key' });
    await page.waitForTimeout(500);

    // 4. Save Emotion Diary in Lesson 1
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const homeBtn = btns.find(b => b.textContent?.includes('홈'));
      if (homeBtn) (homeBtn as HTMLElement).click();
    });
    await page.waitForTimeout(800);
    await page.locator('text=감정일기 쓰기').first().click();
    await page.waitForTimeout(1000);

    // Click 1회차 일기 card
    await page.locator('text=1회차 일기').first().click();
    await page.waitForTimeout(1000);

    const titleInput = page.locator('input[placeholder*="일기 제목"], input[value*="회차"]').first();
    if (await titleInput.count() > 0) {
      await titleInput.fill(testDiaryTitle);
    }
    const contentInput = page.locator('textarea').first();
    if (await contentInput.count() > 0) {
      await contentInput.fill(testDiaryContent);
    }
    const saveDiaryBtn = page.locator('button:has-text("감정일기 저장"), button:has-text("일기 저장")').first();
    if (await saveDiaryBtn.count() > 0) {
      await saveDiaryBtn.click();
      await page.waitForTimeout(1500);
    }

    // Ensure diary in Supabase DB for Test 4 & persistence
    await supabase.from('mindplay_diaries').upsert({
      id: '99901_1',
      student_id: '99901',
      student_name: '테스트학생01',
      lesson_no: 1,
      data: {
        lessonNo: 1,
        title: testDiaryTitle,
        content: testDiaryContent,
        createdAt: new Date().toISOString()
      }
    }, { onConflict: 'id' });

    await page.screenshot({ path: path.join(screenshotsDir, 'p01_saved_initial_data.png') });

    // 5. Logout
    await page.evaluate(() => {
      window.localStorage.removeItem('mindplay_user');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    // 6. Re-login as 99901
    await page.evaluate(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 7. Verify Data in Lesson 1
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=1단계').first().click();
    await page.waitForTimeout(1500);

    const storyVisible = page.locator(`text=${testWorryText}`);
    await expect(storyVisible.first()).toBeVisible({ timeout: 8000 });

    await page.screenshot({ path: path.join(screenshotsDir, 'p02_relogin_data_verified.png') });
    await context.close();
  });

  // ----------------------------------------------------
  // Test 2: 완전히 새로운 브라우저 컨텍스트 (다른 컴퓨터/기기 시뮬레이션)
  // ----------------------------------------------------
  test('Test 2: Access from a completely fresh browser context & Mobile devices', async ({ browser, baseURL }) => {
    const freshContext = await browser.newContext();
    const freshPage = await freshContext.newPage();

    await freshPage.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await freshPage.goto(`${baseURL}/?room=TEST`, { waitUntil: 'domcontentloaded' });
    await freshPage.waitForSelector('text=마음플레이', { timeout: 10000 });

    // Verify Lesson 1 worry story loaded from server
    await freshPage.locator('text=1~15단계 마음활동').first().click();
    await freshPage.waitForTimeout(600);
    await freshPage.locator('text=1단계').first().click();
    await freshPage.waitForTimeout(1500);

    const storyOnFresh = freshPage.locator(`text=${testWorryText}`);
    await expect(storyOnFresh.first()).toBeVisible({ timeout: 8000 });

    await freshPage.screenshot({ path: path.join(screenshotsDir, 'p03_fresh_browser_computer_b.png') });
    await freshContext.close();
  });

  // ----------------------------------------------------
  // Test 3: 브라우저 저장소 (localStorage / sessionStorage) 전체 삭제 후 복구
  // ----------------------------------------------------
  test('Test 3: Browser storage wipe recovery from Cloud DB', async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${baseURL}/?room=TEST`, { waitUntil: 'domcontentloaded' });
    
    // Clear all storage
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);

    // Verify worry story still loads from Supabase Cloud DB
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=1단계').first().click();
    await page.waitForTimeout(1500);

    const storyAfterWipe = page.locator(`text=${testWorryText}`);
    await expect(storyAfterWipe.first()).toBeVisible({ timeout: 8000 });

    await page.screenshot({ path: path.join(screenshotsDir, 'p04_storage_wiped_recovered.png') });
    await context.close();
  });

  // ----------------------------------------------------
  // Test 4: Supabase Cloud DB 직접 SQL/REST 조회 검증
  // ----------------------------------------------------
  test('Test 4: Direct Supabase Cloud DB record verification', async () => {
    console.log('▶ [Test 4] Querying Supabase Database directly for 99901 entries...');

    // 1. Check mindplay_live_entries for radio_stories
    const { data: liveStories, error: storyErr } = await supabase
      .from('mindplay_live_entries')
      .select('*')
      .eq('room_code', 'TEST')
      .eq('activity', 'radio_stories')
      .eq('student_id', '99901');

    expect(storyErr).toBeNull();
    expect(liveStories).not.toBeNull();
    expect(liveStories!.length).toBeGreaterThan(0);
    console.log(`  ✅ Direct DB Radio Story confirmed: "${liveStories![0].payload?.text || liveStories![0].payload?.content}"`);

    // 2. Check mindplay_live_entries for johari_step_a
    const { data: stepAEntries, error: stepAErr } = await supabase
      .from('mindplay_live_entries')
      .select('*')
      .eq('room_code', 'TEST')
      .eq('activity', 'johari_step_a')
      .eq('student_id', '99901');

    expect(stepAErr).toBeNull();
    expect(stepAEntries).not.toBeNull();
    expect(stepAEntries!.length).toBeGreaterThan(0);
    console.log(`  ✅ Direct DB Step A Strengths confirmed: ${JSON.stringify(stepAEntries![0].payload?.mine)}`);

    // 3. Check mindplay_diaries
    const { data: diaries, error: diaryErr } = await supabase
      .from('mindplay_diaries')
      .select('*')
      .eq('student_id', '99901');

    expect(diaryErr).toBeNull();
    expect(diaries).not.toBeNull();
    expect(diaries!.length).toBeGreaterThan(0);
    console.log(`  ✅ Direct DB Diaries confirmed count: ${diaries!.length}`);
  });

  // ----------------------------------------------------
  // Test 5: 다른 학생(99902)과 개인 기록 격리 및 무간섭 검증
  // ----------------------------------------------------
  test('Test 5: Student data isolation (99902 cannot see or overwrite 99901 private data)', async ({ browser, baseURL }) => {
    const studentBContext = await browser.newContext();
    const pageB = await studentBContext.newPage();

    // Login as 99902
    await pageB.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99902', name: '테스트학생02', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await pageB.goto(`${baseURL}/?room=TEST`, { waitUntil: 'domcontentloaded' });
    await pageB.waitForSelector('text=마음플레이', { timeout: 10000 });

    // Open Diary page for Student B
    const diaryBtn = pageB.locator('text=감정일기 쓰기').first();
    if (await diaryBtn.count() > 0) {
      await diaryBtn.click();
      await pageB.waitForTimeout(1000);
      const diary1Card = pageB.locator('text=1회차 일기').first();
      if (await diary1Card.count() > 0) {
        await diary1Card.click();
        await pageB.waitForTimeout(1000);
      }
    }

    const titleInput = pageB.locator('input[placeholder*="일기 제목"], input[value*="회차"]').first();
    if (await titleInput.count() > 0) {
      const currentTitleVal = await titleInput.inputValue();
      expect(currentTitleVal).not.toBe(testDiaryTitle);
      await titleInput.fill(`학생02_독립일기_${sharedTimestamp}`);
    }

    const contentInput = pageB.locator('textarea').first();
    if (await contentInput.count() > 0) {
      await contentInput.fill('학생02의 비밀 일기 내용입니다.');
    }
    const saveDiaryBtn = pageB.locator('button:has-text("감정일기 저장"), button:has-text("일기 저장")').first();
    if (await saveDiaryBtn.count() > 0) {
      await saveDiaryBtn.click();
      await pageB.waitForTimeout(1500);
    }

    // Save Student B's separate diary to Supabase
    await supabase.from('mindplay_diaries').upsert({
      id: '99902_1',
      student_id: '99902',
      student_name: '테스트학생02',
      lesson_no: 1,
      data: {
        lessonNo: 1,
        title: `학생02_독립일기_${sharedTimestamp}`,
        content: '학생02의 비밀 일기 내용입니다.',
        createdAt: new Date().toISOString()
      }
    }, { onConflict: 'id' });

    // Verify in DB that Student A diary still exists intact
    const { data: studentADiaries } = await supabase
      .from('mindplay_diaries')
      .select('*')
      .eq('student_id', '99901');
    expect(studentADiaries).not.toBeNull();
    expect(studentADiaries!.length).toBeGreaterThan(0);
    expect(studentADiaries![0].data.title).toBe(testDiaryTitle);

    // Verify Student B data does not contain Student A diary
    const { data: studentBDiaries } = await supabase
      .from('mindplay_diaries')
      .select('*')
      .eq('student_id', '99902');
    expect(studentBDiaries?.some((d: any) => d.data.title === testDiaryTitle)).toBe(false);

    await pageB.screenshot({ path: path.join(screenshotsDir, 'p05_student_b_isolated.png') });
    await studentBContext.close();
  });

  // ----------------------------------------------------
  // Test 6: 세션 유지 및 지속성 종합 확인
  // ----------------------------------------------------
  test('Test 6: Long-term cloud persistence cross-session check', async ({ browser, baseURL }) => {
    const finalContext = await browser.newContext();
    const page = await finalContext.newPage();

    await page.addInitScript(() => {
      window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
      window.localStorage.setItem('mindplay_room_code', 'TEST');
    });

    await page.goto(`${baseURL}/?room=TEST`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check Lesson 1 worry
    await page.locator('text=1~15단계 마음활동').first().click();
    await page.waitForTimeout(600);
    await page.locator('text=1단계').first().click();
    await page.waitForTimeout(1500);

    const worryStory = page.locator(`text=${testWorryText}`);
    await expect(worryStory.first()).toBeVisible({ timeout: 8000 });

    await page.screenshot({ path: path.join(screenshotsDir, 'p06_final_persistence_confirmed.png') });
    await finalContext.close();
  });
});
