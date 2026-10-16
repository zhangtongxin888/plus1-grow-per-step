import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Walk first. Grow. Test one wall"],
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
  assert.match(html, /Walk first\. Grow\. Test one wall/);
  assert.match(html, /Start the beginner tutorial/);
  assert.match(html, /href="\/beginner-guide"/);
  assert.match(html, /https:\/\/plus1growperstep\.wiki\/og\.png/);
  assert.match(html, /1200/);
  assert.match(html, /630/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
  assert.match(html, /mobile-start-bar/);
  assert.match(html, /RIGHT NOW/);
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

test("CSP allows banner and native schemes without an Adsterra host allowlist", async () => {
  const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const cspHeader = vercel.headers
    .flatMap((group) => group.headers)
    .find((header) => header.key === "Content-Security-Policy");
  assert.ok(cspHeader?.value, "Content-Security-Policy value missing");
  const policy = Object.fromEntries(
    cspHeader.value.split(";").map((directive) => {
      const [name, ...sources] = directive.trim().split(/\s+/);
      return [name, sources];
    }),
  );

  for (const source of ["https:", "blob:", "data:"]) {
    assert.ok(policy["script-src"].includes(source), `script-src missing ${source}`);
    assert.ok(policy["frame-src"].includes(source), `frame-src missing ${source}`);
    assert.ok(policy["worker-src"].includes(source), `worker-src missing ${source}`);
  }
  for (const source of ["https:", "wss:", "blob:"]) {
    assert.ok(policy["connect-src"].includes(source), `connect-src missing ${source}`);
  }
  for (const source of ["https:", "blob:", "data:"]) {
    assert.ok(policy["style-src"].includes(source), `style-src missing ${source}`);
    assert.ok(policy["img-src"].includes(source), `img-src missing ${source}`);
    assert.ok(policy["font-src"].includes(source), `font-src missing ${source}`);
    assert.ok(policy["media-src"].includes(source), `media-src missing ${source}`);
  }
  assert.equal(policy["object-src"].join(" "), "'none'");
  assert.doesNotMatch(cspHeader.value, /highperformanceformat|effectivecpmnetwork|adsterra\.com|profitablecreativeformat|bnserving/i);

  const adConfig = await readFile(new URL("../lib/adsterra.generated.ts", import.meta.url), "utf8");
  assert.match(adConfig, /adsterraEnablePopunder:\s*false/);
  assert.match(adConfig, /adsterraEnableSocialBar:\s*false/);
  assert.match(adConfig, /adsterraEnableStickyRail:\s*false/);
  assert.match(adConfig, /adsterraBanner300x250ScriptUrl:/);
  assert.match(adConfig, /adsterraBanner728x90ScriptUrl:/);
  assert.match(adConfig, /adsterraNative1ScriptUrl:/);
});

function classCount(html, className) {
  return (html.match(new RegExp(`class="[^"]*\\b${className}\\b[^"]*"`, "g")) ?? []).length;
}

test("content pages show one early banner plus native and rectangle, legal pages stay clean", async () => {
  const contentRoutes = routes.filter(([path]) => path !== "/sources");
  for (const [path] of contentRoutes) {
    const html = await (await render(path)).text();
    for (const slot of ["ad-placement-top", "ad-placement-mid", "ad-placement-bottom"]) {
      assert.equal(classCount(html, slot), 1, `${path} ${slot}`);
    }
    assert.equal(classCount(html, "ad-placement-global-fallback"), 0, path);
    assert.equal(classCount(html, "ad-sticky-rail"), 0, path);
    assert.doesNotMatch(html, /adsterra-popunder|adsterra-social-bar/, path);
    const headerAt = html.indexOf("site-header");
    const topAt = html.indexOf("ad-placement-top");
    const mainAt = html.indexOf('id="main-content"');
    const midAt = html.indexOf("ad-placement-mid");
    const bottomAt = html.indexOf("ad-placement-bottom");
    const footerAt = html.indexOf("site-footer");
    assert.ok(headerAt !== -1 && headerAt < topAt && topAt < mainAt, `${path} banner follows the header and precedes content`);
    assert.ok(mainAt < midAt && midAt < bottomAt && bottomAt < footerAt, `${path} native and rectangle follow the article`);
  }

  const sources = await (await render("/sources")).text();
  assert.match(sources, /What is confirmed/);
  assert.equal(classCount(sources, "ad-placement"), 0);
  assert.equal(classCount(sources, "ad-shell"), 0);
  assert.equal(classCount(sources, "ad-host"), 0);
  assert.equal(classCount(sources, "ad-sticky-rail"), 0);
  assert.doesNotMatch(sources, /adsterra-popunder|adsterra-social-bar/);
});

test("source repository excludes the starter and keeps required assets", async () => {
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/official-game-thumbnail.png", import.meta.url));
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("every internal guide link and section anchor has a rendered target", async () => {
  const rendered = new Map();
  for (const [path] of routes) rendered.set(path, await (await render(path)).text());

  for (const [sourcePath, html] of rendered) {
    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const [targetPath, fragment] = match[1].split("#");
      if (targetPath.startsWith("/_next/") || targetPath.startsWith("/_vinext/")) continue;
      if (/\.(?:png|svg|ico|css|js)$/i.test(targetPath)) continue;
      const normalizedPath = targetPath || sourcePath;
      assert.ok(rendered.has(normalizedPath), `${sourcePath} links to unknown route ${match[1]}`);
      if (fragment) {
        const targetHtml = rendered.get(normalizedPath);
        assert.match(targetHtml, new RegExp(`id=["']${fragment}["']`), `${sourcePath} links to missing anchor ${match[1]}`);
      }
    }
  }
});
