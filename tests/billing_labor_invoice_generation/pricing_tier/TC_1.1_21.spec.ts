import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;
const priceListSelected = "Sample01";
    
test('New Price List Item Calculation pricing tier', async({page}) => 
{   
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    showsPage = new ShowsPage(page); 
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.getByLabel('New', { exact: true }).click();
    await page.getByLabel('Price List, Lookup', { exact: true }).click();
    await page.getByLabel('Search records for Price List').click();
    await page.getByText(priceListSelected).click();
    await page.waitForLoadState('load');
    await page.getByText(priceListSelected).first().click();
    await page.waitForLoadState('load');
    await expect.soft(page.getByText("Unsaved changes")).toBeVisible();
    await expect.soft(page.getByText("Save and continue")).toBeVisible();
    await expect.soft(page.getByText("Discard changes")).toBeVisible();
    await page.getByRole('button', { name: 'Discard changes' }).click();
    await page.waitForLoadState('load');
    var priceName = await page.getByLabel("Name").inputValue();
    expect.soft(priceName).toBe(priceListSelected);
    const currencyValue = await page.locator("div[data-id='transactioncurrencyid-FieldSectionItemContainer']").innerText();
    expect.soft(currencyValue).toContain('US Dollar');
    const timeValue = await page.getByRole('list', { name: 'Time Unit' }).innerText();
    expect.soft(timeValue).toBe("Hour");
    await expect.soft(page.getByText("Description")).toBeVisible();
    await page.getByTitle("Price List Items").first().click();
    await page.waitForLoadState('load');
    await expect.soft(page.locator("div[data-testid='productid']")).toBeVisible();
    await expect.soft(page.getByText('New Price List Item')).toBeVisible();
    await page.getByText('New Price List Item').click();
    await expect.soft(page.getByText("General").last()).toBeVisible();
    await page.waitForLoadState('load');
    await expect.soft(page.getByLabel("Pricing information").first()).toBeVisible();
    await expect.soft(page.getByLabel(priceListSelected, { exact: true })).toBeVisible();
    await expect.soft(page.getByText("Product").last()).toBeVisible();
    await page.getByLabel("Product, Lookup").first().fill('Washers')
    await page.getByText("Washers").first().click();
    await expect.soft(page.getByText("Unit").last()).toBeVisible();
    await expect.soft(page.getByRole('link', {name: 'EA'})).toBeVisible();
    await expect.soft(page.getByLabel("Category").last()).toBeVisible();
    await page.getByLabel('Category', { exact: true }).click();
    await page.getByRole('option', { name: 'Booth Kits' }).click();
    await expect.soft(page.getByText("Currency").first()).toBeVisible();
    await expect.soft(page.getByTitle('US Dollar')).toBeVisible();
    await expect.soft(page.getByText("Discount List").last()).toBeVisible();
    await expect.soft(page.getByText("Quantity Selling Option").last()).toBeVisible();
    await expect.soft(page.getByText("No Control")).toBeVisible();
    await page.getByRole('tab', { name: 'Pricing information' }).click();
    await page.waitForLoadState('load');
    await expect.soft(page.locator("section[data-id='pricing']")).toBeVisible();
    await expect.soft(page.getByText('Pricing Method')).toBeVisible();
    await expect.soft(page.getByText('Currency Amount')).toBeVisible();
    await expect.soft(page.locator("div[data-id='amount-FieldSectionItemContainer']")).toBeVisible();
    await page.getByLabel('Amount', { exact: true }).click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('400');

    await page.getByLabel('Advance', { exact: true }).click();
    await page.getByLabel('Advance', { exact: true }).click();
    await page.getByLabel('Advance', { exact: true }).fill('67');
    await page.getByRole('heading', { name: 'Pricing', exact: true }).click();
    await page.getByLabel('Floor').click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('89');
    await page.getByLabel('Pricing Tier').first().click();
    //await page.getByLabel('% Up').click();
    await expect.soft(page.getByTitle('24.72')).toBeVisible()
    

    await page.getByLabel('Advance', { exact: true }).click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('54');
    await page.getByLabel('Floor').click();
    await page.getByPlaceholder('Provide a number').fill('0');
    await page.getByLabel('Pricing Tier').first().click();
    //await page.getByLabel('% Up').click();
    await expect.soft(page.getByTitle('0.00').last()).toBeVisible()
    
    await page.getByLabel('Advance', { exact: true }).click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('0');
    await page.getByLabel('Floor').click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('100');
    await page.getByLabel('Pricing Tier').first().click();
    //await page.getByLabel('% Up').click();
    //await expect.soft(page.getByTitle('1.00')).toBeVisible()   //BUG

    await page.getByLabel('Advance', { exact: true }).click();
    await page.getByPlaceholder('Provide a number').click();
    await page.getByPlaceholder('Provide a number').fill('93');
    await page.getByLabel('Floor').click();
    await page.getByPlaceholder('Provide a number').fill('94');
    await page.getByLabel('Pricing Tier').first().click();
    //await page.getByLabel('% Up').click();
    await expect.soft(page.getByTitle('1.06')).toBeVisible()

});