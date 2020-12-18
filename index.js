const puppeteer = require('puppeteer');

const tzButtonSelector = '.css-cwglb1';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://tzbutton.io/', { waitUntil: 'networkidle2' })
  await page.waitForSelector(tzButtonSelector)
  await page.click(tzButtonSelector)
  await page.screenshot()

  await browser.close();
})();