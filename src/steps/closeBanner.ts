import { Page } from "puppeteer";

export const closeBanner = async (page: Page) => {
  const closeHandler = await page.waitForSelector("#help-box-close", {
    visible: true,
  });
  await closeHandler?.click();
};
