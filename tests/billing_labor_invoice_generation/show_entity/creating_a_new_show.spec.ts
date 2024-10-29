import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
let showName = "Automation Show Being Used in Automation";
const stValue = "$229.00";
const otValue =  '$330.00';
const dtValue = '$378.00';

test('show_entity Shows page elements visibility', async({page}) => 
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
    await expect.soft( page.getByLabel('Category')).toBeEnabled();
    await showsPage.selectCategory('Strategic');
    await expect.soft(page.getByLabel('Website')).toBeEnabled();
    await page.getByLabel('City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for City').fill('Boston');
    await page.waitForLoadState("load");
    await page.getByText('BostonBostonMassachusettsEastYes').click();
    await page.getByLabel('GC Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for GC Base City').fill('Boston');
    await page.waitForLoadState("load");
    await page.getByLabel('Boston, East').getByText('Boston').click();
    await page.getByLabel('Date of Setup Date').click();
    await page.getByLabel('Date of Setup Date').fill('02/20/2025')
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Open Date').fill('02/22/2025');
    await page.getByLabel('Date of Close Date').click();
    await page.getByLabel('Date of Close Date').fill('02/25/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Hall Cleared').fill('02/28/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Earliest Date').click();
    await page.getByLabel('Date of Earliest Date').fill('02/18/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Date of Latest Date').click();
    await page.getByLabel('Date of Latest Date').fill('02/19/2025');
    await page.waitForLoadState("load");
    await page.getByLabel('Save (CTRL+S)').click();
    await page.waitForTimeout(20000);
    //await expect.soft(page.getByRole('heading', { name: 'New Show AutomatedSave status' })).toBeVisible();
    await expect.soft(page.getByLabel('Save status - Saved')).toBeVisible();

});
