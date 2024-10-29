import { Page } from 'playwright';
import {test, expect} from '@playwright/test';

export class ShowsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCategory(categoryName: string) {
        await this.page.getByLabel('Category').click();
        await this.page.getByRole('option', { name: categoryName }).click();
        await this.verifySelectedCategory(categoryName);
    }

    private async verifySelectedCategory(expectedCategory: string) {
        const selectedCategory = await this.page.getByLabel('Category').innerText();
        expect(selectedCategory).toBe(expectedCategory);
        await this.page.waitForTimeout(1000);
    }
}