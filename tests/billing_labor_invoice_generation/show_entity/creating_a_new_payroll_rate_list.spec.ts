import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let rateListName = "Automated Test-Payroll Rate List";
let type = "Payroll";
let start_time ="9/2/2024";
let end_time = "12/30/2024";
let base_city = "Boston";
let show_city = "Chicago";
let union = "Boston Teamsters";
let st = "10"
let ot = "20";
let dt= "50";
let default_pay_rate = "25";
let default_LPMCC = "Hello World";
let default_description = "this is being used for automation testing purposes";


test.skip('Creating a new Rate List - Type: Payroll', async({page}) => 
{   
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.rateListsPage();
    await page.getByLabel('New', { exact: true }).click();
    await page.waitForLoadState("load");
    await page.getByLabel('Rate List Name').click();
    await page.getByLabel('Rate List Name').fill(rateListName);
    await page.waitForLoadState("load");
    await page.getByLabel('Type').click();
    await page.getByRole('option', { name: type }).click();
    await page.waitForLoadState("load");
    await page.getByLabel('Union, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for Union').fill(union);
    await page.waitForTimeout(1000);
    await page.getByText(union).first().click();
    await page.getByLabel('Date of Effective From').first().fill(start_time);
    await page.getByLabel('Date of Effective Until').first().fill(end_time);
    await page.waitForLoadState("load");
    await page.getByLabel('Estimate Description').click();
    await page.getByLabel('Estimate Description').fill(default_description);
    await page.waitForTimeout(2000);
    const dialog = page.getByRole('dialog').first();
    if (await dialog.isVisible()) 
        {
    await page.getByTitle('OK', { exact: true }).last().click();
    await page.getByLabel('Date of Effective From').first().fill(start_time);
    await page.getByLabel('Date of Effective Until').first().fill(end_time);
        }
    await page.getByTitle('OK', { exact: true }).last().click();
    await page.getByLabel('Base City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for Base City').fill(base_city);
    await page.waitForTimeout(1000);
    await page.getByText(base_city).click();
    await page.getByLabel('Show City, Lookup', { exact: true }).click();
    await page.getByPlaceholder('Look for Show City').fill(show_city);
    await page.waitForTimeout(1000);
    await page.getByText(show_city).first().click();
    await page.getByLabel('Rates').click();
    await page.getByLabel('Standard Time Rate').click();
    await page.getByPlaceholder('Provide a number').fill(st);
    await page.waitForLoadState("load");
    await page.getByLabel('Overtime Rate').click();
    await page. getByLabel('Overtime Rate').fill(ot);
    await page.waitForLoadState("load");
    await page.getByLabel('Double Time Rate').click();
    await page.getByPlaceholder('Provide a number').fill(dt);
    await page.waitForTimeout(1000);
    await page.getByLabel('Default Pay Rate', { exact: true }).click();
    await page.getByPlaceholder('Provide a number').fill(default_pay_rate);
    await page.waitForTimeout(2000);
    await page.getByLabel('Default LPMCC').click();
    await page.getByLabel('Default LPMCC').fill(default_LPMCC);
    await page.waitForTimeout(2000);
    await page.getByLabel('Default Description').click();
    await page.getByLabel('Default Description').fill(default_description);
    await page.waitForLoadState("load");
    await page.getByLabel('Save & Close').click();
    await page.waitForTimeout(8000);
    await page.getByPlaceholder('Filter by keyword').click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Filter by keyword').fill(rateListName);
    await page.getByPlaceholder('Filter by keyword').press('Enter');
    await page.waitForLoadState("load");
    await expect(page.getByLabel(rateListName)).toBeVisible();
});
