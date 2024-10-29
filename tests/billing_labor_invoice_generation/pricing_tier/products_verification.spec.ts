import {test, expect} from '@playwright/test';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
    
test('Products page elements visibility pricing tier', async({page}) => 
{   await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 }); 
    await page.getByLabel('Nth Degree (change area)').click();
    await page.waitForLoadState('load');
    await page.getByRole('menuitemradio', { name: 'Settings' }).click();
    await page.waitForLoadState('load');
    await page.getByText('Products').click();
    await page.waitForTimeout(5000);
    await page.waitForLoadState('load');
    await page.getByLabel('" Carton Sealing Tape').click();
    await page.waitForTimeout(5000);
    await page.getByLabel('Category', { exact: true }).click();
    await page.getByRole('option', { name: 'Chair' }).click();
    await page.getByLabel('Category', { exact: true }).click();
    await page.getByRole('option', { name: 'Tables' }).click();
    await page.getByRole('heading', { name: 'Pricing Tiers' }).click();
    await page.getByLabel('Related').click();
    await page.getByText('Field Service Price List Items').click();
    await page.getByRole('tab', { name: 'PRODUCT DETAILS' }).click();
   
});