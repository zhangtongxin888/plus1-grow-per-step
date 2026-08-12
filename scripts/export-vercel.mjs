import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = path.join(root, "dist", "client");
const outputRoot = path.join(root, "vercel-dist");
const workerPath = path.join(root, "dist", "server", "index.js");
const canonicalOrigin = "https://plus1growperstep.wiki";
const routes = [
  ["/", "index.html", "text/html"],
  ["/beginner-guide", "beginner-guide.html", "text/html"],
  ["/progression", "progression.html", "text/html"],
  ["/mistakes", "mistakes.html", "text/html"],
  ["/faq", "faq.html", "text/html"],
  ["/sources", "sources.html", "text/html"],
  ["/robots.txt", "robots.txt", "text/plain"],
  ["/sitemap.xml", "sitemap.xml", "application/xml"],
];

async function main() {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  await cp(clientRoot, outputRoot, { recursive: true, force: true });
  const workerUrl = pathToFileURL(workerPath);
  workerUrl.searchParams.set("static-export", Date.now().toString());
  const { default: worker } = await import(workerUrl.href);

  for (const [pathname, output, type] of routes) {
    const response = await worker.fetch(
      new Request(`${canonicalOrigin}${pathname}`, { headers: { accept: type } }),
      {
        ASSETS: {
          fetch: async (request) => {
            const relative = decodeURIComponent(new URL(request.url).pathname).replace(/^\/+/, "");
            if (!relative || relative.includes("..")) return new Response("Not found", { status: 404 });
            try { return new Response(await readFile(path.join(clientRoot, relative)), { status: 200 }); }
            catch { return new Response("Not found", { status: 404 }); }
          },
        },
      },
      { waitUntil() {}, passThroughOnException() {} },
    );
    if (response.status !== 200) throw new Error(`${pathname} returned ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes(type)) throw new Error(`${pathname} returned ${contentType}`);
    const body = await response.text();
    if (type === "text/html" && !/<!doctype html>/i.test(body)) throw new Error(`${pathname} returned invalid HTML`);
    await writeFile(path.join(outputRoot, output), body, "utf8");
    process.stdout.write(`exported ${pathname} -> ${output}\n`);
  }
}

main().catch((error) => { process.stderr.write(`${error.stack ?? error}\n`); process.exitCode = 1; });
