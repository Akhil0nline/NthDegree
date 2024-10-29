import {expect, test} from '@playwright/test';

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';

test('Scroll Down', async({page}) => {

    // await page.setViewportSize({width:1900, height:980}) //as big as my large screen in office
    // //await page.evaluate(() => document.body.style.zoom = 0.5  );
    await page.goto(orgURL);
    console.log("Test file nth degree loaded")
    //await page.locator('li[title="Go to home page"]').highlight();
    await page.click('li[title="Go to home page"]');
    console.log("home page click has been successfully done")
    await page.waitForTimeout(10000);
    await page.evaluate(() => {
        window.scrollBy(0, 100);
    })
    const element = page.getByText('Page 1').last();
    await element.scrollIntoViewIfNeeded();
    //await element.highlight();
    await expect(element).toBeVisible();
    
    console.log('scroll down is here')

});