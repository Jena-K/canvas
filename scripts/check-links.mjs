// Fails when a built page links to a file that `dist/` does not contain.
// Usage: pnpm build && node scripts/check-links.mjs
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const base = (config.base ?? '/').replace(/\/?$/, '/');
const siteBase = new URL(base, config.site).href;

const htmlFiles = (dir) =>
	readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return htmlFiles(path);
		return name.endsWith('.html') ? [path] : [];
	});

const ATTR = /\s(href|src|srcset|content)="([^"]+)"/g;

// `content` holds prose too, so only absolute URLs on this site count there.
const targets = (html) =>
	[...html.matchAll(ATTR)].flatMap(([, attr, value]) => {
		if (attr === 'srcset') return value.split(',').map((part) => part.trim().split(/\s+/)[0]);
		if (attr === 'content') return value.startsWith(siteBase) ? [value] : [];
		return [value];
	});

const toDistPath = (value, pagePath) => {
	if (value.startsWith(siteBase)) value = '/' + value.slice(new URL(config.site).href.length);
	else if (/^([a-z]+:|#|\/\/)/i.test(value)) return null;
	const url = new URL(value, `http://x${pagePath}`);
	if (!url.pathname.startsWith(base)) return { missing: url.pathname };
	const rest = decodeURIComponent(url.pathname.slice(base.length));
	const candidates = rest === '' || rest.endsWith('/') ? [join(rest, 'index.html')] : [rest, join(rest, 'index.html')];
	return candidates.some((c) => existsSync(join(dist, c))) ? { ok: true } : { missing: url.pathname };
};

const broken = [];
let checked = 0;
for (const file of htmlFiles(dist)) {
	const rel = relative(dist, file).replace(/index\.html$/, '');
	const pagePath = base + rel;
	for (const value of targets(readFileSync(file, 'utf8'))) {
		const result = toDistPath(value, pagePath);
		if (!result) continue;
		checked += 1;
		if (result.missing) broken.push(`${pagePath} -> ${value}`);
	}
}

if (broken.length) {
	console.error(`check-links: ${broken.length} broken of ${checked} internal links`);
	for (const line of broken) console.error(`  ${line}`);
	process.exit(1);
}
console.log(`check-links: ${checked} internal links ok`);
