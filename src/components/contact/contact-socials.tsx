import { m } from "@/paraglide/messages.js";
import { cn } from "@/lib/utils";

import { Icon } from "@iconify/react";
import { ExternalLink } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { SOCIALS } from "@/constants";

export function ContactSocials() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-medium mb-3 text-base">
          {m["contact_socials.title"]()}
        </h2>

        <p className="text-sm text-muted-foreground">
          {m["contact_socials.description"]()}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SOCIALS.map(item => (
          <Item
            key={item.href}
            variant="outline"
            className={cn("transition-colors duration-200", item.hoverClass)}
            asChild
          >
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <ItemMedia
                variant="icon"
                className="transition-colors group-hover:text-current"
              >
                <Icon icon={`simple-icons:${item.icon}`} />
              </ItemMedia>

              <ItemContent>
                <ItemTitle className="transition-colors group-hover:text-current">
                  {item.name}
                </ItemTitle>
              </ItemContent>

              <ItemActions>
                <ExternalLink className="size-4 transition-colors group-hover:text-current" />
              </ItemActions>
            </a>
          </Item>
        ))}
      </div>
    </section>
  );
}
