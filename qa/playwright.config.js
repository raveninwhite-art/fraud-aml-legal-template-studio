const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', timeout: 30000, expect: {timeout: 2500},
  fullyParallel: false, workers: 1, retries: 0,
  reporter: [['line'], ['./scripts/qa-reporter.js']],
  use: {headless: true, viewport: {width: 1440, height: 1000},
    launchOptions: process.env.QA_CHROMIUM_PATH ? {
      executablePath: process.env.QA_CHROMIUM_PATH,
      args: ['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
    } : {}
  }
});
