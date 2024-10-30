import { db } from "~/server/db"

export default async function PostsPage() {
    const posts = await db.query.posts.findMany();
    return <div className="flex flex-col justify-start">
        {posts.map((post) => (
            <div key={post.id}>{post.name}</div>
        ))}
    </div>
}
