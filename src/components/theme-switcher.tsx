import React from 'react';
import { useTheme } from '~/components/theme-provider';

export default function ThemeSwitcher({
	ignoreRef,
}: {
	ignoreRef: React.RefObject<HTMLDivElement>;
}) {
	const { toggleTheme } = useTheme();
	return (
		<div
			ref={ignoreRef}
			className="cursor-pointer"
			onClick={() => {
				toggleTheme();
			}}
		>
			<h1>DL</h1>
		</div>
	);
}
