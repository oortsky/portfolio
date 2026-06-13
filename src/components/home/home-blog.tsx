import { posts } from "@velite";
import { m } from "@/paraglide/messages.js";

import { PostCard } from "@/components/content/post-card";
import { ContentEmpty } from "@/components/content/content-empty";
import { ContentSection } from "@/components/content/content-section";

export function HomeBlog() {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <ContentSection
      title={m["home_blog.title"]()}
      description={m["home_blog.description"]()}
      actionLabel={m["home_blog.action_label"]()}
      actionHref="/blog"
    >
      {latestPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {latestPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <ContentEmpty
          title={m["home_blog.empty_title"]()}
          description={m["home_blog.empty_description"]()}
        />
      )}
    </ContentSection>
  );
}
