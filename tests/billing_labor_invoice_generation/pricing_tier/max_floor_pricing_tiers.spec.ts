import {test, expect} from '@playwright/test';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let warningText: string;

test('Creating new Pricing Tier with MAX+1 floor', async({page}) => 
    {
    await page.goto(orgURL);
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
    await expect.soft(page.getByText("New Pricing Tier")).toBeVisible();
    await page.getByText("New Pricing Tier").click();
    await page.waitForLoadState('load');        
    await page.getByTitle("Select to enter data").first().fill("test max+1 price");
    await page.waitForLoadState('load');
    await page.getByLabel("Price").first().fill("987");
    await page.getByLabel("Floor Increase").fill("100000000001");
    await page.waitForLoadState('load');
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    warningText = await page.locator("span[data-id='warningNotification']").innerText();
    expect.soft(warningText).toContain("Floor Increase : Enter a number between -100,000,000,000.00 and 100,000,000,000.00.");
    await page.waitForLoadState('load');
    });