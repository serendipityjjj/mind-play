import { test, expect } from '@playwright/test';

test('debug heart text', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('mindplay_user', JSON.stringify({ studentId: '99901', name: '테스트학생01', isTest: true }));
    window.localStorage.setItem('mindplay_room_code', 'TEST');
  });
  await page.goto('http://localhost:3000/?room=TEST');
  await page.locator('text=1~15단계 마음활동').first().click();
  await page.locator('text=1단계').first().click();
  await page.waitForTimeout(1000);

  const beforeText = await page.locator('text=우리 반 실시간 공감 하트').first().innerText();
  console.log('BEFORE CLICK TEXT:', beforeText);

  await page.locator('button:has-text("이 사연에 폭풍 공감 보내기")').first().click();
  await page.waitForTimeout(2000);

  const afterText = await page.locator('text=우리 반 실시간 공감 하트').first().innerText();
  console.log('AFTER CLICK TEXT:', afterText);
});
