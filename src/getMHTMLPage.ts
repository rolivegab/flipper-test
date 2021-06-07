import puppeteer from "puppeteer";

export const getMTHMLPage = async (
  fileName: "search-results" | "full-search-results",
  headless: boolean = true
) => {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  const filePath = `file:${__dirname}/serialized-data/${fileName}.mhtml`;
  await page.goto(filePath, {
    waitUntil: "domcontentloaded",
  });
  return page;
};
