import type { MarkdownHeading } from 'astro';

export interface TaskGroup {
	area: MarkdownHeading;
	tasks: MarkdownHeading[];
}

// Project MDX uses `##` for an area of work and `###` for one task inside it.
export const taskGroups = (headings: MarkdownHeading[]): TaskGroup[] =>
	headings.reduce<TaskGroup[]>((groups, heading) => {
		if (heading.depth === 2) groups.push({ area: heading, tasks: [] });
		if (heading.depth === 3) groups.at(-1)?.tasks.push(heading);
		return groups;
	}, []);

export const taskCount = (groups: TaskGroup[]) => groups.reduce((sum, group) => sum + group.tasks.length, 0);

export const formatPeriod = ({ start, end }: { start: string; end: string | null }) =>
	`${start.replace('-', '.')} ~ ${end ? end.replace('-', '.') : '진행 중'}`;
