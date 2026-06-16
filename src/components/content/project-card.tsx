import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages.js";
import type { Project } from "@velite";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Code, ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      key={project.slug}
      className="relative mx-auto w-full max-w-sm overflow-hidden pt-0"
    >
      {project.cover && (
        <>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src={project.cover.src}
            alt={project.title}
            className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
          />
        </>
      )}

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>

        <CardDescription>{project.description}</CardDescription>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies?.map((tech: string) => (
            <span key={tech} className="text-xs px-2 py-1 rounded-md bg-muted">
              {tech}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="flex flex-col">
        <div className="w-full mt-auto flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {project.status}
          </span>

          {project.permalink && (
            <Button asChild>
              <Link to={project.permalink}>
                {m["projects_card.read_more"]()}
              </Link>
            </Button>
          )}
        </div>

        <Separator className="my-6" />

        <div className="w-full flex justify-between gap-4">
          {project.repository && (
            <Button className="w-full" variant="outline" asChild>
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code />
                {m["projects_card.repository"]()}
              </a>
            </Button>
          )}

          {project.website && (
            <Button className="w-full" variant="outline" asChild>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
                {m["projects_card.live_demo"]()}
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
