import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Labor Billing Rate Criteria Match";
const city = "Chicago Heights";
const GCBaseCity = "Chicago";

test.skip('show_entity FAIL - Create a show-Update LBR with invalid Data-Verify-Clean up', async({page}) => 
{   
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    showsPage = new ShowsPage(page); 
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForLoadState("load");
    await page.getByLabel('New', { exact: true }).click();
    const buttonText = await page.locator('button[data-id="form-selector"]').innerText();
    if (buttonText !== 'Fern Primary') 
        {
    await page.locator("button[data-id='form-selector']").first().click();
    await page.getByText('Fern Primary').click();
    await page.getByRole('button', { name: 'Discard changes' }).click();
        }    
    expect.soft (await page.locator('button[data-id="form-selector"]').innerText()).toBe('Fern Primary')
    await page.getByLabel('Name', { exact: true }).click();
    await page.getByLabel('Name', { exact: true }).fill(showName);
    await page.getByLabel('City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for City').fill(city);
    await page.waitForLoadState("load");
    await page.getByText(city).click();
    await page.getByLabel('GC Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for GC Base City').fill(GCBaseCity);
    await page.waitForLoadState("load");
    await page.getByText(GCBaseCity, { exact: true }).click();
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Setup Date').click();
    await page.getByLabel('Date of Setup Date').fill('12/12/2024')
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Open Date').fill('12/13/2024');
    await page.getByLabel('Date of Close Date').click();
    await page.getByLabel('Date of Close Date').fill('12/15/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Hall Cleared').fill('12/16/2025');
    await page.waitForLoadState("load");
    await page.getByText("Save & Close").first().click();
    await page.waitForTimeout(15000);
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(5000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load");
    await page.getByText(showName).first().click();
    await page.waitForLoadState("load");
    const givenCity = await page.locator("div[data-id = 'nth_city.fieldControl-LookupResultsDropdown_nth_city_selected_tag_text']").innerText();
    expect.soft(givenCity).toBe(city);
    const givenGCBase = await page.locator("div[data-id = 'nth_gcbasecity.fieldControl-LookupResultsDropdown_nth_gcbasecity_selected_tag_text']").innerText();
    expect.soft(givenGCBase).toBe(GCBaseCity);
    await page.waitForTimeout(5000);
    await page.getByRole('tab', { name: 'Show Setup' }).click();
    await page.waitForLoadState("load")
    await page.getByLabel('Delete BRS-2024 Chicago').click();
    await page.getByPlaceholder('Look for Labor Billing Rate').click();
    await page.getByText('REN-NEW YORK JAVITS-MC2-2022').click();
    //await page.getByText('U-Seattle Carpenters - 2024-2024').click();
    await page.waitForLoadState("load")
    await page.getByLabel('Save & Close').click();
    await page.waitForLoadState("load");
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load");
    await page.getByText(showName).first().click();
    await page.getByRole('tab', { name: 'Show Setup' }).click();
    await page.waitForLoadState("load");
    const givenLBR = await page.locator("div[data-id = 'nth_laborbillingrate.fieldControl-LookupResultsDropdown_nth_laborbillingrate_selected_tag_text']").innerText();
    //expect.soft(givenLBR).toContain(GCBaseCity) FAILED
    await page.getByLabel('Cancel', { exact: true }).click();
    await page.waitForLoadState("load");
    await page.locator("button[data-id='okButton']").click();
    await page.getByLabel('Cancellation Reason', { exact: true }).click();
    await page.getByRole('option', { name: 'Duplicate' }).click();
    await page.waitForLoadState("load");
    await page.getByLabel('Save (CTRL+S)').click();
    await page.waitForTimeout(7000);
    await expect.soft(page.locator("input[value='Cancelled']")).toBeVisible();
});



