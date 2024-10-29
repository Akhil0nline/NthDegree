import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
const showName = "A Show created for the testing purposes";
let duplicateLocator: any;
let isDuplicateFound: any;
let opportunityNumber: any;
let charge_status: any;
let billing_overriden: any;
test('Verify that Billing Rate List Overridden defaults to "No"', async({page}) => 
{   
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
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
    await page.getByRole('option', { name: 'Fern: Exhibitor' }).click();
    await page.getByLabel('Opportunity Type').click();
    await page.getByRole('option', { name: 'Retention' }).click();
    await page.getByLabel('Show, Lookup' , { exact: true }).click();
    await page.getByLabel('Show, Lookup' , { exact: true }).fill(showName);
    await page.getByText(showName, { exact: true }).click();
    await page.getByLabel('Save this Opportunity.').click();
    await page.waitForTimeout(10000);
    duplicateLocator = page.getByLabel('Duplicate records found').last();
    isDuplicateFound = await duplicateLocator.count() > 0;
    if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(20000);
    }
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    expect(opportunityNumber).toContain("OX");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
    await page.getByLabel('Save & Close').click();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByText(opportunityNumber).first().click()
    await page.waitForTimeout(2000);
    await page.getByLabel('Billing', { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.getByLabel('Billing', { exact: true }).click();
    charge_status = await page.getByLabel('Charge for Order').innerText();
    billing_overriden = await page.getByLabel('Billing Rate List Overridden', { exact: true }).inputValue();
    await page.waitForTimeout(3000);
    expect(charge_status).toBe('No Labor');
    expect(billing_overriden).toBe('No')
    await page.getByLabel('Close As Lost', { exact: true }).click();
    await page.waitForTimeout(2000);
    await page.locator('iframe[name="nth_OpportunityCloseAsLostHTML"]').contentFrame().getByRole('button', { name: 'CLOSE' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    
});