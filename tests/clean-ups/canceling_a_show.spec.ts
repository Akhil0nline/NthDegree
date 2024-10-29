import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
import { ShowsPage } from '../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Labor Billing Rate Criteria Match"
test('show_entity Canceling an existing show', async({page}) => 
{   
    
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    showsPage = new ShowsPage(page); 
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForLoadState("load");
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.getByPlaceholder('Filter by keyword').press('Enter');
    await page.waitForLoadState("load");
    await page.getByLabel(showName).last().click();
    await page.waitForLoadState("load");
    await page.getByLabel('Cancel', { exact: true }).click();
    await page.waitForLoadState("load");
    await page.locator("button[data-id='okButton']").click();
    await page.getByLabel('Cancellation Reason', { exact: true }).click();
    await page.getByRole('option', { name: 'Duplicate' }).click();
    await page.waitForLoadState("load");
    await page.getByLabel('Save (CTRL+S)').click();
    await page.waitForTimeout(10000);
    //await expect.soft(page.getByLabel("Show Status")).toBe("Cancelled")
    await expect.soft(page.locator("input[value='Cancelled']")).toBeVisible();

});
