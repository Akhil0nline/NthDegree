import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Steffy Automation show";

test('Verify the Cancel button functions well', async({page, browser}) => {
    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForLoadState('load');
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.getByText(showName).first().click();
    await page.waitForLoadState('load');
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    await page.waitForTimeout(2000);
    const iframe = page.frameLocator('#WebResource_PriceListTool');
    const button = iframe.locator('button:has-text("Price List Tool")');
    await expect.soft(button).toBeVisible();
    await page.waitForTimeout(4000);
    iframe.locator('button:has-text("Price List Tool")').click()
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),        
      ]);
      await newTab.waitForLoadState('load', { timeout: 30000 }); 
        const pageTitle = await newTab.title();
        const input = newTab.locator('#pricelist-name');
        const cancelImageButton = newTab.locator('#img-cancel');
        await expect(cancelImageButton).toBeVisible();
        await cancelImageButton.click();
        await newTab.close();
        const generalTab = page.locator('[aria-label="General"][role="tab"]');
        await expect(generalTab).toBeVisible();
      })