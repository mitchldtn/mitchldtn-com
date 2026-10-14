// The only place that reads the writing collection. Every page, the feed and the
// preview images go through here, so draft handling has one source.
import { getCollection, type CollectionEntry } from "astro:content";
import { readingMinutes, visible, wordCount, type PostMeta } from "./posts";

export type Post = PostMeta & {
  readonly entry: CollectionEntry<"writing">;
  readonly title: string;
  readonly description: string;
  readonly type: CollectionEntry<"writing">["data"]["type"];
  readonly minutes: number;
};

const toPost = (entry: CollectionEntry<"writing">): Post => ({
  entry,
  slug: entry.id,
  ...entry.data,
  minutes: readingMinutes(wordCount(entry.body ?? "")),
});

export const posts = async (): Promise<Post[]> =>
  visible((await getCollection("writing")).map(toPost), !import.meta.env.PROD);
