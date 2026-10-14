import type { HastPluginDefinition } from "satteri";

export const isExternal = (href: string, site: string): boolean =>
  /^https?:\/\//.test(href) && new URL(href).host !== new URL(site).host;

export const linkAttributes = (href: unknown, site: string): Record<string, unknown> =>
  typeof href === "string" && isExternal(href, site)
    ? { target: "_blank", rel: ["noopener", "noreferrer"] }
    : {};

export const externalLinks = (site: string): HastPluginDefinition => ({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      for (const [key, value] of Object.entries(linkAttributes(node.properties.href, site))) {
        ctx.setProperty(node, key, value);
      }
    },
  },
});
