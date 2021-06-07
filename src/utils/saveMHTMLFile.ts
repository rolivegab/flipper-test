import { Page } from "puppeteer";
import path from "path";
import fs from "fs";

export const saveMHTMLFile = async (page: Page, fileName: string) => {
  if (process.env.REFRESH_MHTML_FILES === "true") {
    const CDPSession = await page.target().createCDPSession();
    const htmlContent = await CDPSession.send("Page.captureSnapshot");
    fs.writeFileSync(
      path.resolve(
        __dirname,
        "..",
        "assets",
        "serialized-data",
        `${fileName}.mhtml`
      ),
      htmlContent.data
    );
  }
};
