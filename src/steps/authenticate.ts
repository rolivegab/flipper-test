import { Page } from "puppeteer";

export const authenticate = async (page: Page) => {
  // wait until form appears
  const usernameHandle = await page.waitForSelector('#UserUsername')
  await usernameHandle?.type(process.env.USERNAME)

  const passwordHandle = await page.waitForSelector('#UserPassword')
  await passwordHandle?.type(process.env.PASSWORD)

  const formButton = await page.waitForSelector('#UserLoginForm > button')
  await formButton?.click()
}
