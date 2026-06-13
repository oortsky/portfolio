import { useRouter } from "@tanstack/react-router";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function ErrorPage({ error }: { error?: unknown }) {
  const router = useRouter();

  return (
    <Empty className="mx-auto container h-screen w-full flex justify-center items-center">
      <EmptyHeader>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t process your request. The system encountered an
          unexpected error.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        {import.meta.env.DEV && error && (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs opacity-60">
            {error instanceof Error ? error.message : String(error)}
          </code>
        )}

        <div className="flex flex-col gap-2">
          <Button variant="default" onClick={() => router.invalidate()}>
            Retry
          </Button>

          <Button variant="link" onClick={() => router.navigate({ to: "/" })}>
            Back to Home
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
