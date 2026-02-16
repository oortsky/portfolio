import { reader } from "@/lib/keystatic";

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);

  if (!project) {
    return <div>No Post Found</div>;
  }

  const content = await project.content();

  return (
    <article className="py-32 px-4">
    {/* Thumbnail */}
      <h1 className="text-4xl font-bold">{project.title}</h1>
    {/* Button - Live View */}
    {/* Button - GitHub Repo/Docs */}
    {/* Badge Tags - Technologies */}
      {content} {/* Keystatic - Image Custom Component */}
      <hr />
      <a href={`/`}>Back to Posts</a>
    </article>
  );
}
