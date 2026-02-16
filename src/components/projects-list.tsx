import { useProjects } from "@/hooks/use-keystatic";
import { ProjectItem } from "@/components/project-item";
import type { Project } from "@/types";

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
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <ProjectsLoading />;
  if (error) return <ProjectsError message={error.message} />;

  return (
    <div>
      {projects && projects.length > 0 ? (
        <div>
          {projects.map(({ slug, entry }: Project) => (
            <ProjectItem key={slug} slug={slug} data={entry} />
          ))}
        </div>
      ) : (
        <ProjectsEmpty />
      )}
    </div>
  );
}

function ProjectsLoading() {
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

function ProjectsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>There are no projects yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface ProjectsErrorProps {
  message: string;
}

function ProjectsError({ message }: ProjectsErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Error</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
