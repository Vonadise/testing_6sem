const { By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class OtzyvyPage extends Page {
    constructor(driver) {
        super(driver);

        this.inputName = By.css('input[name="_comment_name"]');
        this.inputPhone = By.css('input[name="_comment_phone"]');
        this.textareaReview = By.css('textarea[name="_comment_text"]');
        this.gradeStar = By.css('label[for="star5"]');
        this.buttonSendReview = By.css('button[class="btn btn-primary btn-sm"]');
        this.textSuccess = By.css('p[class="text-success"]');

    }

    async enteringName(keyword) {
        let inputName = await this.driver.findElement(this.inputName);
        await inputName.sendKeys(keyword, Key.RETURN);
        await this.sleep(3000);
    }

    async enteringPhone(keyword) {
        let inputPhone = await this.driver.findElement(this.inputPhone);
        await inputPhone.sendKeys(keyword, Key.RETURN);
        await this.sleep(3000);
    }

    async enteringReview(keyword) {
        let textareaReview = await this.driver.findElement(this.textareaReview);
        await textareaReview.sendKeys(keyword, Key.RETURN);
        await this.sleep(3000);
    }

    async clickStar() {
        const element = await this.driver.findElement(this.gradeStar);
        await element.click();
    }

    async clickSend() {
        const element = await this.driver.findElement(this.buttonSendReview);
        await element.click();
    }

    async checkReview() {
        await this.driver.wait(until.elementLocated(this.textSuccess), 20000);

        const element = await this.driver.findElement(this.textSuccess);
        await element.click();
        this.sleep(5000);
    }




}

module.exports = OtzyvyPage;