import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@velite";
import { m } from "@/paraglide/messages.js";

import { ContentPage } from "@/components/content/content-page";
import { ProjectCard } from "@/components/content/project-card";

export const Route = createFileRoute("/projects/")({
  component: Projects,
  head: () => ({
  meta: [
    {
      title: m["seo.projects.title"]()
    },
    {
      name: "description",
      content: m["seo.projects.description"]()
    }
  ]
})
});

function Projects() {
  return (
    <ContentPage
      title={m["projects_content.title"]()}
      description={m["projects_content.description"]()}
      data={projects}
      emptyTitle={m["projects_content.empty_title"]()}
      emptyDescription={m["projects_content.empty_description"]()}
      renderCard={project => (
        <ProjectCard key={project.slug} project={project} />
      )}
    />
  );
}
