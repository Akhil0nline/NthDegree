import { test, expect } from '@playwright/test';
import { NavigationPage } from '../../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let duplicateLocator: any;
let isDuplicateFound: any;
let opportunityNumber: any;
let charge_status: any;
let pricelist_overriden: any;
const showName = "Steffy Automation show";
test('Verify that Price List Overridden is set to "Yes" when Price List is different from the Show Price List', async ({ page }) => {

    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
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
    const showSetupPriceList = await page.locator('div[data-id="nth_pricelist.fieldControl-LookupResultsDropdown_nth_pricelist_selected_tag_text"]').innerText();
    await page.waitForLoadState("load");
    const workOrderTab = page.locator('[data-id="tablist-woinfo"]');
    await workOrderTab.click();
    await page.locator("(//span[contains(@class,'symbolFont MoreVertical-symbol')])[2]").click();
    await page.waitForTimeout(3000);
    const opportunities = await page.locator("//span[contains(text(),'New Opportunity')]");
    await opportunities.click();
    await page.waitForTimeout(3000);
    expect.soft(await page.locator(showName));
    console.log('showName:',showName);
    await page.waitForTimeout(3000);
    expect.soft(await page.locator('button[data-id="form-selector"]').innerText()).toBe('Fern Primary');
    await page.getByLabel('Division').click();
    await page.getByRole('option', { name: 'Fern: City Project' }).click();
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
    expect(opportunityNumber).toContain("OC");
    opportunityNumber = opportunityNumber.replace('- Saved', '');
    await page.getByLabel('Save More Commands. Save (CTRL+S)').click();
   // await page.getByLabel('Save & Close').click();
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
    pricelist_overriden = await page.getByLabel('Price List Overridden', { exact: true }).inputValue();
    await page.waitForTimeout(3000);
    const selectedPriceList = await page.locator('[data-id="pricelevelid.fieldControl-LookupResultsDropdown_pricelevelid_selected_tag_text"]').innerText();
    console.log(selectedPriceList);
    await page.waitForTimeout(3000);
    if (selectedPriceList === showSetupPriceList) {
        expect(pricelist_overriden.toLowerCase()).toBe('no');
    } else {
        expect(pricelist_overriden.toLowerCase()).toBe('yes');
    }
});