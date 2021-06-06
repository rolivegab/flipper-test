import { config } from "dotenv";
import { getLoginPage } from "./getLoginPage";
import { authenticate } from "./steps/authenticate";
import { closeBanner } from "./steps/closeBanner";
import { itHasMoreResults } from "./steps/itHasMoreResults";
import { loadMoreResults } from "./steps/loadMoreResults";
import { getCountResults } from "./steps/getCountResults";
import { saveResults } from "./steps/saveResults";
import { searchTitle } from "./steps/searchTitle";

config();
const    main = async () => {
  const page = await getLoginPage();
  await authenticate(page);
  await closeBanner(page);


  await searchTitle(page);
  let actualPage = 1;
  let insertedResults = 0;
  insertedResults += await saveResults(page, actualPage);
  while (await itHasMoreResults(page)) {
    actualPage += 1;
    await loadMoreResults(page);
    insertedResults += await saveResults(page, actualPage);
  }
  const countResults = await getCountResults(page);
  console.log(
    `${countResults} results were found, ${insertedResults} of these were stored on database.`
  );
  await page.browser().close();
};

main();
