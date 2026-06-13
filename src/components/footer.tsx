import { Link } from "@tanstack/react-router";

import { version } from "@/lib/version";

import { NAVIGATION, SOCIALS } from "@/constants";

import { LocalTime } from "@/components/local-time";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          {/* Left */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-semibold">Portfolio — OORTSKY</h2>

            <p className="text-sm text-muted-foreground">
              Full-Stack Developer
            </p>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>

          {/* Right */}
          <div className="grid gap-4">
            <nav className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
              {NAVIGATION.map(item => (
                <Link key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-end">
              {SOCIALS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="text-center md:text-right">
              <p className="font-mono text-xs text-muted-foreground">
                Indonesia (GMT+7) • <LocalTime /> • v{version}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}