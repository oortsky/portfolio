import type { LucideIcon } from "lucide-react";
import { m } from "@/paraglide/messages.js";

import { Home, User, FolderKanban, BookOpen, Mail } from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAVIGATION: NavigationItem[] = [
  {
    label: m["navigation.label.home"](),
    href: "/",
    icon: Home
  },
  {
    label: m["navigation.label.about"](),
    href: "/about",
    icon: User
  },
  {
    label: m["navigation.label.projects"](),
    href: "/projects",
    icon: FolderKanban
  },
  {
    label: m["navigation.label.blog"](),
    href: "/blog",
    icon: BookOpen
  },
  {
    label: m["navigation.label.contact"](),
    href: "/contact",
    icon: Mail
  }
];
