import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface ContentSectionProps {
  title: string;
  description: string;

  actionLabel: string;
  actionHref: string;

  children: React.ReactNode;
}

export function ContentSection({
  title,
  description,

  actionLabel,
  actionHref,

  children
}: ContentSectionProps) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="text-muted-foreground">{description}</p>
      </div>

      {children}

      <div className="flex justify-center">
        <Button variant="link" asChild>
          <Link to={actionHref}>{actionLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
