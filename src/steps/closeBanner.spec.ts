import { getPage } from "../getPage";
import { closeBanner } from "./closeBanner";

describe("closeBanner", () => {
  it("closes page banner", async () => {
    const page = await getPage("/", true);

    const bannerIsOpened = await page.$eval(
      "#overlay",
      (el) => window.getComputedStyle(el).display === "block"
    );
    expect(bannerIsOpened).toBeTruthy();

    await closeBanner(page);

    const bannerIsClosed = await page.$("#overlay");
    await page.waitForFunction(
      (el: Element) => window.getComputedStyle(el).display === "none",
      {},
      bannerIsClosed
    );

    await page.browser().close();
  });
});
