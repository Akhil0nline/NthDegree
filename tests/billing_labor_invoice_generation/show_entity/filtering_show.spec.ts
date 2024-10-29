import {test, expect} from '@playwright/test';
import { NavigationPage } from '../../../page_objects/navigationPage';
import { ShowsPage } from '../../../page_objects/showsPage';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';
let showsPage: ShowsPage;

test('show_entity filtering newly created show and validating the data entered', async({page}) => {
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    const navigateTo = new NavigationPage(page);
    await navigateTo.showsPage();
    await page.waitForTimeout(5000);
    await page.getByPlaceholder('Filter by keyword').click();
    await page.getByPlaceholder('Filter by keyword').fill('Fern');
    await page.getByPlaceholder('Filter by keyword').press('Enter');
    await page.waitForLoadState("load");
    const nameLocator = page.locator("div[col-id='nth_name']");
    const count = await nameLocator.count();
    for (let n = 1; n < count; n++) {
        const innerTextName = await nameLocator.nth(n).innerText();
        expect.soft(innerTextName.toLowerCase()).toContain('fern'.toLowerCase());
        //console.log(await nameLocator.nth(n).innerText());
    }
})