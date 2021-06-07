import { Page } from "puppeteer";

export const loadMoreResults = async (page: Page) => {
  const loadMoreHandler = await page.$(".load_more");
  console.log("l", loadMoreHandler);
  await loadMoreHandler?.click();
};
