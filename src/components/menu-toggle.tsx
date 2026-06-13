import { useState } from "react";
import { m } from "@/paraglide/messages.js";

import { MenuDrawer } from "@/components/menu-drawer";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Menu, X } from "lucide-react";

export function MenuToggle() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full md:hidden"
            aria-label={
              open
                ? m["navbar.menu_toggle.label.close"]()
                : m["navbar.menu_toggle.label.open"]()
            }
            onClick={prev => setOpen(prev)}
          >
            <X
              className={`absolute size-4 transition-all ${open ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
            />
            <Menu
              className={`size-4  transition-all ${open ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
            />
            <span className="sr-only">
              {open
                ? m["navbar.menu_toggle.label.close"]()
                : m["navbar.menu_toggle.label.open"]()}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{m["navbar.menu_toggle.tooltip"]()}</p>
        </TooltipContent>
      </Tooltip>

      <MenuDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
