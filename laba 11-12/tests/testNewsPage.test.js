const { Builder, By, Key, until } = require('selenium-webdriver');
const {assert} = require('chai');
const MainPage = require('../pages/MainPage');
const NewsPage = require('../pages/NewsPage');
const PageOneNews = require('../pages/PageOneNews');


describe('тестрование страницы новостей', () => {
    let driver;
    let mainPage;
    let newsPage;
    let pageOneNews;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        mainPage = new MainPage(driver);
        newsPage = new NewsPage(driver);
        pageOneNews = new PageOneNews(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Переход на страницу новостей', async () => {
        await mainPage.open();
        await mainPage.clickToButtonOpenOMagazine();
        await mainPage.clickToButtonOpenNews();

    }, 10000);

    test('проверка наличия новостей', async () => {
        await newsPage.open();
        assert.isTrue(await newsPage.isThereAnyNews());
        console.log("количество новстей на странице "+ await newsPage.getCountNews())
        await mainPage.sleep(3000);
    }, 10000)

    test('открытие новости и проверка что заголовок новостей на странице новостей соответствует заголовку в новости', async () => {
        const numberNews = 1;
        await newsPage.open();
        const titleNewsInMainNewsPage = await newsPage.getTitleNews(numberNews);
        await newsPage.openNews(numberNews);
        const titleNewsInNewsPage = await pageOneNews.getTitleNews();
        assert.isTrue(titleNewsInMainNewsPage===titleNewsInNewsPage);


    }, 10000)


});