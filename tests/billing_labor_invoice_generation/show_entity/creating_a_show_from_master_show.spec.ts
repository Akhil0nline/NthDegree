import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';


const showName = "A Show created for the testing purposes";
const showMaster = "Magic";
const city = "New York";
const GCBaseCity = "Phoenix";
const stValue = "$130.00";
const otValue =  '$208.00';
const dtValue = '$208.00';
test('% Up calculation on Price List Tool should be correctly displayed', async({page}) => 
{   
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 }); 
    const navigateTo = new NavigationPage(page);
    await navigateTo.showMastersPage();
    await page.waitForLoadState("load");
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showMaster);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load")
    await page.getByRole('link', { name: 'Magic', exact: true }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('tab', { name: 'Shows' }).click();
    await page.waitForLoadState("load")
    await page.getByLabel("New Show. Add New Show", {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByLabel('Name', { exact: true }).click();
    await page.getByLabel('Name', { exact: true }).fill(showName);
    await page.getByLabel('City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for City').fill(city);
    await page.waitForLoadState("load");
    await page.getByLabel(city).getByText(city).first().click();
    await page.getByLabel('GC Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for GC Base City').fill(GCBaseCity);
    await page.waitForLoadState("load");
    await page.getByText(GCBaseCity, { exact: true }).click();
    await page.waitForTimeout(2000);
    await page.getByLabel('Date of Setup Date').click();
    await page.getByLabel('Date of Setup Date').fill('12/21/2024')
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Open Date').fill('12/22/2024');
    await page.getByLabel('Date of Close Date').click();
    await page.getByLabel('Date of Close Date').fill('12/25/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Hall Cleared').fill('12/26/2025');
    await page.waitForLoadState("load");
    await page.getByText("Save & Close").first().click();
    await page.waitForTimeout(15000);
    await navigateTo.showsPage();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(5000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load")
    await page.getByText(showName).first().click();
    await page.getByRole('tab', { name: 'Show Setup' }).click();
    await page.waitForTimeout(2000);
    const givenLBR = await page.locator("div[data-id = 'nth_laborbillingrate.fieldControl-LookupResultsDropdown_nth_laborbillingrate_selected_tag_text']").innerText();
    expect.soft(givenLBR).toContain(GCBaseCity)
    await expect.soft(page.getByTitle(stValue)).toBeVisible();
    await expect.soft(page.getByTitle(otValue).first()).toBeVisible();
    await expect.soft(page.getByTitle(dtValue).last()).toBeVisible();


});
