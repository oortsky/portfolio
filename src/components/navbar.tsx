import { useLanyard } from "@/hooks/use-lanyard";
import { useBlink } from "@/hooks/use-blink";
import { Link } from "@tanstack/react-router";

import { LangToggle } from "@/components/lang-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { MenuToggle } from "@/components/menu-toggle";

import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { NAVIGATION } from "@/constants";

export function Navbar() {
  const { data, isLoading } = useLanyard();
  const isBlinking = useBlink();

  const getStatusColor = (status?: "online" | "idle" | "dnd" | "offline") => {
    switch (status) {
      case "online":
        return "bg-green-500";

      case "idle":
        return "bg-yellow-500";

      case "dnd":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  const avatarUrl = data?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`
    : undefined;

  return (
    <nav className="sticky top-0 inset-x-0 z-50">
      <div className="mx-auto container p-2">
        <div className="relative overflow-hidden rounded-2xl bg-background/10 backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300">
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <Avatar>
                {!isLoading && avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt={data?.discord_user.username}
                  />
                )}

                <AvatarFallback>
                  <span
                    className="inline-block transition-all duration-100"
                    style={{
                      transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
                      transformOrigin: "center"
                    }}
                  >
                    OO
                  </span>
                </AvatarFallback>

                <AvatarBadge className={getStatusColor(data?.discord_status)} />
              </Avatar>

              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {NAVIGATION.map(item => (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        asChild
                      >
                        <Link to={item.href} className="[&.active]:font-bold">
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex gap-2">
              <LangToggle />
              <ModeToggle />
              <MenuToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
