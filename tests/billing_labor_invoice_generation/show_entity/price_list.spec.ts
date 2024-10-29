import {test, expect} from '@playwright/test';
import { NavigationPage } from  '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
test('show_entity Verify existing Pricelist functionality is working fine', async({page}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    showsPage = new ShowsPage(page);
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await expect.soft(page.getByText('Active Shows').first()).toBeVisible();
    const searchField = await page.locator('#quickFind_text_1');
    await expect.soft(searchField).toBeVisible();
    await searchField.fill('Fern City Projects - TForce Seattle 2024');
    await page.waitForTimeout(1000);
    await searchField.press('Enter');
    await expect.soft(page.locator('text=Fern City Projects - TForce Seattle 2024').nth(0)).toBeVisible();
    await page.click('text=Fern City Projects - TForce Seattle 2024');
    await page.waitForTimeout(3000);
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await showSetupTab.click();
    const inputField = await page.locator('input[aria-label="Price List, Lookup"]');
    await page.waitForLoadState('load');
    await expect.soft(inputField).toBeVisible();
    await inputField.fill('fern');
    await page.waitForTimeout(3000);
    await inputField.press('Enter');
    await page.waitForLoadState('load');
    await expect.soft(page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]')).toBeVisible();
    await page.waitForLoadState('load');
    const ulElement = await page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]');
    await expect.soft(ulElement).toBeVisible();
    const liCount = await ulElement.locator('li').count();
    if (liCount == 0) {
    }
    for (let i = 0; i < liCount; i++) {
      const listItem = ulElement.locator('li').nth(i);
      await expect.soft(listItem).toBeVisible();
      
      const listItemText = await listItem.textContent();
      await expect.soft(listItemText).not.toBeNull();
    }
    });

test('verify all results are being present when you hit ENTER.', async({page}) => {
      await page.goto(orgURL);
      page.setViewportSize({ width: 1536, height: 864 });
      showsPage = new ShowsPage(page);
      const navigateTo = new NavigationPage(page);
      await navigateTo.showsPage();
      await expect.soft(page.getByText('Active Shows').first()).toBeVisible();
      const searchField = await page.locator('#quickFind_text_1');
      await searchField.fill('Fern City Projects - TForce Seattle 2024');
      await expect.soft(searchField).toBeVisible();
      await searchField.press('Enter');
      await expect.soft(page.locator('text=Fern City Projects - TForce Seattle 2024').nth(0)).toBeVisible();
      await page.click('text=Fern City Projects - TForce Seattle 2024');
      await page.waitForTimeout(2000);
      const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
      await expect.soft(showSetupTab).toBeVisible();
      await showSetupTab.click();
      await page.waitForTimeout(2000);
      const inputField =page.locator('input[aria-label="Price List, Lookup"]');
      await page.waitForLoadState('load');
      await expect.soft(inputField).toBeVisible();
      await inputField.press('Enter');
      await page.waitForLoadState('load');
      await expect.soft(page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]')).toBeVisible();
      await page.waitForLoadState('load');
      const ulElement = await page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]');
      const liCount = await ulElement.locator('li').count();
      await expect.soft(liCount).toBeGreaterThan(0);  
      for (let i = 0; i < liCount; i++) {
        const listItem = ulElement.locator('li').nth(i);
        await expect.soft(listItem).toBeVisible();
        const listItemText = await listItem.textContent();
        await expect.soft(listItemText).not.toBeNull();
    }    
  });

test('show_entity when you magnifying glass, then you should see all results as list.', async({page}) => {
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1536, height: 864 });
    showsPage = new ShowsPage(page);
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await expect.soft(page.getByText('Active Shows').first()).toBeVisible();
    const searchField = await page.locator('#quickFind_text_1');
    await searchField.fill('Fern City Projects - TForce Seattle 2024');
    await expect.soft(searchField).toBeVisible();
    await searchField.press('Enter');
    await expect.soft(page.locator('text=Fern City Projects - TForce Seattle 2024').nth(0)).toBeVisible();
    await page.click('text=Fern City Projects - TForce Seattle 2024');
    await page.waitForLoadState('load');
    const showSetupTab = page.locator('[data-id="tablist-SHOW_SETUP_TAB"]');
    await expect.soft(showSetupTab).toBeVisible();
    await showSetupTab.click();
    const searchButton = await page.locator('button[aria-label="Search records for Price List, Lookup field"]');
    await expect.soft(searchButton).toBeVisible();
    await searchButton.click();
    await page.waitForLoadState('load');
    const lookupResults = page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]');
    await expect.soft(lookupResults).toBeVisible();
    const ulElement = await page.locator('div[aria-label="Price List Lookup results"] ul[aria-label="Lookup results"]');
    const liCount = await ulElement.locator('li').count();
    await expect.soft(liCount).toBeGreaterThan(0);  
    for (let i = 0; i < liCount; i++) {
      const listItem = ulElement.locator('li').nth(i);
      await expect.soft(listItem).toBeVisible();
      const listItemText = await listItem.textContent();
      await expect.soft(listItemText).not.toBeNull();
  }     
});











