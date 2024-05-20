const { By, until} = require('selenium-webdriver');
const Page = require('./Page');

class BasketPage extends Page {
    constructor(driver) {
        super(driver);

        this.spanWithAmountProductsInBaskte = By.css('h2');

    }

    async open() {
        await this.driver.get('https://antenka.by/shop-cart/');
    }

    async checkProductsInBasket() {
        await this.driver.wait(until.elementLocated(this.spanWithAmountProductsInBaskte), 10000);
        const element = await this.driver.findElement(this.spanWithAmountProductsInBaskte);
        return Number((await element.getText()).replace("Корзина", "")) > 0;
    }


}

module.exports = BasketPage;