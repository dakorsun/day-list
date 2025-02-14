'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TimeBoard } from '~/components/time-board';
import ThemeSwitcher from '~/components/theme-switcher';
import { CheckpointForm } from './checkpoint-form';

export function HeaderComponent() {
	const headerRef = useRef<HTMLDivElement>(null);
	const counterIgnoreRef = useRef<HTMLDivElement>(null);
	const logoIgnoreRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const isOpenFromUrl = searchParams.get('expanded') === 'true';

	const [isOpen, setIsOpen] = useState(isOpenFromUrl);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			console.log('click');
			console.log(headerRef, counterIgnoreRef);
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				console.log('outside', isOpen);
				setIsOpen(false);
			} else if (
				(counterIgnoreRef.current &&
					counterIgnoreRef.current.contains(event.target as Node) &&
					isOpen) ||
				(logoIgnoreRef.current &&
					logoIgnoreRef.current.contains(event.target as Node))
			) {
				console.log('counter', isOpen);
			} else {
				console.log('inside', isOpen);
				setIsOpen(!isOpen);
			}
		},
		[isOpen, headerRef, counterIgnoreRef],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

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
			ref={headerRef}
			className="
				bg-background
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
				<TimeBoard ignoreRef={counterIgnoreRef} />
				<ThemeSwitcher ignoreRef={logoIgnoreRef} />
			</div>
			<div
				className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
					isOpen ? 'max-h-[70vh]' : 'max-h-0'
				}`}
			>
				<div className="parent p-4 pt-16 overflow-y-auto max-h-[70vh] flex justify-start align-middle">
					<CheckpointForm />
				</div>
			</div>
		</div>
	);
}
