// Pure rules for which posts show where. No Astro imports: content.ts reads the
// collection and passes plain records in.

export const postTypes = ["post", "experiment", "demo", "walkthrough"] as const;
export type PostType = (typeof postTypes)[number];

export const topics = ["workflows", "continuity", "reliability", "building-nemonik"] as const;
export type Topic = (typeof topics)[number];

export const topicLabel = (t: Topic): string => t.replace(/-/g, " ");

export type PostMeta = {
  readonly slug: string;
  readonly date: Date;
  readonly topics: readonly Topic[];
  readonly draft: boolean;
};

export const visible = <P extends PostMeta>(posts: readonly P[], includeDrafts: boolean): P[] =>
  posts.filter((p) => includeDrafts || !p.draft);

// Same-day posts fall back to slug order so the result never depends on input order.
export const newestFirst = <P extends PostMeta>(posts: readonly P[]): P[] =>
  [...posts].sort(
    (a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug),
  );

export const latest = <P extends PostMeta>(posts: readonly P[], n: number): P[] =>
  newestFirst(posts).slice(0, n);

export const byTopic = <P extends PostMeta>(posts: readonly P[]): Map<Topic, P[]> =>
  new Map(
    topics
      .map((t) => [t, newestFirst(posts.filter((p) => p.topics.includes(t)))] as const)
      .filter(([, ps]) => ps.length > 0),
  );

export const wordCount = (text: string): number => text.split(/\s+/).filter(Boolean).length;

export const readingMinutes = (words: number): number => Math.max(1, Math.ceil(words / 200));
