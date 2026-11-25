/*
 * Fade blocks in as they enter the viewport.
 * Only blocks below the fold at load get hidden, so the first screen (and LCP) never waits on script.
 * Without the script, or with reduced motion, nothing is ever hidden.
 */
const SELECTOR = [
	'.section-title',
	'.row',
	'.experience > li',
	'.skills > div',
	'.diagram',
	'.prose > h2',
	'.prose > h3',
].join(',');

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				(entry.target as HTMLElement).dataset.reveal = 'shown';
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px' },
	);

	for (const element of document.querySelectorAll<HTMLElement>(SELECTOR)) {
		if (element.getBoundingClientRect().top <= innerHeight) continue;
		element.dataset.reveal = 'hidden';
		observer.observe(element);
	}
}
