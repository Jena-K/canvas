// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://jena-k.github.io',
	integrations: [mdx(), sitemap()],
	// Inline the CSS so fonts are discovered with the HTML instead of one request later.
	build: { inlineStylesheets: 'always' },
});
