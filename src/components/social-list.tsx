"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { LucideIcon } from "lucide-react";

import {
  Item,
  ItemMedia,
  ItemActions,
  ItemContent,
  ItemTitle
} from "@/components/ui/item";

import {
  ExternalLinkIcon,
  Github,
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";

type CustomIcon = () => ReactNode;

type SocialIcon = LucideIcon | CustomIcon;

interface SocialLink {
  name: string;
  icon: SocialIcon;
  href: string;
  color: string;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/oortsky",
    color: "#333333"
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/oortsky",
    color: "#E4405F"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/bayuaprio",
    color: "#0A66C2"
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/oortsky",
    color: "#1877F2"
  },
  {
    name: "X/Twitter",
    icon: () => (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "https://twitter.com/oortsky",
    color: "#000000"
  }
] as const;

function SocialItem({ name, icon: Icon, href, color }: SocialLink) {
  const waveRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const item = itemRef.current;
    const wave = waveRef.current;

    if (!item || !wave) return;

    const enter = () => {
      gsap.fromTo(
        wave,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    };

    const leave = () => {
      gsap.to(wave, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    };

    item.addEventListener("mouseenter", enter);
    item.addEventListener("mouseleave", leave);

    return () => {
      item.removeEventListener("mouseenter", enter);
      item.removeEventListener("mouseleave", leave);
    };
  }, []);

  const isLucide = (icon: SocialIcon): icon is LucideIcon =>
    typeof icon !== "function" || "displayName" in icon;

  return (
    <Item variant="outline" asChild className="relative overflow-hidden">
      <Link href={href} target="_blank" rel="noopener noreferrer" ref={itemRef}>
        <div
          ref={waveRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: color,
            transform: "translateY(100%)",
            opacity: 0
          }}
        />

        <ItemMedia className="relative z-10">
          {isLucide(Icon) ? <Icon className="size-4" /> : <Icon />}
        </ItemMedia>

        <ItemContent className="relative z-10">
          <ItemTitle>{name}</ItemTitle>
        </ItemContent>

        <ItemActions className="relative z-10">
          <ExternalLinkIcon className="size-4" />
        </ItemActions>
      </Link>
    </Item>
  );
}

export function SocialList() {
  return (
    <div className="space-y-4">
      {SOCIAL_LINKS.map(social => (
        <SocialItem key={social.name} {...social} />
      ))}
    </div>
  );
}
