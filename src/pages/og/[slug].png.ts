import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import type { APIContext } from "astro";
import satori from "satori";
import sharp from "sharp";
import { posts } from "../../lib/content";
import { cardTree, ogSize, postCard, siteCard, type Card } from "../../lib/og";

// Satori reads TTF, OTF and WOFF, not WOFF2.
const require = createRequire(import.meta.url);
const font = (weight: 400 | 700) =>
  readFile(require.resolve(`@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${weight}-normal.woff`));

export async function getStaticPaths() {
  const list = await posts();
  if (list.some((p) => p.slug === "site")) throw new Error('A post cannot be named "site": /og/site.png is the site card');
  return [
    { params: { slug: "site" }, props: { card: siteCard } },
    ...list.map((p) => ({ params: { slug: p.slug }, props: { card: postCard(p.title) } })),
  ];
}

export async function GET({ props }: APIContext<{ card: Card }>) {
  const svg = await satori(cardTree(props.card) as never, {
    ...ogSize,
    fonts: [
      { name: "JetBrains Mono", data: await font(400), weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: await font(700), weight: 700, style: "normal" },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}
