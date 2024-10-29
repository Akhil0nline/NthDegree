import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';


const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
const priceListToolURL = 'https://dev.planning.nthdegree.com/PriceListTool?id=18f87dec-9e76-ef11-a670-7c1e520b5775&priceListId=d5dd1057-de5e-ef11-bfe2-000d3a8edc33&priceListName=Fern%20Default&templatePriceList=Yes';
const showName = "A Show created for the testing purposes";
let advanceAmount: string | number;
let floorAmount: string | number;
let percentUpAmount: any;
const floorValues = [1000,2000,3000];


test('Floor calculation on Price List Tool should be correctly displayed', async({page}) => 
{   
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Active Shows').first()).toBeVisible();
    await page.getByPlaceholder('Filter by keyword').first().click();
    await page.getByPlaceholder('Filter by keyword').fill(showName);
    await page.waitForTimeout(5000);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("load")
    await page.getByText(showName).first().click();
    await page.getByRole('tab', { name: 'Show Setup' }).click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.locator('iframe[title="Price List Tool"]').contentFrame().getByRole('button', { name: 'Price List Tool' }).click();
    const page1 = await page1Promise;
    await page1.goto(priceListToolURL);
    await page1.getByRole('row', { name: 'Toggle Booth Kits -' }).getByRole('img').click();
    await page.waitForTimeout(2000);

for (let i = 1; i <= floorValues.length; i++) {
    await page1.locator('td[name="ProductFloor"]').nth(i).click();
    await page1.locator('td[name="ProductFloor"]').nth(i).fill(floorValues[i - 1].toString());
    floorAmount = await page1.locator('td[name="ProductFloor"]').nth(i).innerText();
    floorAmount = floorAmount.replace('$', '');
    if (floorAmount.includes(',')) {
        floorAmount = floorAmount.replace(',', '');
    }
    floorAmount = Number(floorAmount);

    advanceAmount = await page1.locator('td[name="ProductAdvance"]').nth(i).innerText();
    advanceAmount = advanceAmount.replace('$', '');
    advanceAmount = Number(advanceAmount);

    percentUpAmount = await page1.locator('td[name="Product%Up"]').nth(i).innerText();
    percentUpAmount = percentUpAmount.replace('$', '').replace('%', '');
    percentUpAmount = Number(percentUpAmount);
    
    let expectedpercentUpValue = (floorAmount - advanceAmount) * 100 / advanceAmount;
    expectedpercentUpValue = Number(expectedpercentUpValue.toFixed(2));
    expect(expectedpercentUpValue).toBe(percentUpAmount);
}
    


});