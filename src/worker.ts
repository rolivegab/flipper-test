import { config } from "./config";
import { getPage } from "./getPage";
import { getAmqpService } from "./services/getAmqpService";
import { authenticate } from "./steps/authenticate";
import { closeBanner } from "./steps/closeBanner";
import { getCountResults } from "./steps/getCountResults";
import { itHasMoreResults } from "./steps/itHasMoreResults";
import { loadMoreResults } from "./steps/loadMoreResults";
import { saveResults } from "./steps/saveResults";
import { searchTitle } from "./steps/searchTitle";
import { saveMHTMLFile } from "./utils/saveMHTMLFile";

const prepareWorker = async () => {
  process.stdout.write("preparing worker...");
  const page = await getPage("/login");
  process.stdout.write("OK\n");
  process.stdout.write("authenticating...");
  await authenticate(page);
  process.stdout.write("OK\n");
  await closeBanner(page);
  process.stdout.write("banner closed\n");

  return page;
};

const executeOnJobReceived = async (
  callback: (searchString: string) => Promise<void>
) => {
  const amqpService = await getAmqpService();
  amqpService.consume(callback);
};

config();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = async () => {
  const worker = await prepareWorker();
  await executeOnJobReceived(async (searchString) => {
    process.stdout.write(`${searchString}: searching\n`);
    await searchTitle(worker, searchString);
    await worker.waitForNavigation({
      waitUntil: "load",
    });
    await saveMHTMLFile(worker, "search-results");
    let actualPage = 1;
    let insertedResults = 0;
    process.stdout.write(`${searchString}: saving page ${actualPage}\n`);
    insertedResults += await saveResults(worker, actualPage, searchString);
    while (
      (await itHasMoreResults(worker)) &&
      actualPage < Number(process.env.MAX_PAGES_PER_TITLE)
    ) {
      actualPage += 1;
      await loadMoreResults(worker);
      process.stdout.write(`${searchString}: saving page ${actualPage}\n`);
      insertedResults += await saveResults(worker, actualPage, searchString);
    }
    await saveMHTMLFile(worker, "full-search-results");
    const countResults = await getCountResults(worker);
    process.stdout.write(
      `${searchString}: ${countResults} results were found, ${insertedResults} of these were stored on database.\n`
    );
  });
};

main();
