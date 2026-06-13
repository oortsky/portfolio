import { useRouter } from "@tanstack/react-router";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

import { ThemeProvider } from "@/components/theme-provider";

export function NotFoundPage() {
  const router = useRouter();

  return (
    <Empty className="mx-auto container h-screen w-full flex justify-center items-center">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          <Button variant="link" onClick={() => router.navigate({ to: "/" })}>
            Back to Home
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
