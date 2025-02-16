'use client';

import { useCallback, useEffect, useRef } from 'react';
import { TimeBoard } from '~/components/time-board';
import ThemeSwitcher from '~/components/theme-switcher';
import { CheckpointForm } from './checkpoint-form';
import { useSearchParamsContext } from './search-params.provider';

export function HeaderComponent() {
	const headerRef = useRef<HTMLDivElement>(null);
	const counterIgnoreRef = useRef<HTMLDivElement>(null);
	const logoIgnoreRef = useRef<HTMLDivElement>(null);
	const formIgnoreRef = useRef<HTMLFormElement>(null);
	const autocompleteIgnoreRef = useRef<HTMLDivElement>(null);

	const { isOpen, setIsOpen } = useSearchParamsContext();

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			console.log('click');
			/* console.log(
				headerRef,
				counterIgnoreRef,
				formIgnoreRef,
				headerRef.current,
				autocompleteIgnoreRef.current,
				event.target,
				autocompleteIgnoreRef.current?.contains(event.target as Node),
			); */
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				if (
					autocompleteIgnoreRef.current &&
					!autocompleteIgnoreRef.current.contains(event.target as Node)
				) {
					console.log('outside', isOpen);
					setIsOpen(false);
				}
			} else if (
				(counterIgnoreRef.current &&
					counterIgnoreRef.current.contains(event.target as Node)) ||
				(logoIgnoreRef.current &&
					logoIgnoreRef.current.contains(event.target as Node)) ||
				(formIgnoreRef.current &&
					formIgnoreRef.current?.contains(event.target as Node))
			) {
				console.log('ignore', isOpen);
			} else {
				console.log('inside', isOpen);
				setIsOpen(!isOpen);
			}
		},
		[isOpen, headerRef, counterIgnoreRef, setIsOpen],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

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
				className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[70vh]' : 'max-h-0'}`}
			>
				<div className="parent p-4 pt-16 overflow-y-auto max-h-[70vh] flex justify-start align-middle">
					<CheckpointForm
						ignoreRef={formIgnoreRef}
						ignoreAutocompleteRef={autocompleteIgnoreRef}
					/>
				</div>
			</div>
		</div>
	);
}
