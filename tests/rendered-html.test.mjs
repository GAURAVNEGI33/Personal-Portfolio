import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete portfolio and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Gaurav Negi/);
  assert.match(html, /ResumeFlow/);
  assert.match(html, /36 REST endpoints/);
  assert.match(html, /AI Notification Router/);
  assert.match(html, /Top 14%/);
  assert.match(html, /FitTrack AI/);
  assert.match(html, /Resume API/);
  assert.match(html, /Full-Stack &amp; QA Intern/);
  assert.match(html, /June 2026[\s\S]*Present/);
  assert.match(html, /May 2026[\s\S]*June 2026[\s\S]*CodeAlpha/);
  assert.doesNotMatch(html, /CodeAlpha[\s\S]{0,500}Present/);
  assert.match(html, /Amrapali University/);
  assert.match(html, /CGPA 8\.1/);
  assert.match(html, /gauravnegigvps@gmail\.com/);
  assert.match(html, /Skip to content/);
  assert.match(html, /https:\/\/gaurav-negi-portfolio\.gauravnegigvps\.chatgpt\.site\/og-monochrome\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps accessibility and performance safeguards in source", async () => {
  const [page, portfolio, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<Portfolio \/>/);
  assert.match(portfolio, /loading="lazy"/);
  assert.match(portfolio, /aria-live/);
  assert.match(portfolio, /Lenis/);
  assert.match(portfolio, /ScrollTrigger/);
  assert.match(layout, /openGraph/);
  assert.doesNotMatch(layout, /x-forwarded-host/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.skip-link/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
