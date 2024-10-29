import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const city = "Boston";
const GCBaseCity = "Boston";
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
    expect.soft(await page.locator('button[data-id="form-selector"]').innerText()).toBe('Fern Primary')
    await expect.soft( page.getByLabel('Category')).toBeEnabled();
    await showsPage.selectCategory('Strategic');
    await showsPage.selectCategory('Major');
    await showsPage.selectCategory('Other');
    await showsPage.selectCategory('Reference');
    await showsPage.selectCategory('Target');
    await expect.soft(page.getByLabel('Website')).toBeEnabled();
    await page.getByLabel('City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for City').fill(city);
    await page.waitForLoadState("load");
    await page.getByText('BostonBostonMassachusettsEastYes').click();
    await page.getByLabel('GC Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for GC Base City').fill(GCBaseCity);
    await page.waitForLoadState("load");
    await page.getByLabel('Boston, East').getByText(GCBaseCity).click();
    await page.getByRole('tab', { name: 'Show Setup' }).click();
    await page.waitForLoadState("load")
    await page.getByLabel('Price List, Lookup', { exact: true }).click();
    await page.getByLabel('Search records for Price List').click();
    await page.waitForLoadState("load");
    await page.getByText('Fern Default').first().click();
    await page.waitForLoadState("load");
    await page.locator("button[aria-label='Search records for Labor Billing Rate, Lookup field']").click();
    await page.getByLabel("Labor Billing Rate, Lookup").first().fill('BRS-2024 Boston');
    await page.waitForLoadState("load");
    await page.getByText('BRS-2024 Boston').click();
    await expect.soft(page.locator("div[title='ST']")).toBeVisible();
    await expect.soft(page.locator("div[title='OT']")).toBeVisible();
    await expect.soft(page.locator("div[title='DT']")).toBeVisible();
    await expect.soft(page.getByTitle(stValue)).toBeVisible();
    await expect.soft(page.getByTitle(otValue)).toBeVisible();
    await expect.soft(page.getByTitle(dtValue)).toBeVisible();

});

test('show_entity Set up section is not visible for forms other than Fern Primary', async({page}) => 
    {   
        await page.goto(orgURL);
        
        page.setViewportSize({ width: 1800, height: 1500 });
        showsPage = new ShowsPage(page); 
        const navigateTo = new NavigationPage(page);
        await navigateTo.showsPage();
        await page.waitForLoadState("load");
        await page.getByLabel('New', { exact: true }).click();
        const buttonText = await page.locator('button[data-id="form-selector"]').innerText();
        if (buttonText == 'Fern Primary') 
            {
        await page.locator("button[data-id='form-selector']").first().click();
        await page.getByText('Nth Primary').click();
        await page.getByRole('button', { name: 'Discard changes' }).click();
            }    
        expect.soft(await page.locator('button[data-id="form-selector"]').innerText()).toBe('Nth Primary')
        expect.soft(page.getByTitle("Show Setup").first()).not.toBeVisible();
        expect.soft(page.getByLabel('Price List, Lookup', { exact: true })).not.toBeVisible();
        expect.soft(page.getByLabel("Labor Billing Rate, Lookup").first()).not.toBeVisible();       
    });
