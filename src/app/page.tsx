'use client';

import { DayList } from '~/components/day-list/day-list';

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
					Day List
				</h1>
				<span className="text-lg font-bold">
					Your simple thing to record your day
				</span>
			</div>
			<DayList />
		</main>
	);
}
