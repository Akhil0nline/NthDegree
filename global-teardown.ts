import { chromium, FullConfig } from '@playwright/test';
import logout from './helper/logout';
import * as dotenv from 'dotenv';
const AdmZip = require("adm-zip");
dotenv.config();

async function globalTeardown(config: FullConfig) {

  

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

  console.log("Report path" + config.rootDir);

  const reportPath = config.rootDir + "//report";
  console.log("Report path:" + reportPath);

  var zip = new AdmZip();
  zip.addLocalFolder(reportPath, "./report");
  zip.writeZip("./report.zip");

}

export default globalTeardown;