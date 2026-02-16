"use client";

import { useState } from "react";
import { Link } from "react-scroll";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Home, Newspaper, Mail, Code } from "lucide-react";

export function MenuToggle() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="glossy" size="icon-lg" className="rounded-full">
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 relative mt-7 overflow-hidden rounded-2xl border-0 bg-background/10 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
          <Link to="hero" smooth={true} offset={-52} duration={500}>
            <DropdownMenuItem>
              <Home className="size-4" />
              Home
            </DropdownMenuItem>
          </Link>
          <Link to="about" smooth={true} offset={-52} duration={500}>
            <DropdownMenuItem>
              <User className="size-4" />
              About
            </DropdownMenuItem>
          </Link>
          <Link to="projects" smooth={true} offset={-52} duration={500}>
            <DropdownMenuItem>
              <Code className="size-4" />
              Projects
            </DropdownMenuItem>
          </Link>
          <Link to="blog" smooth={true} offset={-52} duration={500}>
            <DropdownMenuItem>
              <Newspaper className="size-4" />
              Articles
            </DropdownMenuItem>
          </Link>
          <Link to="contact" smooth={true} offset={-52} duration={500}>
            <DropdownMenuItem>
              <Mail className="size-4" />
              Contact
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
