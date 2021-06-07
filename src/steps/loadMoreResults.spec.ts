import { getPage } from "../getPage";
import { loadMoreResults } from "./loadMoreResults";

jest.setTimeout(999999999);

describe("loadMoreResults", () => {
  it("clicks on the loadMore anchor", (t) => {
    const main = async () => {
      const page = await getPage("/busca/Breaking%20Bad");
      const clickCallback = async (isAnchor: boolean) => {
        expect(isAnchor).toBeTruthy();
        await page.browser().close();
        t();
      };
      await page.exposeFunction("clickCallback", clickCallback);
      await page.waitForSelector(".load_more");
      await page.$eval(".load_more", (el) => {
        if (el instanceof HTMLAnchorElement) {
          el.addEventListener("click", () => {
            clickCallback(
              el instanceof HTMLAnchorElement &&
                el.textContent === "carregar mais"
            );
          });
        }
      });
      await loadMoreResults(page);
    };
    main();
  });
});
