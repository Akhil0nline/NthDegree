import {test} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? ''; 
let navigateTo: NavigationPage;
test('verifying Invoices Page elements', async({page}) => {
    navigateTo = new NavigationPage(page);
    await page.goto(orgURL);
    await navigateTo.invoicesPage(); 
    await page.waitForTimeout(3000);
    await page.getByText('Editable Grid').isEnabled();
    await page.getByText('Show Chart').isEnabled();
    await page.getByLabel('Scheduling Tool', { exact: true }).isEnabled();
    await page.getByLabel('WIP Scheduling tool').isEnabled();
    await page.getByLabel('Override Base City').isEnabled();
    const buffer = await page.screenshot();
    await page.getByText('Refresh').isEnabled();
    await page.screenshot({path: 'test-results/screenshots/invoicePage/refreshButton.png'});
    console.log('refresh button screenshot is done');
    await page.getByText('Visualize this view').first().isVisible();
    await page.screenshot({path: 'screenshots/invoicePage/visualizeThisViewButton.png'});
    await page.getByLabel('Run Report').isVisible();
    await page.screenshot({path: 'screenshots/invoicePage/runReportButton.png'});
    await page.getByText('Excel Templates').isVisible();
    
})
