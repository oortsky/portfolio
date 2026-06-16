import { createFileRoute, notFound } from "@tanstack/react-router";
import { projects } from "@velite";
import { m } from "@/paraglide/messages.js";

import { ContentDetail } from "@/components/content/content-detail";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find(project => project.slug === params.slug);

    if (!project) {
      throw notFound();
    }

    return { project };
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.project.title} | ${m["seo.projects.title"]()}`
      },
      {
        name: "description",
        content: loaderData?.project.description
      },

      {
        property: "og:title",
        content: `${loaderData?.project.title} | ${m["seo.projects.title"]()}`
      },
      {
        property: "og:description",
        content: loaderData?.project.description
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
        content: `${loaderData?.project.title} | ${m["seo.projects.title"]()}`
      },
      {
        name: "twitter:description",
        content: loaderData?.project.description
      }
    ]
  }),

  component: ProjectDetail
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <ContentDetail
      backHref="/projects"
      backLabel={m["projects_detail.back"]()}
      title={project.title}
      description={project.description}
      content={project.content}
      meta={
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            {new Date(project.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </span>{" "}
          • <span>{project.status}</span>
        </div>
      }
      badges={
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span key={tech} className="rounded-md bg-muted px-2 py-1 text-xs">
              {tech}
            </span>
          ))}
        </div>
      }
      actions={
        <div className="flex flex-wrap gap-3">
          {project.repository && (
            <Button variant="outline" asChild>
              <a href={project.repository} target="_blank" rel="noreferrer">
                {m["projects_detail.repository"]()}
              </a>
            </Button>
          )}

          {project.website && (
            <Button asChild>
              <a href={project.website} target="_blank" rel="noreferrer">
                {m["projects_detail.live_demo"]()}
              </a>
            </Button>
          )}
        </div>
      }
    />
  );
}
