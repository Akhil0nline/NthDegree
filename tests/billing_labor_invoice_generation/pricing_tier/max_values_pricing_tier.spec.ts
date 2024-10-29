import {test, expect} from '@playwright/test';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';


test('MAX values pricing tiers', async({page}) => 
        {    
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    await page.getByLabel('Nth Degree (change area)').click();
    await page.waitForLoadState('load');
    await page.getByRole('menuitemradio', { name: 'Settings' }).click();
    await page.waitForLoadState('load');
    await page.getByText('Products').click();
    await page.waitForTimeout(5000);
    await page.getByLabel('" Carton Sealing Tape').click();
    await page.waitForTimeout(5000);
    await expect.soft(page.getByText("New Pricing Tier")).toBeVisible();
    await page.getByText("New Pricing Tier").click();
    await page.waitForLoadState('load');
    await page.getByTitle("Select to enter data").first().fill("test max positive1"); 
    await page.waitForLoadState('load'); // will be deleted
    await page.getByLabel("Price").first().fill("922337203685477");
    await page.getByLabel("Floor Increase").fill("100000000000");
    await page.waitForLoadState('load');
    await expect.soft(page.getByLabel('Save status - Unsaved, press Control plus S to save')).toBeVisible();
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    await expect.soft(page.getByLabel('Save status - Saved')).toBeVisible();
    await page.getByText("Delete").first().click();
    await page.waitForLoadState('load');
    await expect.soft(page.getByLabel("Confirm Deletion").last()).toBeVisible();
    await page.getByTitle("Delete").last().click();
    await page.waitForLoadState('load');
    // await expect.soft(page.getByText("test max positive1")).not.toBeVisible();
    // await page.waitForLoadState('load');
        
    });