import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";

export function PendingPage() {
  return (
    <Empty className="mx-auto container h-screen w-full flex justify-center items-center">
      <EmptyHeader>
        <EmptyTitle>Loading</EmptyTitle>
        <EmptyDescription>Preparing your experience.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex justify-center py-6">
          <Spinner className="size-6" />
        </div>
      </EmptyContent>
    </Empty>
  );
}
