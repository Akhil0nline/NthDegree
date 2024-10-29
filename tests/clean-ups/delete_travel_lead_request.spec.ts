import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let navigateTo: NavigationPage; 
let travelRequestNumber;


test('Deleting previously created travel/lead request', async ({page}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    navigateTo = new NavigationPage(page);
    await navigateTo.opportunitiesPage();
    await page.getByText('Lead/Travel Requests').first().click();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(travelRequestNumber);  //travelRequestNumber
    await page.keyboard.press("Enter");
    await page.locator("div[col-id='nth_travelnumber']").last().click();
    await expect(page.locator('button:has-text("Delete")')).toBeVisible();
    await expect(page.locator('button:has-text("WIP")')).toBeVisible();
    await expect(page.locator('button:has-text("Approve Request")')).toBeVisible();
    const baseCity = await page.locator("div[data-id = 'BaseCity.nth_basecity.fieldControl-LookupResultsDropdown_nth_basecity_selected_tag_text']").last().innerText();
    expect(baseCity).toBe("Orlando");
    await page.locator('button:has-text("Delete")').first().click();
    await expect(page.getByRole('dialog').first()).toBeVisible();
    await expect(page.locator('button[data-id="dialogCloseIconButton"]')).toBeVisible();
    await expect(page.getByTitle("Delete").last()).toBeVisible();
    await expect(page.getByTitle("Cancel").last()).toBeVisible();
    await page.getByTitle("Delete").last().click();
    await expect(page.getByLabel('Processing')).toBeVisible();
    await page.getByLabel('Processing').waitFor({ state: 'hidden' });
    await page.getByPlaceholder('Filter by keyword').fill(travelRequestNumber);
    await page.keyboard.press("Enter");
    console.log("Previously created TR# has been successfully DELETED!!!");

    });  