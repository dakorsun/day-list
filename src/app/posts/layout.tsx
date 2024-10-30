export default function PostsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex flex-col items-center justify-start text-white py-16">
        {children}
    </div>
}
