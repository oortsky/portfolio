import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Icon } from "@iconify/react";

import { SOCIALS } from "@/constants";

export function SocialIcons() {
  return (
    <div className="space-x-2">
      {SOCIALS.map(item => (
        <Button
          key={item.href}
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full transition-colors duration-200",
            item.hoverClass
          )}
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
