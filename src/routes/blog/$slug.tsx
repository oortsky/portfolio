import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "@velite";
import { m } from "@/paraglide/messages.js";

import { ContentDetail } from "@/components/content/content-detail";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find(post => post.slug === params.slug);

    if (!post) {
      throw notFound();
    }

    return { post };
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.post.title} | ${m["seo.blog.title"]()}`
      },
      {
        name: "description",
        content:
          loaderData?.post.description ??
          loaderData?.post.excerpt ??
          m["seo.post.description"]()
      },

      {
        property: "og:title",
        content: `${loaderData?.post.title} | ${m["seo.blog.title"]()}`
      },
      {
        property: "og:description",
        content:
          loaderData?.post.description ??
          loaderData?.post.excerpt ??
          m["seo.post.description"]()
      },
      {
        property: "og:type",
        content: "article"
      },

      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:title",
        content: `${loaderData?.post.title} | ${m["seo.blog.title"]()}`
      },
      {
        name: "twitter:description",
        content:
          loaderData?.post.description ??
          loaderData?.post.excerpt ??
          m["seo.post.description"]()
      }
    ]
  }),

  component: BlogDetail
});

function BlogDetail() {
  const { post } = Route.useLoaderData();

  return (
    <ContentDetail
      backHref="/blog"
      backLabel={m["blog_detail.back"]()}
      title={post.title}
      description={post.description}
      content={post.content}
      meta={
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </span>{" "}
          • <span>
            {m["blog_detail.reading_time"]({
              minutes: String(post.metadata.readingTime)
            })}
          </span>{" "}
          •{" "}
          <span>
            {m["blog_detail.word_count"]({
              count: String(post.metadata.wordCount)
            })}
          </span>
        </div>
      }
      badges={
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      }
    />
  );
}
