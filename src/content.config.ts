import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { postTypes, topics } from "./lib/posts";

const writing = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.coerce.date(),
    type: z.enum(postTypes),
    topics: z.array(z.enum(topics)).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
