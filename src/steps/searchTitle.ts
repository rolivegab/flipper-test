import { Page } from "puppeteer";

export const searchTitle = async (page: Page, titleName: string) => {
  const searchHandler = await page.waitForSelector("#search-box");
  await searchHandler?.evaluate((el) => {
    el.setAttribute("value", "");
  });
  await page.type("#search-box", `${titleName}`);
  const submitHandler = await page.waitForSelector("input.icon_zoom");
  await submitHandler?.evaluate((el) => {
    if (el instanceof HTMLInputElement) {
      el.click();
    }
  });
};
