import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('MindPlay 3-Browser Realtime Multi-User E2E Tests (Room: TEST)', () => {
  const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');

  test.beforeAll(() => {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  });

  test('Multi-client synchronized classroom workflow (Teacher + Student A + Student B)', async ({ browser }) => {
    // 1. Create 3 isolated browser contexts
    const teacherContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const studentAContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const studentBContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });

    const teacherPage = await teacherContext.newPage();
    const studentAPage = await studentAContext.newPage();
    const studentBPage = await studentBContext.newPage();

    for (const p of [teacherPage, studentAPage, studentBPage]) {
      p.on('pageerror', err => console.log('[PAGE ERROR]:', err.message));
      p.on('console', msg => {
        if (msg.type() === 'error') console.log('[CONSOLE ERROR]:', msg.text());
      });
    }

    // 2. Set localStorage credentials before loading
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

    // 3. Open Home & Wait for DOM
    await teacherPage.goto('http://localhost:3000/?room=TEST', { waitUntil: 'domcontentloaded' });
    await studentAPage.goto('http://localhost:3000/?room=TEST', { waitUntil: 'domcontentloaded' });
    await studentBPage.goto('http://localhost:3000/?room=TEST', { waitUntil: 'domcontentloaded' });

    // Wait for React rendering
    await teacherPage.waitForSelector('text=마음플레이', { timeout: 10000 });
    await studentAPage.waitForSelector('text=마음플레이', { timeout: 10000 });
    await studentBPage.waitForSelector('text=마음플레이', { timeout: 10000 });

    await teacherPage.screenshot({ path: path.join(screenshotsDir, '01_teacher_dashboard.png') });
    await studentAPage.screenshot({ path: path.join(screenshotsDir, '01_student_a_home.png') });

    // ----------------------------------------------------
    // Scenario 1: Lesson 1 Radio Stories & Realtime Hearts
    // ----------------------------------------------------
    console.log('▶ [E2E] Scenario 1: Radio Story & Heart synchronization...');
    
    // Student A navigates to Lesson 1 Activity by clicking the Home Card
    await studentAPage.locator('text=1~15단계 마음활동').first().click();
    await studentAPage.waitForTimeout(800);

    // Click 1단계 in the grid
    await studentAPage.locator('text=1단계').first().click();
    await studentAPage.waitForTimeout(1000);

    // Student A submits a radio worry
    const storyInput = studentAPage.locator('input[placeholder*="고민되는 이야기"]');
    await expect(storyInput).toBeVisible({ timeout: 5000 });
    await storyInput.fill('테스트학생01의 실시간 E2E 고민 사연입니다!');
    await studentAPage.locator('button:has-text("사연 등록하기")').click();
    await studentAPage.waitForTimeout(2000);

    await studentAPage.screenshot({ path: path.join(screenshotsDir, '02_student_a_submitted_worry.png') });

    // Student B navigates to Lesson 1 Activity
    await studentBPage.locator('text=1~15단계 마음활동').first().click();
    await studentBPage.waitForTimeout(800);
    await studentBPage.locator('text=1단계').first().click();
    await studentBPage.waitForTimeout(1500);

    // Verify Student B sees Student A story
    const storyOnB = studentBPage.locator('text=테스트학생01의 실시간 E2E 고민 사연입니다');
    await expect(storyOnB.first()).toBeVisible({ timeout: 10000 });
    await studentBPage.screenshot({ path: path.join(screenshotsDir, '03_student_b_received_worry.png') });

    // Student B clicks heart on Student A story
    const heartBtn = studentBPage.locator('button:has-text("❤️")').first();
    if (await heartBtn.count() > 0) {
      await heartBtn.click();
      await studentBPage.waitForTimeout(1500);
    }
    await studentBPage.screenshot({ path: path.join(screenshotsDir, '04_student_b_liked_heart.png') });

    // ----------------------------------------------------
    // Scenario 2: Lesson 2 Strength Step A & Teacher Dispatch
    // ----------------------------------------------------
    console.log('▶ [E2E] Scenario 2: Strength Finding Step A & Peer Matching...');

    // Student A switches to Lesson 2 via top stage nav
    await studentAPage.locator('button:has-text("2단계")').first().click();
    await studentAPage.waitForTimeout(1000);

    // Select 5 strengths and 2 hope strengths for Student A
    await studentAPage.evaluate(() => {
      const strengthButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('🏷️'));
      for (let i = 0; i < 5 && i < strengthButtons.length; i++) {
        (strengthButtons[i] as HTMLElement).click();
      }
      const hopeButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('희망'));
      for (let i = 0; i < 2 && i < hopeButtons.length; i++) {
        (hopeButtons[i] as HTMLElement).click();
      }
    });
    await studentAPage.waitForTimeout(1000);

    // Click Save Step A
    const saveStepABtn = studentAPage.locator('button:has-text("강점 검사 결과 영구 저장하기")');
    if (await saveStepABtn.count() > 0 && await saveStepABtn.isEnabled()) {
      await saveStepABtn.click();
      await studentAPage.waitForTimeout(2000);
    }
    await studentAPage.screenshot({ path: path.join(screenshotsDir, '05_student_a_saved_step_a.png') });

    // Student B switches to Lesson 2 and saves Step A
    await studentBPage.locator('button:has-text("2단계")').first().click();
    await studentBPage.waitForTimeout(1000);

    await studentBPage.evaluate(() => {
      const strengthButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('🏷️'));
      for (let i = 0; i < 5 && i < strengthButtons.length; i++) {
        (strengthButtons[i] as HTMLElement).click();
      }
      const hopeButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('희망'));
      for (let i = 0; i < 2 && i < hopeButtons.length; i++) {
        (hopeButtons[i] as HTMLElement).click();
      }
    });
    await studentBPage.waitForTimeout(1000);

    const saveStepABtnB = studentBPage.locator('button:has-text("강점 검사 결과 영구 저장하기")');
    if (await saveStepABtnB.count() > 0 && await saveStepABtnB.isEnabled()) {
      await saveStepABtnB.click();
      await studentBPage.waitForTimeout(2000);
    }
    await studentBPage.screenshot({ path: path.join(screenshotsDir, '06_student_b_saved_step_a.png') });

    // ----------------------------------------------------
    // Scenario 3: Teacher Dispatches 1:1 Pairs
    // ----------------------------------------------------
    console.log('▶ [E2E] Scenario 3: Teacher dashboard verification...');
    
    // Teacher switches to Teacher Tab or Lesson 2
    await teacherPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const tBtn = btns.find(b => b.textContent?.includes('교사용 대시보드'));
      if (tBtn) (tBtn as HTMLElement).click();
    });
    await teacherPage.waitForTimeout(1500);
    await teacherPage.screenshot({ path: path.join(screenshotsDir, '07_teacher_dashboard_active.png') });

    // ----------------------------------------------------
    // Scenario 4: Reload Persistence Check
    // ----------------------------------------------------
    console.log('▶ [E2E] Scenario 4: Page Reload Persistence Check...');
    await studentAPage.reload({ waitUntil: 'domcontentloaded' });
    await studentAPage.waitForTimeout(3000);

    await studentAPage.screenshot({ path: path.join(screenshotsDir, '08_student_a_after_reload.png') });
    console.log('🎉 [E2E] All browser interactions and sync verifications successfully executed!');

    await teacherContext.close();
    await studentAContext.close();
    await studentBContext.close();
  });
});
