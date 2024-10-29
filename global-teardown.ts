import { chromium } from '@playwright/test';
import logout from './helper/logout';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalTeardown() {

	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await logout(page);
	console.log("Teardown Playwright Test Environment.");
	try {;
    await context.tracing.start({ screenshots: true, snapshots: true });
    //await cleanUpFunc(page);
  } catch (e) {
    console.log(`Error in globalTeardown: ${e}`);
  } finally {
    await browser.close();
  }
  browser.close();
}

export default globalTeardown;