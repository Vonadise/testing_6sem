const { By, until} = require('selenium-webdriver');
const Page = require('./Page');

class NewsPage extends Page {
    constructor(driver) {
        super(driver);
        this.headingNews = By.css('div[class="panel-heading"]');
        this.buttonsOpenNews = By.css('a[class="more-link btn btn-primary"]');
    }

    async open() {
        await this.driver.get('https://antenka.by/category/news/');
    }

    async checkReview() {
        await this.driver.wait(until.elementLocated(this.textSuccess), 20000);

        const element = await this.driver.findElement(this.textSuccess);
        await element.click();
        this.sleep(5000);
    }

    async getCountNews() {
        const searchResults = await this.driver.findElements(this.headingNews);
        return searchResults.length;
    }

    async isThereAnyNews() {
        const searchResults = await this.getCountNews();
        return searchResults>0;
    }

    async getTitleNews(numberNew) {
        const searchResults = await this.driver.findElements(this.headingNews);

        return await searchResults[numberNew].getText();
    }

    async openNews(numberNew) {
        const elements = await this.driver.findElements(this.buttonsOpenNews);

        await elements[numberNew].click();

    }


}

module.exports = NewsPage;