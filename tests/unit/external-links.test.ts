import { describe, expect, it } from "vitest";
import { isExternal, linkAttributes } from "../../src/lib/external-links";

const site = "https://www.mitchldtn.com";

describe("isExternal", () => {
  it("is true only for http(s) links to another host", () => {
    expect(isExternal("https://github.com/csepulv/michi", site)).toBe(true);
    expect(isExternal("http://example.com", site)).toBe(true);
    expect(isExternal("https://www.mitchldtn.com/writing", site)).toBe(false);
    expect(isExternal("/writing", site)).toBe(false);
    expect(isExternal("#section", site)).toBe(false);
    expect(isExternal("mailto:a@b.c", site)).toBe(false);
  });
});

describe("linkAttributes", () => {
  it("opens links to other sites in a new tab", () => {
    expect(linkAttributes("https://github.com", site)).toEqual({
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    });
  });

  it("leaves links within the site and missing hrefs alone", () => {
    expect(linkAttributes("/about", site)).toEqual({});
    expect(linkAttributes("https://www.mitchldtn.com/writing", site)).toEqual({});
    expect(linkAttributes(undefined, site)).toEqual({});
  });
});
