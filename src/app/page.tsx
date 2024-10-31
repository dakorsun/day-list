import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center text-white">
            <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Day List
                </h1>
                <span className="text-lg font-bold text-white">Your simple thing to manage your day</span>
            </div>
            <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
                <Link className="text-lg font-bold" href="/test">Test</Link>
                <Link className="text-lg font-bold" href="/posts">Posts</Link>
            </div>
        </main>
    );
}
