
const { test, expect } = require('@playwright/test');

test('例稿整合器：首頁基本載入測試', async ({ page }) => {
  // 開啟本次測試的網頁
  const response = await page.goto('/');

  // 確認網頁伺服器正常回應
  expect(response.ok()).toBeTruthy();

  // 確認網頁主要內容可以顯示
  await expect(page.locator('body')).toBeVisible();

  // 確認 HTML 主體不是空的
  await expect(page.locator('body')).not.toBeEmpty();
});
