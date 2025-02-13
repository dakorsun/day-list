import { useTheme } from './theme-provider';

export default function ThemeSwitcher() {
	const { toggleTheme } = useTheme();
	return (
		<div
			className="cursor-pointer"
			onClick={() => {
				toggleTheme();
			}}
		>
			<h1>DL</h1>
		</div>
	);
}
