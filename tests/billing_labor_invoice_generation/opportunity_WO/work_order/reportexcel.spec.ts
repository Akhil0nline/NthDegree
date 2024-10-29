import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let opportunityNumber = 'O-223999';
import * as XLSX from 'xlsx';


 
test('Verify export Job Comments Report', async ({ page }, testInfo) => {

  
    const org_path = "JobCommentExcel-20241025035823583.xlsx.xlsx";
    const orginalExcelData = readExcel(org_path);

    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.locator("(//div[contains(@class,'ms-Checkbox is-enabled')])[2]").click();
    await page.locator("//span[normalize-space(text())='Report']").click();
    await page.waitForTimeout(8000);
    await page.click('button[aria-label="Opportunity Job Comment Report"]');
    await page.waitForTimeout(2000);
    const [newTab] = await Promise.all([
      page.waitForEvent('popup'),
    ]);
    await newTab.waitForTimeout(2000);
    const excelButton = newTab.locator('#btn-excel');
    await excelButton.click();          
    await newTab.waitForTimeout(2000);
    const [download] = await Promise.all([
      newTab.waitForEvent('download'),
      excelButton.click()            
  ]);
 
  const path = download.suggestedFilename();
    await download.saveAs(path);
    // attach the downloaded file to the report
    await testInfo.attach('downloaded', { path: path });

    // read the data and convert to json format
    const fromDownloadedFile = readExcel(path);
    expect(orginalExcelData).toStrictEqual(fromDownloadedFile)
    
});

function readExcel(path: string) {
  const workbook = XLSX.readFile(path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonSheet = XLSX.utils.sheet_to_json(sheet);
  console.log(jsonSheet);
  return jsonSheet;
}