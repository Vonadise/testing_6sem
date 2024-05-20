const {until, By, Key} = require("selenium-webdriver");


class Page {
    constructor(driver) {
        this.driver = driver;
    }

    async sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }

    async click(element) {
        await this.driver.click(element);
    }




}

module.exports = Page;