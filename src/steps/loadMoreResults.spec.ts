import { getMTHMLPage } from "../getMHTMLPage";
import { loadMoreResults } from "./loadMoreResults";

describe("loadMoreResults", () => {
  it("clicks on the loadMore anchor", async (t) => {
    const page = await getMTHMLPage("search-results");
    const clickCallback = async (isAnchor: boolean) => {
      console.log("received", isAnchor);
      expect(isAnchor).toBeTruthy();
      t();
      await page.browser().close();
    };
    await page.exposeFunction("clickCallback", clickCallback);
    const flag = await page.$eval(".load_more", (el) => {
      if (
        el instanceof HTMLAnchorElement &&
        el.textContent === "carregar mais"
      ) {
        el.addEventListener("click", () => {
          clickCallback(true);
        });
        return true;
      }
      clickCallback(false);
      return false;
    });
    console.log("trying to click", flag);
    await loadMoreResults(page);
    console.log("clicked, probably");
  });
});
