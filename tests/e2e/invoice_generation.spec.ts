import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let opportunityNumber: string;
let travelRequestNumber : string;
let targetCompany : string = "Milliporesigma";
let workOrderNumber: string;
let frame;

test.describe('suite 1', () => {  
    let navigateTo: NavigationPage;
test.beforeEach(async ({page}) => 
    {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    navigateTo = new NavigationPage(page);
    });

//test 1
    test('Create a brand-new opportunity', async({page}) => 
{    
    await navigateTo.opportunitiesPage();
    await page.locator('button:has-text("New")').click();
    await page.getByLabel('Division').click();
    await page.getByRole('option', { name: 'Nth Domestic I&D' }).click();
    await page.getByLabel('Opportunity Type').click();
    await page.getByRole('option', { name: 'New Project with CC', exact: true }).click();
    await page.getByLabel('Billing Customer, Lookup').first().click();
    await page.getByLabel('Billing Customer, Lookup').first().fill(targetCompany);
    await page.getByText(targetCompany).first().click();
    await page.getByLabel("Search records for Source Customer, Lookup field").click();
    await page.getByPlaceholder('Look for Source Customer').first().fill(targetCompany);
    await page.waitForTimeout(3000);
    await page.getByText(targetCompany).nth(2).first().click();
    await page.getByLabel('Source Contact, Lookup').first().click();
    await page.getByLabel('Source Contact, Lookup').first().fill("Elaine Fitzpatrick");
    await page.waitForTimeout(3000);
    await page.getByText("Elaine Fitzpatrick").first().click();
    await expect (page.getByText('Desk Phone')).toBeVisible();
    await expect (page.getByText('Mobile Phone')).toBeVisible();
    await page.getByLabel("Show, Lookup").first().click();
    await page.getByLabel("Show, Lookup").first().fill("Pittcon 2025");
    await page.waitForTimeout(3000);
    await page.getByLabel('Dropdown panel').getByText("Pittcon 2025", { exact: true }).click();
    console.log("Show has been selected")
    await page.getByLabel('Exhibitor, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for Exhibitor').fill('Bed Bug Pajamas');
    await page.getByText('Bed Bug Pajamas').click();                                                           
    await page.getByLabel("Search records for Bill To Contact, Lookup field").click();
    await page.getByPlaceholder('Look for Bill To Contact').fill("Elaine Fitzpatrick");
    await page.getByLabel('Dropdown panel').getByText("Elaine Fitzpatrick", { exact: true }).click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Prepay Contact, Lookup').first().click();
    await page.getByLabel('Prepay Contact, Lookup').first().fill('Zeliha QA Bill Contact');
    await page.waitForTimeout(3000);
    await page.getByLabel('Dropdown panel').getByText("Zeliha QA Bill Contact", { exact: true }).click();
    await page.getByLabel('Install Supervisor Company, Lookup').first().click();
    await page.getByLabel('Install Supervisor Company, Lookup').first().fill('Elevation3D');
    await page.waitForTimeout(3000);
    await page.getByText('Elevation3D').last().click();
    await page.getByLabel('Booth Number').click();
    await page.getByLabel('Booth Number').fill('QA Automation - Trial X');
    await page.getByLabel('Date of Install Start').click();
    await page.getByLabel('Date of Install Start').fill('2/26/2025');
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    await page.getByLabel('Date of Install End', { exact: true }).first().click();
    await page.getByLabel('Date of Install End', { exact: true }).first().fill('2/28/2025');
    await page.waitForTimeout(3000);
    await page.getByLabel('Install Resources').first().click();
    await page.getByPlaceholder('Provide a number').first().dblclick();
    await page.getByPlaceholder('Provide a number').first().fill('4');
    await page.waitForTimeout(3000);
    await page.getByLabel("Delete Elevation3D").last().click();
    await page.getByLabel('Dismantle Supervisor Company, Lookup').first().click();
    await page.getByLabel('Dismantle Supervisor Company, Lookup').first().fill('Nth Degree');
    await page.waitForTimeout(3000);
    await page.getByLabel('Nth Degree', { exact: true }).getByText('Nth Degree').first().click();
    await page.getByLabel('Date of Dismantle Start').first().fill('3/5/2025');
    await page.waitForTimeout(3000);
    await page.getByLabel('Date of Dismantle End').first().fill('3/7/2025');
    await page.waitForTimeout(3000);
    await page.getByLabel('Time of Dismantle Start', { exact: true }).click();
    await page.getByLabel('Time of Dismantle Start', { exact: true }).fill('4:30 PM');
    await page.getByLabel('Time of Dismantle Start', { exact: true }).press('Enter');
    await page.waitForTimeout(5000);
    expect((await page.locator('div[data-id="ShowInfo.nth_showmanagement.fieldControl-LookupResultsDropdown_nth_showmanagement_selected_tag_text"]').innerText())).toContain('Pittcon');
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(20000);
    const duplicateLocator = page.getByLabel('Duplicate records found').last();
    const isDuplicateFound = await duplicateLocator.count() > 0;
    if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(20000);
    }
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    expect(opportunityNumber).toContain("O");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    console.log(`Opportunity Number: ${opportunityNumber}`);
    console.log("Brand-new Opportunity has been SAVED!!!");

});
//test 2
test('DR creation from an existing opportunity', async ({page}) => 
{
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.getByLabel("Daily Requirements").first().click();
    frame = page.frameLocator('[title="Generate Daily Requirements"]');
    await frame.getByText('Generate DR').click();
    await page.waitForTimeout(3 * 3000);
    await expect(page.locator('div[data-id="cell-0-5"]')).toHaveText('2/26/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-0-6"]')).toHaveText('2/26/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-1-5"]')).toHaveText('2/27/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-1-6"]')).toHaveText('2/27/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-2-5"]')).toHaveText('2/28/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-2-6"]')).toHaveText('2/28/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-3-5"]')).toHaveText('3/5/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-3-6"]')).toHaveText('3/6/2025 1:00 AM');
    await expect(page.locator('div[data-id="cell-4-5"]')).toHaveText('3/6/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-4-6"]')).toHaveText('3/6/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-0-7"]')).toHaveText('4');
    await page.locator('div[data-id="cell-0-7"]').click();
    await page.locator('input[wj-part="input"]').clear();
    await page.locator('input[wj-part="input"]').fill('2');
    await page.waitForTimeout(2000);
    await page.getByText('Save').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-0-7"]')).toHaveText('2');
    console.log("Install Resource has been updated to 2");
    await expect(page.locator('div[data-id="cell-3-7"]')).toHaveText('4');
    await page.locator('div[data-id="cell-3-7"]').click();
    await page.locator('input[wj-part="input"]').clear();
    await page.locator('input[wj-part="input"]').fill('5');
    await page.waitForTimeout(2000);
    await page.getByText('Save').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-3-7"]')).toHaveText('5');
    console.log("Dismantle Resource has been updated to 5");
    await expect(page.locator('div[data-id="cell-3-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-3-9"]')).toHaveText('Yes');
    await page.locator('div[data-id="cell-3-10"]').click();
    await page.locator('input[wj-part="input"]').first().clear();
    await page.locator('input[wj-part="input"]').first().fill('4.0');
    await page.waitForTimeout(2000);
    await page.getByText('Save').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-3-9"]')).toHaveText('No');
    await expect(page.locator('div[data-id="cell-3-10"]')).toHaveText('4.0');
    console.log("Dismantle Resource hours has been updated to 4");
    frame = page.frameLocator('[title="Refresh Rollup"]');
    await frame.getByText('Refresh Rollup').click();
    await page.waitForTimeout(3 * 1000);

});
//Test 3
test('Adding new DRs to existing one', async({page}) => {

    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.getByLabel("Daily Requirements").first().click();
    await expect(page.getByLabel('New Daily Requirement. Add New Daily Requirement')).toBeVisible();
    await page.getByLabel('New Daily Requirement. Add New Daily Requirement').click();
    const opportunityNumberDR = await page.locator('div[data-id="nth_opportunity.fieldControl-LookupResultsDropdown_nth_opportunity_selected_tag"]').innerText();
    expect(opportunityNumber).toEqual(opportunityNumberDR);
    await page.getByLabel('Date of Start').first().fill('2/26/2025');
    await page.waitForTimeout(2000);
    await page.getByLabel('Resources').first().fill('2');
    await page.waitForTimeout(2000);
    await page.getByLabel('Hours Per Resource').first().fill('5');
    await page.waitForTimeout(2000);
    await page.locator('button:has-text("Save & Close")').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-1-7"]')).toHaveText('2');
    await expect(page.locator('div[data-id="cell-1-10"]')).toHaveText('5.0');
    await expect(page.locator('div[data-id="cell-1-5"]')).toHaveText('2/26/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-1-6"]')).toHaveText('2/26/2025 1:00 PM');
    await page.getByLabel('New Daily Requirement. Add New Daily Requirement').click();
    expect(opportunityNumber).toEqual(opportunityNumberDR);
    await page.locator('button:has-text("Save & Close")').first().click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Date of Start').first().fill('2/26/2025');
    await page.getByLabel('Resources').first().fill('1');
    await page.getByLabel('Time of Start').first().fill('7:00 AM');
    await page.getByLabel('Time of Start', { exact: true }).first().press('Enter');+
    await page.getByLabel('Hours Per Resource').first().fill('4');
    await page.waitForTimeout(3 * 1000);
    await page.locator('button:has-text("Save & Close")').first().click();
    await page.waitForTimeout(3000);
    console.log("New DR has been successfully created")
    await expect(page.locator('div[data-id="cell-0-10"]')).toHaveText('4.0');
    await expect(page.locator('div[data-id="cell-0-7"]')).toHaveText('1');
    await expect(page.locator('div[data-id="cell-0-5"]')).toHaveText('2/26/2025 7:00 AM');
    await expect(page.locator('div[data-id="cell-1-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-1-7"]')).toHaveText('2');
    await expect(page.locator('div[data-id="cell-1-5"]')).toHaveText('2/26/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-2-10"]')).toHaveText('5.0');
    await expect(page.locator('div[data-id="cell-2-7"]')).toHaveText('2');
    await expect(page.locator('div[data-id="cell-2-5"]')).toHaveText('2/26/2025 8:00 AM');
});
//test 4
test ('Creating a new Lead/Travel Request', async({page}) =>
{
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);  //
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await expect(page.getByText('Topic')).toBeVisible();
    await page.getByLabel("Lead/Travel Requests").last().click();
    await page.getByText('New Lead/Travel Request').click();
    await page.getByLabel('Resource, Lookup').first().click();
    await page.getByLabel('Resource, Lookup').first().fill('MLADEN P PENEV');
    await page.waitForTimeout(3 * 1000);
    await page.getByText('MLADEN P PENEV').first().click();
    await expect(page.getByText('Orlando').first()).toBeVisible();
    await page.getByLabel("Requester").first().click();
    await page.getByText('Customer').first().click();
    await page.getByLabel("Expense Type").first().click();
    await page.getByText('Package - Fixed').first().click();
    await page.getByLabel('Fixed Value').first().fill('5000');
    await expect(page.getByLabel('Date of Travel In Date')).toBeVisible();
    await expect(page.getByLabel('Date of Travel Out Date')).toBeVisible();
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(3000);
    frame = page.frameLocator('[title="submittravelrequest"]');
    await frame.getByText("Submit").click();
    await page.waitForTimeout(3000);


    travelRequestNumber = await page.locator('h1[data-id="header_title"]').innerText();
    travelRequestNumber = travelRequestNumber.replace('- Saved', '');
    console.log("Travel Request Number is " + travelRequestNumber);

});
//test 5
test('Lead/ Travel Request Approval', async({page}) => 
{
    await navigateTo.leadTravelRequestPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(travelRequestNumber);  //travelRequestNumber
    await page.keyboard.press("Enter");
    console.log(await page.locator("div[col-id='nth_travelnumber']").last().innerText());
    await page.locator("div[col-id='nth_travelnumber']").last().click();
    await expect(page.locator('button:has-text("Delete")')).toBeVisible();
    await expect(page.locator('button:has-text("WIP")')).toBeVisible();
    await expect(page.locator('button:has-text("Approve Request")')).toBeVisible();
    const baseCity = await page.locator("div[data-id = 'BaseCity.nth_basecity.fieldControl-LookupResultsDropdown_nth_basecity_selected_tag_text']").last().innerText();
    expect(baseCity).toBe("Orlando");
    await page.locator('button:has-text("Approve Request")').click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    await expect(page.locator('button[data-id="dialogCloseIconButton"]')).toBeVisible();
    await expect(page.getByTitle("OK")).toBeVisible();
    await expect(page.getByTitle("Cancel").last()).toBeVisible();
    await page.getByTitle("OK").click();
    await page.waitForTimeout(2000);
    expect(await page.locator("div[data-id = 'alertdialog']")).toBeVisible();
    expect(await page.locator("span[data-id = 'dialogMessageText']")).toContainText("Approved");
    await expect(page.locator('button:has-text("Ok")')).toBeVisible();
    await page.getByTitle("Ok").click();
    console.log('TRAVEL Request has been APPROVED!!!!');


});
//test 6
test('Billing Selection', async({page}) => 
{
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);  //opportunityNumber
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.waitForTimeout(2000);
    await page.getByLabel('Daily Requirements').first().click();
    await page.waitForTimeout(3000);
    var totalSTDtime = Number(await page.locator("input[data-id='nth_standardtime.fieldControl-decimal-number-text-input']").inputValue());
    console.log("total std time is " + totalSTDtime);
    var totalOTtime = Number(await page.locator("input[data-id='nth_overtime.fieldControl-decimal-number-text-input']").inputValue());
    console.log("total over time is " + totalOTtime);
    var totalDoubletime = Number(await page.locator("input[data-id='nth_doubletime.fieldControl-decimal-number-text-input']").inputValue());
    console.log("total double time is " + totalDoubletime);    
    await page.getByLabel('Billing').first().click();
    await page.waitForTimeout(3000);
    // await page.getByLabel('Billing Rate List, Lookup').first().click();
    // await page.getByLabel('Billing Rate List, Lookup').first().fill("BRS-2024 Boston");
    // await page.waitForTimeout(2000);
    // await page.getByText("BRS-2024 Boston").first().click();
    // await page.waitForTimeout(3000);
    const bills: number[] = []; 
    let STBill: string = await page.locator("input[data-id='nth_systemstandardtimerate.fieldControl-currency-text-input']").inputValue();
    STBill = STBill.replace('$', '');
    console.log("ST Billing Rate is " + STBill);
    bills.push(Number(STBill));     
    let OTBill: string = await page.locator("input[data-id='nth_systemovertimerate.fieldControl-currency-text-input']").inputValue();
    OTBill = OTBill.replace('$', '');
    console.log("OT Billing Rate is " + OTBill);
    bills.push(Number(OTBill));    
    let DTBill: string = await page.locator("input[data-id='nth_systemdoubletimerate.fieldControl-currency-text-input']").inputValue();
    DTBill = DTBill.replace('$', '');
    console.log("DT Billing Rate is " + DTBill);
    bills.push(Number(DTBill)); 
    console.log("Billing Rates Array: ", bills);
    var discountPercentage = Number(await page.locator("input[data-id='nth_discountpercentage.fieldControl-decimal-number-text-input']").inputValue());
    console.log("Discount Percentage is: "+ discountPercentage);
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(3000);

});
//test 7
    test('Populate Opportunity Products and Activating the Estimate', async({page}) => {
    
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);  //opportunityNumber
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.waitForTimeout(2000);
    await page.getByLabel('Products').last().click();
    await page.waitForTimeout(1000);
    const expensePackageExists = await page.locator('text=Expense Package - Fixed').count() > 0;
    if (expensePackageExists) {
        await page.getByText('Refresh').first().click();
    } else {
        const frame = page.frameLocator('[title="Populate Opportunity Products"]');
        await frame.getByText('Populate Opportunity Products').click();
        await page.waitForTimeout(3 * 3000);
    }
    let totalProductsBillExpected = 0;
    let totalProductsBillActual = 0;
    for (let i = 0; i < 9; i++) { 
        const quantity: number = Number(await page.locator(`div[data-id='cell-${i}-7']`).first().innerText());
        const unit: string = await page.locator(`div[data-id='cell-${i}-8']`).first().innerText();
        const unitAmount: number = Number(unit.replace(/[$,]/g, ''));
        const amountActual: number = quantity * unitAmount;
        const expectedwithSigns: string = await page.locator(`div[data-id='cell-${i}-10']`).first().innerText();
        const amountExpected: number = Number(expectedwithSigns.replace(/[$,]/g, ''));
        totalProductsBillActual += amountActual;
        totalProductsBillExpected += amountExpected;
        expect(totalProductsBillActual).toBe(totalProductsBillExpected);
    }
    console.log("Total Products Bill Expected: " + totalProductsBillExpected);
    console.log("Total Products Bill Actual: " + totalProductsBillActual);
    expect(totalProductsBillActual).toBe(totalProductsBillExpected);

    let amounts: number[] = [];
    let totalServicesBillExpected = 0;
    let totalServicesBillActual = 0;
    for (let i = 0; i < 9; i++) 
        {
        var quantity: number = Number(await page.locator(`div[data-id='cell-${i}-7']`).last().innerText());
        var unit: string = await page.locator(`div[data-id='cell-${i}-8']`).last().innerText();
        var unitAmount: number = Number(unit.replace("$", ""));
        var amountActual: number = quantity * unitAmount;
        const expectedwithSigns: string = await page.locator(`div[data-id='cell-${i}-10']`).last().innerText();
        const amountExpected: number = Number(expectedwithSigns.replace(/[$,]/g, ''));
        amounts.push(amountActual);
        totalServicesBillActual += amountActual;;
        totalServicesBillExpected += amountExpected;
        }
    console.log("Total Services Bill Expected: " + totalServicesBillExpected);
    console.log("Total Services Bill Actual: " + totalServicesBillActual);
    expect(totalServicesBillActual).toBe(totalServicesBillExpected);
    var estimatedActualTotal: number = totalServicesBillActual + totalProductsBillActual;
    var estimatedExpectedTotal: number = totalServicesBillExpected + totalProductsBillExpected;
    console.log(estimatedActualTotal == estimatedExpectedTotal)
    expect(estimatedExpectedTotal).toBe(estimatedActualTotal);
    console.log("Estimated Total Actual: " + estimatedActualTotal);
    console.log("Estimated Total Expected: " + estimatedExpectedTotal);
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    console.log("Opportunity Number: " + opportunityNumber);
    await page.getByLabel('Estimates').first().click();
    await page.waitForTimeout(3000);
    const estimatePageTotalSigns = await page.locator("input[data-id='totalamount.fieldControl-currency-text-input']").inputValue();
    const estimatePageTotal = Number(estimatePageTotalSigns.replace(/[$,]/g, ''));
    expect(estimatedActualTotal).toEqual(estimatedExpectedTotal);
    expect(await page.getByLabel("Estimate Type").innerText()).toEqual("Estimate");
    await page.locator('button:has-text("New Estimate")').click();
    const errorLocator = page.getByTitle('Unable to save changes');
    const isErrorPresent = await errorLocator.count() > 0;
    if (isErrorPresent) {
    await page.getByTitle('OK').click();
    await page.getByLabel('Estimate Source').click();
    await page.getByRole('option', { name: 'Customer' }).click();
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000); // Wait for 5 seconds
    await page.locator('button:has-text("New Estimate")').click();
    const duplicateLocator = page.getByLabel('Duplicate records found').last();
    const isDuplicateFound = await duplicateLocator.count() > 0;
        if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(20000);
                             }
    await page.waitForTimeout(20000);
    }
    await page.waitForTimeout(20000);
    const detailAmount$ = await page.locator("input[data-id='totallineitemamount.fieldControl-currency-text-input']").inputValue();    
    const detailAmount = Number(detailAmount$.replace(/[$,]/g, ''));
    expect(estimatePageTotal).toEqual(detailAmount);
    const totalAmount$ = await page.locator("input[data-id='totalamount.fieldControl-currency-text-input']").inputValue();    
    const totalAmount = Number(totalAmount$.replace(/[$,]/g, ''));
    expect(estimatePageTotal).toEqual(totalAmount);
    const estimateNumber = await page.locator("h1[data-id='header_title']").innerText();
    expect (estimateNumber).toContain("E"); /////
    var opportunityNumberEstimate = await page.locator("div[data-id='opportunityid.fieldControl-LookupResultsDropdown_opportunityid_selected_tag_text']").innerText();    
    expect(opportunityNumberEstimate).toEqual(opportunityNumber);
    console.log("Estimate No: " + estimateNumber);
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(3000);
    frame = page.frameLocator('[title="CalculateTaxEstimateHTML"]');
    await frame.getByText('Calculate Tax').click();
    await page.waitForTimeout(8000);
    await page.locator('button:has-text("Activate Estimate")').click();
    await page.waitForTimeout(12000);
    const warningNotification = await page.locator("span[data-id='warningNotification']").textContent();
    expect(warningNotification).toBe("Read-only  This record’s status: Active");
    const potentialCustomer = await page.locator("div[data-id='customerid.fieldControl-LookupResultsDropdown_customerid_selected_tag']").textContent();
    expect(potentialCustomer).toBe(targetCompany);
    expect(opportunityNumber).toBeTruthy();
    await page.getByLabel('Press Enter to go back.').first().click();
    await page.getByLabel('Estimate Source').click();
    await page.getByRole('option', { name: 'Customer' }).click();
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    await page.getByLabel('Summary').click();
    await page.waitForTimeout(5000);
    await page.getByLabel('Convert to Work Order').click();
    await page.waitForTimeout(5000);
    await expect(page.getByText('Minimum one Active Estimate is required for converting Opportunity to Work Order.')).toBeVisible();
    await page.getByTitle("OK").last().click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    await expect(page.locator('button[data-id="dialogCloseIconButton"]')).toBeVisible();
    await expect(page.getByTitle("OK")).toBeVisible();
    await page.waitForTimeout(5000);
    // await expect(page.getByLabel('Opportunity Conversion Completed').first()).toBeVisible();
    await expect(page.locator('button[data-id="dialogCloseIconButton"]')).toBeVisible();
    await expect(page.getByTitle("OK")).toBeVisible();
    await expect(page.getByTitle("Cancel")).toBeVisible();
    await page.getByTitle("OK").click();
    await expect(page.getByLabel('Leave this page?').first()).toBeVisible();
    await expect(page.locator('button[data-id="dialogCloseIconButton"]')).toBeVisible();
    await expect(page.getByTitle("OK")).toBeVisible();
    await expect(page.getByTitle("Cancel")).toBeVisible();
    await page.getByTitle("OK").click();
    await page.waitForTimeout(5000);
    workOrderNumber = await page.locator("h1[data-id='header_title']").innerText();
    expect (workOrderNumber).toContain("W");
    workOrderNumber = workOrderNumber.replace('- Saved', '');
    console.log("Work Order Number: " + workOrderNumber);
    console.log ("Brand-new WORK ORDER has been SAVED!!!")

});
//test 8
test('Changing some Values on Work Order', async({page}) => {
    
    await navigateTo.workOrdersPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(workOrderNumber);   //workOrderNumber
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.getByLabel('Daily Requirements').first().click();
    await expect(page.locator('div[data-id="cell-0-5"]')).toHaveText('2/26/2025 7:00 AM');
    await expect(page.locator('div[data-id="cell-0-6"]')).toHaveText('2/26/2025 11:00 AM');
    await expect(page.locator('div[data-id="cell-0-7"]')).toHaveText('1');
    await expect(page.locator('div[data-id="cell-0-9"]')).toHaveText('No');
    await expect(page.locator('div[data-id="cell-0-10"]')).toHaveText('4.0');
    await expect(page.locator('div[data-id="cell-1-5"]')).toHaveText('2/26/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-1-6"]')).toHaveText('2/26/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-1-7"]')).toHaveText('2');
    await expect(page.locator('div[data-id="cell-1-9"]')).toHaveText('Yes');
    await expect(page.locator('div[data-id="cell-1-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-2-5"]')).toHaveText('2/26/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-2-6"]')).toHaveText('2/26/2025 1:00 PM');
    await expect(page.locator('div[data-id="cell-2-7"]')).toHaveText('2');
    await expect(page.locator('div[data-id="cell-2-9"]')).toHaveText('No');
    await expect(page.locator('div[data-id="cell-2-10"]')).toHaveText('5.0');
    await expect(page.locator('div[data-id="cell-3-5"]')).toHaveText('2/27/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-3-6"]')).toHaveText('2/27/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-3-7"]')).toHaveText('4');
    await expect(page.locator('div[data-id="cell-3-9"]')).toHaveText('Yes');
    await expect(page.locator('div[data-id="cell-3-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-4-5"]')).toHaveText('2/28/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-4-6"]')).toHaveText('2/28/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-4-7"]')).toHaveText('4');
    await expect(page.locator('div[data-id="cell-4-9"]')).toHaveText('Yes');
    await expect(page.locator('div[data-id="cell-4-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-5-5"]')).toHaveText('3/5/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-5-6"]')).toHaveText('3/5/2025 8:30 PM');
    await expect(page.locator('div[data-id="cell-5-7"]')).toHaveText('5');
    await expect(page.locator('div[data-id="cell-5-9"]')).toHaveText('No');
    await expect(page.locator('div[data-id="cell-5-10"]')).toHaveText('4.0');
    await expect(page.locator('div[data-id="cell-6-5"]')).toHaveText('3/6/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-6-6"]')).toHaveText('3/6/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-6-7"]')).toHaveText('4');
    await expect(page.locator('div[data-id="cell-6-9"]')).toHaveText('Yes');
    await expect(page.locator('div[data-id="cell-6-10"]')).toHaveText('8.0');
    await expect(page.locator('div[data-id="cell-7-5"]')).toHaveText('3/7/2025 8:00 AM');
    await expect(page.locator('div[data-id="cell-7-6"]')).toHaveText('3/7/2025 4:30 PM');
    await expect(page.locator('div[data-id="cell-7-7"]')).toHaveText('4');
    await expect(page.locator('div[data-id="cell-7-9"]')).toHaveText('Yes');
    await expect(page.locator('div[data-id="cell-7-10"]')).toHaveText('8.0');
    await page.locator('div[data-id="cell-0-7"]').click();
    await page.locator('input[wj-part="input"]').clear();
    await page.locator('input[wj-part="input"]').fill('2');
    await page.waitForTimeout(2000);
    await page.getByText('Save').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-0-7"]')).toHaveText('2');
    await expect(page.getByTitle("Update").last()).toBeVisible();
    await page.getByTitle("Update").last().click(); 
    await expect(page.getByLabel('Updating RAs... Please wait...')).toBeVisible();
    await page.getByLabel('Updating RAs... Please wait...').waitFor({ state: 'hidden' });
    await page.locator('div[data-id="cell-6-10"]').click();
    await page.locator('input[wj-part="input"]').clear();
    await page.locator('input[wj-part="input"]').fill('6.0');
    await page.waitForTimeout(2000);
    await page.getByText('Save').first().click();
    await page.waitForTimeout(3000);
    await page.getByTitle("OK").last().click();
    await expect(page.locator('div[data-id="cell-6-10"]')).toHaveText('6.0');
    await expect(page.locator('div[data-id="cell-6-6"]')).toHaveText('3/6/2025 2:30 PM');
    await page.getByLabel('New Daily Requirement. Add New Daily Requirement').click();
    await page.getByLabel('Date of Start').first().fill('3/7/2025');
    await page.waitForTimeout(1000);
    await page.getByLabel('Resources').first().fill('1');
    await page.waitForTimeout(1000);
    await page.getByLabel('Hours Per Resource').first().fill('3');
    await page.waitForTimeout(1000);
    await page.getByLabel('Time of Start').last().click();
    await page.getByRole('option', { name: '9:00 PM' }).click();
    await page.locator('button:has-text("Save & Close")').first().click();
    await page.waitForTimeout(3000);
    await expect(page.locator('div[data-id="cell-8-5"]')).toHaveText('3/7/2025 9:00 PM');
    await expect(page.locator('div[data-id="cell-8-6"]')).toHaveText('3/8/2025 12:00 AM');
    await expect(page.locator('div[data-id="cell-8-7"]')).toHaveText('1');
    await expect(page.locator('div[data-id="cell-8-9"]')).toHaveText('No');
    await expect(page.locator('div[data-id="cell-8-10"]')).toHaveText('3.0');
    console.log("UPDATING the Work Order has been COMPLETED");
    

});

