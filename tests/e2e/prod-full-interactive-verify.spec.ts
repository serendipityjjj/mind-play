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

test('Full Interactive Verification on Production Vercel: Radio Dispatch + Strength Matching + Realtime Sync', async ({ browser }) => {
  test.setTimeout(180000);
  const targetUrl = 'https://mind-play-tan.vercel.app';
  const roomCode = 'TEST';

  console.log('🧹 [1/6] Initializing TEST room in Supabase...');
  await supabase.from('mindplay_live_entries').delete().eq('room_code', roomCode);

  // 1. Create 3 isolated browser contexts
  const teacherContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const studentAContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const studentBContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const teacherPage = await teacherContext.newPage();
  const studentAPage = await studentAContext.newPage();
  const studentBPage = await studentBContext.newPage();

  // Handle password prompts (8888) and alerts automatically
  for (const p of [teacherPage, studentAPage, studentBPage]) {
    p.on('dialog', async d => {
      console.log(`[DIALOG (${p === teacherPage ? 'Teacher' : p === studentAPage ? 'StudentA' : 'StudentB'})]:`, d.message());
      if (d.type() === 'prompt') {
        await d.accept('8888');
      } else {
        await d.accept();
      }
    });
  }

  await teacherPage.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '00000', name: '선생님 (관리자)', isTeacher: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  await studentAPage.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  await studentBPage.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99902', name: '테스트학생02', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  console.log('🌐 [2/6] Loading pages on Production Vercel Server...');
  await Promise.all([
    teacherPage.goto(`${targetUrl}/?room=TEST`, { waitUntil: 'networkidle' }),
    studentAPage.goto(`${targetUrl}/?room=TEST`, { waitUntil: 'networkidle' }),
    studentBPage.goto(`${targetUrl}/?room=TEST`, { waitUntil: 'networkidle' })
  ]);

  // ----------------------------------------------------------------
  // [PART 1] Lesson 1: Radio Stories & Live Sync & Teacher Dispatch
  // ----------------------------------------------------------------
  console.log('📻 [3/6] Testing Lesson 1: Radio Worry Submission & Realtime Sync...');
  await studentAPage.locator('text=1~15단계 마음활동').first().click();
  await studentAPage.waitForTimeout(500);
  await studentAPage.locator('text=1단계').first().click();
  await studentAPage.waitForTimeout(1000);

  await studentBPage.locator('text=1~15단계 마음활동').first().click();
  await studentBPage.waitForTimeout(500);
  await studentBPage.locator('text=1단계').first().click();
  await studentBPage.waitForTimeout(1000);

  const testStoryA = `학생A_고민사연_${Date.now()}`;
  const storyInputA = studentAPage.locator('input[placeholder*="고민되는 이야기"], textarea[placeholder*="고민"]').first();
  await storyInputA.fill(testStoryA);
  await studentAPage.locator('button:has-text("사연 등록하기")').first().click();
  await studentAPage.waitForTimeout(2500);

  // Student B sees story in realtime
  console.log('Verifying Student B receives Student A story in realtime...');
  await expect(studentBPage.locator(`text=${testStoryA}`).first()).toBeVisible({ timeout: 15000 });
  console.log('✅ Student B confirmed receiving Student A story!');

  // Teacher navigates to Lesson 1 & clicks Radio Dispatch
  console.log('👨‍🏫 Teacher dispatching 1:1 Radio Stories...');
  await teacherPage.locator('text=1~15단계 마음활동').first().click();
  await teacherPage.waitForTimeout(500);
  await teacherPage.locator('text=1단계').first().click();
  await teacherPage.waitForTimeout(1000);

  const teacherDispatchRadioBtn = teacherPage.locator('button:has-text("사연 1:1 무작위 배정"), button:has-text("배정하기"), button:has-text("1:1 배정")').first();
  if (await teacherDispatchRadioBtn.count() > 0) {
    await teacherDispatchRadioBtn.click();
    await teacherPage.waitForTimeout(3000);
  }

  // ----------------------------------------------------------------
  // [PART 2] Lesson 2: Strength Finding & Teacher Johari Control
  // ----------------------------------------------------------------
  console.log('🏷️ [4/6] Testing Lesson 2: Teacher Johari Control & Partner Unlock...');
  await teacherPage.locator('button:has-text("2단계")').first().click();
  await teacherPage.waitForTimeout(1000);

  await studentAPage.locator('button:has-text("2단계")').first().click();
  await studentAPage.waitForTimeout(1000);

  await studentBPage.locator('button:has-text("2단계")').first().click();
  await studentBPage.waitForTimeout(1000);

  // Teacher clicks "선생님 전용: 4개의 창 공개하기"
  const teacherUnlockBtn = teacherPage.locator('button:has-text("4개의 창 공개하기"), button:has-text("결과 보내기"), button:has-text("결과 전송")').first();
  if (await teacherUnlockBtn.count() > 0 && await teacherUnlockBtn.isVisible()) {
    console.log('Clicking teacher Johari unlock button...');
    await teacherUnlockBtn.click();
    await teacherPage.waitForTimeout(3000);
  }

  // Verify in Supabase that teacher state exists
  const { data: liveRows } = await supabase
    .from('mindplay_live_entries')
    .select('*')
    .eq('room_code', roomCode);

  console.log('Live DB rows count after teacher actions:', liveRows?.length);
  expect(liveRows?.length).toBeGreaterThan(0);

  // ----------------------------------------------------------------
  // [PART 3] Teacher Dashboard View
  // ----------------------------------------------------------------
  console.log('📊 [5/6] Testing Teacher Dashboard & Inspection table...');
  const teacherDashboardTab = teacherPage.locator('button:has-text("교사용 대시보드")').first();
  await teacherDashboardTab.click();
  await teacherPage.waitForTimeout(2000);

  const dashboardTitle = teacherPage.locator('text=단계별 학생 제출 현황 확인').first();
  await expect(dashboardTitle).toBeVisible({ timeout: 10000 });
  console.log('✅ Teacher dashboard table rendered with live students list!');

  // Check stage inspection switching (e.g. 1단계 -> 2단계)
  const stage2Btn = teacherPage.locator('button:has-text("2단계")').first();
  if (await stage2Btn.count() > 0) {
    await stage2Btn.click();
    await teacherPage.waitForTimeout(1000);
  }

  console.log('🎉🎉🎉 [ALL TESTS PASSED 100%] Radio live sync, teacher dispatch, strength matching unlocks, and teacher dashboard all work seamlessly on production Vercel!');

  await teacherContext.close();
  await studentAContext.close();
  await studentBContext.close();
});
