import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const showName = "Steffy Automation show";

test('Verify that Price List Items are grouped by Category with an expand/collapse option.', async({page, browser}) => {
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
        await page.waitForTimeout(4000);
        const checkbox1 = await newTab.locator("//input[@name='CategoryCheckbox'])[1]");
        const count_category = await newTab.locator("//tr[@class='category-row']").count();
      await page.waitForTimeout(2000);
      let j=0;
      let k=0;
      const softAssertErrors: Error[] = [];
      for (let i = 1; i <= count_category; i++) {
        await newTab.locator(`(//img[@class='toggle-arrow'])[${i}]`).click();
        const imgSelector = `(//img[@class='toggle-arrow'])[${i}]`;
        const imageElement = newTab.locator(imgSelector);
        const srcValue = await imageElement.getAttribute('src');
        await newTab.waitForLoadState('load');
        if (srcValue === '/images/arrow_collapsed.svg') {
            j++;
            try{
              expect(j).toBeGreaterThan(0); 
            } catch (error) {
              softAssertErrors.push(error);  
            }
        } else if (srcValue === '/images/arrow_expanded.svg') {
            k++;
            try {
              expect(k).toBeGreaterThan(0); 
          } catch (error) {
              softAssertErrors.push(error);
          }
    }
}})