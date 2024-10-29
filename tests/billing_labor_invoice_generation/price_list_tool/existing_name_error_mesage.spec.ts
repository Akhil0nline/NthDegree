import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Steffy Automation show";

test('Verify that existing name is entered as price list name an error message is displayed', async({page, browser}) => {
    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(2000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load")
    await page.getByText(showName).first().click();
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    await page.waitForTimeout(2000);
    const iframe = page.frameLocator('#WebResource_PriceListTool');
    const button = iframe.locator('button:has-text("Price List Tool")');
    await page.waitForTimeout(3000);
    let condition= false;
    if (await button.isVisible()) {
      iframe.locator('button:has-text("Price List Tool")').click()
      const [newTab] = await Promise.all([
          page.waitForEvent('popup'),        
        ]);
        await page.waitForTimeout(2000);
        const input = newTab.locator('#pricelist-name');
        await input.click(); 
        await page.waitForTimeout(2000);
        await input.fill('new value');
        const saveButton = newTab.locator('.btn-save-container >> .btn-save'); 
        await expect.soft(saveButton).toBeVisible();
        await page.waitForTimeout(2000);
        await saveButton.click();
        newTab.on('dialog', async (dialog) => {
          if (dialog.message() === "You haven't made any changes!") {
              await expect.soft(dialog.accept());
          }});
        }})

        




