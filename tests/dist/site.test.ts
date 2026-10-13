// Checks the production build in dist/ against the site's HTML contract.
// Run with `npm run test:dist`, which builds first.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const dist = join(import.meta.dirname, "../../dist");
const site = "https://www.mitchldtn.com";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

if (!existsSync(dist)) throw new Error("dist/ is missing: run `npm run build` first");
const files = walk(dist).map((p) => relative(dist, p));
const htmlFiles = files.filter((f) => f.endsWith(".html"));
if (htmlFiles.length === 0) throw new Error("dist/ has no HTML files");

const read = (f: string) => readFileSync(join(dist, f), "utf8");

// "about.html" -> "/about", "index.html" -> "/", "writing/x.html" -> "/writing/x"
const pathOf = (f: string) => {
  const p = "/" + f.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  return p === "/" ? p : p.replace(/\/$/, "");
};
const canonicalOf = (f: string) => (pathOf(f) === "/" ? `${site}/` : `${site}${pathOf(f)}`);

const attrs = (tag: string): Record<string, string> =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

const metas = (html: string) => [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => attrs(m[0]));
const meta = (html: string, key: string) =>
  metas(html).find((a) => a.name === key || a.property === key)?.content;
const title = (html: string) => html.match(/<title>([^<]*)<\/title>/)?.[1].trim();
const canonicalLink = (html: string) =>
  [...html.matchAll(/<link\s[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.rel === "canonical")
    ?.href;

const pages = htmlFiles.map((f) => ({ file: f, html: read(f) }));

describe("every page", () => {
  it.each(pages)("$file has a non-empty title and description", ({ html }) => {
    expect(title(html)).toBeTruthy();
    expect(meta(html, "description")?.trim()).toBeTruthy();
  });

  // Maps each repeated value to the files that share it, so a failure names the pages.
  const shared = (valueOf: (html: string) => string | undefined) => {
    const byValue = new Map<string | undefined, string[]>();
    for (const p of pages) byValue.set(valueOf(p.html), [...(byValue.get(valueOf(p.html)) ?? []), p.file]);
    return [...byValue].filter(([, fs]) => fs.length > 1).map(([v, fs]) => `"${v}" in ${fs.join(", ")}`);
  };

  it("has no title shared with another page", () => {
    const dupes = shared(title);
    expect(dupes, `shared titles: ${dupes.join("; ")}`).toEqual([]);
  });

  it("has no description shared with another page", () => {
    const dupes = shared((html) => meta(html, "description"));
    expect(dupes, `shared descriptions: ${dupes.join("; ")}`).toEqual([]);
  });

  it.each(pages)("$file has its canonical URL, no trailing slash except home", ({ file, html }) => {
    const href = canonicalLink(html);
    expect(href).toBe(canonicalOf(file));
    if (href !== `${site}/`) expect(href?.endsWith("/")).toBe(false);
  });

  it.each(pages)("$file has the five social tags", ({ html }) => {
    expect(meta(html, "og:title")?.trim()).toBeTruthy();
    expect(meta(html, "og:description")?.trim()).toBeTruthy();
    expect(meta(html, "og:url")).toBe(canonicalLink(html));
    expect(meta(html, "og:image")).toMatch(/^https:\/\/www\.mitchldtn\.com\/og\/[\w-]+\.png$/);
    expect(meta(html, "twitter:card")).toBe("summary_large_image");
  });

  it.each(pages)("$file loads the analytics tag", ({ html }) => {
    expect(html).toContain("https://www.googletagmanager.com/gtag/js?id=G-C4MMDM32HK");
    expect(html).toContain(`gtag("config", "G-C4MMDM32HK")`);
  });

  it.each(pages)("$file has the shared shell", ({ html }) => {
    expect(html).toMatch(/<a href="\/"[^>]*>mitch ludington<\/a>/);
    for (const href of ["/writing", "/projects", "/about"]) expect(html).toContain(`href="${href}"`);
    expect(html).not.toMatch(/>\s*contact\s*</);
    expect(html).toContain(`href="https://www.linkedin.com/in/mitchldtn/"`);
    // The footer year is the build's year; allow the previous one for a build that ran before New Year.
    const year = Number(html.match(/© (\d{4}) mitch ludington/)?.[1]);
    expect([new Date().getFullYear(), new Date().getFullYear() - 1]).toContain(year);
    expect(html).toContain(`href="https://github.com/mitchldtn"`);
    expect(html).toContain(`href="/rss.xml"`);
  });

  it.each(pages.filter((p) => pathOf(p.file).startsWith("/writing")))(
    "$file marks writing as the current section",
    ({ html }) => {
      expect(html).toMatch(/<a href="\/writing" aria-current="page"/);
    },
  );
});

describe("the whole build", () => {
  const textFiles = files.filter((f) => /\.(html|css|js|xml|txt|webmanifest)$/.test(f));

  // Tailwind's preflight keeps Menlo inside a var() fallback for code; it never applies while
  // --default-mono-font-family is set, so the check is on font files, @font-face and the site's stack.
  it("contains no Menlo font", () => {
    const css = files.filter((f) => f.endsWith(".css")).map(read).join("\n");
    expect(files.filter((f) => /menlo/i.test(f))).toEqual([]);
    expect(css).not.toMatch(/@font-face\s*{[^}]*Menlo/);
    expect(css).toMatch(/--default-mono-font-family:\s*var\(--font-mono\)/);
    expect(css.match(/--font-mono:([^;}]*)/)?.[1]).not.toContain("Menlo");
    expect(htmlFiles.filter((f) => read(f).includes("Menlo"))).toEqual([]);
  });

  it("contains no form", () => {
    expect(htmlFiles.filter((f) => /<form[\s>]/i.test(read(f)))).toEqual([]);
  });

  it("serves JetBrains Mono from the site, with ligatures off", () => {
    const css = files.filter((f) => f.endsWith(".css")).map(read).join("\n");
    expect(files.some((f) => /^_astro\/jetbrains-mono-latin-400-normal\.[\w-]+\.woff2$/.test(f))).toBe(
      true,
    );
    expect(css).toMatch(/font-family:\s*"?JetBrains Mono/);
    expect(css).toMatch(/font-variant-ligatures:\s*none/);
    expect(textFiles.filter((f) => /fonts\.(googleapis|gstatic)\.com/.test(read(f)))).toEqual([]);
  });
});

// Slugs and draft flags straight from the Markdown files, not from the code under test.
const writingDir = join(import.meta.dirname, "../../src/content/writing");
const sources = readdirSync(writingDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const front = readFileSync(join(writingDir, f), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const inline = front.match(/^topics:\s*\[([^\]]*)\]/m)?.[1].split(",");
    const listed = front.match(/^topics:\s*\n((?:\s+-\s*.+\n?)+)/m)?.[1].split("\n").map((l) => l.replace(/^\s*-\s*/, ""));
    const topics = (inline ?? listed ?? []).map((t) => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    return { slug: f.replace(/\.md$/, ""), draft: /^draft:\s*true\s*$/m.test(front), topics };
  });
const drafts = sources.filter((s) => s.draft).map((s) => s.slug);
const published = sources.filter((s) => !s.draft).map((s) => s.slug);

const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);

describe("drafts", () => {
  it("no file in dist/ mentions a draft", () => {
    for (const slug of drafts) {
      expect(files.filter((f) => f.includes(slug)), slug).toEqual([]);
      expect(
        files.filter((f) => /\.(html|xml|txt|js|json)$/.test(f) && read(f).includes(slug)),
        slug,
      ).toEqual([]);
    }
  });
});

describe("sitemap and robots", () => {
  const sitemaps = files.filter((f) => /^sitemap-\d+\.xml$/.test(f));
  const listed = sitemaps.flatMap((f) => locs(read(f))).sort();

  it("the index points at the sitemap files", () => {
    expect(locs(read("sitemap-index.xml")).sort()).toEqual(
      sitemaps.map((f) => `${site}/${f}`).sort(),
    );
  });

  it("lists every built page's canonical URL except the 404 page", () => {
    const expected = htmlFiles
      .filter((f) => f !== "404.html")
      .map(canonicalOf)
      .sort();
    expect(listed).toEqual(expected);
    expect(listed).not.toContain(`${site}/404`);
  });

  it("robots.txt allows crawling and names the sitemap", () => {
    const robots = read("robots.txt");
    expect(robots).toMatch(/^User-agent: \*$/m);
    expect(robots).not.toMatch(/^Disallow: \/\s*$/m);
    expect(robots).toContain(`Sitemap: ${site}/sitemap-index.xml`);
  });
});

describe("rss", () => {
  const xml = read("rss.xml");
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

  it("is RSS 2.0 with one item per published post, linking to canonical URLs", () => {
    expect(xml).toContain('<rss version="2.0"');
    const links = items.map((i) => i.match(/<link>([^<]*)<\/link>/)?.[1]).sort();
    expect(links).toEqual(published.map((s) => `${site}/writing/${s}`).sort());
  });

  it("lists items newest first, each with title, description and date", () => {
    const dates = items.map((i) => Date.parse(i.match(/<pubDate>([^<]*)<\/pubDate>/)?.[1] ?? ""));
    expect(dates.every((d) => !Number.isNaN(d))).toBe(true);
    expect([...dates].sort((a, b) => b - a)).toEqual(dates);
    for (const i of items) expect(i).toMatch(/<title>[^<]+<\/title>[\s\S]*<description>[^<]+<\/description>/);
  });
});

const pngSize = (f: string) => {
  const b = readFileSync(join(dist, f));
  expect(b.subarray(1, 4).toString()).toBe("PNG");
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
};

describe("preview images", () => {
  it("the site card is a 1200x630 PNG", () => {
    expect(pngSize("og/site.png")).toEqual({ width: 1200, height: 630 });
  });

  it("there is exactly one card per published post, plus the site card", () => {
    expect(files.filter((f) => f.startsWith("og/")).sort()).toEqual(
      ["og/site.png", ...published.map((s) => `og/${s}.png`)].sort(),
    );
  });

  const isPostPage = (f: string) => /^writing\/[^/]+\.html$/.test(f);
  it.each(pages.filter((p) => !isPostPage(p.file)))(
    "$file uses the site card",
    ({ html }) => {
      expect(meta(html, "og:image")).toBe(`${site}/og/site.png`);
    },
  );
});

describe.each(published)("published post %s", (slug) => {
  const file = `writing/${slug}.html`;

  it("has a page with its own preview card", () => {
    expect(files).toContain(file);
    expect(meta(read(file), "og:image")).toBe(`${site}/og/${slug}.png`);
    expect(pngSize(`og/${slug}.png`)).toEqual({ width: 1200, height: 630 });
  });

  it("uses the post title alone on link cards and adds the site name to the page title", () => {
    const html = read(file);
    const cardTitle = meta(html, "og:title");
    expect(cardTitle).toBeTruthy();
    expect(cardTitle).not.toContain("Mitch Ludington");
    expect(meta(html, "twitter:title")).toBe(cardTitle);
    const decode = (s?: string) => s?.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    expect(decode(title(html))).toBe(`${decode(cardTitle)?.replace(/\.$/, "")}: Mitch Ludington`);
  });

  it("ends with the nemonik call to action after the body", () => {
    const html = read(file);
    const body = html.indexOf('class="prose"');
    const cta = html.indexOf('data-cta="nemonik"');
    expect(body).toBeGreaterThan(-1);
    expect(cta).toBeGreaterThan(body);
    const after = html.slice(cta);
    expect(after).toMatch(/<a class="btn btn-primary" href="https:\/\/github\.com\/mitchldtn\/nemonik"[^>]*>Install the CLI<\/a>/);
    expect(after).toMatch(/<a class="btn" href="https:\/\/nemonik\.io"[^>]*>Join the beta<\/a>/);
  });

  it("is listed on /writing and on each of its topic pages", () => {
    expect(read("writing.html")).toContain(`href="/writing/${slug}"`);
    const topics = sources.find((s) => s.slug === slug)?.topics ?? [];
    expect(topics.length).toBeGreaterThan(0);
    for (const t of topics) expect(read(`writing/topic/${t}.html`)).toContain(`href="/writing/${slug}"`);
  });
});

describe("writing list", () => {
  it("shows the empty state exactly when nothing is published", () => {
    expect(read("writing.html").includes("No posts yet.")).toBe(published.length === 0);
  });

  it("has a topic page exactly for the topics of published posts", () => {
    const topicPages = files.filter((f) => f.startsWith("writing/topic/")).sort();
    const expected = [...new Set(sources.filter((s) => !s.draft).flatMap((s) => s.topics))]
      .map((t) => `writing/topic/${t}.html`)
      .sort();
    expect(topicPages).toEqual(expected);
  });
});

const ctaLinks = (html: string) => {
  const at = html.indexOf('data-cta="nemonik"');
  expect(at).toBeGreaterThan(-1);
  const after = html.slice(at);
  expect(after).toMatch(/<a class="btn btn-primary" href="https:\/\/github\.com\/mitchldtn\/nemonik"[^>]*>Install the CLI<\/a>/);
  expect(after).toMatch(/<a class="btn" href="https:\/\/nemonik\.io"[^>]*>Join the beta<\/a>/);
};

describe("home page", () => {
  const html = read("index.html");

  it("ends with the nemonik call to action", () => {
    ctaLinks(html);
    expect(html.indexOf('data-cta="nemonik"')).toBeGreaterThan(html.indexOf('id="now-building"'));
  });

  it("links the now-building section to nemonik.io and the docs", () => {
    const start = html.indexOf('id="now-building"');
    const now = html.slice(start, html.indexOf("</section>", start));
    expect(now).toContain('href="https://nemonik.io"');
    expect(now).toContain('href="https://docs.nemonik.io"');
  });

  it("shows latest writing only when a post is published, with at most three posts", () => {
    const section = html.match(/data-section="latest-writing"[\s\S]*?<\/section>/)?.[0];
    expect(section !== undefined).toBe(published.length > 0);
    if (section) {
      const listed = [...section.matchAll(/href="\/writing\/([\w-]+)"/g)].map((m) => m[1]);
      expect(listed.length).toBe(Math.min(3, published.length));
      for (const slug of listed) expect(published).toContain(slug);
    }
  });
});

describe("about page", () => {
  it("has the three sections as headings", () => {
    const html = read("about.html");
    for (const h of ["The Craft", "The Workshop", "The Journey"]) expect(html).toMatch(new RegExp(`<h2[^>]*>${h}</h2>`));
  });
});

describe("404 page", () => {
  it("is noindex and links home and to the writing", () => {
    const html = read("404.html");
    expect(meta(html, "robots")).toBe("noindex");
    expect(html).toMatch(/<a class="btn btn-primary" href="\/">/);
    expect(html).toMatch(/<a class="btn" href="\/writing">/);
  });
});

describe("external links", () => {
  const external = (html: string) =>
    [...html.matchAll(/<a\s[^>]*>/g)]
      .map((m) => attrs(m[0]))
      .filter((a) => /^https?:\/\//.test(a.href ?? "") && new URL(a.href).host !== new URL(site).host);

  it.each(pages)("$file opens every link to another site in a new tab", ({ html }) => {
    const missing = external(html)
      .filter((a) => a.target !== "_blank" || !(a.rel ?? "").split(" ").includes("noopener"))
      .map((a) => a.href);
    expect(missing).toEqual([]);
  });

  it.each(pages)("$file opens links within the site in the same tab", ({ html }) => {
    const internal = [...html.matchAll(/<a\s[^>]*>/g)]
      .map((m) => attrs(m[0]))
      .filter((a) => (a.href ?? "").startsWith("/") || (a.href ?? "").startsWith("#"));
    expect(internal.filter((a) => a.target === "_blank").map((a) => a.href)).toEqual([]);
  });
});

describe("spacing around inline links", () => {
  // Astro drops a line break between text and a following tag, which glues words to links.
  it.each(pages)("$file has a space between words and the links next to them", ({ html }) => {
    const body = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "");
    const glued = [
      ...[...body.matchAll(/[A-Za-z0-9.,:;!?)]<a\b/g)].map((m) => body.slice(m.index - 30, m.index + 30)),
      ...[...body.matchAll(/<\/a>[A-Za-z0-9(]/g)].map((m) => body.slice(m.index - 30, m.index + 10)),
    ];
    expect(glued).toEqual([]);
  });
});

describe("media", () => {
  it.each(pages)("$file only references media files that exist", ({ html }) => {
    const refs = [...html.matchAll(/(?:src|poster)="(\/media\/[^"]+)"/g)].map((m) => m[1].slice(1));
    expect(refs.filter((r) => !files.includes(r))).toEqual([]);
  });

  it("the home page shows the demo as a still until it's played, and loads nothing before that", () => {
    const video = read("index.html").match(/<video[^>]*>/)?.[0] ?? "";
    for (const a of ["controls", "playsinline"]) expect(video).toMatch(new RegExp(`\\s${a}[\\s>]`));
    for (const a of ["autoplay", "loop"]) expect(video).not.toMatch(new RegExp(`\\s${a}[\\s>]`));
    expect(video).toContain(`preload="none"`);
    expect(video).toMatch(/poster="\/media\//);
  });
});
