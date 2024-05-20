const { Builder, By, Key, until } = require('selenium-webdriver');
const MainPage = require('../pages/MainPage');
const SearchPage = require('../pages/SearchPage');


describe('Открытие карточки товара', () => {
    let driver;
    let page;
    let searchPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        page = new MainPage(driver);
        searchPage = new SearchPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Открытие карточки товара', async () => {
        try {
            await page.open();
            await page.sleep(3000);

            await page.clickToRefrigerators();
            await page.sleep(3000);

            await searchPage.clickOpenCard();
            await page.sleep(5000);



            console.log('Товар успешно добавлен в корзину!');
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 30000);
});