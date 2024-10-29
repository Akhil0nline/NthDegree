import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
import { Console } from 'console';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
test('show_entity Verify Price List tool button is present in show set up section', async({page, browser}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1536, height: 864 });
    showsPage = new ShowsPage(page);
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    const searchField = await page.locator('#quickFind_text_1');
    await searchField.fill('Fern City Projects - TForce Seattle 2024');
    await page.waitForTimeout(2000);
    await searchField.press('Enter');
    await page.click('text=Fern City Projects - TForce Seattle 2024');
    await page.waitForLoadState('load');
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    await page.waitForTimeout(2000);
    const iframe = page.frameLocator('#WebResource_PriceListTool');
    const button = iframe.locator('button:has-text("Price List Tool")');
    await expect.soft(button).toBeVisible();
});

test('show_entity Verify rate list is populated based on Shows Open Date within (inclusive) [Rate List] Effective From and [Rate List]Effective Until', async({page, browser}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500  });
    showsPage = new ShowsPage(page);
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    const searchField = await page.locator('#quickFind_text_1');
    await searchField.fill('Flex-Up Training - Orlando');
    await page.waitForTimeout(2000);
    await searchField.press('Enter');
    await page.click('text=Flex-Up Training - Orlando');
    const dateInput = await page.locator('input[aria-label="Date of Open Date"]');
    await expect.soft(dateInput).toBeVisible();
    await dateInput.focus();
    const dateValue = await dateInput.inputValue();
    const checkdate = new Date(dateValue!); 
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    await page.waitForTimeout(2000);
    const divElement = await page.locator('[data-id="nth_laborbillingrate.fieldControl-LookupResultsDropdown_nth_laborbillingrate_search"]');
    await expect.soft(divElement).toBeVisible();
    await divElement.click();
    await page.waitForTimeout(2000);
    const laborBillingRateTag = page.locator('[data-id="nth_laborbillingrate.fieldControl-LookupResultsDropdown_nth_laborbillingrate_selected_tag_text"]');
    await expect.soft(laborBillingRateTag).toHaveText('BRS-2019 Nashville');
    await laborBillingRateTag.click();
    await page.waitForTimeout(2000);
    const effectiveFromDate = await page.locator('input[aria-label="Date of Effective From"]').getAttribute('value');
    const effectiveUntilDate = await page.locator('input[aria-label="Date of Effective Until"]').getAttribute('value');
    const fromDate = new Date(effectiveFromDate!);
    const untilDate = new Date(effectiveUntilDate!); 
    let condition= false;  
        if (checkdate >= fromDate && checkdate <= untilDate) {
            condition = true;
        } 
        await expect(condition).toBe(true);
    }
);
