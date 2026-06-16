import { Link } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ArrowLeft } from "lucide-react";

interface ContentDetailProps {
  backHref: string;
  backLabel: string;

  cover?: string;

  title: string;
  description?: string;

  meta?: React.ReactNode;
  badges?: React.ReactNode;
  actions?: React.ReactNode;

  content: string;
}

export function ContentDetail({
  backHref,
  backLabel,

  cover,

  title,
  description,

  meta,
  badges,
  actions,

  content
}: ContentDetailProps) {
  return (
    <article className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <header className="space-y-6">
        <Button variant="link" className="p-0" asChild>
          <Link to={backHref}>
            <ArrowLeft /> {backLabel}
          </Link>
        </Button>

        {cover && (
          <AspectRatio
            ratio={16 / 9}
            className="rounded-lg bg-muted overflow-hidden"
          >
            <img
              src={cover}
              alt={title}
              className="w-full rounded-lg object-cover"
            />
          </AspectRatio>
        )}

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{title}</h1>

          {meta}

          {description && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {badges}

        {actions}
      </header>

      <Separator />

      <section
        className="
    prose prose-neutral dark:prose-invert
    max-w-none

    prose-headings:scroll-mt-24
    prose-headings:font-bold
    prose-headings:tracking-tight

    prose-h1:text-4xl
    prose-h2:text-3xl
    prose-h3:text-2xl

    prose-p:leading-8

    prose-a:text-primary
    prose-a:no-underline
    hover:prose-a:underline

    prose-img:rounded-xl
    prose-img:border
    prose-img:shadow-md

    prose-blockquote:border-l-4
    prose-blockquote:italic

    prose-code:rounded
    prose-code:bg-muted
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:font-mono
    prose-code:text-sm

    prose-pre:rounded-xl
    prose-pre:border
    prose-pre:bg-muted

    prose-table:block
    prose-table:w-full
    prose-table:overflow-x-auto

    prose-th:border
    prose-th:bg-muted
    prose-th:px-4
    prose-th:py-2

    prose-td:border
    prose-td:px-4
    prose-td:py-2

    prose-ul:list-disc
    prose-ol:list-decimal

    prose-li:marker:text-muted-foreground
  "
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </article>
  );
}
