const puppeteer = require('puppeteer')

async function cheking1xStart() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    let frameHandle
    let frame
    let payUrl
    const mirrorUrl = 'https://1xlite-723996.top/ru'
    const methodChekingArray = []
    // const methodArray = ['visa: ', 'mastercard: ', 'mir: ', 'maestro: ']
    const methodArray = ['visa: ', 'maestro: ']
    const result = [];

    await page.goto(mirrorUrl)
    await new Promise(resolve => setTimeout(resolve, 7000));
    await getLoginWindow()
    // await inputLoginAcc()
    await takeUrlForMethod('visa')
    // await page.goto(mirrorUrl)
    // await takeUrlForMethod('mastercard')
    // await page.goto(mirrorUrl)
    // await takeUrlForMethod('mir')
    await page.goto(mirrorUrl)
    await takeUrlForMethod('maestro')

    for (i = 0; i < methodArray.length; i++) {
        result.push(methodArray[i]+methodChekingArray[i])
    }

    await browser.close()
    return result.join('\n')

    async function takeUrlForMethod(method) {
        await new Promise(resolve => setTimeout(resolve, 9000));
        await goToPaymentMethodWindow()
        await new Promise(resolve => setTimeout(resolve, 7000));
        await iFrameMethodCheck(method)
        await new Promise(resolve => setTimeout(resolve, 7000));
        await iFrameCondition()
        await new Promise(resolve => setTimeout(resolve, 7000));

        const curPayUrl = page.url();
        payUrl = curPayUrl.split("/").slice(2, 3).toString();
        methodChekingArray.push(payUrl)
        // await page.screenshot({ path: 'exemplse.png' })
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    async function iFrameCondition() {
        if (await frame.$('#first_name')) {
            await frame.type('#first_name', 'Ivan');
        }

        if (await frame.$('#last_name')) {
            await frame.type('#last_name', 'Lastov')
        }

        if (await frame.$('#phone_number')) {
            await frame.type('#phone_number', '9155832922');
        }

        if (await frame.$('#email')) {
            await frame.type('#email', 'ivanlastov@gmail.com');
        }

        await frame.click('#deposit_button')
    }

    // async function inputLoginAcc() {
    //      findElementOnValueAndClick('.caption__label', 'Регистрация')
    //      findElementOnValueAndClick('.caption__label', 'В 1 клик')
    //      new Promise(resolve => setTimeout(resolve, 5000));
    //      findElementOnValueAndClick('.caption__label', 'Зарегистрироваться')
    //      findElementOnValueAndClick('.registration-field-checkbox__label', 'Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь с ')
    // }

    async function getLoginWindow() {
        findElementOnValueAndClick('.caption__label', 'Вход');

        await new Promise(resolve => setTimeout(resolve, 7000));

        await page.click('#username');
        await page.type('#username', '584434565');

        await page.click('#username-password');
        await page.type('#username', 'zs6nzmt5');

        findElementOnValueAndClick('.caption__label', 'Войти')
    }

    async function goToPaymentMethodWindow() {
        await page.goto(mirrorUrl + '/office/recharge')
    }

    async function iFrameMethodCheck(method) {
        frameHandle = await page.$("#payments_frame");
        frame = await frameHandle.contentFrame();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await frame.click(`[data-icon=${method}]`)
    }

    async function findElementOnValueAndClick(elm, value) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const elements = await page.$$(elm);
        for (let element of elements) {
          const text = await element.evaluate(node => node.textContent);
          if (text.trim() === value) {
            await element.click();
            break;
          }
        }
    }

}

module.exports = cheking1xStart