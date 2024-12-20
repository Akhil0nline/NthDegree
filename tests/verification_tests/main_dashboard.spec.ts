import {expect, test} from '@playwright/test';
import { NavigationPage } from '../../page_objects/navigationPage';
const orgURL = process.env.DYN365_TEST_ORG_URL ?? ''; 
let navigateTo: NavigationPage;
test('verifying main Dashboard elements', async({page}) => {
    navigateTo = new NavigationPage(page);
    await page.goto(orgURL);
    page.setViewportSize({ width: 1800, height: 1500 });
    await page.waitForTimeout(7000);
    await expect(page.getByText("Home")).toBeVisible();
    await expect(page.getByText("Pinned")).toBeVisible();
    await expect(page.getByText("Recent")).toBeVisible();
    await expect(page.getByText("Dashboards")).toBeVisible();
    await expect(page.getByText("Reports")).toBeVisible();
    await expect(page.getByText("Base Cities")).toBeVisible();
    await expect(page.getByText("Accounts")).toBeVisible();
    await expect(page.getByText("Contacts")).toBeVisible();
    await expect(page.getByText("Leads").first()).toBeVisible();
    await expect(page.getByText("Opportunities")).toBeVisible();
    await expect(page.getByText("Work Orders").first()).toBeVisible();
    await expect(page.getByText("Daily Time")).toBeVisible();
    await expect(page.getByText("Time Cards")).toBeVisible();
    await expect(page.getByText("Sign In Page")).toBeVisible();
    await expect(page.getByText("Resources").first()).toBeVisible();
    await expect(page.getByText("Lead/Travel Requests").first()).toBeVisible();
    await expect(page.getByText("Show Cities")).toBeVisible();
    await expect(page.getByText("Unions")).toBeVisible();
    await expect(page.getByText("Shows").first()).toBeVisible();
    await expect(page.getByText("Show Masters")).toBeVisible();
    //await expect(page.getByText("Invoices").first()).toBeVisible();
    await expect(page.getByText("Venues")).toBeVisible();
    //await expect(page.getByText("Rate Lists")).toBeVisible();
    //await expect(page.getByText("Vendors")).toBeVisible();
    //await expect(page.getByText("Labor Rules")).toBeVisible();
    await expect(page.getByText("Accounting")).toBeVisible();
    await expect(page.getByText("Show Management")).toBeVisible();
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.getByText("Purchases")).toBeVisible();
    await expect(page.getByText("Purchase Review")).toBeVisible();
    await expect(page.getByText("Inventory Review")).toBeVisible();
    await expect(page.getByText("Service")).toBeVisible();
    await expect(page.getByText("Texting")).toBeVisible();
    await expect(page.getByText("Cases")).toBeVisible();
    await expect(page.getByText("Save As")).toBeVisible();
    await expect(page.getByText("New").nth(5)).toBeVisible();
    await expect(page.getByText("Set As Default")).toBeVisible();
    await expect(page.getByText("WIP").first()).toBeVisible();
    await expect(page.getByText("Scheduling Tool").nth(1)).toBeVisible();
    await expect(page.getByText("Override Base City").first()).toBeVisible();
    await expect(page.getByText("Availability Report")).toBeVisible();
    await expect(page.getByText("Refresh All").first()).toBeVisible();
    await expect(page.getByText("Share")).toBeVisible();
    await expect(page.getByText("New look")).toBeVisible();
    await expect(page.getByLabel("Search")).toBeVisible();
    await expect(page.getByLabel("Assistant")).toBeVisible();
    await expect(page.getByLabel("Create New Record. New")).toBeVisible();
    await expect(page.getByLabel("Advanced Find")).toBeVisible();
    await expect(page.getByLabel("Settings")).toBeVisible();
    await expect(page.getByLabel("Help")).toBeVisible();
    //await expect(page.getByLabel("Account manager for Zeliha Test")).toBeVisible();
    await expect(page.getByText("Anaheim Shows")).toBeVisible();
    await expect(page.getByText("Anaheim Work Orders")).toBeVisible();
    await expect(page.getByText("San Francisco Shows")).toBeVisible();
    await expect(page.getByText("San Francisco Work Orders")).toBeVisible();   
})
