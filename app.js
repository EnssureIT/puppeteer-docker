const puppeteer = require('puppeteer');

(async () => {
  //Needed code
  const browser = await puppeteer.launch(
    {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  );

  //Only for example
  const page = await browser.newPage();
  await page.goto('https://developers.google.com/web/');

  await page.type('.devsite-searchbox input', 'Headless Chrome');
  const allResultsSelector = '.devsite-suggest-all-results';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);
  const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
  await page.waitForSelector(resultsSelector);
  const links = await page.evaluate((resultsSelector) => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map((anchor) => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);
  console.log(links.join('\n'));

  
})();
