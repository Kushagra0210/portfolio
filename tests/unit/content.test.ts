import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { projects } from "@/data/projects";

const schema = z.object({
  slug: z.enum(["dsa-revision-tracker", "raahsathi", "aqi-predictor"]),
  title: z.string().min(3), summary: z.string().min(30), role: z.string().min(10),
  repoUrl: z.string().url(), image: z.string().startsWith("/projects/"),
  stack: z.array(z.string()).min(4), metrics: z.array(z.object({ label: z.string(), value: z.string() })).min(3),
});

describe("case study content", () => {
  it("validates the shared project schema", () => expect(() => z.array(schema).parse(projects)).not.toThrow());
  it("has checked-in media for every featured project", () => {
    for (const project of projects) expect(existsSync(path.join(process.cwd(), "public", project.image))).toBe(true);
  });
  it("keeps AQI live CTA disabled until deployment exists", () => {
    const aqi = projects.find((project) => project.slug === "aqi-predictor");
    expect(aqi?.liveEnabled).toBe(false);
    expect(aqi?.liveUrl).toBeUndefined();
  });
});
