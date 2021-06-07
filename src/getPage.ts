import puppeteer from "puppeteer";

export const getPage = async (path: "/" | "/login") => {
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
  await page.goto(new URL(path, process.env.LEGENDAS_TV_URL).href, {
    waitUntil: "domcontentloaded",
  });
  return page;
};
