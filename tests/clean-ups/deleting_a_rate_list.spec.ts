import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let rateListName_payroll = "Automated Test-Payroll Rate List";

test('Shows page elements visibility', async({page}) => 
{   
    
    await page.goto(orgURL);
    
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.rateListsPage();
    await page.waitForLoadState("load");
    await page.getByPlaceholder('Filter by keyword').click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder('Filter by keyword').fill(rateListName_payroll);
    await page.getByPlaceholder('Filter by keyword').press('Enter');
    await page.waitForLoadState("load");


    await expect(page.getByLabel(rateListName_payroll)).toBeVisible();
    await page.getByText("Delete",  { exact: true })

});
