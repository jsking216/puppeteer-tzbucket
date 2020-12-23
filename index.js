const puppeteer = require('puppeteer');

const tzButtonSelector = 'img[alt="TzButton - click to participate"]';
const winnerButtonSelector = 'button[colorScheme="green"]'
const timerSelector = '.chakra-text.css-1aq9v0y'
let done = false;
let loopcount = 0;

function delay(timeInSeconds) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, timeInSeconds * 1000);
  });
}

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://tzbutton.io/', { waitUntil: 'networkidle2' });
  await page.waitForSelector(timerSelector);
  
  // loop this
  while (!done) {
    const timerVal = await page.$eval(timerSelector, el => el.innerText);
    const asArray = timerVal.split(':');
    if(asArray[0] === '00' && asArray[1] === '00') {
      // check for winning element
      if (await page.$(winnerButtonSelector) !== null) {
        await page.click(winnerButtonSelector);
        done = true;
        continue;
      }
      console.log(`${new Date().toUTCString()}: click time!`);
      await page.click(tzButtonSelector);
    } else {
      if (loopcount % 360 === 0)
        console.log(`${new Date().toUTCString()}: 1 hour has passed - not clicking!`);
    }
    await delay(10);
    const updatedTimerVal = await page.$eval(timerSelector, el => el.innerText);
    const updatedArray = updatedTimerVal.split(':');
    if(updatedArray[0] === '00' && updatedArray[1] === '00' && updatedArray[2] === '00') {
      done = true;
      console.log(`Timer ran out at: ${new Date().toUTCString()}`);
    }
    loopcount = loopcount + 1;
  }
  await page.screenshot({ path: 'tzScreenshot.png'});
})();