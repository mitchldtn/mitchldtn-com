import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  byTopic,
  latest,
  newestFirst,
  readingMinutes,
  topics,
  visible,
  wordCount,
  type PostMeta,
} from "../../src/lib/posts";

const post: fc.Arbitrary<PostMeta> = fc.record({
  slug: fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/),
  date: fc.date({ min: new Date("2020-01-01"), max: new Date("2030-12-31"), noInvalidDate: true }),
  topics: fc.uniqueArray(fc.constantFrom(...topics), { minLength: 1 }),
  draft: fc.boolean(),
});

// Slugs are file names, so they are unique within the collection.
const posts = fc.uniqueArray(post, { selector: (p) => p.slug, maxLength: 30 });

const at = (slug: string, date: string, draft = false): PostMeta => ({
  slug,
  date: new Date(date),
  topics: ["workflows"],
  draft,
});

const sameSet = (a: readonly PostMeta[], b: readonly PostMeta[]): void => {
  expect([...a].map((p) => p.slug).sort()).toEqual([...b].map((p) => p.slug).sort());
};

describe("visible", () => {
  it("never returns a draft when drafts are excluded", () => {
    fc.assert(fc.property(posts, (ps) => visible(ps, false).every((p) => !p.draft)));
  });

  it("returns every published post when drafts are excluded", () => {
    fc.assert(
      fc.property(posts, (ps) => sameSet(visible(ps, false), ps.filter((p) => !p.draft))),
    );
  });

  it("returns all posts when drafts are included", () => {
    fc.assert(fc.property(posts, (ps) => sameSet(visible(ps, true), ps)));
  });
});

describe("newestFirst", () => {
  it("is sorted by date, newest first", () => {
    fc.assert(
      fc.property(posts, (ps) => {
        const sorted = newestFirst(ps);
        return sorted.every((p, i) => i === 0 || sorted[i - 1].date >= p.date);
      }),
    );
  });

  it("is a permutation of its input", () => {
    fc.assert(
      fc.property(posts, (ps) => {
        const sorted = newestFirst(ps);
        expect(sorted).toHaveLength(ps.length);
        sameSet(sorted, ps);
      }),
    );
  });

  it("does not mutate its input", () => {
    fc.assert(
      fc.property(posts, (ps) => {
        const before = ps.map((p) => p.slug);
        newestFirst(ps);
        expect(ps.map((p) => p.slug)).toEqual(before);
      }),
    );
  });

  it("lists 2026-11-05 before 2026-10-20", () => {
    const ps = [at("older", "2026-10-20"), at("newer", "2026-11-05")];
    expect(newestFirst(ps).map((p) => p.slug)).toEqual(["newer", "older"]);
  });
});

describe("latest", () => {
  it("is the prefix of newestFirst of length min(n, posts)", () => {
    fc.assert(
      fc.property(posts, fc.nat(10), (ps, n) => {
        const got = latest(ps, n);
        expect(got).toHaveLength(Math.min(n, ps.length));
        expect(got).toEqual(newestFirst(ps).slice(0, n));
      }),
    );
  });

  it("gives the three newest of five", () => {
    const ps = [
      at("a", "2026-10-01"),
      at("b", "2026-10-05"),
      at("c", "2026-10-03"),
      at("d", "2026-10-09"),
      at("e", "2026-10-07"),
    ];
    expect(latest(ps, 3).map((p) => p.slug)).toEqual(["d", "e", "b"]);
  });
});

describe("byTopic", () => {
  it("lists each post under each of its topics, and nowhere else", () => {
    fc.assert(
      fc.property(posts, (ps) => {
        const groups = byTopic(ps);
        for (const t of topics) {
          const expected = ps.filter((p) => p.topics.includes(t));
          sameSet(groups.get(t) ?? [], expected);
        }
      }),
    );
  });

  it("has no empty topic", () => {
    fc.assert(
      fc.property(posts, (ps) => [...byTopic(ps).values()].every((g) => g.length > 0)),
    );
  });

  it("lists each topic's posts newest first", () => {
    fc.assert(
      fc.property(posts, (ps) => {
        for (const g of byTopic(ps).values()) expect(g).toEqual(newestFirst(g));
      }),
    );
  });

  it("puts a post with workflows and continuity under both", () => {
    const p: PostMeta = { ...at("p", "2026-10-20"), topics: ["workflows", "continuity"] };
    const groups = byTopic([p]);
    expect([...groups.keys()].sort()).toEqual(["continuity", "workflows"]);
  });
});

describe("readingMinutes", () => {
  it("is ceil(words / 200), at least 1", () => {
    fc.assert(
      fc.property(fc.nat(100_000), (w) =>
        readingMinutes(w) === Math.max(1, Math.ceil(w / 200)),
      ),
    );
  });

  it("is monotonic", () => {
    fc.assert(
      fc.property(fc.nat(100_000), fc.nat(100_000), (a, b) => {
        const [lo, hi] = a <= b ? [a, b] : [b, a];
        return readingMinutes(lo) <= readingMinutes(hi);
      }),
    );
  });

  it("gives 9 for 1,601 words and 1 for 0 words", () => {
    expect(readingMinutes(1601)).toBe(9);
    expect(readingMinutes(0)).toBe(1);
  });
});

describe("wordCount", () => {
  it("counts whitespace-separated words", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("  one\ntwo\tthree  ")).toBe(3);
  });

  it("counts n words joined by any whitespace as n", () => {
    fc.assert(
      fc.property(
        fc.array(fc.stringMatching(/^\S+$/), { maxLength: 50 }),
        fc.constantFrom(" ", "\n", "\t", "  \n"),
        (words, sep) => wordCount(words.join(sep)) === words.length,
      ),
    );
  });
});
