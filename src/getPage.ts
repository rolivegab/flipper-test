import puppeteer from 'puppeteer'

export const getPage = async (path: '/' | '/login', headless: boolean = false) => {
  const browser = await puppeteer.launch({headless});
  const page = await browser.newPage()
  await page.goto(new URL(path, process.env.LEGENDAS_TV_URL).href, {
    waitUntil: 'domcontentloaded'
  });
  return page;
};
