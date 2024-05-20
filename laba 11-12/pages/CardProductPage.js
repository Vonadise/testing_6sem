const { By, until} = require('selenium-webdriver');
const Page = require('./Page');

class CardProductPage extends Page {
    constructor(driver) {
        super(driver);

        this.buttonAddToBasket = By.xpath('(//a[@data-notwherehouse="0"])[2]');
        this.buttonSubmit = By.xpath('(//button[@data-dismiss="modal"])');

    }

    async checkAddToBasket() {
        await this.driver.wait(until.elementLocated(this.buttonSubmit), 20000);
        const searchResult = await this.driver.findElement(this.buttonSubmit);

        return !!searchResult;
    }

    async addProductToBasket() {
        await this.driver.wait(until.elementLocated(this.buttonAddToBasket), 20000);
        const searchResult = await this.driver.findElement(this.buttonAddToBasket);
        await searchResult.click();

        await this.sleep(1000);

        return await this.checkAddToBasket();

    }


}

module.exports = CardProductPage;