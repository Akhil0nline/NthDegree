import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;

test('show_entity Shows page Rate List filtering according to the GC Base City', async({page}) => 
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
    await page.getByLabel('City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for City').fill('Boston');
    await page.waitForLoadState("load");
    await page.getByText('BostonBostonMassachusettsEastYes').click();
    await page.getByLabel('GC Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for GC Base City').fill('Boston');
    await page.waitForLoadState("load");
    await page.getByLabel('Boston, East').getByText('Boston').click();
    await page.waitForLoadState("load");
    //await page.locator("button[aria-label='Search records for Labor Billing Rate, Lookup field']").click();
    

});
