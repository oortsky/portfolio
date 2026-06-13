import { Link } from "@tanstack/react-router";

import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { NAVIGATION } from "@/constants";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuDrawer({ open, onOpenChange }: MenuDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerFooter>
          {NAVIGATION.map(item => {
            const Icon = item.icon;

            return (
              <DrawerClose key={item.href} asChild>
                <Button
                  variant="ghost"
                  className="text-lg h-10 rounded-full [&.active]:border [&.active]:shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  asChild
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 [&.active]:font-bold"
                  >
                    <Icon className="size-4" /> {item.label}
                  </Link>
                </Button>
              </DrawerClose>
            );
          })}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
