import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Steffy Automation show";

test('verify if Price list tool is redirected to a page and list is showing', async({page, browser}) => {
    await page.goto(orgURL);
    page.setViewportSize({ width: 1536, height: 864 });
    showsPage = new ShowsPage(page);
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
        await page.waitForTimeout(4000);
        const checkbox = newTab.locator('#checkboxAll');
        await expect.soft(checkbox).toBeVisible();
        await checkbox.click();
        const checkbox1 = await newTab.locator("(//input[@name='CategoryCheckbox'])[1]")
        const count = await newTab.locator("//input[@name='CategoryCheckbox']").count();
      let j=0;
      let k=0;
      for (let i = 1; i <= count; i++) {
        const checkboxSelector = `(//input[@name='CategoryCheckbox'])[${i}]`;
          if (await checkbox.isChecked()) {
              j++;
          } else {
              k++;
          }
      }
      expect.soft(j).toBe(count);
})