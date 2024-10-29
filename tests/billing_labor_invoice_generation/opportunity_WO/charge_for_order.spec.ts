import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let duplicateLocator: any;
let isDuplicateFound: any;
let opportunityNumber: any;
let priceListOverridden: any;
let billing_overriden: any;
let targetCompany : string = "*DNU* George P Johnson Company";
let workOrderNumber: string;
let charge_status: any;
const showName = "Steffy Automation show";
test('Verify that the designated user can correct the Charge for Order field if set incorrectly.', async ({ page }) => {

    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByLabel('New', { exact: true }).click();
    await page.getByLabel('Division').click();
    await page.waitForTimeout(5000);
    await page.getByRole('option', { name: 'Fern: City Project' }).click();
    await page.getByLabel('Opportunity Type').click();
    await page.getByRole('option', { name: 'Retention' }).click();
    await page.getByLabel("Search records for Source Customer, Lookup field").click();
    await page.waitForTimeout(3000);
    await page.getByText(targetCompany).first().click();
    
    await page.waitForTimeout(3000);
    await page.getByLabel('Source Contact, Lookup').first().click();
    await page.getByLabel('Source Contact, Lookup').first().fill("Kim Campbell");
    await page.waitForTimeout(3000);
    await page.getByText("Kim Campbell").first().click();

    await page.getByLabel("Show, Lookup").first().click();
    await page.getByLabel("Show, Lookup").first().fill("Steffy Automation show");
    await page.waitForTimeout(3000);
    await page.getByLabel('Dropdown panel').getByText("Steffy Automation show", { exact: true }).click();

    await page.getByLabel('Exhibitor, Lookup', { exact: true }).click();
    await page.locator("//input[@aria-label='Exhibitor, Lookup']").fill(targetCompany);
    await page.waitForTimeout(3000);
    await page.locator("//a[@aria-label='Advanced lookup']").click();
    await page.waitForTimeout(3000);
    await page.locator("(//i[@data-icon-name='CheckMark'])[3]").click();
    await page.locator("//span[normalize-space(text())='Done']").click();

    
        
    await page.waitForTimeout(3000); 
    const dialogBox = await page.getByText("Unsaved changes");
    if(await dialogBox.isVisible()){
        await page.waitForTimeout(3000);
        await page.locator("//button[@title='Close']").click();
    }                                                       
    await page.getByLabel("Search records for Bill To Contact, Lookup field").click();

    await page.getByPlaceholder('Look for Bill To Contact').fill("Kim Campbell");
    await page.waitForTimeout(3000);
    await page.getByLabel('Dropdown panel').getByText("Kim Campbell", { exact: true }).click();
    await page.waitForTimeout(3000);

    await page.locator("//input[@aria-label='Venue, Lookup']").click();
    await page.locator("//input[@aria-label='Venue, Lookup']").fill('Test Suyati Venue');
    await page.locator("//input[@aria-label='Venue, Lookup']").clear();
    await page.waitForTimeout(3000);
    await page.locator("//input[@aria-label='Venue, Lookup']").fill('T');
    await page.waitForTimeout(3000);
    await page.locator("//input[@aria-label='Venue, Lookup']").press('Backspace');
    await page.waitForTimeout(3000);
    await page.getByText('Test Suyati Venue').first().click();
    await page.waitForTimeout(3000);

    await page.getByPlaceholder('Look for Prepay Contact').click();
    await page.getByPlaceholder('Look for Prepay Contact').fill("Kim Campbell");
    await page.waitForTimeout(3000);
    await page.getByLabel('Dropdown panel').getByText("Kim Campbell", { exact: true }).click();
    await page.waitForTimeout(3000);

    await page.getByLabel('Save this Opportunity.').click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Save this Opportunity.').click();
    await page.waitForTimeout(10000);

    duplicateLocator = page.getByLabel('Duplicate records found').last();
    isDuplicateFound = await duplicateLocator.count() > 0;
    if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(20000);
    }
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    await page.getByTitle('Ignore and save').click();

    expect(opportunityNumber).toContain("OC");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
    await page.getByLabel('Save & Close').click();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByText(opportunityNumber).first().click()
    await page.waitForTimeout(2000);
    await page.getByLabel('Billing', { exact: true }).click();
    await page.waitForTimeout(3000);
    await page.reload();
    await page.getByLabel('Billing', { exact: true }).click();
    charge_status = await page.getByLabel('Charge for Order').innerText();
    expect(charge_status).toBe('Yes');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
    await page.getByLabel('Products', { exact: true }).click();
    await page.reload();
    await page.locator('.pa-dr.pa-ea.pa-ib.pa-dk.pa-mx.pa-w.pa-a.pa-ic').click();
    await page.getByLabel('Search records for Product, Lookup field').click();
    await page.getByLabel('Search records for Product, Lookup field').fill('2" Carton Sealing Tape');
    await page.waitForTimeout(5000);
    await page.getByLabel('Save & Close').click();
    await page.getByLabel('Estimates', { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'New Estimate' }).click();
    await page.locator("//span[@class='symbolFont MoreVertical-symbol pa-id pa-dn pa-bp pa-dj pa-bz ']").click();
    await page.locator("(//span[contains(@class,'symbolFont MoreVertical-symbol')])[1]").click();
    await page.locator('button:has-text("Activate Estimate")').click();
    await page.waitForTimeout(5000);
    const warningNotification = await page.locator("span[data-id='warningNotification']").textContent();
    expect(warningNotification).toBe("Read-only  This record’s status: Active");
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

});