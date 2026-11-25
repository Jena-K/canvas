import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, 'use YYYY-MM');

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '*.mdx' }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		summary: z.string(),
		company: z.string(),
		role: z.string(),
		period: z.object({ start: yearMonth, end: yearMonth.nullable() }),
		stack: z.array(z.string()).min(1),
		order: z.number().int(),
	}),
});

export const collections = { projects };
