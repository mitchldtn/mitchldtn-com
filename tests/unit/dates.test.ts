import { describe, expect, it } from "vitest";
import { isoDay, monthYear } from "../../src/lib/dates";

describe("dates", () => {
  it("formats a frontmatter day as its own month, whatever the local time zone", () => {
    expect(monthYear(new Date("2026-11-01"))).toBe("Nov 2026");
    expect(monthYear(new Date("2026-10-31"))).toBe("Oct 2026");
  });

  it("gives the frontmatter day back as ISO", () => {
    expect(isoDay(new Date("2026-10-20"))).toBe("2026-10-20");
  });
});
