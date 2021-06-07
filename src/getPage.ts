import puppeteer from "puppeteer";

export const getPage = async (
  path: "/" | "/login",
  headless: boolean = true
) => {
  const browser = await puppeteer.launch({
    headless,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(new URL(path, process.env.LEGENDAS_TV_URL).href, {
    waitUntil: "domcontentloaded",
  });
  return page;
};
