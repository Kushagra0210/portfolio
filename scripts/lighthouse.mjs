import { writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";

const url = process.argv[2] ?? "http://127.0.0.1:3100";
const result = await lighthouse(url, {
  port: Number(process.env.LIGHTHOUSE_CHROME_PORT ?? 9222),
  output: "json",
  logLevel: "error",
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
});

if (!result) throw new Error("Lighthouse did not return a result");
await writeFile(".next/lighthouse-home.json", result.report);

const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round((category.score ?? 0) * 100)]));
console.log(JSON.stringify(scores));
