import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { ThemeProvider } from '~/components/theme-provider';
import { HeaderComponent } from '~/components/header';

export const metadata: Metadata = {
	title: 'Day List',
	description: 'Your simple thing to record your day',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<ThemeProvider>
				<body className="bg-background text-foreground">
					<HeaderComponent />
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
