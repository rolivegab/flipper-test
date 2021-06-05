import puppeteer from 'puppeteer'

export const getLoginPage = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage()
  page.goto(new URL('/login', process.env.LEGENDAS_TV_URL).href);
  return page;
};
