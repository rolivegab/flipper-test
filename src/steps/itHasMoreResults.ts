import { Page } from "puppeteer";

export const itHasMoreResults = async (page: Page) =>
  Boolean(await page.$(".load_more"));
