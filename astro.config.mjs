// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";
import { externalLinks } from "./src/lib/external-links.ts";

const site = "https://www.mitchldtn.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => page !== `${site}/404`,
    }),
  ],
  markdown: {
    processor: satteri({
      // Keep the author's characters as typed: no curly quotes, and "--" never becomes a dash.
      features: { smartPunctuation: false },
      hastPlugins: [externalLinks(site)],
    }),
    shikiConfig: { theme: "github-dark-dimmed" },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
