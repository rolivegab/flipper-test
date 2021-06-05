import { Page } from "puppeteer";

export const searchTitle = async (page: Page) => {
  const searchBoxHandler = await page.waitForSelector('#search-box')
  await searchBoxHandler?.type('Breaking Bad\n')
}
