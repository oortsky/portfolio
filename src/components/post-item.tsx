import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { PostEntry } from "@/types";

interface PostItemProps {
  slug: string;
  data: PostEntry;
}

export function PostItem({ slug, data }: PostItemProps) {
  return (
    <Card className="mx-auto w-full max-w-sm pt-0">
      <AspectRatio ratio={16 / 9} className="bg-primary/10 rounded-lg">
        <Image
          src={data.coverImage || "https://avatar.vercel.sh/shadcn1"}
          alt={data.title}
          fill
          className="w-full rounded-lg object-cover dark:brightness-20"
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/posts/${slug}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
