// Post dates are calendar days from frontmatter, parsed as UTC midnight; format them in UTC
// so the build machine's time zone never shifts a day or month.
export const monthYear = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const isoDay = (d: Date): string => d.toISOString().slice(0, 10);
