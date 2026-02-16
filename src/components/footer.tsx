"use client";

import { version } from "@/lib/version";
import Link from "next/link";
import { Link as Navigator } from "react-scroll";

/**
 * TODO:
 * [] Change BG into Time Visualization.
 * [] Adding Digital Clock with Real-Time UTC+7.
 * [] Adding Wave SVG as a separator between top content and bottom content.
 * [] Re-Design Layout and Typography.
 * [] Add limit in projects and posts list.
 * [] Make index page for projects & posts.
 */

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Navigator
              to="home"
              smooth={true}
              offset={-52}
              duration={500}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Home
            </Navigator>
            <Navigator
              to="about"
              smooth={true}
              offset={-52}
              duration={500}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              About
            </Navigator>
            <Navigator
              to="projects"
              smooth={true}
              offset={-52}
              duration={500}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Projects
            </Navigator>
            <Navigator
              to="contact"
              smooth={true}
              offset={-52}
              duration={500}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Contact
            </Navigator>
          </nav>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="https://github.com/oortsky"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/oortsky"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com/oortsky"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-semibold">✦ OORT SPACE ✦</p>
            <p className="text-sm font-light text-muted-foreground">
              Made with ❤️ by OORTSKY
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              © {new Date().getFullYear()} • v{version}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
