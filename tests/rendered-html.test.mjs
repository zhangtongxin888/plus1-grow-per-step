import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Your first 10 minutes, planned"],
  ["/beginner-guide", "Plan your first session"],
  ["/progression", "Make each loop answer one question"],
  ["/mistakes", "Find the stalled loop"],
  ["/faq", "Fast answers"],
  ["/sources", "What is confirmed"],
];

async function render(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("home page is beginner-first and uses production metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your first 10 minutes, planned/);
  assert.match(html, /Start the beginner tutorial/);
  assert.match(html, /href="\/beginner-guide"/);
  assert.match(html, /https:\/\/plus1growperstep\.wiki\/og\.png/);
  assert.match(html, /1200/);
  assert.match(html, /630/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("every guide route renders one h1, a canonical, and internal next steps", async () => {
  for (const [path, marker] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(marker), path);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${path} h1 count`);
    assert.match(html, new RegExp(`rel="canonical" href="https://plus1growperstep\\.wiki${path === "/" ? "" : path}"`), `${path} canonical`);
    assert.match(html, /aria-label="Continue reading"/, `${path} continue reading`);
  }
});

test("faq JSON-LD parses and mirrors visible questions", async () => {
  const html = await (await render("/faq")).text();
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, "FAQ JSON-LD missing");
  const data = JSON.parse(match[1].replaceAll("&quot;", '"'));
  assert.equal(data["@type"], "FAQPage");
  assert.equal(data.mainEntity.length, 9);
  for (const entity of data.mainEntity) assert.ok(html.includes(entity.name));
});

test("robots and sitemap expose the canonical six-route site", async () => {
  const robots = await (await render("/robots.txt", "text/plain")).text();
  assert.match(robots, /Sitemap: https:\/\/plus1growperstep\.wiki\/sitemap\.xml/);
  const sitemap = await (await render("/sitemap.xml", "application/xml")).text();
  for (const [path] of routes) {
    const url = `https://plus1growperstep.wiki${path === "/" ? "" : path}`;
    assert.match(sitemap, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("source repository excludes the starter and keeps required assets", async () => {
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/official-game-thumbnail.png", import.meta.url));
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
