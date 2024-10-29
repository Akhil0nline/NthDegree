import test, { expect } from "@playwright/test";
import { NavigationPage } from "../../../../page_objects/navigationPage";
import * as fs from 'fs';
import pdfParse from 'pdf-parse';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let opportunityNumber = 'O-223999';

test('Verify export Job Comments Report', async ({ page }, testInfo) => {
  
  const org_path = "JobComment-Report13a99164-15a3-4a75-9780-9aae4d90b52e.pdf";
  const orginalPdfData = readPDF(org_path);

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
  // Verify the downloaded PDF report
  const pdfButton = newTab.locator('#btn-pdf'); // Assuming this is the locator for the PDF button
  await pdfButton.click();
  await newTab.waitForTimeout(2000);
  const [pdfDownload] = await Promise.all([
    newTab.waitForEvent('download'),
    pdfButton.click()
  ]);


          
  const pdfPath = pdfDownload.suggestedFilename();
  await pdfDownload.saveAs(pdfPath);
  await testInfo.attach('downloaded', { path: pdfPath });
  const fromDownloadedFile = readPDF(pdfPath);
  expect(orginalPdfData).toStrictEqual(fromDownloadedFile)
  // Parse and verify PDF content
  const pdfData = await readPDF(pdfPath);
  //console.log("Job Comments", pdfData.text); // You can add specific PDF verification logic here
  if (pdfData && pdfData.text) {
    console.log("Job Comments", pdfData.text); // You can add specific PDF verification logic here
  } else {
    console.error("Failed to read PDF data or 'text' property is missing.");
  }
  //const path = download.suggestedFilename();
    //await download.saveAs(path);
    // attach the downloaded file to the report
    //await testInfo.attach('downloaded', { path: path });

    // read the data and convert to json format
   
});


// function readPdf(path: string) {
//   const dataBuffer = fs.readFileSync(path);
//   return pdfParse(dataBuffer);
// }

function readPDF(path: string) {
  const dataBuffer = fs.readFileSync(path);
  try {
    const data =  pdfParse(dataBuffer);
    console.log(data.text);  // Logs the extracted text content of the PDF
    return data.text;
  } catch (error) {
    console.error("Error reading PDF:", error);
    return dataBuffer;
  }
}