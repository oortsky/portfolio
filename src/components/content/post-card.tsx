import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages.js";
import type { Post } from "@velite";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card
      key={post.slug}
      className="relative mx-auto w-full max-w-sm overflow-hidden pt-0"
    >
      {post.cover && (
        <>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src={post.cover.src}
            alt={post.title}
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
        </>
      )}

      <CardHeader>
        <CardTitle>{post.title}</CardTitle>

        <CardDescription>{post.description ?? post.excerpt}</CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {m["blog_card.reading_time"]({
            minutes: String(post.metadata.readingTime)
          })}
        </span>

        {post.permalink && (
          <Button asChild>
            <Link to={post.permalink}>{m["blog_card.read_more"]()}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
