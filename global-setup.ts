import { chromium, FullConfig } from '@playwright/test';
import login from './helper/login'
import * as dotenv from 'dotenv';
dotenv.config();

const authFile ='.auth/user.json';
const username = process.env.DYN365_USER_NAME ?? '';
const password = process.env.DYN365_PASSWORD ?? '';
const baseURL = process.env.DYN365_BaseURL ?? '';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';

async function globalSetup(config) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await login(page, baseURL, username, password, orgURL);
  await page.context().storageState({
    path: authFile,
  });
  await browser.close();
}

export default globalSetup;