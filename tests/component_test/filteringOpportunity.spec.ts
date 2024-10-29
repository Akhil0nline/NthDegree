import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let navigateTo: NavigationPage;
 
test('Filtering an opportunity according to the Close Date and General Contractor=Fern', async({page}) => 
    { 
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.locator("div[data-testid='nth_closedate']").click(); 
    await page.locator("button[name='Filter by']").click();
    await page.locator('div[aria-label="Filter by operator"]').first().click();
    await page.getByRole('option', { name: 'On or after' }).click();
    await page.getByRole('combobox', { name: 'Filter by value' }).fill("11/25/2024");
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForTimeout(3000);
    await  page.locator("div[data-testid='nth_generalcontractor']").first().click();
    await page.locator('button[data-automation-id="columnFilterId"]').click();
    await page.locator('div[aria-label="Filter by operator"]').first().click();
    await page.getByRole('option', { name: 'Contains', exact: true }).click();
    await page.getByLabel('Filter by value').click();
    await page.getByLabel('Filter by value').fill('FERN');
    await page.getByText("Apply").click();
    await page.waitForTimeout(3000);
    await  page.locator("div[col-id='nth_name']").first().click();
    await page.locator('button[data-automation-id="columnFilterId"]').click();
    await page.locator('div[aria-label="Filter by operator"]').first().click();
    await page.getByRole('option', { name: 'Contains', exact: true }).click();
    await page.getByLabel('Filter by value').click();
    await page.getByLabel('Filter by value').fill('FERN');
    await page.getByText("Apply").click();
    await page.waitForTimeout(3000);
    const contractorLocators = await page.locator('div[col-id="nth_generalcontractor"]');
    const nameLocator = await page.locator("div[col-id='nth_name']");
    const count = await contractorLocators.count();
    for (let n = 1; n < count; n++) {
        const innerTextContractor = await contractorLocators.nth(n).innerText();
        const innerTextName = await nameLocator.nth(n).innerText();
        expect(innerTextContractor).toContain('Fern');
        expect(innerTextName).toContain('Fern');
    }
});