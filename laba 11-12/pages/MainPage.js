const { By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class MainPage extends Page {
    constructor(driver) {
        super(driver);

        this.searchInput = By.className('form-control');
        this.searchResults = By.className('panel-body');
        this.buttonRefrigerators = By.id('menu-item-5044264');
        this.buttonOpenOtzyvy = By.css('a[href="https://antenka.by/otzyvy/"]');
        this.buttonOpenOMagazine = By.css('a[title="О магазине"]');
        this.buttonOpenNews = By.css('a[title="Новости"]');
    }

    async open() {
        await this.driver.get('https://antenka.by/');
    }

    async searchForItem(keyword) {
        let searchInput = await this.driver.findElement(this.searchInput);
        await searchInput.sendKeys(keyword, Key.RETURN);
        await this.driver.wait(until.elementLocated(this.searchResults), 20000);
        await this.sleep(3000);
    }

    async clickToRefrigerators() {
        const element = await this.driver.findElement(this.buttonRefrigerators);
        await element.click();
    }

    async clickToOtzyvy() {
        const element = await this.driver.findElement(this.buttonOpenOtzyvy);
        await element.click();
    }

    async clickToButtonOpenOMagazine() {
        const element = await this.driver.findElement(this.buttonOpenOMagazine);
        await element.click();
    }

    async clickToButtonOpenNews() {
        const element = await this.driver.findElement(this.buttonOpenNews);
        await element.click();
        this.sleep(3000);
    }

}

module.exports = MainPage;