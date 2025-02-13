'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export enum AppTheme {
	LIGHT = 'light',
	DARK = 'dark',
}
type ThemeContextType = {
	theme: AppTheme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<AppTheme>(AppTheme.LIGHT);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as AppTheme | null;
		if (storedTheme) {
			setTheme(storedTheme);
			document.body.classList.add(storedTheme);
		}
	}, []);

	const toggleTheme = () => {
		setTheme(prev => {
			const newTheme = prev === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT;

			document.body.classList.remove(prev);
			document.body.classList.add(newTheme);

			localStorage.setItem('theme', newTheme);

			return newTheme;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
}
