import { getPage } from "../getPage";
import { closeBanner } from "./closeBanner";
import { searchTitle } from "./searchTitle";

const FORM_ID = "#BuscaIndexForm";
const SEARCH_STRING = "Breaking Bad";

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
    await page.exposeFunction("formClick", formClick);
    const formHandler = await page.$(FORM_ID);
    await formHandler?.evaluateHandle((formEl) => {
      if (formEl instanceof HTMLFormElement) {
        formEl.addEventListener("submit", async (submitEvent) => {
          submitEvent.preventDefault();
          const inputEl = formEl.querySelector("#search-box");
          if (inputEl instanceof HTMLInputElement) {
            await formClick(inputEl.value);
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
      await page.browser().close();
      t();
    };
    await page.exposeFunction("formClick", formClick);
    await page.$eval(FORM_ID, (el) => {
      if (el instanceof HTMLFormElement) {
        el.addEventListener("submit", async (e) => {
          e.preventDefault();
          await formClick();
          return false;
        });
      }
    });
    await searchTitle(page, SEARCH_STRING);
  };

  main();
});
