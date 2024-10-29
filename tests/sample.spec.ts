import {test, expect} from '@playwright/test';
import { NavigationPage } from '../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';

test('Sample test to make changes', async({page}) => 
{   await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    
    // await page.getByLabel('Nth Degree (change area)').click();
    // await page.getByRole('menuitemradio', { name: 'Settings' }).click();
    // await page.waitForLoadState('load');
    // await page.getByText('Products').click();
    // await page.waitForLoadState('load');
    // await page.waitForTimeout(2000);
    // await page.getByLabel('" Carton Sealing Tape').click();
    // await expect(page.getByText("New Pricing Tier")).toBeVisible();

    console.log("just to make changes")

});

