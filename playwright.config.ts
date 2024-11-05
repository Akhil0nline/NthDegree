import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
require('dotenv').config();

const reportConfig: OrtoniReportConfig = {
  folderPath: "report",
  filename: "index.html",
  logo: "logo.png",
  title: "Ortoni Test Report",
  projectName: "Ortoni-Report",
  testType: "Release - Oct 21, 2024",
  authorName: "Akhil",
  preferredTheme: "dark",
  base64Image: false,
};

const config: PlaywrightTestConfig = defineConfig({
  
  timeout: 5 * 60 * 1000,
  globalTimeout: 500000,
  expect:{
    timeout:2 * 60 * 1000
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only, in CI if it fails rerun 2 times otherwise no rerun */
  retries: process.env.CI ? 2 : 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 :1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['html'],
    ["ortoni-report", reportConfig],
    ['list'],
    ['junit', {outputFile: 'results.xml'}],
    ['json', {outputFile: 'results.json'}],
    ['allure-playwright']
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  
  use: {
    screenshot: 'on',  // options: 'on', 'off', 'only-on-failure'
    video: 'on',  // options: 'on', 'off', 'retain-on-failure'
    actionTimeout:0,
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: process.env.DYN365_BaseURL,
    //viewport:null,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',  //or we can make it on
    launchOptions: {
      // 1
      args: ["--start-maximized"],

      
    },
    

    headless: false,
    navigationTimeout: 10000,
  },
    globalSetup: require.resolve('./global-setup.ts'),
    globalTeardown: require.resolve('./global-teardown.ts'), 

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup', testMatch: 'auth.setup.ts'
    },
    
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: {width:1920, height: 1080},
        headless:true,
        storageState: '.auth/user.json'
       },
        dependencies: ['setup'], 
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], 
        storageState: '.auth/user.json' 
       },
       dependencies: ['setup'], 
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'],
    // storageState: '.auth/user.json' 
    //   },
    // dependencies: ['setup'], 
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    //},

    /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  ],
});

export default config;