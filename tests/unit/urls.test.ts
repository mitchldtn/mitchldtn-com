import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { canonical } from "../../src/lib/urls";

const site = "https://www.mitchldtn.com";
const segment = fc.stringMatching(/^[a-z0-9-]{1,12}$/);
const path = fc.array(segment, { minLength: 1, maxLength: 4 }).map((s) => "/" + s.join("/"));

describe("canonical", () => {
  it("gives the home page a trailing slash", () => {
    expect(canonical(site, "/")).toBe("https://www.mitchldtn.com/");
    expect(canonical(site, "")).toBe("https://www.mitchldtn.com/");
  });

  it("drops the trailing slash on other pages", () => {
    expect(canonical(site, "/writing")).toBe("https://www.mitchldtn.com/writing");
    expect(canonical(site, "/about/")).toBe("https://www.mitchldtn.com/about");
  });

  it("ignores a trailing slash on the site", () => {
    expect(canonical(site + "/", "/about")).toBe("https://www.mitchldtn.com/about");
  });

  it("is the site followed by the path, with no trailing slash", () => {
    fc.assert(
      fc.property(path, fc.boolean(), (p, slash) => {
        const url = canonical(site, slash ? p + "/" : p);
        expect(url).toBe(site + p);
        expect(url.endsWith("/")).toBe(false);
      }),
    );
  });

  it("is idempotent on its own path", () => {
    fc.assert(
      fc.property(path, (p) => {
        const once = canonical(site, p);
        expect(canonical(site, new URL(once).pathname)).toBe(once);
      }),
    );
  });
});
