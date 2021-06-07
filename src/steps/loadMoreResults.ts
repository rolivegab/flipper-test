import { Page } from "puppeteer";

export const loadMoreResults = async (page: Page) => {
  const loadMoreHandler = await page.$(".load_more");
  await loadMoreHandler?.click();
};
