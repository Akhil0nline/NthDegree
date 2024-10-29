import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let duplicateLocator: any;
let isDuplicateFound: any;
let opportunityNumber: any;
let charge_status: any;
let  billingrate_overriden: any;
const showName = "Steffy Automation show";
test('T.C -1.4-11: Verify that Billing Rate List Overridden is set to Yes when Billing Rate List is different from Show Labor Billing Rate.', async ({ page }) => {

    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 816 });
    const navigate = new NavigationPage(page);
    await navigate.showsPage();
    await page.waitForLoadState('load');
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load");
    await page.getByText(showName).first().click();
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    await page.waitForLoadState("load");
    const showSetupBilling = await page.locator("(//div[@title='Fern - Las Vegas'])[2]").innerText();
    const workOrderTab = page.locator('[data-id="tablist-woinfo"]');
    await workOrderTab.click();
    await page.locator("(//span[contains(@class,'symbolFont MoreVertical-symbol')])[2]").click();
    const opportunities = await page.locator("//span[contains(text(),'New Opportunity')]");
    await opportunities.click();
    await page.waitForTimeout(3000);
    expect.soft(await page.locator(showName));
    console.log('showName:',showName);
    await page.waitForTimeout(3000);
    expect.soft(await page.locator('button[data-id="form-selector"]').innerText()).toBe('Fern Primary');
    await page.getByLabel('Division').click();
    await page.getByRole('option', { name: 'Fern: Exhibitor' }).click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Opportunity Type').click();
    await page.getByRole('option', { name: 'Retention' }).click();
    await page.getByLabel('Save this Opportunity.').click();
    await page.waitForTimeout(10000);
    duplicateLocator = page.getByLabel('Duplicate records found').last();
    isDuplicateFound = await duplicateLocator.count() > 0;
    if (isDuplicateFound) {
        await page.getByTitle('Ignore and save').click();
        await page.waitForTimeout(2000);
    }
    const moreTabIconByClass = await page.locator('span.symbolFont.More-symbol');
    await moreTabIconByClass.click();
    await page.waitForTimeout(3000); 
    const Opportunities = await page.locator("//span[@class='fui-MenuItem__content r1ls86vo'][normalize-space()='Opportunities']");
    await Opportunities.click();
    opportunityNumber = await page.locator('h1[data-id="header_title"]').innerText();
    await page.waitForTimeout(2000);
    expect(opportunityNumber).toContain("OX");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
    await page.getByLabel('Save & Close').click();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(opportunityNumber);
    await page.keyboard.press("Enter");
    await page.getByText(opportunityNumber).first().click();
    await page.waitForTimeout(2000);
    await page.getByLabel('Billing', { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.reload();
    await page.getByLabel('Billing', { exact: true }).click();
    await page.waitForTimeout(5000);
    const billingrate_overriden = page.locator('input[aria-label="Billing Rate List, Lookup"]').click();
    await billingrate_overriden;
    const firstLi = page.locator('ul[aria-label="Lookup results"] li').first();
    const billingRateValue = await page.locator('span[data-id="nth_billingratelist.fieldControl-nth_name0_0_0"]').innerText();
    console.log(`Billing Rate Value: ${billingRateValue}`);
    await firstLi.click();
    const saveButton = page.locator('button[title="Save (CTRL+S)"]');
    await saveButton.click();
    const Value_overriden = await page.locator("(//input[@value='No'])[2]").inputValue();
    await page.waitForTimeout(3000);
    if (billingRateValue === showSetupBilling) {
        expect( Value_overriden).toBe('Yes');
    } else {
        expect( Value_overriden).toBe('No');
    }
});