import { getPage } from "../getPage";
import { closeBanner } from "./closeBanner";
import { searchTitle } from "./searchTitle";

const FORM_ID = "#BuscaIndexForm";
const SEARCH_STRING = "Breaking Bad";

describe("searchTitle", () => {
  it("writes the correct title", (t) => {
    const main = async () => {
      const page = await getPage("/");
      await closeBanner(page);
      await page.waitForSelector(FORM_ID);
      const formClick = async (searchString: string) => {
        expect(searchString === SEARCH_STRING);
        await page.browser().close();
        t();
      };
      page.exposeFunction("formClick", formClick);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.$eval(FORM_ID, (formEl) => {
        if (formEl instanceof HTMLFormElement) {
          formEl.addEventListener("submit", (submitEvent) => {
            submitEvent.preventDefault();
            const inputEl = formEl.querySelector("#search-box");
            if (inputEl instanceof HTMLInputElement) {
              formClick(inputEl.value);
              return false;
            }
            return true;
          });
        }
      });
      await searchTitle(page, SEARCH_STRING);
    };
    main();
  });

  it("submits", (t) => {
    const main = async () => {
      const page = await getPage("/");
      await closeBanner(page);
      await page.waitForSelector(FORM_ID);
      const formClick = async () => {
        t();
        await page.browser().close();
      };
      page.exposeFunction("formClick", formClick);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await page.$eval(FORM_ID, (el) => {
        if (el instanceof HTMLFormElement) {
          el.addEventListener("submit", (e) => {
            e.preventDefault();
            formClick();
            return false;
          });
        }
      });
      await searchTitle(page, SEARCH_STRING);
    };

    main();
  });
});
