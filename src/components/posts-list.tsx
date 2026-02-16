import { usePosts } from "@/hooks/use-keystatic";
import { PostItem } from "@/components/post-item";
import type { Post } from "@/types";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export function PostsList() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <PostsLoading />;
  if (error) return <PostsError message={error.message} />;

  return (
    <div>
      {posts && posts.length > 0 ? (
        <div>
          {posts.map(({ slug, entry }: Post) => (
            <PostItem key={slug} slug={slug} data={entry} />
          ))}
        </div>
      ) : (
        <PostsEmpty />
      )}
    </div>
  );
}

function PostsLoading() {
  return (
    <Card className="w-full max-w-xs">
      <AspectRatio ratio={16 / 9} className="rounded-lg">
        <Skeleton className="w-full h-full rounded-lg" />
      </AspectRatio>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

function PostsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>There are no posts yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface PostsErrorProps {
  message: string;
}

function PostsError({ message }: PostsErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Error</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
