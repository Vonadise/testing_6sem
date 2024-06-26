const { Builder, By } = require('selenium-webdriver');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class AntenkaPage {
    constructor(driver) {
        this.driver = driver;
        this.buttonRefrigerators = By.id('menu-item-5044264');
        this.buttonOpenCard = By.css('a[href="https://antenka.by/product/holodilnik-lg-gw-b509smum/"]');
    }

    async open() {
        await this.driver.get('https://antenka.by/');
    }


    async clickToRefrigerators() {
        const element = await this.driver.findElement(this.buttonRefrigerators);
        await element.click();
    }

    async clickOpenCard() {
        const element = await this.driver.findElement(this.buttonOpenCard);
        await element.click();
    }


}

describe('Открытие каточки товара', () => {
    let driver;
    let page;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        page = new AntenkaPage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Открытие каточки товара', async () => {
        try {
            await page.open();
            await sleep(1000);

            await page.clickToRefrigerators();
            await sleep(1000);

            await page.clickOpenCard();

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }, 60000);
});