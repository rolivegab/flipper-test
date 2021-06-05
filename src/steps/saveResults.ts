import prisma from ".prisma/client";
import { Page } from "puppeteer";
import { getPrismaConnection } from "../services/getPrismaConnection";
import { transformPTDate } from "../utils/transformPTDate";

const RESULT_LIST_SELECTOR = (pageNumber: number) =>
  `#resultado_busca > div:nth-child(${pageNumber}) > article > div`;

export const saveResults = async (page: Page, pageNumber: number) => {
  await page.waitForSelector(RESULT_LIST_SELECTOR(pageNumber));

  const searchPageResults = await page.$$eval(
    RESULT_LIST_SELECTOR(pageNumber),
    (elements) =>
      elements.flatMap((i) => {
        const subInfoPElement = i.querySelector("p.data");
        const titleAElement = i.querySelector("p:nth-child(1) > a");
        const imgElement = i.querySelector("img");

        // get subtitle info
        const name = titleAElement?.textContent;
        const downloads = Number(subInfoPElement?.textContent
          ?.split(",")?.[0]
          ?.slice(0, -10));
        const rating = Number(subInfoPElement?.textContent?.split(",")?.[1]?.slice(6));
        const author = subInfoPElement?.querySelector("a")?.textContent;
        const link = titleAElement?.getAttribute("href");
        const postedAt = subInfoPElement?.textContent?.slice(-19, -1);
        const language = imgElement?.getAttribute("title");

        if (
          typeof name === 'string' &&
          typeof downloads === 'number' &&
          typeof rating === 'number' &&
          typeof author === 'string' &&
          typeof link === 'string' &&
          typeof postedAt === 'string' &&
          typeof language === 'string'
        ) {
          return [
            {
              name,
              downloads,
              rating,
              author,
              link,
              postedAt,
              language,
            },
          ];
        } else {
          console.log('Failed to save subtitle', i)
          debugger
          return [];
        }
      })
  );

  const finalResultsPromise = searchPageResults.map(async (i) => {
    const newPage = await page.browser().newPage();
    await newPage.goto(new URL(i.link, process.env.LEGENDAS_TV_URL).href, {
      waitUntil: "domcontentloaded",
    });
    await newPage.waitForSelector(
      "body > div.container > div.middle.download > section:nth-child(2) > aside:nth-child(4) > p"
    );
    const ratio = await newPage.$$eval(
      "body > div.container > div.middle.download > section:nth-child(2) > aside:nth-child(4) > p",
      (elements) => {
        const values = elements.map((i) => Number(i.textContent));
        const ratio = values[0] / (values[0] + values[1]);
        return Number.isFinite(ratio) ? ratio : 0;
      }
    );

    await newPage.close();

    return {
      ...i,
      ratio,
      id: i.link.split("/")[2],
      postedAt: transformPTDate(i.postedAt),
    };
  });

  const finalResults = await Promise.all(finalResultsPromise);
  await getPrismaConnection().subtitle.createMany({
    data: finalResults,
    skipDuplicates: true,
  });
  return finalResults;
};
