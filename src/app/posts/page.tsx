import { db } from '~/server/db';
import { SelectPost } from '~/server/db/zod';

export default async function PostsPage() {
  let posts: SelectPost[];
  try {
    posts = await db.query.posts.findMany();
  } catch (e) {
    console.error(e);
    posts = [];
  }
  if (posts.length === 0) {
    return <div className="flex flex-col justify-start">No posts</div>;
  }
  return (
    <div className="flex flex-col justify-start">
      {posts.map(post => (
        <div key={post.id}>{post.name}</div>
      ))}
    </div>
  );
}
