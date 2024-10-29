import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';


const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let duplicateLocator: any;
let isDuplicateFound: any;
let opportunityNumber: any;
let charge_status: any;
let pricelist_overriden: any;
test('Verify that the Price List Overridden field defaults to "No"', async ({ page }) => {

    await page.goto(orgURL);
    page.setViewportSize({ width: 1500, height: 880 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByLabel('New', { exact: true }).click();
    const buttonText = await page.locator('button[data-id="form-selector"]').innerText();
    if (buttonText !== 'Fern Primary') 
        {
    await page.locator("button[data-id='form-selector']").first().click();
    await page.getByText('Fern Primary').click();
    await page.getByRole('button', { name: 'Discard changes' }).click();
        }    
    expect.soft (await page.locator('button[data-id="form-selector"]').innerText()).toBe('Fern Primary')
    await page.getByLabel('Division').click();
    await page.getByRole('option', { name: 'Fern: Warehouse Overhead' }).click();
    await page.getByLabel('Opportunity Type').click();
    await page.getByRole('option', { name: 'Retention' }).click();
    await page.getByLabel('Save this Opportunity.').click();
    await page.waitForTimeout(10000);
    duplicateLocator = page.getByLabel('Duplicate records found').last();
    isDuplicateFound = await duplicateLocator.count() > 0;
    if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(20000);
    }
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    expect(opportunityNumber).toContain("OF");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
    await page.getByLabel('Save & Close').click();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.getByText(opportunityNumber).first().click()
    await page.getByLabel('Billing', { exact: true }).click();
    await page.reload();
    await page.getByLabel('Billing', { exact: true }).click();
    await page.waitForTimeout(5000);
    pricelist_overriden = await page.getByLabel('Price List Overridden', { exact: true }).inputValue();
    expect(pricelist_overriden).toBe('No');
    await page.waitForLoadState("load");
    await page.getByLabel('Close As Lost', { exact: true }).click();
    await page.locator('iframe[name="nth_OpportunityCloseAsLostHTML"]').contentFrame().getByRole('button', { name: 'CLOSE' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
});