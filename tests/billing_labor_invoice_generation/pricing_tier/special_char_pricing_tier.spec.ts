import {test, expect} from '@playwright/test';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';

let warningText: string;

test('SPECIAL CHARS pricing tiers', async({page}) => 
    {    
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    await page.waitForLoadState('load');
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
    await page.getByTitle("Select to enter data").first().fill("$%^*&^(%");
    await page.getByLabel("Price").first().fill("321");
    await page.getByLabel("Floor Increase").fill("123");
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
    await expect.soft(page.getByText("$%^*&^(%")).not.toBeVisible();
    await page.waitForTimeout(2000);
    
    });
