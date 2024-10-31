import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { HeaderComponent } from "./components/header";

export const metadata: Metadata = {
    title: "Day List",
    description: "Your simple thing to manage your day",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="bg-gray-600">
                <HeaderComponent />
                {children}</body>
        </html>
    );
}
