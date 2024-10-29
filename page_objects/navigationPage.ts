import { Page } from "@playwright/test";

export class NavigationPage{

    readonly page: Page;

    constructor(page: Page){

        this.page = page;
    }

    async homePage(){await this.page.getByText('Home').click();}
    async recentsPage(){await this.page.getByText('Recents').click();}
    async pinnedPage(){await this.page.getByText('Pinned').click(); }
    async dashboardsPage(){await this.page.getByText('Dashboards').click();}
    async reportsPage(){await this.page.getByText('Reports').click();}
    async baseCitiesPage(){await this.page.getByText('Base Cities').click();}
    async opportunitiesPage(){ await this.page.getByText('Opportunities').click();}
    async workOrdersPage(){await this.page.getByText('Work Orders').first().click();}
    async accountsPage(){await this.page.getByText('Accounts').click();}
    async contactsPage(){await this.page.getByText('Contacts').first().click();}    
    async leadsPage(){await this.page.getByText('Leads').click();}
    async dailyTimePage(){await this.page.getByText('Daily Time').click();}
    async timeCardsPage(){ await this.page.getByText('Time Cards').click();}
    async signInPage(){await this.page.getByText('Sign In Page').click();}
    async resourcesPage(){await this.page.getByText('Resources').first().click();}
    async leadTravelRequestPage(){await this.page.getByText('Lead/Travel Requests').first().click();}
    async unionsPage(){await this.page.getByText('Unions').click();}
    async showsPage(){await this.page.getByText('Shows').first().click();}
    async showCitiesPage(){ await this.page.getByText('Show Cities').first().click();}
    async showMastersPage(){await this.page.getByText('Show Masters').first().click();}
    async venuesPage(){await this.page.getByText('Venues').click();}
    async invoicesPage(){await this.page.getByText('Invoices').last().click();}
    async laborRulesPage(){ await this.page.getByText('Labor Rules').click();}
    async rateListsPage(){await this.page.getByText('Rate Lists').click();}
    async vendorsPage(){await this.page.getByText('Vendors').click();}
    async purchasesPage(){await this.page.getByText('Purchases').click();}
    async purchaseReviewPage(){await this.page.getByText('Purchase Review').click();}
    async inventoryReviewPage(){await this.page.getByText('Inventory Review').click();}
    
}