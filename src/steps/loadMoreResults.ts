import { Page } from "puppeteer";

export const loadMoreResults = async (page: Page) => {
  await page.click(".load_more");
  console.log("then clicked");
};
