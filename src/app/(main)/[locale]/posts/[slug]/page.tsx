import { reader } from "@/lib/keystatic";

/**
 * TODO:
 * [] Design this page.
 */

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    return <div>No Post Found</div>;
  }

  const content = await post.content();

  return (
    <article className="py-32 px-4">
      {/* Cover Image */}
      <h1 className="text-4xl font-bold">{post.title}</h1>
      {/* Readable Publish Date */}
      {/* Badge Tags */}
      {/* Content with prose Tailwind Typography */}
      {content}
      <hr />
      <a href={`/`}>Back to Posts</a>
    </article>
  );
}
