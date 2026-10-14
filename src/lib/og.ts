// The preview card as a Satori element tree. Pure: the endpoint loads fonts and renders it.
export type Card = { title: string; footer: string };

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export const ogSize = { width: 1200, height: 630 } as const;

export const siteCard: Card = {
  title: "Making AI-assisted software development more reliable.",
  footer: "mitchldtn.com",
};

export const postCard = (title: string): Card => ({ title, footer: "mitchldtn.com/writing" });

// Long titles step down so they stay inside the card.
const titleSize = (title: string) => (title.length > 70 ? 52 : title.length > 40 ? 60 : 68);

// Satori adds padding outside width and height, so the content box is sized to leave room for it.
const pad = { x: 80, y: 72 };

export const cardTree = ({ title, footer }: Card): Node =>
  el(
    "div",
    {
      width: ogSize.width - 2 * pad.x,
      height: ogSize.height - 2 * pad.y,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: `${pad.y}px ${pad.x}px`,
      backgroundColor: "#151a22",
      color: "#ffffff",
      fontFamily: "JetBrains Mono",
    },
    [
      el("div", { display: "flex", width: 28, height: 28, borderRadius: 14, backgroundColor: "#E0787B" }),
      el("div", { display: "flex", fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.25 }, title),
      el("div", { display: "flex", justifyContent: "space-between", fontSize: 30 }, [
        el("div", { display: "flex" }, "mitch ludington"),
        el("div", { display: "flex", color: "#9CDBFB" }, footer),
      ]),
    ],
  );
