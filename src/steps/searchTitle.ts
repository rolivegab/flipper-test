import { Page } from "puppeteer";

export const searchTitle = async (page: Page, titleName: string) => {
  const searchBoxHandler = await page.waitForSelector("#search-box");
  searchBoxHandler?.evaluate((el) => {
    if (el instanceof HTMLInputElement) {
      el.setAttribute("value", "");
    }
  });
  await searchBoxHandler?.type(`${titleName}\n`);
};
