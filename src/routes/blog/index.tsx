import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@velite";
import { m } from "@/paraglide/messages.js";

import { BlogCard } from "@/components/content/blog-card";
import { ContentPage } from "@/components/content/content-page";

export const Route = createFileRoute("/blog/")({
  component: Blog,
  head: () => ({
  meta: [
    {
      title: m["seo.blog.title"]()
    },
    {
      name: "description",
      content: m["seo.blog.description"]()
    }
  ]
})
});

function Blog() {
  return (
    <ContentPage
      title={m["blog_content.title"]()}
      description={m["blog_content.description"]()}
      data={posts}
      emptyTitle={m["blog_content.empty_title"]()}
      emptyDescription={m["blog_content.empty_description"]()}
      renderCard={post => <BlogCard key={post.slug} post={post} />}
    />
  );
}
