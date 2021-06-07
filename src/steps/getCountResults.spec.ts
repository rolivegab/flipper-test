import { getMTHMLPage } from "../getMHTMLPage";
import { getCountResults } from "./getCountResults";

const EXPECTED_RESULT_COUNT = 24;

describe("getCountResults", () => {
  it("count results correctly", async () => {
    const page = await getMTHMLPage("search-results");
    const count = await getCountResults(page);
    expect(EXPECTED_RESULT_COUNT).toEqual(count);
    await page.browser().close();
  });
});
