import { projects } from "@velite";
import { m } from "@/paraglide/messages.js";

import { ProjectsCard } from "@/components/content/projects-card";
import { ContentEmpty } from "@/components/content/content-empty";
import { ContentSection } from "@/components/content/content-section";

export function HomeProjects() {
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 3);

  return (
    <ContentSection
      title={m["home_projects.title"]()}
      description={m["home_projects.description"]()}
      actionLabel={m["home_projects.action_label"]()}
      actionHref="/projects"
    >
      {featuredProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          {featuredProjects.map(project => (
            <ProjectsCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <ContentEmpty
          title={m["home_projects.empty_title"]()}
          description={m["home_projects.empty_description"]()}
        />
      )}
    </ContentSection>
  );
}
