import { Link } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

interface ContentDetailProps {
  backHref: string;
  backLabel: string;

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
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </article>
  );
}
