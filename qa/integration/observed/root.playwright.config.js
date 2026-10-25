
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // 每個測試最多執行 30 秒
  timeout: 30000,

  // GitHub Actions 環境中，失敗後再試一次
  retries: process.env.CI ? 1 : 0,

  // CI 中避免多個測試互相干擾
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'http://127.0.0.1:3000',

    // 測試失敗時留下截圖
    screenshot: 'only-on-failure',

    // 失敗後留下操作紀錄
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  // 自動啟動本機網頁伺服器
  webServer: {
    command: 'npx http-server . -p 3000 -a 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  }
});

