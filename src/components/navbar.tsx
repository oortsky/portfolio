"use client";

import { useState, useEffect } from "react";
import { useLanyard } from "@/hooks/use-lanyard";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { MenuToggle } from "@/components/menu-toggle";
import Link from "next/link";

export function Navbar() {
  const { data, isLoading } = useLanyard();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const createBlinkPattern = () => {
      const shouldDoubleBlink = Math.random() > 0.7;

      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);

      if (shouldDoubleBlink) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 150);
        }, 300);
      }
    };

    const blinkInterval = setInterval(
      () => {
        createBlinkPattern();
      },
      Math.random() * 5000 + 3000
    );

    return () => clearInterval(blinkInterval);
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "bg-green-600 dark:bg-green-500";
      case "idle":
        return "bg-yellow-600 dark:bg-yellow-500";
      case "dnd":
        return "bg-red-600 dark:bg-red-500";
      case "offline":
      default:
        return "bg-gray-600 dark:bg-gray-500";
    }
  };

  const avatarUrl = data?.discord_user
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`
    : undefined;

  const fallback = data?.discord_user?.username
    ? data.discord_user.username.substring(0, 2).toUpperCase()
    : "OO";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto container">
        <div className="relative overflow-hidden rounded-2xl bg-background/10 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300">
          <div className="flex justify-between items-center">
            {/* Logo / Brand */}
            <Link href="/">
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
                    {fallback}
                  </span>
                </AvatarFallback>
                <AvatarBadge className={getStatusColor(data?.discord_status)} />
              </Avatar>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Mode</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LangToggle />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Language</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenuToggle />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Menu</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
