test('проверка поиска товара на nsv.by', async () => {
    const {Builder, By, Key, until, Browser} = require('selenium-webdriver');

    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('https://nsv.by/');

    await driver.findElement(By.id('title-search-input_fixed-2')).sendKeys('xiaomi mi tv a2', Key.RETURN)
    await driver.wait(until.elementLocated(By.className('counter_wrapp ')), 10000);

    const searchResults = await driver.findElements(By.className('counter_wrapp '));
    console.log('Количество результатов поиска:', searchResults.length);
    await driver.quit();

}, 40000);


test('test search in google', async () => {
    const { Builder, By, Key, until, Browser } = require('selenium-webdriver');

    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('https://www.google.com')
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    } finally {
        await driver.quit()
    }
}, 300000);

