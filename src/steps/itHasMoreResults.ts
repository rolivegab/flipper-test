import { Page } from "puppeteer"

export const itHasMoreResults = async (page: Page) => await page.$('.load_more')
