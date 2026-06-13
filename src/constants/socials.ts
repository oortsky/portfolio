type SocialItem = {
  href: string;
  icon: string;
  name: string;
  hoverClass: string;
};

export const SOCIALS: SocialItem[] = [
  {
    name: "GitHub",
    icon: "github",
    href: "https://github.com/oortsky",
    hoverClass: "hover:bg-neutral-500/20"
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://linkedin.com/in/oortsky",
    hoverClass: "hover:bg-[#0A66C2]/20"
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/oortsky",
    hoverClass: "hover:bg-pink-500/20"
  },
  {
    name: "Threads",
    icon: "threads",
    href: "https://threads.com/oortsky",
    hoverClass: "hover:bg-neutral-500/20"
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://facebook.com/oortsky",
    hoverClass: "hover:bg-[#1877F2]/20"
  },
  {
    name: "X/Twitter",
    icon: "x",
    href: "https://x.com/oortsky",
    hoverClass: "hover:bg-neutral-500/20"
  }
];
