import { FullConfig } from '@playwright/test';
const AdmZip = require("adm-zip");

async function zipglobal(config: FullConfig) {

  console.log("Report path" + config.rootDir);

  const reportPath = config.rootDir + "\\playwright-report";
  console.log("Report path:" + reportPath);

  var zip = new AdmZip();
  zip.addLocalFolder(reportPath, "./Testreports");
  zip.writeZip("./Testreports.zip");
}

export default zipglobal;