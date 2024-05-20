const { By, until} = require('selenium-webdriver');
const Page = require('./Page');

class PageOneNews extends Page {
    constructor(driver) {
        super(driver);

        this.headingNews = By.css('h1');

    }

    async getTitleNews() {
        const searchResults = await this.driver.findElement(this.headingNews);

        return await searchResults.getText();
    }


}

module.exports = PageOneNews;