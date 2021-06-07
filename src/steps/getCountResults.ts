import { Page } from "puppeteer";

export const getCountResults = async (page: Page) => {
  const countHandler = await page.$$("#resultado_busca > div > article > div");
  return countHandler.length;
};