//test 9
test('WIP', async({page}) => {
    await navigateTo.workOrdersPage();
    await page.getByPlaceholder('Filter by keyword').click();
    await page.getByPlaceholder('Filter by keyword').fill(workOrderNumber);
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    await page.getByLabel('Daily Requirements').first().click();
    await page.getByRole('tab', { name: 'Summary' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('WIP Scheduling tool').click();
    const page1 = await page1Promise;
    // await page1.getByRole('link', { name: 'Weekly' }).click();
    // await page1.getByRole('link', { name: 'Daily' }).click();
    // await page1.goto('https://dev.planning.nthdegree.com/ResourceSchedule/Index');
    // page1.once('dialog', dialog => {
    //     console.log(`Dialog message: ${dialog.message()}`);
    //     dialog.dismiss(await page.getByRole('option', { name: 'All Opportunities' }).click();).catch(() => {});
    // });
    // await page1.getByRole('link', { name: 'Weekly' }).click();
    // await page1.getByRole('cell', { name: 'Show-Info', exact: true }).locator('a').click();


});
//test 10
test('Products page total cost', async({page}) => {
    await navigateTo.opportunitiesPage();
    await page.getByTitle('Active Opportunities').first().click();
    await page.getByRole('option', { name: 'All Opportunities' }).first().click();

    // await page.getByPlaceholder('Filter by keyword').first().click();
    // await page.getByPlaceholder('Filter by keyword').fill("O-245961");  //opportunityNumber
    // await page.keyboard.press("Enter");
    // await page.getByLabel('Open').first().click();
    // await page.locator('div[aria-colindex="2"]').last().dblclick();
    // await page.waitForTimeout(2000);
    // await page.getByLabel('Products').last().click();
    // await page.waitForTimeout(1000);

    // let totalProductsBillActual = 0;
    // for (let i = 0; i < 3; i++) { 
    //     const amount: number = Number(await page.locator(`div[data-id='cell-${i}-8']`).first().innerText());
    //     const unit: string = await page.locator(`div[data-id='cell-${i}-8']`).first().innerText();
    //     const unitAmount: number = Number(unit.replace(/[$,]/g, ''));
    //     const amountActual: number = quantity * unitAmount;
    //     const expectedwithSigns: string = await page.locator(`div[data-id='cell-${i}-10']`).first().innerText();
    //     const amountExpected: number = Number(expectedwithSigns.replace(/[$,]/g, ''));
    //     totalProductsBillActual += amountActual;
    //     totalProductsBillExpected += amountExpected;
    //     expect(totalProductsBillActual).toBe(totalProductsBillExpected);
    // }
    // console.log("Total Products Bill Expected: " + totalProductsBillExpected);
    // console.log("Total Products Bill Actual: " + totalProductsBillActual);
    // expect(totalProductsBillActual).toBe(totalProductsBillExpected);

    // console.log(await page.locator(`div[data-id='cell-0-8']`).first().innerText());
    // console.log(await page.locator(`div[data-id='cell-1-8']`).first().innerText());
    // console.log(await page.locator(`div[data-id='cell-2-8']`).first().innerText());
    // console.log(await page.locator(`div[data-id='cell-3-8']`).first().innerText());
    

});

test.skip('Clean-up/DELETE the opportunity', async ({page}) => 
    {
        
            await navigateTo.opportunitiesPage();
            await page.getByPlaceholder('Filter by keyword').first().click();
            await page.getByPlaceholder('Filter by keyword').fill("opportunityNumber");
            await page.keyboard.press("Enter");
            await page.getByLabel('Open').first().click();
            await expect(page.locator('button:has-text("Edit")').first()).toBeVisible();
            await expect(page.locator('button:has-text("Copy")').first()).toBeVisible();
            await expect(page.locator('button:has-text("Delete")').first()).toBeVisible();


            await page.locator('button:has-text("Delete")').first().click(); 
            await page.locator("button[data-id='confirmButton']").first().click();

            console.log("Created opportunity has been successfully DELETED!!!");
    
    }); 
        });

