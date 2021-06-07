import { getMTHMLPage } from "../getMHTMLPage";
import { itHasMoreResults } from "./itHasMoreResults";

describe("itHasMoreResults", () => {
  it("correctly shows that there are more results", async () => {
    const page = await getMTHMLPage("search-results");
    expect(await itHasMoreResults(page)).toBeTruthy();
    await page.browser().close();
  });

  it("correctly shows that there are no more results", async () => {
    const page = await getMTHMLPage("full-search-results");
    expect(await itHasMoreResults(page)).toBeFalsy();
    await page.browser().close();
  });
});
