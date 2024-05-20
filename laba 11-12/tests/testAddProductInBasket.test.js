const { Builder, By, Key, until } = require('selenium-webdriver');
const {assert} = require('chai');
const MainPage = require('../pages/MainPage');
const CardProductPage = require('../pages/CardProductPage');
const SearchPage = require('../pages/SearchPage');
const BasketPage = require('../pages/BasketPage');


describe('Проверка добавления товаров в карзину', () => {
    let driver;
    let cardProductPage;
    let mainPage;
    let searchPage;
    let basketPage;


    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        mainPage = new MainPage(driver);
        cardProductPage = new CardProductPage(driver);
        searchPage = new SearchPage(driver);
        basketPage = new BasketPage(driver);

    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Проверка добавления товаров в карзину', async () => {
        await mainPage.open();
        await mainPage.clickToRefrigerators();
        await searchPage.clickOpenCard();
        assert.isTrue(await cardProductPage.addProductToBasket());
        await basketPage.open()
        assert.isTrue(await basketPage.checkProductsInBasket());
    }, 60000);
});