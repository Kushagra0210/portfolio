import { writeFile } from "node:fs/promises";
import lighthouse, { desktopConfig } from "lighthouse";

const url = process.argv[2] ?? "http://127.0.0.1:3100";
const result = await lighthouse(url, {
  port: Number(process.env.LIGHTHOUSE_CHROME_PORT ?? 9222),
  output: "json",
  logLevel: "error",
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
}, desktopConfig);

if (!result) throw new Error("Lighthouse did not return a result");
const reportName = url.includes("/work/") ? "case-study" : "home";
await writeFile(`.next/lighthouse-${reportName}.json`, result.report);

const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round((category.score ?? 0) * 100)]));
console.log(JSON.stringify(scores));
