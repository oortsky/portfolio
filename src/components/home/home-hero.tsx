import { m } from "@/paraglide/messages.js";
import { Link } from "@tanstack/react-router";
import { Rocket, Code } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HomeModel } from "./home-model";

export function HomeHero() {
  return (
    <section id="hero" className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6 md:space-y-12">
        <h1 className="text-2xl tracking-widest md:text-4xl">
          Bayu Aprio Pamungkas
        </h1>

        <h2 className="text-6xl font-black md:text-8xl">
          Full-Stack Developer
        </h2>

        <p className="text-muted-foreground md:text-xl">
          {m["home_hero.tagline"]()}
        </p>

        <div className="flex gap-4">
          <Button className="rounded-full" asChild>
            <Link to="/contact">
              <Rocket />
              {m["home_hero.contact_cta"]()}
            </Link>
          </Button>

          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/projects">
              <Code />
              {m["home_hero.projects_cta"]()}
            </Link>
          </Button>
        </div>
      </div>

      <HomeModel />
    </section>
  );
}
