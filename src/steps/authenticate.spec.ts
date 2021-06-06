import { getPage } from "../getPage"
import { authenticate } from "./authenticate";

describe('authenticate', () => {
  it('authenticates', async () => {
    const page = await getPage('/login', true);

    const isUnauthenticated = await page.$('body > div.container > header > section > div.login > a.js_entrar')
    expect(isUnauthenticated).toBeTruthy()

    await authenticate(page)
    await page.waitForNavigation({
      waitUntil: 'domcontentloaded'
    })

    const isAuthenticated = await page.$('body > div.container > header > section > div.login > a:nth-child(1)')
    expect(isAuthenticated).toBeTruthy()

    await page.browser().close()
  })
})
