import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let pricingTierName: "Automation created this case"
let warningText: string;
test.beforeEach(async ({page}) => 
    {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    page.setViewportSize({ width: 1800, height: 1500 });
    await navigateTo.opportunitiesPage();
    await page.getByLabel('Nth Degree (change area)').click();
    await page.getByRole('menuitemradio', { name: 'Settings' }).click();
    await page.waitForLoadState('load');
    await page.getByText('Products').click();
    await page.waitForTimeout(5000);
    await page.waitForLoadState('load');
    await page.getByLabel('" Carton Sealing Tape').click();
    await page.waitForTimeout(5000);
    await expect(page.getByText("New Pricing Tier")).toBeVisible();
    await page.waitForLoadState('load');
    });
test('pricing tier - Creating new Pricing Tier with NO NAME', async({page}) => 
{    
    
    await page.getByText("New Pricing Tier").click();
    await page.getByLabel("Price").first().fill("100");
    await page.getByLabel("Floor Increase").fill("5.0");
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    warningText = await page.locator("span[data-id='warningNotification']").innerText();
    expect(warningText).toContain("Required fields must be filled in");
    warningText = await page.locator("span[data-id='nth_tier-error-message']").innerText();
    expect(warningText).toContain("Required fields must be filled in");


});

test('Creating new Pricing Tier with valid name', async({page}) => {
    
    await page.getByText("New Pricing Tier").click();
    await page.getByTitle("Select to enter data").first().fill(pricingTierName);
    await page.waitForLoadState('load');
    await page.getByLabel("Price").first().fill("100");
    await page.waitForLoadState('load');
    await page.getByLabel("Floor Increase").fill("5.0");
    await page.waitForLoadState('load');
    await expect(page.getByLabel('Save status - Unsaved, press Control plus S to save')).toBeVisible();
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByLabel('Save status - Saved')).toBeVisible();

});

test('Creating new Pricing Tier with DUPLICATED name', async({page}) => {
    
    await page.getByText("New Pricing Tier").click();
    await page.getByTitle("Select to enter data").first().fill(pricingTierName);
    await page.waitForLoadState('load');
    await page.getByLabel("Price").first().fill("100");
    await page.waitForLoadState('load');
    await page.getByLabel("Floor Increase").fill("5.0");
    await page.waitForLoadState('load');
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByLabel("Duplicate Record").last()).toBeVisible();
    await page.getByTitle("OK").last().click();
    await page.locator('button:has-text("Save & Close")').first().click();
    await page.waitForTimeout(5000);
    await expect(page.getByLabel("Duplicate Record").last()).toBeVisible();
    await page.getByTitle("Close").last().click();
    await page.waitForLoadState('load');
    await page.getByTitle("Go back").click();
    await expect(page.locator("div[data-id='confirmdialog']")).toBeVisible();
    await page.getByText("Save and continue").click();
    await page.waitForLoadState('load');
    await expect(page.getByLabel("Duplicate Record").last()).toBeVisible();
    await page.getByTitle("OK").last().click();
    
    

    //BUG!!!!!!!!
    // await page.getByTitle("Go back").click();
    // await expect(page.locator("div[data-id='confirmdialog']")).toBeVisible();
    // await page.getByText("Discard changes").click();
    // await page.waitForTimeout(2000);
    // await expect(page.getByText('New Pricing Tier')).toBeVisible();

});

test('Deleting Pricing Tier', async({page}) => {
    
    await expect(page.getByText(pricingTierName).first()).toBeVisible();
    await page.getByText("Automation Test Zeliha").first().click();
    await page.waitForLoadState('load');
    await page.getByText("Delete").first().click();
    await expect(page.getByLabel("Confirm Deletion").last()).toBeVisible();
    await page.getByTitle("Delete").last().click();
    await page.waitForLoadState('load');
    await expect(page.getByText("Automation Test Zeliha")).not.toBeVisible();
    await page.waitForLoadState('load');
    

});