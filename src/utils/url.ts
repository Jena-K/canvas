// Prefix root-relative paths with the configured `base` (e.g. "/canvas").
// When the site moves to a root domain, removing `base` from astro.config is the only change needed.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);
