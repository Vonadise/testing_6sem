const { Builder, By, Key, until } = require('selenium-webdriver');
const MainPage = require('../pages/MainPage');
const OtzyvyPage = require('../pages/OtzyvyPage');

describe('Проверка поиска товара на antenka.by', () => {
    let driver;
    let mainPage;
    let otzyvyPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        mainPage = new MainPage(driver);
        otzyvyPage = new OtzyvyPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Поиск товара', async () => {
        await mainPage.open();
        await mainPage.clickToOtzyvy();
        await otzyvyPage.enteringName("Максим");
        await otzyvyPage.enteringPhone("222222222");
        await otzyvyPage.enteringReview("Заказал холодильник, всё привезли во время.");
        await otzyvyPage.clickStar();
        await otzyvyPage.clickSend();
        await otzyvyPage.checkReview();
    }, 60000);
});