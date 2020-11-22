const puppeteer = require('puppeteer');
const credentials = require('./credentials');
let username = process.argv[2];
let numOfPost = process.argv[3];

(async function () {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/accounts/login/');

    await page.waitForTimeout(5000);

    await page.type('[name=username]', credentials.username);
    await page.type('[name=password]', credentials.password);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click("button[type='submit']"),
    ]);
    await page.type("input[placeholder='Search']", username);
    await page.waitForSelector('.drKGC .fuqBx a', { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('.drKGC .fuqBx a'),
    ]);

    await page.waitForSelector('._9AhH0', { visible: true });

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('._9AhH0'),
    ]);
    let i = 0;
    do {
        await page.waitForSelector('.fr66n button');
        await page.click('.fr66n button');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('._65Bje.coreSpriteRightPaginationArrow'),
        ]);
        i++;
    } while (i < numOfPost);
    {
        await browser.close();
    }
})();
