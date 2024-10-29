import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let navigateTo: NavigationPage;   
let opportunityNumber;

test('Deleting previously created opportunity', async ({page}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByLabel('Open').first().click();
    await expect(page.locator('button:has-text("Edit")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Copy")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Delete")').first()).toBeVisible();
    await page.locator('button:has-text("Delete")').first().click(); 
    await page.locator("button[data-id='confirmButton']").first().click();
    console.log("Previously created opportunity has been successfully DELETED!!!");

});   
