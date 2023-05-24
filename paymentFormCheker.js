const puppeteer = require('puppeteer')

async function cheking1xStart(bettingUrl) {
    const browser = await puppeteer.launch(
        {
            headless: true,
            args: ['--no-sandbox'],
        }
    )
    const page = await browser.newPage()

    await page.setViewport({
        width: 1200,
        height: 700
    });


    let frameHandle
    let frame
    let payUrl
    const mirrorUrl = bettingUrl
    const methodChekingArray = []
    const methodArray = ['visa: ', 'mastercard: ', 'mir: ', 'maestro: ']
    const result = [];

    try {

    await loginVKacc()

    await page.goto(mirrorUrl)
    await new Promise(resolve => setTimeout(resolve, 7000));
    await getLoginWindow()
    await takeUrlForMethod('visa')
    await page.goto(mirrorUrl)
    await takeUrlForMethod('mastercard')
    await page.goto(mirrorUrl)
    await takeUrlForMethod('mir')
    await page.goto(mirrorUrl)
    await takeUrlForMethod('maestro')

    for (i = 0; i < methodArray.length; i++) {
        result.push(methodArray[i] + methodChekingArray[i])
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
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    async function iFrameCondition() {
        if (await frame.$('#fullname')) {
            await frame.type('#fullname', 'Ivan Lastov');
        }

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

    async function getLoginWindow() {
        findElementOnValueAndClick('.caption__label', 'Вход');

        await new Promise(resolve => setTimeout(resolve, 7000));

        await page.click('.ico--vk');

        await new Promise(resolve => setTimeout(resolve, 5000));
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

    async function loginVKacc() {
        await page.goto('https://vk.com/')
        await page.waitForSelector('#index_email')
        await page.click('#index_email')
        await page.type('#index_email', '~EMAIL~')

        findElementOnValueAndClick('.FlatButton__content', 'Войти')
        await new Promise(resolve => setTimeout(resolve, 7000));
        await page.type('[name="password"]', 'Test10Code')
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.click('.vkuiButton__in')
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
} catch {
    console.error('123');
    await browser.close()
}
}

module.exports = cheking1xStart
