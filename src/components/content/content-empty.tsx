import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";

interface ContentEmptyProps {
  title: string;
  description: string;
}

export function ContentEmpty({
  title,
  description
}: ContentEmptyProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>

        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}