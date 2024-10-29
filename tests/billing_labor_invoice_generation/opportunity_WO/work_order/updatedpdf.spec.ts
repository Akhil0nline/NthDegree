import test, { expect } from "@playwright/test";
import { NavigationPage } from "../../../../page_objects/navigationPage";
import * as fs from 'fs';
import pdfParse from 'pdf-parse';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let opportunityNumber = 'O-223999';

test('Verify export Job Comments Report', async ({ page }, testInfo) => {
  
  const org_path = "JobComment-Report4b615700-5ab1-4e5f-a93b-8b1e4ea8eec5.pdf";
  
  const orginalPdfData = await readPDF(org_path);  // Await here to ensure data is returned properly

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

  const pdfButton = newTab.locator('#btn-pdf');
  await pdfButton.click();
  await newTab.waitForTimeout(2000);
  
  const [pdfDownload] = await Promise.all([
    newTab.waitForEvent('download'),
    pdfButton.click()
  ]);

  const pdfPath = pdfDownload.suggestedFilename();
  await pdfDownload.saveAs(pdfPath);
  await testInfo.attach('downloaded', { path: pdfPath });
  
  const fromDownloadedFile = await readPDF(pdfPath);  // Await here too
  expect(orginalPdfData).toStrictEqual(fromDownloadedFile);

  if (fromDownloadedFile) {
    console.log("Job Comments", fromDownloadedFile);
  } else {
    console.error("Failed to read PDF data or 'text' property is missing.");
  }
});

async function readPDF(path: string) {
  try {
    const dataBuffer = fs.readFileSync(path);
    const data = await pdfParse(dataBuffer); // Await the pdfParse function
    console.log("PDF Text:", data.text);  // Logs the extracted text content of the PDF
    return data.text;
  } catch (error) {
    console.error("Error reading PDF:", error);
    return null;
  }
}
