import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { posts } from "../lib/content";
import { newestFirst } from "../lib/posts";
import { canonical } from "../lib/urls";

export async function GET({ site }: APIContext) {
  const base = site!.toString();
  return rss({
    title: "Mitch Ludington: writing",
    description: "What works, what fails and why, from building with coding agents every day.",
    site: base,
    items: newestFirst(await posts()).map((p) => ({
      title: p.title,
      description: p.description,
      pubDate: p.date,
      link: canonical(base, `/writing/${p.slug}`),
    })),
  });
}
