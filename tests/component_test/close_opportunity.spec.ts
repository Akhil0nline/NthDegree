import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let frame;
let opportunityNumber;
let navigateTo: NavigationPage;
    
test.beforeEach(async ({page}) => 
    {
    await page.goto(orgURL);
       
    
    page.setViewportSize({ width: 1800, height: 1500 });
    navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);  //opportunityNumber should be entered manually
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await page.locator('div[aria-colindex="2"]').last().dblclick();
    });
test('Closing an opportunity as lost', async ({page}) => {

    await page.waitForLoadState('load')
    await page.getByText('Close As Lost').click();
    await page.waitForLoadState('load')
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    await expect(page.getByText('Opportunity Close As Lost HTML')).toBeVisible();
    frame = page.frameLocator('[aria-label="OpportunityCloseAsLostHTML"]');
    // await frame.locator('#statusreasons').click();
    // await frame.getByText("Duplicate").click();
    await frame.getByText("Close").last().click();
    await page.waitForLoadState('load');
    await page.getByText("OK").last().click();
    await page.waitForLoadState('load')
    await expect(page.getByText("Read-only  This record’s status: Lost").last()).toBeVisible();
    console.log("Previously created opportunity has been successfully CLOSED");

});      

test.skip('Closing an opportunity as won', async ({page}) => {

    
    await page.getByText('Close As Won').click();
    await page.waitForLoadState('load')

    console.log("Previously created opportunity has been successfully CLOSED as won!!!");

});