// Fail when a built page shows a character that public/fonts/pretendard-subset.woff2 does not hold.
// Fix by running: uv run --with fonttools --with brotli python scripts/subset-font.py
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const covered = new Set(await readFile(new URL('../public/fonts/pretendard-subset.txt', import.meta.url), 'utf8'));

async function* htmlFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* htmlFiles(path);
		else if (entry.name.endsWith('.html')) yield path;
	}
}

const missing = new Map();
let pages = 0;
for await (const file of htmlFiles(dist)) {
	pages++;
	const text = (await readFile(file, 'utf8'))
		.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ')
		.replace(/<[^>]+>/g, ' ');
	for (const char of text) {
		if (char.codePointAt(0) > 0x7e && !/\s/.test(char) && !covered.has(char)) {
			missing.set(char, file.slice(dist.length));
		}
	}
}

if (missing.size > 0) {
	for (const [char, file] of missing) console.error(`missing ${char} (U+${char.codePointAt(0).toString(16).toUpperCase()}) in ${file}`);
	console.error('Run: uv run --with fonttools --with brotli python scripts/subset-font.py');
	process.exit(1);
}
console.log(`check-font: ${pages} pages covered by ${covered.size} characters`);
