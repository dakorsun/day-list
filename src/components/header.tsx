'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TimeBoard } from '~/components/time-board';
import ThemeSwitcher from '~/components/theme-switcher';
import { CheckpointForm } from './checkpoint-form';

export function HeaderComponent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isOpenFromUrl = searchParams.get('expanded') === 'true';

	const [isOpen, setIsOpen] = useState(isOpenFromUrl);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (isOpen) {
			params.set('expanded', 'true');
		} else {
			params.delete('expanded');
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	}, [isOpen, router, searchParams]);

	function onCheckpoint(checkpointName: string) {}

	return (
		<div
			className="
        fixed top-0 left-0 w-full
        p-[1rem]
        font-bold text-5xl
				shadow-md
				transition-all
        "
		>
			<div
				className="
        flex flex-row justify-between
				"
			>
				<TimeBoard
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
				<ThemeSwitcher />
			</div>
			<div
				className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
					isOpen ? 'max-h-[70vh]' : 'max-h-0'
				}`}
			>
				<div className="parent p-4 pt-16 overflow-y-auto max-h-[70vh] flex justify-center align-middle">
					<CheckpointForm onCheckpoint={onCheckpoint} />
				</div>
			</div>
		</div>
	);
}
