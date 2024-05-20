const { Builder, By, Key, until } = require('selenium-webdriver');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class AntenkaPage {
    constructor(driver) {
        this.driver = driver;
        this.searchInput = By.className('form-control');
        this.searchResults = By.className('panel-body');
    }

    async open() {
        await this.driver.get('https://antenka.by/');
    }

    async searchForItem(keyword) {
        let searchInput = await this.driver.findElement(this.searchInput);
        await searchInput.sendKeys(keyword, Key.RETURN);
        await this.driver.wait(until.elementLocated(this.searchResults), 20000);
        await sleep(3000);
    }

    async getSearchResultsCount() {
        const searchResults = await this.driver.findElements(this.searchResults);
        return searchResults.length;
    }
}

describe('Проверка поиска товара на antenka.by', () => {
    let driver;
    let antenkaPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        antenkaPage = new AntenkaPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Поиск товара', async () => {
        try {
            await antenkaPage.open();
            await antenkaPage.searchForItem('ХОЛОДИЛЬНИК ATLANT');
            const searchResultsCount = await antenkaPage.getSearchResultsCount();
            console.log('Количество результатов поиска:', searchResultsCount);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 30000);
});