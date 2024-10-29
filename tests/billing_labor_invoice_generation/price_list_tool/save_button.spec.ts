import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
import{faker} from '@faker-js/faker/locale/en'
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Steffy Automation show";
test('Verify the SAVE button functions well', async({page, browser}) => {
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
      await newTab.waitForLoadState('load');
        const pageTitle = await newTab.title();
        const input = newTab.locator('#pricelist-name');
        await input.clear();
        const username = faker.internet.userName();
        await input.fill(username);
        await newTab.waitForTimeout(2000);
        const saveButton = newTab.locator('.btn-save-container >> .btn-save'); 
        await expect.soft(saveButton).toBeVisible();
        await saveButton.click();
        newTab.on('dialog', async (dialog) => {
          if (dialog.message() === 'Price list updated successfully') {
            await expect.soft(dialog.message()).toBe('Price list updated successfully');
            await dialog.accept();
          }
      })
      await newTab.waitForTimeout(2000);
      await newTab.reload();      
      await newTab.waitForTimeout(2000);
      await expect.soft(input).toHaveValue(username);
      console.log("Test passed")
    })