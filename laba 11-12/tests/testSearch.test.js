const { Builder, By, Key, until } = require('selenium-webdriver');
const MainPage = require('../pages/MainPage');
const SearchPage = require('../pages/SearchPage');

describe('Проверка поиска товара на antenka.by', () => {
    let driver;
    let mainPage;
    let searchPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        mainPage = new MainPage(driver);
        searchPage = new SearchPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Поиск товара', async () => {
        await mainPage.open();
        await mainPage.searchForItem('ХОЛОДИЛЬНИК ATLANT');
        const searchResultsCount = await searchPage.getSearchResultsCount();
        console.log('Количество результатов поиска:', searchResultsCount);
    }, 30000);
});