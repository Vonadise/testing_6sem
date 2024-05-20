const { By, until} = require('selenium-webdriver');
const Page = require('./Page');

class SearchPage extends Page {
    constructor(driver) {
        super(driver);
        this.searchResults = By.className('panel-body');
        this.buttonOpenCard = By.css('a[href="https://antenka.by/product/holodilnik-lg-gw-b509smum/"]');
    }


    async getSearchResultsCount() {
        const searchResults = await this.driver.findElements(this.searchResults);
        return searchResults.length;
    }

    async clickOpenCard() {
        const element = await this.driver.findElement(this.buttonOpenCard);
        await element.click();
    }
}

module.exports = SearchPage;