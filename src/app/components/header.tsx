'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TimeBoard } from './time-board';
import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';

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
				<h1>DL</h1>
			</div>
			<div
				className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
					isOpen ? 'max-h-[70vh]' : 'max-h-0'
				}`}
			>
				<div className="parent p-4 overflow-y-auto max-h-[70vh]">
					<div className="space-y-4">
						<Label htmlFor="name">What were you up to?</Label>
						<Input id="name" placeholder="Your stuff" />

						<Button className="w-full">Submit</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
