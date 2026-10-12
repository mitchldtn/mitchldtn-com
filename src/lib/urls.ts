// Canonical URLs have no trailing slash, except the home page, which is the bare site with "/".
export const canonical = (site: string, path: string): string => {
  const base = site.replace(/\/+$/, "");
  const p = path.replace(/\/+$/, "");
  return p === "" ? `${base}/` : `${base}${p.startsWith("/") ? p : `/${p}`}`;
};
