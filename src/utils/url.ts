// Prefix root-relative paths with the configured `base` (none since the site moved to the root domain).
// Keep using it: a future `base` in astro.config then needs no other change.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);
