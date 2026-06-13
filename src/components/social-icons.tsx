import { Button } from "@/components/ui/button";

import { Icon } from "@iconify/react";

interface Data {
  href: string;
  icon: string;
  name: string;
  color?: string;
}

interface SocialIconsProps {
  data: Data[];
}

export function SocialIcons({ data }: SocialIconsProps) {
  return (
    <div className="space-x-2">
      {data?.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          size="icon"
          className="rounded-full"
          asChild
        >
          <a href={item.url ?? "#"} target="_blank" rel="noopener noreferrer">
            <Icon icon={`simple-icons:${item.icon}`} />
          </a>
        </Button>
      ))}
    </div>
  );
}
