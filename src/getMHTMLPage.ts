import puppeteer from "puppeteer";

export const getMTHMLPage = async (
  fileName: "search-results" | "full-search-results"
) => {
  const browser = await puppeteer.launch(
    process.env.PLATFORM === "docker"
      ? {
          headless: true,
          executablePath: "/usr/bin/chromium-browser",
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }
      : { headless: false }
  );
  const page = await browser.newPage();
  const filePath = `file:${__dirname}/assets/serialized-data/${fileName}.mhtml`;
  await page.goto(filePath, {
    waitUntil: "domcontentloaded",
  });
  return page;
};
