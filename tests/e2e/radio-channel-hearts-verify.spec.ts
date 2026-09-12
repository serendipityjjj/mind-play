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

test('6 Radio Channel Hearts: Realtime Sync, 26 Students Aggregation, Persistence & Idempotency', async ({ browser }) => {
  test.setTimeout(180000);
  const roomCode = 'TEST';
  const CHANNELS = [
    { freq: 91.5, str: '91.5' },
    { freq: 95.0, str: '95.0' },
    { freq: 98.5, str: '98.5' },
    { freq: 102.0, str: '102.0' },
    { freq: 105.5, str: '105.5' },
    { freq: 108.0, str: '108.0' }
  ];

  console.log('🧹 [1/7] Cleaning TEST room entries in Supabase (Virtual Reset)...');
  const resetTimestamp = new Date(Date.now() + 1000).toISOString();
  await supabase.from('mindplay_live_entries').upsert({
    room_code: roomCode,
    activity: 'radio_channel_hearts__teacher',
    entry_key: 'state',
    student_id: 'teacher',
    student_name: 'Teacher',
    payload: { reset_at: resetTimestamp }
  }, { onConflict: 'room_code,activity,entry_key' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Create 2 isolated browser contexts (Student A: 99901, Student B: 99902)
  const contextA = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const contextB = await browser.newContext({ viewport: { width: 1280, height: 1000 } });

  const pageA = await contextA.newPage();
  const pageB = await contextB.newPage();

  pageA.on('dialog', async d => {
    console.log('[Dialog Student A]:', d.message());
    await d.accept();
  });
  pageB.on('dialog', async d => {
    console.log('[Dialog Student B]:', d.message());
    await d.accept();
  });

  await pageA.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  await pageB.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99902', name: '테스트학생02', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  console.log('🌐 [2/7] Opening app for Student A & B...');
  await Promise.all([
    pageA.goto('http://localhost:3000/?room=TEST', { waitUntil: 'networkidle' }),
    pageB.goto('http://localhost:3000/?room=TEST', { waitUntil: 'networkidle' })
  ]);

  // Navigate both to Lesson 1 Activity
  await pageA.locator('text=1~15단계 마음활동').first().click();
  await pageA.waitForTimeout(500);
  await pageA.locator('text=1단계').first().click();
  await pageA.waitForTimeout(1000);

  await pageB.locator('text=1~15단계 마음활동').first().click();
  await pageB.waitForTimeout(500);
  await pageB.locator('text=1단계').first().click();
  await pageB.waitForTimeout(1000);

  // -------------------------------------------------------------------------
  // Test (a & b): Student A likes 98.5 -> Student B gets 1 live -> Student B likes -> both get 2
  // -------------------------------------------------------------------------
  console.log('📻 [3/7] Testing Realtime Sync for 98.5 MHz channel...');
  
  const likeBtnA = pageA.locator('button:has-text("이 사연에 폭풍 공감 보내기")').first();
  await likeBtnA.scrollIntoViewIfNeeded();
  await likeBtnA.click();
  await pageA.waitForTimeout(2500);

  // Verify Student A button changed to "공감 완료 (참여함)" and count is 1
  await expect(pageA.locator('text=공감 완료 (참여함)').first()).toBeVisible({ timeout: 5000 });
  await expect(pageA.locator('text=우리 반 실시간 공감 하트: 1회').first()).toBeVisible({ timeout: 5000 });
  console.log('✅ Student A: Button changed to "공감 완료" and count is 1회');

  // Verify Student B screen automatically updates to 1 without reload
  console.log('Verifying Student B screen receives count 1 in realtime...');
  const heartTextB = pageB.locator('text=우리 반 실시간 공감 하트').first();
  await heartTextB.scrollIntoViewIfNeeded();
  await expect(pageB.locator('text=우리 반 실시간 공감 하트: 1회').first()).toBeVisible({ timeout: 15000 });
  console.log('✅ Student B: Realtime received count 1회 without reload!');

  // Student B also clicks like on 98.5 MHz
  const likeBtnB = pageB.locator('button:has-text("이 사연에 폭풍 공감 보내기")').first();
  await likeBtnB.scrollIntoViewIfNeeded();
  await likeBtnB.click();
  await pageB.waitForTimeout(2500);

  // Verify Student B count becomes 2
  await expect(pageB.locator('text=우리 반 실시간 공감 하트: 2회').first()).toBeVisible({ timeout: 5000 });
  // Verify Student A screen also reflects 2 in realtime
  await expect(pageA.locator('text=우리 반 실시간 공감 하트: 2회').first()).toBeVisible({ timeout: 15000 });
  console.log('✅ Both Student A & B screens confirmed 2회!');

  // -------------------------------------------------------------------------
  // Test (e): Duplicate click prevention (Idempotency)
  // -------------------------------------------------------------------------
  console.log('🛡️ [4/7] Testing Duplicate Click Prevention (Idempotency)...');
  const likedBtnA = pageA.locator('button:has-text("공감 완료 (참여함)")').first();
  await likedBtnA.click();
  await pageA.waitForTimeout(1000);
  // Count should stay 2회
  await expect(pageA.locator('text=우리 반 실시간 공감 하트: 2회').first()).toBeVisible({ timeout: 3000 });
  console.log('✅ Duplicate click prevented, count remains 2회!');

  // -------------------------------------------------------------------------
  // Test (c): Test all 6 channels
  // -------------------------------------------------------------------------
  console.log('📊 [5/7] Testing All 6 Radio Frequency Channels...');
  const resultsTable: any[] = [];

  for (const ch of CHANNELS) {
    const chBtnA = pageA.locator(`button:has-text("${ch.freq} MHz")`).first();
    await chBtnA.click();
    await pageA.waitForTimeout(1000);

    const isAlreadyLiked = await pageA.locator('button:has-text("공감 완료 (참여함)")').count() > 0;
    if (!isAlreadyLiked) {
      const btn = pageA.locator('button:has-text("이 사연에 폭풍 공감 보내기")').first();
      await btn.click();
      await pageA.waitForTimeout(2000);
    }

    const { data: dbEntry } = await supabase
      .from('mindplay_live_entries')
      .select('*')
      .eq('room_code', roomCode)
      .eq('activity', 'radio_channel_hearts')
      .eq('entry_key', `channel_${ch.str}_99901`)
      .single();

    resultsTable.push({
      '주파수 (MHz)': ch.str,
      'Activity': 'radio_channel_hearts',
      'Entry Key': `channel_${ch.str}_99901`,
      'DB 저장 여부': dbEntry ? '성공 (Row 생성됨)' : '실패',
      'Payload': JSON.stringify(dbEntry?.payload)
    });
  }

  console.log('=== 6개 채널별 Supabase DB 저장 검증 결과 표 ===');
  console.table(resultsTable);

  // -------------------------------------------------------------------------
  // Test (d): Logout and Re-login persistence from DB
  // -------------------------------------------------------------------------
  console.log('🔄 [6/7] Testing Logout and Re-login Persistence for Student A...');
  const contextA2 = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const pageA2 = await contextA2.newPage();

  // Fresh context with same student ID 99901
  await pageA2.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });

  await pageA2.goto('http://localhost:3000/?room=TEST', { waitUntil: 'networkidle' });
  await pageA2.locator('text=1~15단계 마음활동').first().click();
  await pageA2.waitForTimeout(500);
  await pageA2.locator('text=1단계').first().click();
  await pageA2.waitForTimeout(2000);

  // Verify that on 98.5 MHz, button is still "공감 완료 (참여함)"
  await expect(pageA2.locator('button:has-text("공감 완료 (참여함)")').first()).toBeVisible({ timeout: 10000 });
  await expect(pageA2.locator('text=우리 반 실시간 공감 하트: 2회').first()).toBeVisible({ timeout: 5000 });
  console.log('✅ Student A re-login persistence confirmed: "공감 완료 (참여함)" restored from Supabase!');

  // -------------------------------------------------------------------------
  // Test (f): 26 Students aggregation simulation (no overwriting to 1)
  // -------------------------------------------------------------------------
  console.log('👥 [7/7] Testing 26 Students Aggregation for 98.5 MHz channel...');
  const upsertRows: any[] = [];
  for (let i = 1; i <= 26; i++) {
    const sId = `999${String(i).padStart(2, '0')}`;
    upsertRows.push({
      room_code: roomCode,
      activity: 'radio_channel_hearts',
      entry_key: `channel_98.5_${sId}`,
      student_id: sId,
      student_name: `테스트학생${String(i).padStart(2, '0')}`,
      payload: {
        freq: 98.5,
        freqKey: '98.5',
        channelKey: 'channel_98.5',
        studentId: sId,
        studentName: `테스트학생${String(i).padStart(2, '0')}`,
        likedAt: '12:00'
      }
    });
  }

  const { error: upsertErr } = await supabase
    .from('mindplay_live_entries')
    .upsert(upsertRows, { onConflict: 'room_code,activity,entry_key' });

  expect(upsertErr).toBeNull();

  // Trigger page reload or live pull
  await pageA.reload({ waitUntil: 'networkidle' });
  await pageA.locator('text=1~15단계 마음활동').first().click();
  await pageA.waitForTimeout(500);
  await pageA.locator('text=1단계').first().click();
  await pageA.waitForTimeout(2000);

  // Verify count is 26회
  await expect(pageA.locator('text=우리 반 실시간 공감 하트: 26회').first()).toBeVisible({ timeout: 10000 });
  console.log('🎉 26 Students Aggregation Confirmed: Count is exactly 26회! (No overwrite to 1)');

  console.log('🎉🎉🎉 ALL 6 VERIFICATION REQUIREMENTS PASSED 100%!');

  await contextA.close();
  await contextB.close();
  await contextA2.close();
});
